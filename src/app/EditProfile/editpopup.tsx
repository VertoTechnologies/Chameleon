"use client";

import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from "next/navigation";
import AddPic from "../SetupProfile/AddPic";
import { Button } from "@/components/ShadcnComponents/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ShadcnComponents/select";
import { Label } from "@/components/ShadcnComponents/label";
import { RadioGroup, RadioGroupItem } from "@/components/ShadcnComponents/radio-group";
import ReactSelect from "react-select";
import { interests, languages } from "../../constants/enums";
import { useProfile } from "../stores/UserStore";

const Popup: React.FC = () => {
  const router = useRouter();
  const profile = useProfile();

  interface FormData {
    nativeLanguage: string;
    fluentLanguagess: string[];
    learningLanguagess: string[];
    userInterests: string[];
    userDescription: string;
    profilePic: string;
    purpose: string;
    method: string;
  }

  const [formData, setFormData] = useState<FormData>({
    nativeLanguage: profile.nativeLanguage,
    fluentLanguagess: profile.fluentLanguagess,
    learningLanguagess: profile.learningLanguagess,
    userInterests: profile.userInterests,
    userDescription: profile.userDescription,
    profilePic: profile.profilePic,
    purpose: "",
    method: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (
    name: string,
    selectedOptions: { value: string; label: string }[]
  ) => {
    const values = selectedOptions.map((option) => option.value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: values,
    }));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("User not found");
        return;
      }

      const response = await fetch(`/api/userprofile/updateProfile?userId=${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      console.log("Update Success:", data.message);
      router.push("/PersonalizationForm");
    } catch (error: any) {
      console.error("Update Error:", error);
      setErrorMessage(error.message);
      setIsSubmitting(false);
    }
  };

  const onImageChange = (base64String: string) => {
    setFormData((prevState) => ({
      ...prevState,
      profilePic: base64String,
    }));
    console.log(base64String);
  };

  const handleCancel = () => {
    router.back();
  };

  const languageOptions = languages.map((language) => ({
    value: language,
    label: language,
  }));
  const interestOptions = interests.map((interest) => ({
    value: interest,
    label: interest,
  }));

  return (
    <div className=" bg-red-200 rounded-xl px-10 py-10 max-h-[600px] overflow-y-auto mx-auto w-[85%]">
      <h1 className="mb-4 font-source-code text-3xl font-bold text-center">Edit Profile</h1>
      <div className="flex flex-col items-center mb-6">
        <AddPic onImageChange={onImageChange} oldImage={formData.profilePic} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 px-10">
          <label className="block mb-2 font-light text-gray-400 text-sm col-span-1">
            Native Language
            <Select
              defaultValue={formData.nativeLanguage}
              onValueChange={(value) =>
                handleSelectChange("nativeLanguage", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your native language" />
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

          <label className="block mb-2 font-light text-gray-400 text-sm col-span-1">
            Fluent Languages
            <ReactSelect
              isMulti
              name="fluentLanguagess"
              options={languageOptions}
              defaultValue={formData.fluentLanguagess.map((lang) => ({
                value: lang,
                label: lang,
              }))}
              className="basic-multi-select text-gray-400"
              classNamePrefix="select"
              onChange={(selectedOptions) =>
                handleMultiSelectChange(
                  "fluentLanguagess",
                  selectedOptions as { value: string; label: string }[]
                )
              }
            />
          </label>

          <label className="block mb-2 font-light text-gray-400 text-sm col-span-1">
            Learning Languages
            <ReactSelect
              isMulti
              name="learningLanguagess"
              options={languageOptions}
              defaultValue={formData.learningLanguagess.map((lang) => ({
                value: lang,
                label: lang,
              }))}
              className="basic-multi-select text-gray-400"
              classNamePrefix="select"
              onChange={(selectedOptions) =>
                handleMultiSelectChange(
                  "learningLanguagess",
                  selectedOptions as { value: string; label: string }[]
                )
              }
            />
          </label>

          <label className="block mb-2 font-light text-gray-400 text-sm col-span-1">
            Interests
            <ReactSelect
              isMulti
              name="userInterests"
              options={interestOptions}
              defaultValue={formData.userInterests.map((interest) => ({
                value: interest,
                label: interest,
              }))}
              className="basic-multi-select text-gray-400"
              classNamePrefix="select"
              onChange={(selectedOptions) =>
                handleMultiSelectChange(
                  "userInterests",
                  selectedOptions as { value: string; label: string }[]
                )
              }
            />
          </label>
          
          <label className="block mb-2 font-mt-extra  text-gray-400 text-sm col-span-2">
            Description
            <textarea
              name="userDescription"
              placeholder="Tell us about yourself"
              value={formData.userDescription}
              onChange={handleChange}
              className="w-full px-2 py-4 border rounded focus:outline-none focus:border-[#65AD87]"
              required
            />
          </label>

          <div className="col-span-2">
  <p className='mt-6'>What are you here for?</p>
  <div className="border-t-2 border-[#65AD87] my-4 w-full mb-8"></div>
  <div className="px-10">
    <RadioGroup name="purpose" onChange={handleOnChange} defaultValue="">
      <div className="flex justify-between items-center space-x-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="To Learn" id="learn" />
          <Label htmlFor="learn">To Learn</Label>
        </div>
        
        
      </div>
      <div className="flex justify-between items-center space-x-2 mt-4">
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
</div>

<div className="col-span-2">
  <p className='mt-10'>What are your preferred learning/teaching methods?</p>
  <div className="border-t-2 border-[#65AD87] my-4 w-full mb-8"></div>
  <div className="px-10">
    <RadioGroup name="learningMethods" onChange={handleOnChange} defaultValue="">
      <div className="flex justify-between items-center space-x-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Conversation" id="conversation" />
          <Label htmlFor="conversation">Conversation</Label>
        </div>
        <div className="flex items-center space-x-2 pr-3">
          <RadioGroupItem value="Lessons" id="lessons" />
          <Label htmlFor="lessons">Lessons</Label>
        </div>
      </div>
      <div className="flex justify-between items-center space-x-2 mt-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Both" id="bothMethods" />
          <Label htmlFor="bothMethods">Both</Label>
        </div>
      </div>
    </RadioGroup>
  </div>
</div>

        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}
<div className="right-2 ml-96">
        <div className="flex justify-center space-x-4 mt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#65AD87] text-white py-2 px-4 rounded hover:bg-[#519d72] transition-colors duration-300"
          >
            Save
          </Button>
          <Button
            onClick={handleCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-300"
          >
            Cancel
          </Button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default Popup;
