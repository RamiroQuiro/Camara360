import React from 'react'
import Canvas from '../componentes/Canvas'
export default function Lienzo() {
  return (

    <div>
      <div className="mx-auto my-20 w-1/2">

            <Canvas
            className="bg-red-500 rounded-lg "
            height={500}
            width={700}
            />
        </div>
        </div>
  )
}
