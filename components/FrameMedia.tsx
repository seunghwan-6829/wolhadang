"use client";

import { useState, type ReactNode } from "react";

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
  objectPosition?: string;
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
  objectPosition,
  children,
}: Props) {
  const [vidOk, setVidOk] = useState(false);
  const [vidFailed, setVidFailed] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const showVideo = Boolean(videoSrc) && !vidFailed;
  const burn = kenBurns !== false && !vidOk && !blur;
  const fitClass = fit === "contain" ? "frame-media-contain" : "frame-media-cover";
  const pos = objectPosition ? { objectPosition } : undefined;

  return (
    <div
      className={`${
        fill ? "absolute inset-0" : "relative h-dvh w-full"
      } overflow-hidden bg-[#161412] ${className}`}
    >
      {src && !vidOk && !imgFailed ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgFailed(true)}
          style={pos}
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
          style={pos}
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
