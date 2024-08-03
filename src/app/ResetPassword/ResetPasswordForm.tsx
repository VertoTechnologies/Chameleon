'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useEmailStore from '../stores/emailStore';
import axios from 'axios';
import Image from 'next/image';

const ResetPasswordForm = () => {
  const getOtp = useEmailStore((state) => state.otp);
  const setOtpStore = useEmailStore((state) => state.setOtp);
  const userEmail = useEmailStore((state) => state.userEmail);
  const [newPassword, setNewPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(300); // 300 seconds = 5 minutes
  const [isOtpValid, setIsOtpValid] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setIsOtpValid(false);
    }
  }, [timer]);

  const sendOtp = async () => {
    const nextOtp = Math.floor(Math.random() * 9000 + 1000);
    setOtpStore(nextOtp.toString());
    setTimer(300);
    setIsOtpValid(true);

    try {
      await axios.post('/api/notifications/sendPasswordResetEmail', {
        toEmail: userEmail,
        OTP: nextOtp,
      });
    } catch (error) {
      console.error('Error sending email notification:', error);
      // Optionally set an alert message for email error
    }
  };

  const handleResetPassword = async () => {
    if (!isOtpValid) {
      alert('OTP has expired. Please request a new one.');
      return;
    }

    if (otp === getOtp) {
      try {
        const response = await fetch(`/api/userprofile/resetPassword`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail, password: newPassword }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Password Reset Success:', data.message);

        alert('Password reset successful. Please log in with your new password.');
        router.push('/Login');
      } catch (error) {
        console.error('Password Reset Error:', error);
        alert('There was an error resetting your password. Please try again.');
      }
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="reset-password-form bg-white rounded-2xl px-10 w-full max-w-lg h-auto flex-col mx-auto my-10">
      <div className='flex gap-24'>
      <h2 className="mb-4 font-source-code text-3xl font-bold bord">Reset Password</h2>
      <div style={{ maxWidth: '20%', maxHeight: '50px' }}>
          <Image
            src='/assets/images/logo.png'
            alt="Example Image"
            width={1600}
            height={600}
            layout="responsive"
            objectFit="cover"
            className="rounded-xl"
          />
          
        </div>
      </div>
      
        
      <div className="mb-4 text-red-500">
        {isOtpValid ? `OTP expires in: ${formatTime(timer)}` : 'OTP has expired. Please request a new one.'}
      </div>
      <input
        className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none"
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <input
        className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none"
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button
        className="w-full p-3 rounded-3xl bg-[#65AD87] hover:bg-[#65AD87] text-white px-1 py-2 text-xs"
        onClick={handleResetPassword}
      >
        Reset Password
      </button>
       {isOtpValid ? '' : <button onClick={sendOtp} className="text-purple-500 text-xxs">Resend OTP</button>}
    </div>
  );
};

export default ResetPasswordForm;
