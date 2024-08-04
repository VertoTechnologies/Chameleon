import React from 'react'
import Skeleton from 'react-loading-skeleton'

const Loading = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="w-1/5 bg-gray-200">
        <Skeleton height="100%" width="100%" />
      </div>
      <div className="w-4/5 bg-white">
        <Skeleton height="100%" width="100%" />
      </div>
    </div>
  );
};

export default Loading