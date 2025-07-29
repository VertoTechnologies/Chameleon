import React from 'react';

const Features = () => {
  const features = [
    {
      image: "/assets/extras/communication.png",
      title: "Multimodal Communication",
      description: "Engage in video, voice, and text chats with native speakers and fellow learners. Choose the mode of communication that best suits your learning preferences."
    },
    {
      image: "/assets/extras/rank.png",
      title: "Ranking System", 
      description: "Track your progress with our ranking system. Receive feedback, compare conversation skills, stay motivated, and climb the ranks!"
    },
    {
      image: "/assets/extras/friends.png",
      title: "Friends",
      description: "Build your network by adding friends. Stay connected with your favourite language partners, schedule chats, and support each other's learning journeys."
    },
    {
      image: "/assets/extras/communities.png", 
      title: "Communities",
      description: "Join language communities to engage in group discussions, share resources, and connect with learners who share your goals."
    },
    {
      image: "/assets/extras/icebreaker.png",
      title: "Ice Breaker", 
      description: "Overcome initial awkwardness with our icebreaker. Receive prompts and conversation starters to help you begin meaningful dialogues with new language partners."
    },
    {
      image: "/assets/extras/recommendation.png",
      title: "Recommendations",
      description: "Get personalized suggestions for language partners and resources based on your interests and proficiency, enhancing your learning experience."
    }
  ];

  return (
    <section id='offer' className="py-8 sm:py-12 md:py-16 lg:py-20 scroll-smooth" style={{ backgroundColor: 'rgba(246, 237, 228, 0.8)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 md:mb-16 font-mtextra text-black">
          What We Offer?
        </h2>
        
        {/* Mobile: Single column, Tablet: 2 columns, Desktop: 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center group">
              {/* Image Container */}
              <div className="relative w-full max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px] aspect-square mb-4 sm:mb-6">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              {/* Content Container */}
              <div className="text-center space-y-3 sm:space-y-4 px-2 sm:px-4">
                <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black font-mtextra leading-tight">
                  {feature.title}
                </h4>
                <p className="text-xs sm:text-sm md:text-base text-black leading-relaxed font-mtextra max-w-[280px]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
