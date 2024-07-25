// app/services/agoraService.js

import AgoraRTC from 'agora-rtc-sdk-ng';


let client;
let localAudioTrack;
let localVideoTrack;

export async function initializeAgora(appId, token, channel, uid) {
  if (typeof window === 'undefined') {
    throw new Error('Cannot initialize Agora on the server side.');
  }


  client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  
  await client.join(appId, channel, token, uid);
  
  localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  localVideoTrack = await AgoraRTC.createCameraVideoTrack();
  
  await client.publish([localAudioTrack, localVideoTrack]);

  return { client, localAudioTrack, localVideoTrack };
}

export async function leaveCall() {
  if (client) {
    await client.leave();
    localAudioTrack.close();
    localVideoTrack.close();
    client = null;
  }
}

export function toggleMute() {
  if (localAudioTrack) {
    localAudioTrack.setMuted(!localAudioTrack.muted);
  }
}

export function toggleVideo() {
  if (localVideoTrack) {
    localVideoTrack.setMuted(!localVideoTrack.muted);
  }
}
