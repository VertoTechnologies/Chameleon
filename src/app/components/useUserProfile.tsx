import { useEffect, useState } from 'react';

interface UserProfile {
    name: string;
    description: string;
    nativeLanguage: string[],
    fluentLanguage: string[],
    learningLanguage: string[],
    interests: string[]
}

const useUserProfile = (userId: string) => {
    const [profile, setProfile] = useState<UserProfile | null>(null);

  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
            console.log(1)
        //   const response = await fetch(`/api/viewProfile/?userId=${userId}`);
          const response = await fetch(`/api/viewProfile/?userId=${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log(response.status)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setProfile(data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
  
      fetchUserProfile();
    }, [userId]);
  
    return { profile };
  };
  

export default useUserProfile;
