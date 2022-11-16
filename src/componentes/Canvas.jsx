import { useState } from "react";
import { useOnDraw } from "../hook/useOnDraw";


export default function Canvas({
  width,
  height,
  className,
}) {

  const [mousseEvent,setMousseEvent]=useState(false)

const {
  onCanvasMouseDown
  ,setCanvasRef}=useOnDraw(onDraw)




function dibujarLinea(start,end,ctx,color,width){
start=start??end
    ctx.beginPath();
    ctx.style=color
    ctx.lineWidth=width;
    ctx.strokeStyle=color
    ctx.moveTo(start.x,start.y)
    ctx.lineTo(end.x,end.y)
    ctx.stroke()

    ctx.fillStyle=color;
    ctx.beginPath()
  ctx.arc(start.x,start.y,width,0,2*Math.PI)
  ctx.fill()
}

const imgCrs=()=>{
  
}

function onDraw(ctx,point,prevPoint){
  dibujarLinea(prevPoint,point,ctx,'#00ddcc',15)
}

  return (
    <canvas
    onMouseDown={onCanvasMouseDown}
    onMouseUp={()=>{setMousseEvent(false)}}
    ref={setCanvasRef}
    className={className}

      width={width}
      height={height}
 />
  );
}
