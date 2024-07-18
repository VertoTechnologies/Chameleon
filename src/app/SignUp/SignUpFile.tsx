'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SignUpFile: React.FC = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    return (
        <div className="sign-up-form bg-white rounded-l-2xl px-10 py-10">
            <h1 className='mb-4 font-source-code text-3xl font-bold'>Sign Up</h1>
            <form>
                <div className='px-10'>
                    <label className='block mb-2 font-light text-gray-400 text-sm'>
                        Name
                        <input className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none" type="text" name="name" required />
                    </label>
                    <label className='block mb-2 font-light text-gray-400 text-sm'>
                        Email
                        <input className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none" type="email" name="email" required />
                    </label>
                    <label className='block mb-2 font-light text-gray-400 text-sm'>
                        Date of Birth
                        <input className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none" type="date" name="dob" required />
                    </label>
                    <label className='block mb-2 font-light text-gray-400 text-sm'>
                        Password
                        <div className="relative">
                            <input className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none" type={isPasswordVisible ? "text" : "password"} name="password" required />
                            <i 
                                className={`bi ${isPasswordVisible ? 'bi-eye' : 'bi-eye-slash'} custom-class absolute right-2 top-2 cursor-pointer`} 
                                onClick={togglePasswordVisibility}
                            ></i>
                        </div>
                    </label>
                    <label className='block mb-2 font-light text-gray-400 text-sm'>
                        Confirm Password
                        <div className="relative">
                            <input className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none" type={isConfirmPasswordVisible ? "text" : "password"} name="confirmPassword" required />
                            <i 
                                className={`bi ${isConfirmPasswordVisible ? 'bi-eye' : 'bi-eye-slash'} custom-class absolute right-2 top-2 cursor-pointer`} 
                                onClick={toggleConfirmPasswordVisibility}
                            ></i>
                        </div>
                    </label>
                    <button className='w-full p-3 rounded-3xl bg-[#65AD87] hover:bg-[#65AD87] text-white px-1 py-2 text-sm' type="submit">Sign Up</button>
                </div>
            </form>
            <p className="text-center mt-4 text-xs ">Already have an account? <Link href="/Login" className="text-purple-500">Sign In</Link></p>
        </div>
    );
};

export default SignUpFile;
