"use client";
import React from 'react'
import LandingPage from './LandingPage/page'
import withNoAuth from './components/authComponents/withNoAuth';

const page = () => {
  return (
    <>
      <LandingPage />
    </>
  )
}

export default withNoAuth(page);
