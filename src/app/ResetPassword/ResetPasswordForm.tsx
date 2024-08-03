'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useEmailStore from '../stores/emailStore';

const ResetPasswordForm = () => {
  const getOtp = useEmailStore((state) => state.otp);
  const userEmail = useEmailStore((state) => state.userEmail);
  const [newPassword, setNewPassword] = useState('');
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const handleResetPassword = async () => {
console.log(userEmail)


    if (otp === getOtp) {
      
      try {
        const response = await fetch(`/api/userprofile/resetPassword`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail, password: newPassword }),
        });
        console.log(newPassword + " check");
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

  return (
    <div className="reset-password-form bg-white rounded-2xl px-10 py-10 w-full max-w-lg h-auto lg:w-1/2 lg:h-3/4 mx-auto my-10">
      <h2 className="mb-4 font-source-code text-3xl font-bold">Reset Password</h2>
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
    </div>
  );
};

export default ResetPasswordForm;
