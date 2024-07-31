'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from "@/components/ShadcnComponents/label";
import { RadioGroup, RadioGroupItem } from "@/components/ShadcnComponents/radio-group";
import { Button } from '@nextui-org/react';

const PersonalizationForm: React.FC = () => {
  const router = useRouter();

  interface FormData {
    purpose: string;
    learningMethods: string;
    usageFrequency: string;
  }

  const [formData, setFormData] = useState<{ updateData: FormData }>({
    updateData: {
      purpose: '',
    learningMethods: '',
    usageFrequency: '',
    },
  });

  const handleChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      updateData: {
        ...prevState.updateData,
        [name]: value,
      }
    }));
  };


  const handleCancel = () => {
    setFormData({
      updateData: {
        purpose: '',
      learningMethods: '',
      usageFrequency: '',
      }
    });
    router.push('/Dashboard')
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    //const userId = url.split('=').slice(-1)[0]

    try {
      const response = await fetch(`/api/userprofile/updateProfile?userId=${localStorage.getItem("userId")}`, 
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
      router.push('/SuggestionsPopup');

    } catch (error) {
      console.error('Update Error:', error);
      // Handle error (e.g., show an error message)
    }
  };


  return (
    <div className="bg-white rounded-l-2xl p-10">
      <form onSubmit={handleSubmit}>
        <p className='mt-6'>What are you here for?</p>
        <div className="border-t-2 border-[#65AD87] my-4 w-full mb-8"></div>
        <div className="px-10">
          <RadioGroup name="purpose" onChange={handleChange} defaultValue="">
            <div className="flex justify-between items-center space-x-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="To Learn" id="learn" />
                <Label htmlFor="learn">To Learn</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="To Teach" id="teach" />
                <Label htmlFor="teach">To Teach</Label>
              </div>
            </div>
            <div className="flex justify-between items-center space-x-2 mt-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Both" id="both" />
                <Label htmlFor="both">Both</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <p className='mt-10'>What are your preferred learning/teaching methods?</p>
        <div className="border-t-2 border-[#65AD87] my-4 w-full mb-8"></div>
        <div className="px-10">
          <RadioGroup name="learningMethods" onChange={handleChange} defaultValue="">
            <div className="flex justify-between items-center space-x-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Conversation" id="conversation" />
                <Label htmlFor="conversation">Conversation</Label>
              </div>
              <div className="flex items-center space-x-2 pr-3">
                <RadioGroupItem value="Writing" id="writing" />
                <Label htmlFor="writing">Writing</Label>
              </div>
            </div>
            <div className="flex justify-between items-center space-x-2 mt-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Reading" id="reading" />
                <Label htmlFor="reading">Reading</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Listening" id="listening" />
                <Label htmlFor="listening">Listening</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <p className='mt-10'>How often do you plan to use the app or practice?</p>
        <div className="border-t-2 border-[#65AD87] my-4 w-full mb-8"></div>
        <div className="px-10">
          <RadioGroup name="usageFrequency" onChange={handleChange} defaultValue="">
            <div className="flex justify-between items-center space-x-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Daily" id="daily" />
                <Label htmlFor="daily">Daily</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Weekly" id="weekly" />
                <Label htmlFor="weekly">Weekly</Label>
              </div>
            </div>
            <div className="flex justify-between items-center space-x-2 mt-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Occasionally" id="occasionally" />
                <Label htmlFor="occasionally">Occasionally</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="w-full flex justify-end px-10 ml-20 mt-10">
          <Button type="submit" variant="bordered" className="w-[120px] mr-2 rounded-full bg-[#65AD87] hover:bg-[#65AD87] text-white">Save</Button>
          <Button variant="bordered" onClick={handleCancel} className="w-[120px] rounded-full bg-[#65AD87] hover:bg-[#65AD87] text-white">Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalizationForm;
