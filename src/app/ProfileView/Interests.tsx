import React from 'react';

interface InterestsProps {
    userInterests: { interest: string }[];
}

const Interests: React.FC<InterestsProps> = ({ userInterests }) => {
    return (
        <div className="bg-white p-4">
            <h3 className="font-bold text-3xl mb-2">Interest</h3>
            {userInterests && userInterests.length > 0 ? (
                userInterests.map(({ interest }, index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                        <span>{interest}</span>
                    </div>
                ))
            ) : (
                <p>No interests found.</p>
            )}
        </div>
    );
};

export default Interests;
