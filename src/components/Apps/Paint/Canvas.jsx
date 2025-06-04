import { useRef, useEffect, useState } from "react";

const Canvas = ({ tool, brushColor, brushSize }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [resizing, setResizing] = useState(false);
  const resizingRef = useRef(false);
  const resizeTypeRef = useRef(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const startSizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");

    // Set initial canvas resolution
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }, []);

  // Finalize resize
  const onMouseMove = (e) => {
    if (!resizingRef.current) return;

    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;

    let newWidth = startSizeRef.current.width;
    let newHeight = startSizeRef.current.height;

    if (
      resizeTypeRef.current === "right" ||
      resizeTypeRef.current === "corner"
    ) {
      newWidth += deltaX;
    }
    if (
      resizeTypeRef.current === "bottom" ||
      resizeTypeRef.current === "corner"
    ) {
      newHeight += deltaY;
    }

    const overlay = overlayRef.current;
    overlay.style.width = newWidth + "px";
    overlay.style.height = newHeight + "px";
  };
  const onMouseUp = () => {
    if (!resizingRef.current) return;

    const overlay = overlayRef.current;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const newWidth = overlay.offsetWidth;
    const newHeight = overlay.offsetHeight;

    const oldWidth = canvas.width;
    const oldHeight = canvas.height;

    // Save current visible drawing (crop if shrinking)
    const cropWidth = Math.min(oldWidth, newWidth);
    const cropHeight = Math.min(oldHeight, newHeight);
    const imageData = ctx.getImageData(0, 0, cropWidth, cropHeight);

    // Update container size CSS
    container.style.width = newWidth + "px";
    container.style.height = newHeight + "px";

    // Resize canvas (clears canvas)
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Put back cropped image data at (0,0)
    ctx.putImageData(imageData, 0, 0);

    overlay.style.display = "none";
    resizingRef.current = false;
    resizeTypeRef.current = null;

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  const startResize = (e, type) => {
    e.preventDefault();
    e.stopPropagation();

    const container = containerRef.current;
    const overlay = overlayRef.current;

    startPosRef.current = { x: e.clientX, y: e.clientY };
    startSizeRef.current = {
      width: container.offsetWidth,
      height: container.offsetHeight,
    };
    resizeTypeRef.current = type;
    resizingRef.current = true;

    overlay.style.display = "block";
    overlay.style.width = container.offsetWidth + "px";
    overlay.style.height = container.offsetHeight + "px";
    overlay.style.left = container.offsetLeft + "px";
    overlay.style.top = container.offsetTop + "px";

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const startDrawing = (e) => {
    if (resizing) return;
    const ctx = canvasRef.current.getContext("2d");
    const { offsetX, offsetY } = e.nativeEvent;

    ctx.globalCompositeOperation =
      tool === "erase" ? "destination-out" : "source-over";
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          position: "relative",
          background: "white",
          width: "800px",
          height: "600px",
          border: "1px solid #ccc",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            pointerEvents: resizing ? "none" : "auto",
          }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />

        <div
          onMouseDown={(e) => startResize(e, "right")}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "10px",
            height: "100%",
            cursor: "ew-resize",
            zIndex: 2,
            userSelect: "none",
          }}
        />
        <div
          onMouseDown={(e) => startResize(e, "bottom")}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "10px",
            cursor: "ns-resize",
            zIndex: 2,
            userSelect: "none",
          }}
        />
        <div
          onMouseDown={(e) => startResize(e, "corner")}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "12px",
            height: "12px",
            cursor: "nwse-resize",
            zIndex: 3,
            background: "rgba(0,0,0,0.1)",
            userSelect: "none",
          }}
        />
      </div>

      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          border: "1px dashed gray",
          display: "none",
          pointerEvents: "none",
          zIndex: 1000,
        }}
      />
    </>
  );
};

export default Canvas;
