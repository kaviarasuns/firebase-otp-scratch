'use client'

import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs'
import OtpInput from 'react-otp-input';
import { useState, useEffect } from 'react';
import { CgSpinner } from 'react-icons/cg';
import PhoneInput from 'react-phone-input-2';
import { auth } from '../Firebase.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "react-phone-input-2/lib/style.css";
// import'../app/global.css';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';


export default function Home() {
    const [otp, setOtp] = useState("");
    const [ph, setPh ] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP ] = useState(false);
    const [user, setUser ] = useState(null);

    function onCaptchVerify(){
        if(!window.recaptchaVerifier){
          window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response : any) => {
              console.log(response);
              onSignup()
            },
            'expired-callback': () => {
              
            }
          }, auth);
        }
      }
  
      async function onSignup(){
  
        setLoading(true);
        onCaptchVerify()
  
        const appVerifier = window.recaptchaVerifier
        const formatPh = '+' + ph;
        signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
           window.confirmationResult = confirmationResult;
           setLoading(false);
           setShowOTP(true);
           toast.success('OTP sended successfully!');
        }).catch((error) => {
          console.log(error);
          setLoading(false);
        });
      }
  
      function onOTPVerify() {
        
        setLoading(true);
        window.confirmationResult
          .confirm(otp)
          .then(async (res : any) => {
            console.log(res);
            setUser(res.user);
            setLoading(false);
          })
          .catch((err : any) => {
            console.log(err);
            setLoading(false);
          });
      }

    return(
    <section className='bg-emerald-500 flex items-center justify-center h-screen'>
      <div>
        <div id="recaptcha-container"></div>
        {
          user ? 
          <h2 className="text-center leading-normal text-white font-medium text-2xl">
          👍 Login Success
         </h2> :
        <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
          <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
            Mobile OTP Verify
          </h1>
          {
            showOTP ? 
            <>
                <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
                  <BsFillShieldLockFill size={30}/>
                </div>
                <label htmlFor="otp" className='font-bold text-xl text-white text-center'>
                  Enter your OTP
                </label>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                    
                />
                <button onClick={onOTPVerify} className='bg-emerald-600 w-full flex 
                gep-1 items-center justify-center py-2.5 text-white rounded'>
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
            </> : 
            <>
              <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
                <BsTelephoneFill size={30}/>
              </div>
              <label htmlFor="" className='font-bold text-xl text-white text-center'>
                Verify your phone number
              </label>
              <PhoneInput country={"in"} value={ph} onChange={setPh} />
              <button onClick={onSignup} className='bg-emerald-600 w-full flex 
              gep-1 items-center justify-center py-2.5 text-white rounded'>
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Send code via SMS</span>
              </button>
          </>
          }
        </div>
        }
      
      </div>
      <ToastContainer/>
    </section>
  )
  }









// "use client"
// import dynamic from 'next/dynamic'
// import { Suspense } from "react";


// export default function Home() {
//   const DynamicComponent = dynamic(() =>
//   import('../components/otpVerify').then((mod) => mod.OTPVerify), {suspense: true}
// )
//     return (
//       <div>
//         <Suspense fallback={<div>Loading...</div>}>
//           <DynamicComponent/>  
//         </Suspense>
//       </div>
//     )
// }

