"use client"

import { useEffect } from 'react';

const Page = () => {
  useEffect(() => {
    const initDB = async () => {
      try {
        const response = await fetch('/api/initdb');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('DB Initialization:', data.message);
      } catch (error) {
        console.error('DB Initialization Error:', error);
      }
    };

    initDB();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Page;
