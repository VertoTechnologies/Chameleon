
import React from 'react';

interface InterestsProps {
    userInterests: { interest: string }[];
}

const Interests: React.FC<InterestsProps> = ({ userInterests }) => {
    return (
        <div className="bg-white pt-4">
            <h3 className="font-bold text-2xl mb-2">Interests</h3>
                {userInterests.map(( interest , index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                        <span>{interest.interest}</span>
                    </div>
                ))}

        </div>
    );
};

export default Interests;
