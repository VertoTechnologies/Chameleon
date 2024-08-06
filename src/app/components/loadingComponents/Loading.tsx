"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loading = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2">

      <Skeleton
        height={100}
        width={1520}
        baseColor="rgba(101, 173, 135, 0.3)"
      />
      </div>
      <div className="flex justify-between items-center px-4 py-2">
        <Skeleton
          height={600}
          width={350}
          baseColor="rgba(101, 173, 135, 0.3)"
        />
        <Skeleton
          height={600}
          width={1130}
          baseColor="rgba(101, 173, 135, 0.3)"
        />
      </div>
    </>
  );
};

export default loading;
