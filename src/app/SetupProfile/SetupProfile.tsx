"use client";
import React, { useState } from "react";

import { Button } from '@/components/ShadcnComponents/button';
import AddPic from "./AddPic";
import { useRouter } from "next/navigation";
import { Step, type StepItem, Stepper, useStepper} from "@/components/stepper"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ShadcnComponents/select";
import { interests, languages } from "../../constants/enums";
import ReactSelect from "react-select";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ShadcnComponents/label";
import { RadioGroup, RadioGroupItem } from "@/components/ShadcnComponents/radio-group";

interface FormData {
    nativeLanguage: string;
    fluentLanguagess: string[];
    learningLanguagess: string[];
    userInterests: string[];
    userDescription: string;
    profilePic: string;
    purpose: string;
    learningMethods: string;
  }



const SetupProfile: React.FC = () => {
    const steps = [
        { label: "Step 1" },
        { label: "Step 2" },
        { label: "Step 3" },
    ] satisfies StepItem[];
    
    const router = useRouter();

    const [formData, setFormData] = useState<{ updateData: FormData }>({
        updateData: {
          nativeLanguage: '',
          fluentLanguagess: [],
          learningLanguagess: [],
          userInterests: [],
          userDescription: '',
          profilePic: '',
          purpose: '',
          learningMethods: '',
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
    
    
      const handleSubmit = async () => {
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
            throw new Error("Network response was not ok");
          }
    
          const data = await response.json();
    
          console.log("Update Success:", data.message);
    
          // Handle success (e.g., redirect to a login page or show a success message)
          
        } catch (error) {
          // Handle error (e.g., show an error message)
          console.error("Update Error:", error);
        }
      };

      const handleChange3 = (event:  React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
          updateData: {
            ...prevState.updateData,
            [name]: value,
          }
        }));
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
    
      const labels = (text: string, ) => {
        return(
          <div className="w-3/6 px-2 mb-4">
          <label className="block mb-2 font-medium text-sm">
            {text}
            <Select
              onValueChange={(value) => handleSelectChange("nativeLanguage", value)}
            >
              <SelectTrigger
                className="w-96 mb-4 border-b-2 border-[#65AD87] focus:bg-green-100 outline-none"
                style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
              >
                <SelectValue placeholder="Select..." className="font-light text-gray-400"/>
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
        
        )
      }

      const labels2 = (text: string, listOptions: any, padding: string, name: string, val: string) => {
        return (
          <div className="w-full px-2 mb-4 ">
            <label className={`block pb-${padding} font-medium text-sm`}>
              {text}
              <div className="w-96">
                <ReactSelect
                  isMulti
                  name={name}
                  options={listOptions}
                  className="basic-multi-select custom-select"
                  classNamePrefix="select"
                  onChange={(selectedOptions) =>
                    handleMultiSelectChange(
                    val,
                      selectedOptions as { value: string; label: string }[]
                    )
                  }
                />
              </div>
            </label>
          </div>
        );
      };
    
const Component1 = () => {
    return(
        <>
      <div className="flex flex-col items-center">
        <AddPic
          onImageChange={onImageChange}
          oldImage={formData.updateData.profilePic}
        />
      </div>
      <form className="flex flex-col justify-between pt-9" onSubmit={handleSubmit}>
      {/* {labels("Your Native Language")}
        {labels("Your Native Language")}
        {labels2("Your Interests", interestOptions)} */}
        {labels2("Your Interests", interestOptions, '4', 'userInterests', 'userInterests')}
        <div className="w-full px-2 mb-4 pt-3">
          <label className="block mb-2 text-sm font-medium">
            Bio
          </label>
          <textarea
            name="userDescription"
            className="w-full border border-[#65AD87] focus:bg-green-100 outline-none rounded-md p-2 text-sm"
            value={formData.updateData.userDescription}
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
      </>
    )
}

const Component2 = () => {
    return (
      <form className="flex flex-col justify-between pt-9" onSubmit={handleSubmit}>
        {labels("Your Native Language")}
        {labels2("Your Fluent Languages", languageOptions, "8", 'fluentLanguages', 'fluentLanguagess')}
        {labels2("Your Learning Languages", languageOptions, "8", 'learningLanguages', 'learningLanguagess')}
        <div className="w-full flex justify-end px-2 mt-4 pt-10">
          {/* <Button
            type="submit"
            variant="outline"
            className="w-[120px] mr-2 rounded-full bg-[#65AD87] hover:bg-[#337050] text-white"
          >
            Next
          </Button> */}
        </div>
      </form>
    )
  }

  const Component3 = () => {
    return(
      <form onSubmit={handleSubmit} className="pl-1">
        <p className='mt-6 pt-5'>What are you here for?</p>
        <div className="border-t-2 border-[#65AD87] my-4 w-full mb-8"></div>
        <div className="px-10 pb-5">
          <RadioGroup name="purpose" onChange={handleChange3} defaultValue="">
            <div className="flex justify-between items-center space-x-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="To Learn" id="learn"/>
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
        <div className="px-10 pb-6">
          <RadioGroup name="learningMethods" onChange={handleChange3} defaultValue="">
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

        <div className="w-full flex justify-end px-10 ml-20 mt-10">
          {/* <Button type="submit" variant="bordered" className="w-[120px] mr-2 rounded-full bg-[#65AD87] hover:bg-[#65AD87] text-white">Save</Button>
          <Button variant="bordered" onClick={handleCancel} className="w-[120px] rounded-full bg-[#65AD87] hover:bg-[#65AD87] text-white">Cancel</Button> */}
        </div>
      </form>
    )
  }
  const Footer = () => {
	const {
		nextStep,
		prevStep,
		resetSteps,
		hasCompletedAllSteps,
		isLastStep,
		isOptionalStep,
		isDisabledStep,
	} = useStepper();
    const handleNext = async () => {
		try {
			await handleSubmit();
			if (isLastStep) {
                router.push("/Dashboard");
              } else {
                nextStep();
              }
		} catch (error) {
			console.error("Form submission error:", error);
		}
	};
	return (
		<>
			{hasCompletedAllSteps && (
				<div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
					<h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
				</div>
			)}
			<div className="w-full flex justify-end gap-2">
				{hasCompletedAllSteps ? (
					<Button size="sm" onClick={resetSteps}>
						Reset
					</Button>
				) : (
					<>
						{!isDisabledStep && (
              <Button
                onClick={prevStep}
                variant="secondary"
                className="w-[100px] mr-2 rounded-full bg-[#65AD87] hover:bg-[#337050] text-white"
              >
                Prev
              </Button>
              
            )}
						<Button type = "submit" 
								variant="outline"
            					className="w-[100px] mr-2 rounded-full bg-[#65AD87] hover:bg-[#337050] text-white" 
								onClick={handleNext}>
								{isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
						</Button>
					</>
				)}
			</div>
		</>
	);
};

    return(
        <div className="h-screen sign-up-form bg-white rounded-l-2xl p-10 max-h-[600px]">
            <Stepper
				initialStep={0}
				steps={steps}
				className="pb-10"
				styles={{
					"step-button-container": cn(
					"text-[#5A3767] flex items-center justify-center",
					"border-[#5A3767] border-2",
					"data-[current=true]:border-[#5A3767] data-[current=true]:bg-[#D9D9D9]",
					"data-[active=true]:bg-[#5A3767] data-[active=true]:border-[#5A3767]",
					"rounded-full w-14 h-14" 
					),
					"horizontal-step": 
					"data-[completed=true]:[&:not(:last-child)]:after:bg-[#5A3767]",

				}}
				>
				{steps.map((stepProps, index) => {
					return (
						<Step key={stepProps.label} {...stepProps}>
						
						
						<div>
							{(index==0)&&Component1()}
              {(index==1)&&Component2()}
              {(index==2)&&Component3()}
							
							</div>
						</Step>
					);
				})}
				<Footer />
			</Stepper>

        </div>
      

    )
}



export default SetupProfile