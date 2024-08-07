import React from 'react';

interface Language {
    language: string;
    level: number;
}

interface LanguageProficiencyProps {
    title: string;
    languages: Language[];
    onLevelChange: (languageIndex: number, level: number) => void;
    borderColor: string;
    lineColor: string;
    color: string;
    editable: boolean;
    textSize: string;
    width: string;
    starH: string;
}   

const LanguageProficiency: React.FC<LanguageProficiencyProps> = ({ title, languages, onLevelChange, borderColor, lineColor, color, editable, textSize, width, starH  }) => {
    return (
        <div className={`bg-${color} pt-4 px-4 rounded-lg font-inter`}>
            <h3 className={`text-${textSize} mb-4 font-inter font-medium`}>{title}</h3>
            <div className="space-y-4">
                {languages.map(({ language, level }, languageIndex) => (
                    <div key={languageIndex} className={`flex items-center justify-between p-4 bg-white rounded-[20px] w-[${width}] shadow-lg border-l-8 ${borderColor}`} >
                        <div className="flex flex-col">
                            <span className="text-lg font-medium">{language}</span>
                            <div className={`h-1 mt-2 bg-gradient-to-r ${lineColor} to-transparent w-full`}></div>
                        </div>
                        <div className="flex space-x-1">
                            {[...Array(5)].map((_, starIndex) => (
                                <svg
                                    key={starIndex}
                                    onClick={() => editable && onLevelChange(languageIndex, starIndex + 1)}
                                    className={`w-${starH} h-${starH} cursor-pointer ${starIndex < level ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927C9.229 2.581 9.617 2.581 9.797 2.927l1.618 3.288 3.631.528c.302.044.423.416.204.631l-2.625 2.559.619 3.605c.052.302-.261.534-.52.39L10 12.347l-3.239 1.7c-.258.143-.572-.088-.52-.39l.619-3.605L4.236 7.374c-.22-.215-.098-.587.204-.631l3.631-.528L9.049 2.927z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguageProficiency;
