import React, { useEffect, useRef, useState } from "react";

import Video from "../componentes/Video";

export default function Grabadora() {
  const photoRef = useRef(null);


  return (
    <div className=" min-h-max pt-10 w-full mx-auto">
      <Video />

      <div>
        <div className="mx-auto my-20 w-full">
                  
        </div>
      </div>
    </div>
  );
}
