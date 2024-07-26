import React from 'react';

interface Language {
    language: string;
    level: number;
}

interface LanguageProficiencyProps {
    title: string;
    languages: Language[];
    onLevelChange: (languageIndex: number, level: number) => void;
}

const LanguageProficiency: React.FC<LanguageProficiencyProps> = ({ title, languages, onLevelChange }) => {
    return (
        <div className="bg-white p-4 rounded-lg ">
            <h3 className="text-3xl mb-2">{title}</h3>
            <div className="flex flex-col space-y-2">
                {languages.map(({ language, level }, languageIndex) => (
                    <div key={languageIndex} className='shadow-lg p-8 pr-3 rounded-lg'>
                        <div className="flex justify-between items-center">
                            <span>{language}</span> 
                            <div className="flex pl-7">
                                {[...Array(5)].map((_, starIndex) => (
                                    <svg
                                        key={starIndex}
                                        onClick={() => onLevelChange(languageIndex, starIndex + 1)}
                                        className={`w-5 h-5 cursor-pointer ${starIndex < level ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927C9.229 2.581 9.617 2.581 9.797 2.927l1.618 3.288 3.631.528c.302.044.423.416.204.631l-2.625 2.559.619 3.605c.052.302-.261.534-.52.39L10 12.347l-3.239 1.7c-.258.143-.572-.088-.52-.39l.619-3.605L4.236 7.374c-.22-.215-.098-.587.204-.631l3.631-.528L9.049 2.927z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguageProficiency;
