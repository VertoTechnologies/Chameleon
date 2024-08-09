'use client'

import React from 'react'
import ViewFriendProfile from './ViewFriendProfile'
import { useSearchParams } from "next/navigation";
import BackgroundImage from '../ViewProfile/BackgroundImage';
import Header from '../components/headerComponents/HomeHeader';

const page = () => {
  const searchParams = useSearchParams();
  const userId = searchParams?.get("friend") ?? null;

  return (
    <div className="rounded-4xl relative overflow-hidden ">
      <Header />
      <div className="relative ">
        <BackgroundImage />
        <div className=" mt-18 flex justify-center">
          <ViewFriendProfile userId={userId || ''}/>
        </div>
      </div>
    </div>
  )
}

export default page