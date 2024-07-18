interface InterestsProps {
    interests: {interest: string}[];
}

const Interests: React.FC<InterestsProps> = ({ interests }) => {
    return (
        <div className="bg-white p-4">
            <h3 className="font-bold text-3xl mb-2">Interest</h3>
            {interests.map(({ interest }, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                    <span>{interest}</span>
                </div>
            ))}
        </div>
    );
};

export default Interests;
