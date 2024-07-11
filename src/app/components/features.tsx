import React from 'react';

const Features = () => {
  return (
    <div className="py-12" style={{ backgroundColor: 'rgba(246, 237, 228, 0.8)' }}>
      <div className="max-w-container mx-auto px-4 font-mtextra">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">What We Offer?</h2>
        
        {/* Row 1 */}
        <div className="flex justify-center mb-8 mx-10" style={{ gap: '195px' }}>
        <div className="relative w-1/6">
  <img src="/assets/extras/communication.png" alt="Feature 1" className="w-full h-auto object-cover" />
  <div className="absolute inset-0 flex flex-col justify-center items-center text-black p-4">
      <h4 className="text-sm font-bold text-center mt-24">Multimodal Communication</h4>
      <p className="text-xs text-center mt-2">Engage in video, voice, and text chats with native speakers and fellow learners. Choose the mode of communication that best suits your learning preferences.</p>
    </div>
</div>
<div className="relative w-1/6">
  <img src="/assets/extras/rank.png" alt="Feature 1" className="w-full h-auto object-cover" />
  <div className="absolute inset-0 flex flex-col justify-center items-center text-black p-4">
      <h4 className="text-sm font-bold text-center mt-24">Ranking System</h4>
      <p className="text-xs text-center mt-2">Track your progress with our ranking system. Receive feedback, compare conversation skills, stay motivated, and climb the ranks!</p>
    </div>
</div>
<div className="relative w-1/6">
  <img src="/assets/extras/friends.png" alt="Feature 1" className="w-full h-auto object-cover" />
  <div className="absolute inset-0 flex flex-col justify-center items-center text-black p-4">
      <h4 className="text-sm font-bold text-center mt-24">Friends</h4>
      <p className="text-xs text-center mt-2">Build your network by adding friends. Stay connected with your favourite language partners, schedule chats, and support each other’s learning journeys.</p>
    </div>
</div>
        </div>

        {/* Row 2 */}
        <div className="flex justify-center mx-10" style={{ gap: '195px' }}>
        <div className="relative w-1/6">
  <img src="/assets/extras/communities.png" alt="Feature 1" className="w-full h-auto object-cover" />
  <div className="absolute inset-0 flex flex-col justify-center items-center text-black p-4">
      <h4 className="text-sm font-bold text-center mt-24">Communities</h4>
      <p className="text-xs text-center mt-2">Join language communities to engage in group discussions, share resources, and connect with learners who share your goals.</p>
    </div>
</div>
<div className="relative w-1/6">
  <img src="/assets/extras/icebreaker.png" alt="Feature 1" className="w-full h-auto object-cover" />
  <div className="absolute inset-0 flex flex-col justify-center items-center text-black p-4">
      <h4 className="text-sm font-bold text-center mt-24">Ice Breaker</h4>
      <p className="text-xs text-center mt-2">Overcome initial awkwardness with our icebreaker. Receive prompts and conversation starters to help you begin meaningful dialogues with new language partners.</p>
    </div>
</div>
<div className="relative w-1/6">
  <img src="/assets/extras/recommendation.png" alt="Feature 1" className="w-full h-auto object-cover" />
  <div className="absolute inset-0 flex flex-col justify-center items-center text-black p-4">
      <h4 className="text-sm font-bold text-center mt-24">Recommendations</h4>
      <p className="text-xs text-center mt-2">Get personalized suggestions for language partners and resources based on your interests and proficiency, enhancing your learning experience.</p>
    </div>
</div>
        </div>
        
      </div>
    </div>
  );
}

export default Features;
