import { useState } from 'react';
import { X, Phone, Shield, RefreshCw } from 'lucide-react';
import { isValidIndianPhone } from '../utils/validation';

interface Props {
  onVerified: (phone: string) => void;
  onClose: () => void;
}

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function OTPModal({ onVerified, onClose }: Props) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [sending, setSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleSend = async () => {
    if (!isValidIndianPhone(phone)) {
      setPhoneError('Enter a valid 10-digit Indian mobile number');
      return;
    }
    setPhoneError('');
    setSending(true);
    await new Promise(r => setTimeout(r, 800));
    const code = generateOTP();
    setGeneratedOtp(code);
    setSending(false);
    setStep('otp');
    setCooldown(30);
    const interval = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerify = () => {
    if (otp.trim() !== generatedOtp) {
      setOtpError('Incorrect OTP. Please try again.');
      return;
    }
    onVerified(phone);
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
        <div className="bg-medical-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <h2 className="font-bold text-lg">Verify to Save Profile</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-medical-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {step === 'phone' ? (
            <>
              <p className="text-slate-500 text-sm">
                Enter your mobile number to save and sync your profile across devices.
              </p>
              <div>
                <label className="text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> Mobile Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setPhoneError(''); }}
                  placeholder="+91 98765 43210"
                  className={`w-full bg-slate-50 border rounded-xl px-3 py-3 text-sm outline-none focus:border-medical-500 ${phoneError ? 'border-red-400' : 'border-slate-200'}`}
                />
                {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
              </div>
              <button
                onClick={handleSend}
                disabled={sending}
                className="w-full bg-medical-600 hover:bg-medical-700 text-white font-bold py-3 rounded-2xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {sending && <RefreshCw className="w-4 h-4 animate-spin" />}
                {sending ? 'Sending OTP…' : 'Send OTP'}
              </button>
            </>
          ) : (
            <>
              <div className="text-center">
                <p className="text-slate-500 text-sm">
                  OTP sent to <strong className="text-slate-700">{phone}</strong>
                </p>
              </div>

              {/* Simulated OTP display — replace sendOTP() with MSG91/Fast2SMS for production */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                <p className="text-xs text-blue-600 font-bold mb-1">Demo Mode — Your OTP</p>
                <p className="text-2xl font-extrabold text-blue-800 tracking-widest">{generatedOtp}</p>
                <p className="text-[10px] text-blue-400 mt-1">Configure MSG91 API key to send real SMS</p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 mb-1.5 block">Enter 6-digit OTP</label>
                <input
                  type="number"
                  value={otp}
                  onChange={e => { setOtp(e.target.value.slice(0, 6)); setOtpError(''); }}
                  placeholder="— — — — — —"
                  className={`w-full bg-slate-50 border rounded-xl px-3 py-3 text-xl font-bold text-center tracking-[0.4em] outline-none focus:border-medical-500 ${otpError ? 'border-red-400' : 'border-slate-200'}`}
                />
                {otpError && <p className="text-xs text-red-500 mt-1 text-center">{otpError}</p>}
              </div>

              <button
                onClick={handleVerify}
                disabled={otp.length < 6}
                className="w-full bg-medical-600 hover:bg-medical-700 text-white font-bold py-3 rounded-2xl transition-all disabled:opacity-60"
              >
                Verify & Save
              </button>

              <div className="text-center">
                {cooldown > 0 ? (
                  <p className="text-xs text-slate-400">Resend OTP in {cooldown}s</p>
                ) : (
                  <button
                    onClick={() => { setStep('phone'); setOtp(''); setOtpError(''); }}
                    className="text-xs text-medical-600 font-bold"
                  >
                    Change number or resend OTP
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
