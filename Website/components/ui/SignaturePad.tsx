"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface SignaturePadProps {
  label: string;
  onChange?: (dataUrl: string | null) => void;
}

export default function SignaturePad({ label, onChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const hasMoved = useRef(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const getCtx = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 1.8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    return ctx;
  };

  const getPos = (e: MouseEvent | Touch, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const onMouseDown = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    drawing.current = true;
    hasMoved.current = false;
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    hasMoved.current = true;
    const pos = getPos(e, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }, []);

  const onMouseUp = useCallback(() => {
    if (!drawing.current) return;
    drawing.current = false;
    if (!hasMoved.current) return;
    setIsEmpty(false);
    onChange?.(canvasRef.current?.toDataURL("image/png") ?? null);
  }, [onChange]);

  const onTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    drawing.current = true;
    hasMoved.current = false;
    const pos = getPos(e.touches[0], canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    hasMoved.current = true;
    const pos = getPos(e.touches[0], canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!drawing.current) return;
    drawing.current = false;
    if (!hasMoved.current) return;
    setIsEmpty(false);
    onChange?.(canvasRef.current?.toDataURL("image/png") ?? null);
  }, [onChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);
    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [onMouseDown, onMouseMove, onMouseUp, onTouchStart, onTouchMove, onTouchEnd]);

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
    onChange?.(null);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-medium text-neutral-700">{label}</span>
        {!isEmpty && (
          <button
            type="button"
            onClick={clear}
            className="text-xs text-neutral-400 hover:text-brand-danger underline"
          >
            Löschen
          </button>
        )}
      </div>
      <div className="relative border border-neutral-300 rounded-sm bg-white overflow-hidden">
        <canvas
          ref={canvasRef}
          width={600}
          height={120}
          className="w-full h-[120px] cursor-crosshair touch-none"
        />
        {isEmpty && (
          <p className="absolute inset-0 flex items-center justify-center text-xs text-neutral-400 pointer-events-none select-none">
            Hier unterschreiben
          </p>
        )}
      </div>
    </div>
  );
}
