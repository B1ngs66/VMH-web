"use client";

import { Play } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/content/site";
import { publicPath } from "@/lib/site-path";

type IntroPhase = "opening" | "positioning" | "connection" | "closing";

const introCopy = {
  zh: {
    label: "VMH 品牌影片",
    positioning: "構建下一代 IP 經濟生態",
    connection: "以 IP 為核心，連接人工智能、機器人與算力基礎設施，推動文化、旅遊、體育等產業的數字化與全球商業化。",
    fallback: "您的瀏覽器不支援影片播放。",
  },
  en: {
    label: "VMH brand film",
    positioning: "Building the Next Generation IP Economy",
    connection: "With IP at its core, VMH connects artificial intelligence, robotics and computing infrastructure to advance the digital transformation and global commercialisation of culture, tourism and sports.",
    fallback: "Your browser does not support video playback.",
  },
} as const;

export function OpeningIntro({ locale }: { locale: Locale }) {
  const copy = introCopy[locale];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<IntroPhase>("opening");
  const [needsPlaybackGesture, setNeedsPlaybackGesture] = useState(false);
  const activeMessage = phase === "positioning"
    ? copy.positioning
    : phase === "connection"
      ? copy.connection
      : null;

  const playVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.defaultPlaybackRate = 0.7;
    video.playbackRate = 0.7;

    try {
      await video.play();
      setNeedsPlaybackGesture(false);
    } catch {
      setNeedsPlaybackGesture(true);
    }
  }, []);

  useEffect(() => {
    const resumePlayback = () => {
      if (document.visibilityState === "visible") {
        void playVideo();
      }
    };

    document.addEventListener("WeixinJSBridgeReady", playVideo);
    document.addEventListener("visibilitychange", resumePlayback);

    return () => {
      document.removeEventListener("WeixinJSBridgeReady", playVideo);
      document.removeEventListener("visibilitychange", resumePlayback);
    };
  }, [playVideo]);

  return (
    <section className={`opening-intro opening-intro--${phase}`} aria-label={copy.label}>
      <video
        ref={videoRef}
        className="opening-intro-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={publicPath("/picture/vmh-opening-poster.jpg")}
        aria-hidden="true"
        {...{
          "webkit-playsinline": "true",
          "x5-playsinline": "true",
          "x5-video-player-type": "h5-page",
          "x5-video-player-fullscreen": "false",
          "x-webkit-airplay": "allow",
        }}
        onCanPlay={() => void playVideo()}
        onError={() => setNeedsPlaybackGesture(true)}
        onPlaying={() => setNeedsPlaybackGesture(false)}
        onLoadedMetadata={(event) => {
          event.currentTarget.playbackRate = 0.7;
        }}
        onTimeUpdate={(event) => {
          const time = event.currentTarget.currentTime;
          const nextPhase: IntroPhase = time >= 9.2
            ? "closing"
            : time >= 5.8
              ? "connection"
              : time >= 1
                ? "positioning"
                : "opening";
          setPhase((current) => current === nextPhase ? current : nextPhase);
        }}
      >
        <source
          src={publicPath("/video/vmh-opening-mobile.mp4")}
          type="video/mp4"
          media="(max-width: 680px)"
        />
        <source src={publicPath("/video/vmh-opening.mp4")} type="video/mp4" />
        {copy.fallback}
      </video>

      <div className="opening-intro-scrim" aria-hidden="true" />
      {needsPlaybackGesture ? (
        <button className="opening-intro-play" type="button" onClick={() => void playVideo()}>
          <Play size={22} weight="fill" aria-hidden="true" />
          <span>{locale === "zh" ? "播放影片" : "Play video"}</span>
        </button>
      ) : null}
      <div className="opening-intro-copy" aria-live="polite">
        {activeMessage ? (
          <div className={`opening-intro-message opening-intro-message--${phase}`} key={phase}>
            <span>VMH</span>
            <h2>{activeMessage}</h2>
          </div>
        ) : null}
      </div>
    </section>
  );
}
