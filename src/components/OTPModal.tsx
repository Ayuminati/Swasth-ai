import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Phone, ShieldCheck, Loader2, RefreshCw, Info } from 'lucide-react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import type { ConfirmationResult } from 'firebase/auth';
import { auth } from '../config/firebase';
import { isValidIndianPhone } from '../utils/validation';

interface Props {
  onVerified: (phone: string) => void;
  onClose: () => void;
}

const IS_DEV = import.meta.env.DEV;

export default function OTPModal({ onVerified, onClose }: Props) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);
  const [demoOtp, setDemoOtp] = useState('');

  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      recaptchaRef.current?.clear();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = useCallback(() => {
    setTimer(30);
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) { clearInterval(timerRef.current!); return 0; }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const setupRecaptcha = () => {
    if (!recaptchaRef.current) {
      recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
    return recaptchaRef.current;
  };

  const handleSendOTP = async () => {
    const cleaned = phone.replace(/\D/g, '').slice(-10);
    if (!isValidIndianPhone(cleaned)) {
      setError('Enter a valid 10-digit Indian mobile number');
      return;
    }
    setLoading(true);
    setError('');

    if (IS_DEV) {
      // Demo mode — show OTP on screen for local development
      await new Promise(r => setTimeout(r, 800));
      const generated = Math.floor(100000 + Math.random() * 900000).toString();
      setDemoOtp(generated);
      setStep('otp');
      startTimer();
      setLoading(false);
      return;
    }

    // Production — real Firebase Phone Auth
    try {
      const verifier = setupRecaptcha();
      await verifier.render();
      const result = await signInWithPhoneNumber(auth, `+91${cleaned}`, verifier);
      confirmationRef.current = result;
      setStep('otp');
      startTimer();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('too-many-requests')) {
        setError('Too many attempts. Please try again after a few minutes.');
      } else {
        setError('Could not send OTP. Check the number and try again.');
      }
      recaptchaRef.current?.clear();
      recaptchaRef.current = null;
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    if (!IS_DEV) {
      recaptchaRef.current?.clear();
      recaptchaRef.current = null;
    }
    setOtp('');
    setError('');
    await handleSendOTP();
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) { setError('Enter the 6-digit OTP'); return; }
    setLoading(true);
    setError('');

    if (IS_DEV) {
      await new Promise(r => setTimeout(r, 600));
      if (otp === demoOtp) {
        const cleaned = phone.replace(/\D/g, '').slice(-10);
        onVerified(cleaned);
      } else {
        setError('Wrong OTP. Please check and try again.');
      }
      setLoading(false);
      return;
    }

    // Production — real Firebase verification
    try {
      await confirmationRef.current!.confirm(otp);
      const cleaned = phone.replace(/\D/g, '').slice(-10);
      onVerified(cleaned);
    } catch {
      setError('Wrong OTP. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
        <div className="bg-medical-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            <h2 className="font-bold text-lg">Verify Phone Number</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-medical-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {IS_DEV && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-2 text-xs text-amber-800 font-medium">
            <Info className="w-3.5 h-3.5 shrink-0" />
            Dev mode — OTP shown on screen. Real SMS sends on production.
          </div>
        )}

        <div className="p-6">
          {step === 'phone' ? (
            <>
              <p className="text-sm text-slate-500 mb-5">
                We'll send a one-time password to verify your mobile number.
              </p>
              <label className="text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> Mobile Number
              </label>
              <div className="flex gap-2 mb-4">
                <span className="flex items-center px-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold text-slate-600">
                  +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setError(''); }}
                  onKeyDown={e => e.key === 'Enter' && handleSendOTP()}
                  placeholder="98765 43210"
                  maxLength={10}
                  className={`flex-1 bg-slate-50 border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-medical-500 ${error ? 'border-red-400' : 'border-slate-200'}`}
                />
              </div>
              {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
              <button
                onClick={handleSendOTP}
                disabled={loading || phone.replace(/\D/g, '').length < 10}
                className="w-full bg-medical-600 hover:bg-medical-700 text-white font-bold py-3.5 rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                  : 'Send OTP'}
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-slate-500 mb-1">
                Enter the 6-digit OTP sent to <strong>+91 {phone}</strong>
              </p>
              <button
                onClick={() => { setStep('phone'); setOtp(''); setError(''); setDemoOtp(''); }}
                className="text-xs text-medical-600 font-medium mb-4 hover:underline"
              >
                Change number
              </button>

              {IS_DEV && demoOtp && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 text-center">
                  <p className="text-xs text-amber-700 font-medium mb-1">Dev mode OTP</p>
                  <p className="text-3xl font-extrabold tracking-[0.3em] text-amber-800">{demoOtp}</p>
                </div>
              )}

              <input
                type="number"
                value={otp}
                onChange={e => { setOtp(e.target.value.slice(0, 6)); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleVerifyOTP()}
                placeholder="• • • • • •"
                className={`w-full text-center text-2xl font-bold tracking-[0.5em] bg-slate-50 border rounded-2xl px-4 py-4 outline-none focus:border-medical-500 mb-4 ${error ? 'border-red-400' : 'border-slate-200'}`}
              />
              {error && <p className="text-xs text-red-500 mb-3 text-center">{error}</p>}

              <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
                className="w-full bg-medical-600 hover:bg-medical-700 text-white font-bold py-3.5 rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 mb-3"
              >
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying…</>
                  : 'Verify OTP'}
              </button>

              <button
                onClick={handleResend}
                disabled={timer > 0 || loading}
                className="w-full text-sm text-slate-500 hover:text-medical-600 disabled:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
