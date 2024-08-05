import React from 'react';


const Loading: React.FC = () => {

  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="spinner-border border-emerald-400 animate-spin inline-block w-12 h-12 border-4 rounded-full" role="status">
        <span className="visually-hidden"></span>
      </div>
      
    </div>
  );
};

export default Loading;