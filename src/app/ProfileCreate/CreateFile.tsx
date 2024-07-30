"use client";

import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "@/components/ui/button";
import AddPic from "./AddPic";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { interests, languages } from "../../constants/enums";
import ReactSelect from "react-select";
import { useProfile } from "../components/slaystore";

const CreateFile: React.FC = () => {
  const router = useRouter();
  const profile = useProfile();

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
      nativeLanguage: profile.nativeLanguage,
      fluentLanguagess: profile.fluentLanguagess,
      learningLanguagess: profile.learningLanguagess,
      userInterests: profile.userInterests,
      userDescription: profile.userDescription,
      profilePic: profile.profilePic,
    },
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      updateData: {
        ...prevState.updateData,
        [name]: value,
      },
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      updateData: {
        ...prevState.updateData,
        [name]: value,
      },
    }));
  };

  const handleMultiSelectChange = (
    name: string,
    selectedOptions: { value: string; label: string }[]
  ) => {
    const values = selectedOptions.map((option) => option.value);
    setFormData((prevState) => ({
      updateData: {
        ...prevState.updateData,
        [name]: values,
      },
    }));
  };

  const handleCancel = () => {
    setFormData({
      updateData: {
        nativeLanguage: "",
        fluentLanguagess: [],
        learningLanguagess: [],
        userInterests: [],
        userDescription: "",
        profilePic: "",
      },
    });
    router.push("/Dashboard");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    //const userId = url.split('=').slice(-1)[0]

    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("User not found");
        return;
      }

      const response = await fetch(`/api/updateProfile?userId=${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log("Update Success:", data.message);

      // Handle success (e.g., redirect to a login page or show a success message)
      router.push("/ProfileCreate2");
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Update Error:", error);
    }
  };

  const onImageChange = (base64String: string) => {
    setFormData((prevState) => ({
      updateData: {
        ...prevState.updateData,
        profilePic: base64String,
      },
    }));
    console.log(base64String);
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
    <div className="sign-up-form bg-white rounded-4xl p-10">
      <div className="flex flex-col items-center mb-6">
        <AddPic
          onImageChange={onImageChange}
          oldImage={formData.updateData.profilePic}
        />
      </div>
      <form className="flex flex-wrap justify-between" onSubmit={handleSubmit}>
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <label className="block mb-2 font-light text-gray-400 text-sm">
            Native Language
            <Select
              defaultValue={formData.updateData.nativeLanguage}
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
        </div>
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <label className="block mb-2 font-light text-gray-400 text-sm">
            Fluent Languages
            <ReactSelect
              isMulti
              name="fluentLanguages"
              options={languageOptions}
              defaultValue={formData.updateData.fluentLanguagess.map(
                (lang) => ({
                  value: lang,
                  label: lang,
                })
              )}
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
        </div>
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <label className="block mb-2 font-light text-gray-400 text-sm">
            Learning Languages
            <ReactSelect
              isMulti
              name="learningLanguagess"
              options={languageOptions}
              defaultValue={formData.updateData.learningLanguagess.map(
                (lang) => ({
                  value: lang,
                  label: lang,
                })
              )}
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
        </div>
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <label className="block mb-2 font-light text-gray-400 text-sm">
            Interests
            <ReactSelect
              isMulti
              name="userInterests"
              defaultValue={formData.updateData.learningLanguagess.map(
                (lang) => ({
                  value: lang,
                  label: lang,
                })
              )}
              options={interestOptions}
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
        </div>
        <div className="w-full px-2 mb-4">
          <label className="block mb-2 font-light text-gray-400 text-sm">
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
          <Button
            type="submit"
            variant="outline"
            className="w-[120px] mr-2 rounded-full bg-[#65AD87] hover:bg-[#65AD87] text-white"
          >
            Save
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-[120px] rounded-full bg-[#65AD87] hover:bg-[#65AD87] text-white"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateFile;
