'use client'

import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import LanguageProficiency from './LanguageProficiency';
import useUserProfile from '../components/useUserProfile';
import { useUserStore } from '../components/store';
import { useProfile } from '../components/slaystore';
import { Key } from 'lucide-react';
import BgImg from './BgImg';

const ViewFile: React.FC = () => {
    interface Language {
        language: string;
        level: number;
    }

    // const { profile } = useUserProfile(window?.localStorage.getItem("userId"));
    
    const profile = useProfile()

    const [fluentLanguagess, setfluentLanguagess] = useState<Language[]>([]);
    const [learningLanguagess, setlearningLanguagess] = useState<Language[]>([]);

    useEffect(() => {
        if (!profile) {
            return
        }


        console.log("profile", { profile })

        const fetchedfluentLanguagess = profile.fluentLanguagess.map((language: string) => ({
            language,
            level: 1
        }));

        const fetchedlearningLanguagess = profile.learningLanguagess.map((language: string) => ({
            language,
            level: 1
        }));

        setfluentLanguagess(fetchedfluentLanguagess);
        setlearningLanguagess(fetchedlearningLanguagess);
        console.log("Checking", fluentLanguagess)

        console.log('end')


    }, [profile.fluentLanguagess]);


    const handleLevelChange = (languages: Language[], setLanguages: React.Dispatch<React.SetStateAction<Language[]>>, languageIndex: number, level: number) => {
        setLanguages((prevLanguages) =>
            prevLanguages.map((lang, index) =>
                index === languageIndex ? { ...lang, level } : lang
            )
        );
    };

    return (
        <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center p-6 z-10 relative">
            <div className="max-w-screen grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                <ProfileCard />
                <div className="p-4 rounded-lg bg-white">
                <div className="bg-white p-4 rounded-lg ">
                <h3 className="text-3xl mb-2">Native Language</h3>
                <div className='shadow-lg p-8 pr-3 rounded-lg'>
                <div className="flex justify-between items-center">
                <span>{profile?.nativeLanguage}</span>
                    </div>
                    </div>
                    </div>
                    <div className="p-4 rounded-lg bg-white">
                        <LanguageProficiency
                            title="Fluent Language"
                            languages={fluentLanguagess}
                            onLevelChange={(languageIndex, level) => handleLevelChange(fluentLanguagess, setfluentLanguagess, languageIndex, level)}
                        />
                    </div>
                    <div className="p-4 rounded-lg bg-white">
                        <LanguageProficiency
                            title="Learning Language"
                            languages={learningLanguagess}
                            onLevelChange={(languageIndex, level) => handleLevelChange(learningLanguagess, setlearningLanguagess, languageIndex, level)}
                        />
                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default ViewFile;
