"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import LanguageProficiency from "./LanguageProficiency";
import { useProfile } from "../stores/UserStore";
import axios from "axios";


const ViewProfile: React.FC = () => {
  interface Language {
    language: string;
    level: number;
  }

  const profile = useProfile();

  const [fluentLanguages, setFluentLanguages] = useState<Language[]>([]);
  const [learningLanguages, setLearningLanguages] = useState<Language[]>([]);

  useEffect(() => {
    if (!profile) return;

    const fetchedFluentLanguages = profile.fluentLanguagess.map(
      (language: string) => ({
        language,
        level: 1, // Set an initial level if needed
      })
    );

    const fetchedLearningLanguages = profile.learningLanguagess.map(
      (language: string) => ({
        language,
        level: 1, // Set an initial level if needed
      })
    );

    setFluentLanguages(fetchedFluentLanguages);
    setLearningLanguages(fetchedLearningLanguages);
  }, [profile.userId]);

  const handleLevelChange = async (
    languages: Language[],
    setLanguages: React.Dispatch<React.SetStateAction<Language[]>>,
    languageIndex: number,
    level: number
  ) => {
    const updatedLanguages = languages.map((lang, index) =>
      index === languageIndex ? { ...lang, level } : lang
    );
    setLanguages(updatedLanguages);

    // Make API call to update rank
    const language = languages[languageIndex].language;
    try {
      const response = await axios.patch('/api/userprofile/setRank', {
        userId: profile.userId, // Ensure this is the correct userId
        language,
        newLevel: level
      });
      console.log('Rank updated:', response.data);
    } catch (error) {
      console.error('Error updating rank:', error);
    }
  };

  return (
    <div className="min-h-sm flex items-center justify-center pr-36">
      <div className="max-w-screen grid grid-cols-1 md:grid-cols-2 text-lg">
        {" "}
        {/* Adjusted gap */}
        <ProfileCard />
        <div className="pr-36">
          {" "}
          {/* Reduced margin-left */}
          <div className="bg-white py-4 mr-36 pr-36 rounded-xl shadow-lg w-[700px] max-h-[600px] overflow-x-hidden overflow-y-auto hide-scrollbar ">
          <div className="absolute bottom-0 right-32 p-3">
              <Image
                src="/assets/extras/dots.png" // Make sure this path is correct
                alt="Decoration"
                width={50}
                height={48}
              />
            </div>

            <div className="p-4 rounded-lg bg-white">
              <h3 className="text-2xl mb-2 font-inter">Native Language</h3>
              <div className="py-4 px-4 bg-white rounded-[20px] shadow-md border-l-8 border-[#F49345] w-[650px]">
                <div className="flex flex-col">
                  <span className="text-lg font-inter">{profile?.nativeLanguage}</span>
                  <div className="h-1 mt-4 bg-gradient-to-r from-[#F49345] to-transparent w-full"></div>
                </div>
              </div>
            </div>
            <LanguageProficiency
              title="Fluent Languages"
              languages={fluentLanguages}
              onLevelChange={(languageIndex, level) =>
                handleLevelChange(
                  fluentLanguages,
                  setFluentLanguages,
                  languageIndex,
                  level
                  
                )
              }
              borderColor="border-[#DB3946]"
              lineColor="bg-gradient-to-r from-[#DB3946]"
              color= 'white'
              editable = {true}
              textSize='2xl'
              width='650px'
              starH='9'
              num={4}
            />
            <LanguageProficiency
              title="Learning Languages"
              languages={learningLanguages}
              onLevelChange={(languageIndex, level) =>
                handleLevelChange(
                  learningLanguages,
                  setLearningLanguages,
                  languageIndex,
                  level
                )
              }
              borderColor="border-[#9C3B5E]"
              lineColor="bg-gradient-to-r from-[#9C3B5E]"
              color= 'white'
              editable = {true}
              textSize='2xl'
              width='650px'
              starH='9'
              num={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
