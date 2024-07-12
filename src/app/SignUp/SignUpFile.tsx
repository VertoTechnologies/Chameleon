'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useRouter} from 'next/navigation';

const SignUpFile: React.FC = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter();


    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    interface FormData {
        name: string;
        email: string;
        password: string;
        dateOfBirth: string;
       
    }
    
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
      dateOfBirth: '',
    });
    
      const handleChange = (e:any) => {
        const { name, value } = e.target;
        
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));

          if (name === 'password') {
            setPassword(value);
          }
        
      };

      const handleConfirmPasswordChange = (e:any) => {
        const { value } = e.target;
        setConfirmPassword(value);
      }


      const validatePasswords = () => {
        return password === confirmPassword;
      };

      const handleSubmit = async (e:any) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        if(!validatePasswords()){
          alert('Passwords do not match');
          return;
        }

        try {
          const response = await fetch('/api/userSignup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
          const data = await response.json();
          console.log('Sign Up Success:', data.message);
          // Handle success (e.g., redirect to a login page or show a success message)
          router.push('/ProfileCreate');
          
        } catch (error) {
          console.error('Sign Up Error:', error);
          // Handle error (e.g., show an error message)
        }
      };

    return (
        <div className="sign-up-form bg-white rounded-l-2xl px-10 py-10">
            <h1 className='mb-4 font-source-code text-3xl font-bold'>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className='px-10'>
                    <label className='block mb-2 font-light text-gray-400 text-sm'>
                        Name
                        <input className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none" type="text" onChange={handleChange} name="name" required />
                    </label>
                    <label className='block mb-2 font-light text-gray-400 text-sm'>
                        Email
                        <input className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none" type="email" onChange={handleChange} name="email" required />
                    </label>
                    <label className='block mb-2 font-light text-gray-400 text-sm'>
                        Date of Birth
                        <input className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none" type="date" onChange={handleChange} name="dateOfBirth" required />
                    </label>
                    <label className='block mb-2 font-light text-gray-400 text-sm'>
                        Password
                        <div className="relative">
                            <input className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none" type={isPasswordVisible ? "text" : "password"} name="password" onChange={handleChange} required />
                            <i 
                                className={`bi ${isPasswordVisible ? 'bi-eye' : 'bi-eye-slash'} custom-class absolute right-2 top-2 cursor-pointer`} 
                                onClick={togglePasswordVisibility}
                            ></i>
                        </div>
                    </label>
                    <label className='block mb-2 font-light text-gray-400 text-sm'>
                        Confirm Password
                        <div className="relative">
                            <input className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none" type={isConfirmPasswordVisible ? "text" : "password"} name="confirmPassword" onChange={handleConfirmPasswordChange} required />
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
