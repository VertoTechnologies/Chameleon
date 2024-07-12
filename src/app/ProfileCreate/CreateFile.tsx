'use client'

import Link from 'next/link';
import React,{useState} from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from "@/components/ui/button";
import AddPic from './AddPic';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
//import Multi from './MultipleSelector';
import { interests } from "../../constants/enums"; // Import the interests array
import { languages } from "../../constants/enums";


const CreateFile: React.FC = () => {

    const [formData, setFormData] = useState({
      nativeLanguage: '',
      fluentLanguage: '',
      learningLanguage: '',
      interests: [],
      description: ''
    });
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleCancel = () => {
      setFormData({
        nativeLanguage: '',
        fluentLanguage: '',
        learningLanguage: '',
        interests: [],
        description: ''
      });
      // Optionally, add logic to close modal or navigate away
    };
  return (
    <div className="sign-up-form bg-white rounded-4xl p-10">
      <div className="flex flex-col items-center mb-6">
        <AddPic />
      </div>
      <form className="flex flex-wrap justify-between">
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <label className='block mb-2 font-light text-gray-400 text-sm'>
            Native Language
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
              {languages.map((interest) => (
                  <SelectItem key={interest} value={interest}>{interest}</SelectItem>
                ))}
                {/* Add more languages as needed */}
              </SelectContent>
            </Select>
          </label>
        </div>
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <label className='block mb-2 font-light text-gray-400 text-sm'>
            Fluent Language
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
              {languages.map((interest) => (
                  <SelectItem key={interest} value={interest}>{interest}</SelectItem>
                ))}
                {/* Add more languages as needed */}
              </SelectContent>
            </Select>
          </label>
        </div>
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <label className='block mb-2 font-light text-gray-400 text-sm'>
            Learning Language
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((interest) => (
                  <SelectItem key={interest} value={interest}>{interest}</SelectItem>
                ))}
                {/* Add more languages as needed */}
              </SelectContent>
            </Select>
          </label>
        </div>
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <label className='block mb-2 font-light text-gray-400 text-sm'>
            Interests
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {interests.map((interest) => (
                  <SelectItem key={interest} value={interest}>{interest}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
        </div>
        <div className="w-full px-2 mb-4">
          <label className='block mb-2 font-light text-gray-400 text-sm'>
            Description
          </label>
          <textarea className="w-full border rounded-md p-2"></textarea>
        </div>
        <div className="w-full flex justify-end px-2 mt-4">
            <Button variant="outline" className="w-[120px] mr-2 rounded-full bg-[#65AD87] hover:bg-[#65AD87] text-white">Save</Button>
            <Button variant="outline" onClick={handleCancel} className="w-[120px] rounded-full bg-[#65AD87] hover:bg-[#65AD87] text-white">Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateFile;
