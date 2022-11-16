import React, { useState } from "react";
import {createFFmpeg,fetchFile  } from '@ffmpeg/ffmpeg'

export default function WebCamRecorder() {
    const [ready, setReady] = useState(false)
    const [videoSrc, setVideoSrc] = useState([])
  const [imageFile, setImageFile] = useState({});
  const [soundFile, setSoundFile] = useState({});
  const [message, setMessage] = useState('')
const ffmpeg=  createFFmpeg({
    log:true,
});


  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleChangeSound = (e) => {
    const file = e.target.files[0];
    setSoundFile(file);
  };


  const createVideo=async()=>{
    await ffmpeg.load()
    setReady(true)
    ffmpeg.FS('writeFile','imagen.png', await fetchFile(imageFile))
    ffmpeg.FS('writeFile','sound.png', await fetchFile(soundFile))
    await ffmpeg.run("-framerate", "1/10", "-i", "image.png", "-i", "sound.mp3", "-c:v", "libx264", "-t", "10", "-pix_fmt", "yuv420p", "-vf", "scale=1920:1080", "prueba.mp4");
    const data=ffmpeg.FS('readFile','prueba.mp4');
    setVideoSrc(URL.createObjectURL(new Blob([data.buffer],{type:'video/mp4'})))

  }

  const doTranscode = async () => {
    setMessage('Loading ffmpeg-core.js');
    await ffmpeg.load();
    setMessage('Start transcoding');
    ffmpeg.FS('writeFile', 'test.avi', await fetchFile('/flame.avi'));
    await ffmpeg.run('-i', 'test.avi', 'test.mp4');
    setMessage('Complete transcoding');
    const data = ffmpeg.FS('readFile', 'test.mp4');
    setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
  };
  return (
        <div className="mt-10 space-y-6">

            {
                ready?
                <video className="mx-auto" src={videoSrc} controls muted></video>
            :
            <span>cargando....</span>
            }
    <div className=" flex flex-col mx-auto items-center p-10 bg-orange-300 rounded-xl my-auto gap-5">


      <label>
        Elige audio
        <input
          type="file"
          id="sound"
          accept="audio/*"
          onChange={handleChangeSound}
        />
      </label>
      <label>
        Eluige imagen
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleChangeImage}
          />
      </label>

      <button onClick={createVideo} className="px-4 py-2 shadow-md text-gray-200 bg-blue-400 rounded-lg font-medium text-center mx-auto">Craer Video con FFMpeg</button>
          </div>
    </div>
  );
}
