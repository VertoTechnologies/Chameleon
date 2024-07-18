'use client'

import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import LanguageProficiency from '../components/LanguageProficiency';

const CreateFile: React.FC = () => {
    interface Language {
        language: string;
        level: number;
    }

    const [nativeLanguages, setNativeLanguages] = useState<Language[]>([
        { language: 'Urdu', level: 5 }
    ]);

    const [fluentLanguages, setFluentLanguages] = useState<Language[]>([
        { language: 'Urdu', level: 4 },
        { language: 'English', level: 3 }
    ]);

    const [learningLanguages, setLearningLanguages] = useState<Language[]>([
        { language: 'German', level: 1 }
    ]);

    const handleLevelChange = (languages: Language[], setLanguages: React.Dispatch<React.SetStateAction<Language[]>>, languageIndex: number, level: number) => {
        setLanguages((prevLanguages) =>
            prevLanguages.map((lang, index) =>
                index === languageIndex ? { ...lang, level } : lang
            )
        );
    };

    

    return (
      <div className="min-h-sm bg-gray-100 flex items-center justify-center p-6">
        <div className="max-w-screen grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
        <ProfileCard />
                <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
                    <div className="p-4 rounded-lg shadow-md bg-white">
                        <LanguageProficiency
                            title="Native Language"
                            languages={nativeLanguages}
                            onLevelChange={(languageIndex, level) => handleLevelChange(nativeLanguages, setNativeLanguages, languageIndex, level)}
                        />
                    </div>
                    <div className="p-4 rounded-lg shadow-md bg-white">
                        <LanguageProficiency
                            title="Fluent Language"
                            languages={fluentLanguages}
                            onLevelChange={(languageIndex, level) => handleLevelChange(fluentLanguages, setFluentLanguages, languageIndex, level)}
                        />
                    </div>
                    <div className="p-4 rounded-lg shadow-md bg-white">
                        <LanguageProficiency
                            title="Learning Language"
                            languages={learningLanguages}
                            onLevelChange={(languageIndex, level) => handleLevelChange(learningLanguages, setLearningLanguages, languageIndex, level)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateFile;
