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

const CreateFile: React.FC = () => {
  const router = useRouter()

  interface FormData {
    nativeLanguage: string;
    fluentLanguages: string[];
    learningLanguages: string[];
    interests: string[];
    description: string;
  }

  const [formData, setFormData] = useState<{ updateData: FormData }>({
    updateData: {
      nativeLanguage: '',
      fluentLanguages: [],
      learningLanguages: [],
      interests: [],
      description: '',
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
        fluentLanguages: [],
        learningLanguages: [],
        interests: [],
        description: '',
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch(`/api/updateProfile?userId=${localStorage.getItem("userId")}`, {
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

  return (
    <div className="sign-up-form bg-white rounded-4xl p-10">
      <div className="flex flex-col items-center mb-6">
        <AddPic />
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
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>{language}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
        </div>
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <label className='block mb-2 font-light text-gray-400 text-sm'>
            Fluent Languages
            <Select onValueChange={(value) => handleMultiSelectChange('fluentLanguages', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your fluent languages" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
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
            <Select onValueChange={(value) => handleMultiSelectChange('learningLanguages', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your learning languages" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
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
            <Select onValueChange={(value) => handleMultiSelectChange('interests', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your interests" />
              </SelectTrigger>
              <SelectContent>
                {interests.map((interest) => (
                  <SelectItem key={interest} value={interest}>
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
            name="description"
            className="w-full border rounded-md p-2"
            value={formData.updateData.description}
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
