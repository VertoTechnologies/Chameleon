"use client";

import AgoraRTC, { AgoraRTCProvider, useRTCClient,
    useLocalMicrophoneTrack,
    useLocalCameraTrack,
    useJoin,
    usePublish,
    useRemoteUsers,
    useRemoteAudioTracks,
    ICameraVideoTrack,
  } from "agora-rtc-react";
import Call from "./call";
export default function AgoraProvider({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  return <AgoraRTCProvider client={client}>
    <Call/>
    {children}
    </AgoraRTCProvider>;
}
