


//with Recaptcha






// 'use client';

// import { useState } from 'react';
// import toast from 'react-hot-toast';

// export default function LoginPage() {
//   const [phone, setPhone] = useState('');
//   const [loading, setLoading] = useState(false);


// const handleLogin = async () => {
//     if (!phone) {
//       toast.error('Please enter your phone number');
//       return;
//     }
  
//     setLoading(true);
//     try {
//       const token = await grecaptcha.execute(
//         process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!,
//         { action: 'login' }
//       );
  
//       const res = await fetch('/api/verify-recaptcha', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token }),
//       });
  
//       const data = await res.json();
  
//       if (!data.success || data.score < 0.5) {
//         toast.error('reCAPTCHA failed (bot suspicion)');
//         return;
//       }
  
//       toast.success('reCAPTCHA passed ✅');
//       // proceed with phone auth or next steps
  
//     } catch (err) {
//       console.error(err);
//       toast.error('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
//         <h1 className="text-lg font-bold mb-4">Login with Phone</h1>
//         <input
//           type="tel"
//           placeholder="Enter phone number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="w-full px-3 py-2 border rounded mb-4"
//         />
//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//         >
//           {loading ? 'Processing...' : 'Login'}
//         </button>
//       </div>
//     </div>
//   );
// }


//with recaptcha and country code

'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'; 

export default function LoginPage() {
    const [phone, setPhone] = useState<string | undefined>('');

  const [loading, setLoading] = useState(false);
  

  const handleLogin = async () => {
    if (!phone) {
      toast.error('Please enter your phone number');
      return;
    }

   
    if (!isValidPhoneNumber(phone)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      const token = await grecaptcha.execute(
        process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!,
        { action: 'login' }
      );

      const res = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (!data.success || data.score < 0.5) {
        toast.error('reCAPTCHA failed (bot suspicion)');
        return;
      }

      toast.success('reCAPTCHA passed ✅');
     

    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-lg font-bold mb-4">Login with Phone</h1>
        <PhoneInput
          international
          defaultCountry="IN" 
          value={phone}
          onChange={setPhone}
          placeholder="Enter phone number"
          className="w-full px-3 py-2 border rounded mb-4"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? 'Processing...' : 'Login'}
        </button>
      </div>
    </div>
  );
}




// phone number with recaptcha, country code validation , otp

// 'use client';

// import { useState, useEffect } from 'react';
// import { PhoneInput } from 'react-international-phone';
// import 'react-international-phone/style.css';
// import { auth } from '@/lib/firebase'; // your firebase config
// import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
// import toast from 'react-hot-toast';





// declare global {
//     interface Window {
//       recaptchaVerifier?: RecaptchaVerifier;
//       confirmationResult?: ConfirmationResult;
//     }
//   }






// export default function LoginPage() {
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState('');
//   const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!phone) {
//       toast.error('Please enter your phone number');
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = await grecaptcha.execute(process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!, {
//         action: 'login',
//       });

//       const res = await fetch('/api/verify-recaptcha', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token }),
//       });

//       const data = await res.json();

//       if (!data.success || data.score < 0.5) {
//         toast.error('reCAPTCHA failed');
//         return;
//       }

//       if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
//         window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//           size: 'invisible',
//           callback: () => {},
//         });
//       }

//       const appVerifier = window.recaptchaVerifier;
//       const result = await signInWithPhoneNumber(auth, phone, appVerifier);
//       setConfirmationResult(result);
//       toast.success('OTP sent ✅');
//     } catch (err: any) {
//       toast.error(err.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOtp = async () => {
//     if (!otp || !confirmationResult) {
//       toast.error('Please enter the OTP');
//       return;
//     }

//     try {
//       await confirmationResult.confirm(otp);
//       toast.success('Phone verified ✅');
//     } catch {
//       toast.error('Invalid OTP');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
//         <h2 className="text-xl font-semibold mb-4">Phone Login</h2>

//         <PhoneInput
//           defaultCountry="IN"
//           value={phone}
//           onChange={(val) => setPhone(val || '')}
//           className="w-full px-3 py-2 border rounded mb-4"
//           placeholder="Enter phone number"
//         />

//         {confirmationResult ? (
//           <>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full px-3 py-2 border rounded mb-4"
//             />
//             <button
//               onClick={verifyOtp}
//               className="w-full bg-green-600 text-white py-2 rounded"
//             >
//               Verify OTP
//             </button>
//           </>
//         ) : (
//           <button
//             onClick={handleLogin}
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded"
//           >
//             {loading ? 'Sending OTP...' : 'Send OTP'}
//           </button>
//         )}

//         <div id="recaptcha-container" />
//       </div>
//     </div>
//   );
// }






'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { auth } from '@/lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';



declare global {
        interface Window {
          recaptchaVerifier?: RecaptchaVerifier;
          confirmationResult?: ConfirmationResult;
        }
      }
    
    



export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);

  
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA resolved');
        },
      });
    }
  };

  const handleSendOtp = async () => {
    if (!phone) {
      toast.error('Enter phone number');
      return;
    }

    setLoading(true);

    try {
      const token = await grecaptcha.execute(
        process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!,
        { action: 'login' }
      );

      const captchaRes = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const captchaData = await captchaRes.json();
      if (!captchaData.success || captchaData.score < 0.5) {
        toast.error('reCAPTCHA failed');
        return;
      }

      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;

      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      toast.success('OTP sent!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || !confirmationResult) {
      toast.error('Enter OTP');
      return;
    }

    try {
      const result = await confirmationResult.confirm(otp);
      toast.success('Phone number verified!');
      console.log('User:', result.user);
    } catch (err) {
      console.error(err);
      toast.error('Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-lg font-bold mb-4">Login with Phone</h1>

        <PhoneInput
          defaultCountry="IN"
          value={phone}
          onChange={(val) => setPhone(val || '')}
          className="w-full px-3 py-2 border rounded mb-4"
          placeholder="Enter phone number"
        />

        {confirmationResult ? (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <button
              onClick={handleVerifyOtp}
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              Verify OTP
            </button>
          </>
        ) : (
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        )}
      </div>

     
      <div id="recaptcha-container"></div>
    </div>
  );
}
