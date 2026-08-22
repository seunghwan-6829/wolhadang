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
  /** cover only when source is already 9:16. kim-hero is 768×1376. */
  fit?: "cover" | "contain";
  kenBurns?: boolean;
  gradient?: boolean;
  children?: ReactNode;
};

export function FrameMedia({
  src,
  videoSrc,
  alt = "터줏 김선생",
  className = "",
  fill = false,
  blur = false,
  fit = "cover",
  kenBurns,
  gradient = true,
  children,
}: Props) {
  const [vidOk, setVidOk] = useState(false);
  const [vidFailed, setVidFailed] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const showVideo = Boolean(videoSrc) && !vidFailed;
  const burn = kenBurns !== false && !vidOk && !blur;
  const fitClass = fit === "contain" ? "frame-media-contain" : "frame-media-cover";

  return (
    <div
      className={`${
        fill ? "absolute inset-0" : "relative h-dvh w-full"
      } overflow-hidden bg-[#161412] ${className}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#161412]">
        <Seal size={64} />
        <p className="mt-4 font-serif text-[18px] tracking-wide text-[#f3ead8]">
          터줏 김선생
        </p>
      </div>

      {src && !vidOk && !imgFailed ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgFailed(true)}
          className={`frame-media ${fitClass} ${blur ? "blur-2xl scale-110" : ""} ${
            burn ? "kenburns" : ""
          }`}
        />
      ) : null}

      {showVideo ? (
        <video
          src={videoSrc}
          poster={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          ref={(el) => {
            if (el && el.readyState >= 2) setVidOk(true);
          }}
          onError={() => {
            setVidFailed(true);
            setVidOk(false);
          }}
          onLoadedData={() => setVidOk(true)}
          className={`frame-media ${fitClass} ${blur ? "blur-2xl scale-110" : ""} ${
            vidOk ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}

      {gradient ? (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/25"
          aria-hidden
        />
      ) : null}

      {children}
    </div>
  );
}
