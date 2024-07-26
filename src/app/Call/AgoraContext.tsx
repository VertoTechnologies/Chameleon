// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { createClient, IAgoraRTCClient, IAgoraRTCRemoteUser, createMicrophoneAudioTrack, createCameraVideoTrack } from 'agora-rtc-sdk-ng';

// interface AgoraContextProps {
//   client: IAgoraRTCClient | null;
//   joinChannel: (appId: string, channel: string, token?: string) => void;
//   leaveChannel: () => void;
//   publish: (tracks: any[]) => void;
//   subscribe: (user: IAgoraRTCRemoteUser) => void;
// }

// const AgoraContext = createContext<AgoraContextProps | undefined>(undefined);

// export const AgoraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [client, setClient] = useState<IAgoraRTCClient | null>(null);

//   useEffect(() => {
//     const initClient = async () => {
//       const agoraClient = createClient({ mode: 'rtc', codec: 'vp8' });
//       setClient(agoraClient);
//     };
//     initClient();
//   }, []);

//   const joinChannel = async (appId: string, channel: string, token?: string) => {
//     if (!client) return;
//     await client.join(appId, channel, token || null);

//     const microphoneTrack = await createMicrophoneAudioTrack();
//     const cameraTrack = await createCameraVideoTrack();
//     await publish([microphoneTrack, cameraTrack]);
//   };

//   const leaveChannel = async () => {
//     if (!client) return;
//     await client.leave();
//   };

//   const publish = async (tracks: any[]) => {
//     if (!client) return;
//     for (const track of tracks) {
//       await client.publish(track);
//     }
//   };

//   const subscribe = async (user: IAgoraRTCRemoteUser) => {
//     if (!client) return;
//     const [videoTrack] = await user.getVideoTracks();
//     videoTrack.play();
//   };

//   return (
//     <AgoraContext.Provider value={{ client, joinChannel, leaveChannel, publish, subscribe }}>
//       {children}
//     </AgoraContext.Provider>
//   );
// };

// export const useAgora = () => {
//   const context = useContext(AgoraContext);
//   if (!context) {
//     throw new Error('useAgora must be used within an AgoraProvider');
//   }
//   return context;
// };
import React from 'react'

const AgoraContext = () => {
  return (
    <div>
      
    </div>
  )
}

export default AgoraContext
