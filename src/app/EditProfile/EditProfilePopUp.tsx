import React, { useState } from "react";
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

interface PopupProps {
  onClose: () => void;
}

const EditProfilePopup: React.FC<PopupProps> = ({ onClose }) => {
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
  }

  const [formData, setFormData] = useState<{ updateData: FormData }>({
    updateData: {
      nativeLanguage: profile.nativeLanguage,
      fluentLanguagess: profile.fluentLanguagess,
      learningLanguagess: profile.learningLanguagess,
      userInterests: profile.userInterests,
      userDescription: profile.userDescription,
      profilePic: profile.profilePic,
      purpose: profile.purpose,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/userprofile/updateProfile?userId=${profile.userId}`, {
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
      router.push('/Dashboard')
    //   onClose()
    } catch (error: any) {
      console.error("Update Error:", error);
      setErrorMessage(error.message);
      setIsSubmitting(false);
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

  const handleCancel = () => {
    onClose()
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
    <form
      onSubmit={handleSubmit}
      className="relative inset-0 bg-white mt-16 rounded-xl px-10 py-10 max-h-[600px] overflow-y-auto w-[70%] mx-auto my-auto"
    >
      <h1 className="mb-4 text-2xl font-bold text-center">Edit Profile</h1>
      <div className="flex flex-col items-center mb-6">
        <AddPic onImageChange={onImageChange} oldImage={formData.updateData.profilePic} />
      </div>
      <img
        id="topLeftImage"
        src="/assets/extras/vtop.png"
        alt="Top Left"
        className="absolute top-5 left-8 w-44 h-44"
      />
      <img
        id="topRightImage"
        src="/assets/extras/tright.png"
        alt="Top Right"
        className="absolute top-5 right-8 w-44 h-44"
      />
      <div className="grid grid-cols-2 gap-4 px-10">
        <label className="block mb-2 font-light text-black text-sm col-span-1">
          Native Language
          <Select
            defaultValue={formData.updateData.nativeLanguage}
            onValueChange={(value) =>
              handleSelectChange("nativeLanguage", value)
            }
          >
            <SelectTrigger className="w-full rounded-lg border border-gray-300">
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

        <label className="block mb-2 text-black text-md col-span-1">
          Fluent Languages
          <ReactSelect
            isMulti
            name="fluentLanguagess"
            options={languageOptions}
            defaultValue={formData.updateData.fluentLanguagess.map((lang) => ({
              value: lang,
              label: lang,
            }))}
            className="basic-multi-select text-black rounded-lg border border-gray-300"
            classNamePrefix="select"
            onChange={(selectedOptions) =>
              handleMultiSelectChange(
                "fluentLanguagess",
                selectedOptions as { value: string; label: string }[]
              )
            }
          />
        </label>

        <label className="block mb-2 text-black text-md col-span-1">
          Learning Languages
          <ReactSelect
            isMulti
            name="learningLanguagess"
            options={languageOptions}
            defaultValue={formData.updateData.learningLanguagess.map((lang) => ({
              value: lang,
              label: lang,
            }))}
            className="basic-multi-select text-gray-400 rounded-lg border border-gray-300"
            classNamePrefix="select"
            onChange={(selectedOptions) =>
              handleMultiSelectChange(
                "learningLanguagess",
                selectedOptions as { value: string; label: string }[]
              )
            }
          />
        </label>

        <label className="block mb-2 text-black text-md col-span-1">
          Interests
          <ReactSelect
            isMulti
            name="userInterests"
            options={interestOptions}
            defaultValue={formData.updateData.userInterests.map((interest) => ({
              value: interest,
              label: interest,
            }))}
            className="basic-multi-select text-black rounded-lg border border-gray-300"
            classNamePrefix="select"
            onChange={(selectedOptions) =>
              handleMultiSelectChange(
                "userInterests",
                selectedOptions as { value: string; label: string }[]
              )
            }
          />
        </label>

        <label className="block mb-2 text-black text-md col-span-2">
          Description
          <textarea
            name="userDescription"
            placeholder="Tell us about yourself"
            value={formData.updateData.userDescription}
            onChange={handleChange}
            className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:border-[#65AD87] mb-4"
            required
          />
        </label>

        <div className="col-span-2">
          <p className="mt-3 text-md ">What are you here for?</p>
          <div className="border-t-2 border-[#65AD87] my-4 w-full mb-8"></div>
          <div className="px-10">
            <RadioGroup
              name="purpose"
              onValueChange={(value) => handleSelectChange("purpose", value)}
              defaultValue={formData.updateData.purpose}
            >
              <div className="flex flex-col space-y-2">
                <label className="flex items-center space-x-2">
                  <RadioGroupItem value="To Learn" id="learn" />
                  <Label htmlFor="learn">To Learn</Label>
                </label>
                <label className="flex items-center space-x-2">
                  <RadioGroupItem value="To Teach" id="teach" />
                  <Label htmlFor="teach">To Teach</Label>
                </label>
                <label className="flex items-center space-x-2">
                  <RadioGroupItem value="Both" id="both" />
                  <Label htmlFor="both">Both</Label>
                </label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}

      <div className="flex justify-center mt-8 space-x-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 text-white bg-[#65AD87] rounded-full"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        <Button
          type="button"
          onClick={handleCancel}
          className="px-8 py-3 text-white bg-[#f44336] rounded-full"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditProfilePopup;
