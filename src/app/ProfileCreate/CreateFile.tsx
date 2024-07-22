'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from "@/components/ui/button";
import AddPic from './AddPic';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { interests, languages } from "../../constants/enums";
import useUserProfileStore from '../components/slaystore.js'

const CreateFile: React.FC = () => {
  const router = useRouter()

  interface FormData {
    nativeLanguage: string;
    fluentLanguagess: string[];
    learningLanguagess: string[];
    userInterests: string[];
    userDescription: string;
    profilePic: string;
  }




  const [formData, setFormData] = useState<{ updateData: FormData }>({
    updateData: {
      nativeLanguage: '',
      fluentLanguagess: [],
      learningLanguagess: [],
      userInterests: [],
      userDescription: '',
      profilePic: '',
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      updateData: {
        ...prevState.updateData,
        [name]: value,
      }
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevState => ({
      updateData: {
        ...prevState.updateData,
        [name]: value,
      }
    }));
  };

  const handleMultiSelectChange = (name: string, value: string) => {
    setFormData(prevState => {
      const valuesArray = prevState.updateData[name as keyof FormData] as string[];
      return {
        updateData: {
          ...prevState.updateData,
          [name]: valuesArray.includes(value) ? valuesArray.filter(v => v !== value) : [...valuesArray, value],
        }
      };
    });
  };

  const handleCancel = () => {
    setFormData({
      updateData: {
        nativeLanguage: '',
        fluentLanguagess: [],
        learningLanguagess: [],
        userInterests: [],
        userDescription: '',
        profilePic: '',
      }
    });
  };
//  window?.localStorage.setItem("userId",userId)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    //const url = window.location.href.toString()
    //const userId = url.split('=').slice(-1)[0]

    try {
      // const response = await fetch(`/api/updateProfile?userId=${window?.localStorage.getItem("userId")}`, 
      const response = await fetch(`/api/updateProfile?userId=${window?.localStorage.getItem("userId")}`, 
        {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Update Success:', data.message);
      // Handle success (e.g., redirect to a login page or show a success message)
      router.push('/Dashboard');

    } catch (error) {
      console.error('Update Error:', error);
      // Handle error (e.g., show an error message)
    }
  };


  const onImageChange = (base64String: string) => {
    setFormData(prevState => ({
      updateData: {
        ...prevState.updateData,
        profilePic: base64String,
      }
    }));
    console.log(base64String);
  };



  return (
    <div className="sign-up-form bg-white rounded-4xl p-10">
      <div className="flex flex-col items-center mb-6">
        <AddPic onImageChange={onImageChange}/>
      </div>
      <form className="flex flex-wrap justify-between" onSubmit={handleSubmit}>
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <label className='block mb-2 font-light text-gray-400 text-sm'>
            Native Language
            <Select onValueChange={(value) => handleSelectChange('nativeLanguage', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your native language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language, index) => (
                  <SelectItem key={index} value={language}>{language}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
        </div>
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <label className='block mb-2 font-light text-gray-400 text-sm'>
            Fluent Languages
            <Select onValueChange={(value) => handleMultiSelectChange('fluentLanguagess', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your fluent languages" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language, index) => (
                  <SelectItem key={index} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
        </div>
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <label className='block mb-2 font-light text-gray-400 text-sm'>
            Learning Languages
            <Select onValueChange={(value) => handleMultiSelectChange('learningLanguagess', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your learning languages" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language, index) => (
                  <SelectItem key={index} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
        </div>
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <label className='block mb-2 font-light text-gray-400 text-sm'>
            Interests
            <Select onValueChange={(value) => handleMultiSelectChange('userInterests', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your interests" />
              </SelectTrigger>
              <SelectContent>
                {interests.map((interest, index) => (
                  <SelectItem key={index} value={interest}>
                    {interest}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
        </div>
        <div className="w-full px-2 mb-4">
          <label className='block mb-2 font-light text-gray-400 text-sm'>
            Description
          </label>
          <textarea
            name="userDescription"
            className="w-full border rounded-md p-2"
            value={formData.updateData.userDescription}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="w-full flex justify-end px-2 mt-4">
          <Button type="submit" variant="outline" className="w-[120px] mr-2 rounded-full bg-[#65AD87] hover:bg-[#65AD87] text-white">Save</Button>
          <Button variant="outline" onClick={handleCancel} className="w-[120px] rounded-full bg-[#65AD87] hover:bg-[#65AD87] text-white">Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateFile;
