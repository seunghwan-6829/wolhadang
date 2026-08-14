"use client";

import { useState, type ReactNode } from "react";
import { Seal } from "./Seal";

type Props = {
  src?: string;
  videoSrc?: string;
  alt?: string;
  className?: string;
  fill?: boolean;
  blur?: boolean;
  children?: ReactNode;
};

export function FrameMedia({
  src,
  videoSrc,
  alt = "터줏 김선생",
  className = "",
  fill = false,
  blur = false,
  children,
}: Props) {
  const [vidOk, setVidOk] = useState(false);
  const [imgOk, setImgOk] = useState(false);

  return (
    <div
      className={`${
        fill ? "absolute inset-0" : "relative aspect-[9/16] w-full"
      } overflow-hidden bg-[#161412] ${className}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#161412]">
        <Seal size={64} />
        <p className="mt-4 font-serif text-[18px] tracking-wide text-[#f3ead8]">
          터줏 김선생
        </p>
      </div>

      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVidOk(false)}
          onLoadedData={() => setVidOk(true)}
          className={`frame-media ${blur ? "blur-2xl" : ""} ${
            vidOk ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}

      {src && !vidOk ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgOk(false)}
          onLoad={() => setImgOk(true)}
          className={`frame-media ${blur ? "blur-2xl" : ""} ${
            imgOk ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}

      {children}
    </div>
  );
}
