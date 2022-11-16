import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/doritoLogo.png";

export default function Video() {
  const [isRecording, setIsRecording] = useState(false);
  const [videoSource, setVideoSource] = useState(null);
  const [audioSource, setAudioSource] = useState(null);
  const [downloadLink, setDownloadLink] = useState("");
  const mediaRecordRef = useRef(null);
  const [streamer, setStramer] = useState([]);
  const streamRecoderRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const chunks = useRef([]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
        audio: true,
      })
      .then((stream) => {
        streamRef.current = stream;
        if (streamRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const devicesGet = async () => {
    const getDevices = () => navigator.mediaDevices.enumerateDevices();
    const mediaDevices = await getDevices()
      .then((devices) => {
        const audioSourceOptions = [];
        const videoSourceOptions = [];
        for (const deviceInfo of devices) {
          if (deviceInfo.kind == "audioinput") {
            audioSourceOptions.push({
              value: deviceInfo.deviceId,
              label: deviceInfo.label,
            });
          } else if (deviceInfo.kind == "videoinput") {
            videoSourceOptions.push({
              value: deviceInfo.deviceId,
              label: deviceInfo.label,
            });
          }
          setAudioSource(audioSourceOptions);
          setVideoSource(videoSourceOptions);
        }
      })
      .catch((e) => console.log(e));
  };

  const startRecord = () => {
    if (isRecording) {
      return;
    }
    if (!streamRef.current) {
      return;
    }
    mediaRecordRef.current = new MediaRecorder(streamRef.current);
    mediaRecordRef.current.start();
    mediaRecordRef.current.ondataavailable = (e) => {
      if (chunks.current) {
        chunks.current.push(e.data);
        console.log(chunks.current);
      }
    };
    setIsRecording(true);
    // setTimeout(() => setIsRecording(false), 10000);
  };

  const spotRecording = () => {
    if (!streamRef.current) {
      return;
    }

    mediaRecordRef.current.stop();
    setIsRecording(false);
  };

  useEffect(() => {
    if (isRecording) {
      return;
    }
    if (chunks.current.length == 0) {
      return;
    }
    const blob = new Blob(chunks.current, {
      type: "video/x-matroska;codecs=avc1,opus",
    });
    setDownloadLink(URL.createObjectURL(blob));
    chunks.current = [];
  }, [isRecording, downloadLink]);

  // setDevices(mediaDevices)
  useEffect(() => {
    getVideo();
    devicesGet();
  }, [videoRef]);



  const RenderVideo=({})=>{
    return(
      <div className="flex flex-col items-center mx-auto bg-red-500 relative w-full h-80 gap-5 mb-24 rounded-lg">
      <video
        controls
        autoPlay
        src={downloadLink}
        className="w-full max-w-full object-contain  h-full rounded-lg borde"
      ></video>
      <a href={downloadLink} download="file.mp4">
        Descargar
      </a>
    </div>
    )
  }

  return (
    <div className="w-full mx-auto flex flex-col gap-5 items-center justify-center">
      <div className="flex flex-col items-center mx-auto bg-red-500 relative w-1/2 h-80 gap-5 mb-24 rounded-lg">
        <video
          muted
          autoPlay
          ref={videoRef}
          className="w-full max-w-full object-contain  h-full rounded-lg borde"
        ></video>
        <img
          src={logo}
          alt="video"
          className="z-50 absolute bottom-5 w-32 rounded-lg"
        />
        <div className="w-full py-2 bg-gray-50 rounded-lg bg-opacity-50 backdrop-blur-sm">
          <select
            name="videoSource"
            className="w-full my-1 text-sm bg-blue-200 rounded px-2 py-1"
            value={videoSource}
          >
            {videoSource?.map((elemento, index) => (
              <option
                className="w-full py-1.5 px-2 text-sm "
                key={index}
                value={elemento.value}
                name={elemento.label}
              >
                {elemento.label}
              </option>
            ))}
          </select>
          <select
            name="audioSource"
            className="w-full text-sm bg-blue-200 rounded px-2 py-1"
            value={audioSource}
          >
            {audioSource?.map((elemento, index) => (
              <option
                className="w-full py-1.5 px-2 text-sm "
                key={index}
                value={elemento.value}
                name={elemento.label}
              >
                {elemento.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={startRecord}
        disabled={isRecording}
        className="px-8 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 font-medium text-sm border mx-auto text-white disabled:bg-gray-300"
      >
        Grabar
      </button>
      <button
        onClick={spotRecording}
        disabled={!isRecording}
        className="px-8 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 font-medium text-sm border mx-auto text-white  disabled:bg-gray-300"
      >
        Parar Grabacion
      </button>
      <div>
        {downloadLink&&
        
       <RenderVideo/>
        }
       
      </div>
    </div>
  );
}
