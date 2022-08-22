import React, { useEffect, useRef, useState } from "react";

export default function Grabadora() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [videoSource, setVideoSource] = useState(null);
  const [audioSource, setAudioSource] = useState(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div>
      <div>
        <video autoPlay ref={videoRef}></video>
        <button>Foto</button>
      </div>
      <div>
        <canvas autoPlay muted playsInline ref={photoRef}></canvas>
        <button>close</button>
      </div>
    </div>
  );
}
