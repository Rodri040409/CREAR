"use client";

/* eslint-disable @next/next/no-page-custom-font */

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const TITLE = "Proyecto Casa Diamante, Boca del Rio";
const VIDEO_SRC = "/videos/NewsVideo.mp4";

function buildVideoSources(originalPath: string) {
  const base = originalPath.replace(/\.(mp4|webm|ogg|ogv|m4v)$/i, "");
  return { webm: `${base}.webm`, mp4: `${base}.mp4`, ogg: `${base}.ogg` };
}
const sources = buildVideoSources(VIDEO_SRC);

function useViewportHeight() {
  const [vh, setVh] = useState<number>(720);
  useEffect(() => {
    const update = () =>
      setVh((window.visualViewport?.height ?? window.innerHeight) || 720);
    update();
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("orientationchange", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);
  return vh;
}
function useInitialElHeight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [h, setH] = useState<number>(90);
  useEffect(() => {
    if (ref.current) setH(ref.current.offsetHeight || 90);
  }, []);
  return { ref, h };
}
function useOrientation() {
  const [portrait, setPortrait] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setPortrait("matches" in e ? e.matches : (e as MediaQueryList).matches);
    handler(mq);
    mq.addEventListener?.("change", handler as (e: MediaQueryListEvent) => void);
    return () =>
      mq.removeEventListener?.("change", handler as (e: MediaQueryListEvent) => void);
  }, []);
  return portrait;
}
function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const h = (e: MediaQueryListEvent | MediaQueryList) =>
      setFine("matches" in e ? e.matches : (e as MediaQueryList).matches);
    h(mq);
    mq.addEventListener?.("change", h as (e: MediaQueryListEvent) => void);
    return () => mq.removeEventListener?.("change", h as (e: MediaQueryListEvent) => void);
  }, []);
  return fine;
}
function useIOS() {
  const [ios, setIOS] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent || "";
    setIOS(/iPad|iPhone|iPod/.test(ua));
  }, []);
  return ios;
}

export function SavoyeHomeHeroExact() {
  const vh = useViewportHeight();
  const { ref: titleRef, h: titleH } = useInitialElHeight<HTMLDivElement>();
  const isPortrait = useOrientation();
  const hasFinePointer = useFinePointer();
  const isIOS = useIOS();

  const fonts = useMemo(
    () => (
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Khand:wght@400;500;700&display=swap"
      />
    ),
    []
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [isFS, setIsFS] = useState(false);
  const [overlayFS, setOverlayFS] = useState(false);
  const userPausedRef = useRef(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoaded = () => setDuration(v.duration || 0);
    const onTime = () => setCurrent(v.currentTime || 0);
    const onPlay = () => { setIsPlaying(true); userPausedRef.current = false; };
    const onPause = () => setIsPlaying(false);
    const onVol = () => { setMuted(v.muted); setVolume(v.muted ? 0 : v.volume ?? 1); };
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("volumechange", onVol);
    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("volumechange", onVol);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    const v = videoRef.current;
    if (!el || !v || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (isFS || overlayFS) return;
        const e = entries[0];
        if (!e) return;
        const visible = e.isIntersecting && e.intersectionRatio >= 0.55;
        if (visible) {
          if (!userPausedRef.current) v.play().catch(() => { return; });
        } else {
          v.pause();
        }
      },
      { threshold: [0, 0.25, 0.55, 0.75, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isFS, overlayFS]);

  useEffect(() => {
    const onFsChange = () => {
      const fsEl =
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        null;
      setIsFS(!!fsEl || overlayFS);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    (document as any).addEventListener?.("webkitfullscreenchange", onFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      (document as any).removeEventListener?.("webkitfullscreenchange", onFsChange);
    };
  }, [overlayFS]);

  useEffect(() => {
    if (!overlayFS) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prev; };
  }, [overlayFS]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPausedRef.current = false;
      v.play().catch(() => { return; });
    } else {
      userPausedRef.current = true;
      v.pause();
    }
  };
  const handleSeek = (val: number) => {
    const v = videoRef.current;
    if (!v) return;
    const t = Math.min(Math.max(val, 0), duration || 0);
    v.currentTime = t;
    setCurrent(t);
  };
  const handleVolume = (val: number) => {
    const v = videoRef.current;
    if (!v) return;
    const vol = Math.min(Math.max(val, 0), 1);
    v.volume = vol;            // iOS puede ignorarlo; igual sincronizamos UI
    setVolume(vol);
    if (vol > 0 && muted) {
      v.muted = false;
      setMuted(false);
    }
  };
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const enterOverlay = () => {
    const v = videoRef.current;
    if (v && v.paused && !userPausedRef.current) {
      try { void v.play(); } catch (_e) { return; }
    }
    setOverlayFS(true);
    setIsFS(true);
  };
  const exitOverlay = () => {
    setOverlayFS(false);
    setIsFS(false);
  };

  const toggleFullscreen = () => {
    if (isIOS) {
      overlayFS ? exitOverlay() : enterOverlay();
      return;
    }
    const c = containerRef.current || videoRef.current;
    if (!c) return;

    type RSEl = Element & { webkitRequestFullscreen?: () => Promise<void> };
    type FSDoc = Document & { webkitExitFullscreen?: () => Promise<void>; webkitFullscreenElement?: Element | null };

    const el = c as RSEl;
    const doc = document as FSDoc;

    const req = el.requestFullscreen?.bind(el) ?? el.webkitRequestFullscreen?.bind(el);
    const exit = doc.exitFullscreen?.bind(doc) ?? doc.webkitExitFullscreen?.bind(doc);

    const isDocFS = doc.fullscreenElement ?? doc.webkitFullscreenElement;
    if (!isDocFS) {
      req?.();
    } else {
      exit?.();
    }
  };

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60);
    return `${m}:${ss.toString().padStart(2, "0")}`;
  };

  const portrait = isPortrait === true;
  const showVolume = hasFinePointer && !isIOS;
  const overlayClass =
    overlayFS ? "fixed inset-0 z-[60] bg-black w-[100svw] h-[100svh] m-0" : "";

  return (
    <header
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white"
      style={{ height: portrait ? undefined : vh }}
    >
      {fonts}

      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
        className="absolute top-0 left-0 right-0 z-[2]"
      >
        <div className="mx-auto w-full max-w-[114rem] px-[1.5rem] py-[2.4rem]">
          <h1 className="[font-family:'Khand',_sans-serif] text-black text-center uppercase font-[500] leading-[1.1] text-[clamp(2.8rem,5.5vw,6.2rem)] m-0">
            {TITLE}
          </h1>
        </div>
      </motion.div>

      {!portrait ? (
        <div
          ref={containerRef}
          className={`absolute left-0 right-0 bottom-0 z-[1] bg-black ${overlayClass}`}
          style={{ top: overlayFS ? 0 : titleH }}
        >
          <motion.div
            className="relative w-full h-full"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1], delay: 0.1 }}
          >
            <video
              ref={videoRef}
              preload="metadata"
              playsInline
              controls={overlayFS}
              muted={muted}
              className={`absolute inset-0 w-full h-full ${overlayFS ? "object-contain" : "object-cover"}`}
            >
              <source src={sources.webm} type="video/webm" />
              <source src={sources.mp4} type="video/mp4" />
              <source src={sources.ogg} type="video/ogg" />
              Tu navegador no soporta el elemento de video.
            </video>

            {overlayFS && (
              <button
                onClick={exitOverlay}
                aria-label="Cerrar video"
                className="absolute right-[max(12px,env(safe-area-inset-right))] top-[max(12px,env(safe-area-inset-top))] z-[70] grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur"
              >
                ✕
              </button>
            )}

            <Controls
              isPlaying={isPlaying}
              muted={muted}
              isFS={isFS}
              duration={duration}
              current={current}
              volume={volume}
              onTogglePlay={togglePlay}
              onSeek={handleSeek}
              onToggleMute={toggleMute}
              onVolume={handleVolume}
              onToggleFS={toggleFullscreen}
              fmt={fmt}
              showVolume={showVolume}
            />
          </motion.div>
        </div>
      ) : (
        <div className={`z-[1] bg-transparent ${overlayClass}`} style={{ marginTop: overlayFS ? 0 : titleH }}>
          <motion.div
            ref={containerRef}
            className={`relative mx-auto ${overlayFS ? "w-[100svw] h-[100svh]" : "w-[100vw]"}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1], delay: 0.1 }}
          >
            <video
              ref={videoRef}
              preload="metadata"
              playsInline
              controls={overlayFS}
              muted={muted}
              className={overlayFS ? "block w-full h-full object-contain" : "block w-[100vw] h-auto"}
            >
              <source src={sources.webm} type="video/webm" />
              <source src={sources.mp4} type="video/mp4" />
              <source src={sources.ogg} type="video/ogg" />
              Tu navegador no soporta el elemento de video.
            </video>

            {overlayFS && (
              <button
                onClick={exitOverlay}
                aria-label="Cerrar video"
                className="absolute right-[max(12px,env(safe-area-inset-right))] top-[max(12px,env(safe-area-inset-top))] z-[70] grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur"
              >
                ✕
              </button>
            )}

            <Controls
              isPlaying={isPlaying}
              muted={muted}
              isFS={isFS}
              duration={duration}
              current={current}
              volume={volume}
              onTogglePlay={togglePlay}
              onSeek={handleSeek}
              onToggleMute={toggleMute}
              onVolume={handleVolume}
              onToggleFS={toggleFullscreen}
              fmt={fmt}
              inset
              showVolume={showVolume}
            />
          </motion.div>
        </div>
      )}
    </header>
  );
}

function Controls(props: {
  isPlaying: boolean;
  muted: boolean;
  isFS: boolean;
  duration: number;
  current: number;
  volume: number;
  onTogglePlay: () => void;
  onSeek: (n: number) => void;
  onToggleMute: () => void;
  onVolume: (n: number) => void;
  onToggleFS: () => void;
  fmt: (n: number) => string;
  inset?: boolean;
  showVolume?: boolean;
}) {
  const {
    isPlaying, muted, isFS, duration, current, volume,
    onTogglePlay, onSeek, onToggleMute, onVolume, onToggleFS, fmt,
    showVolume = true,
  } = props;

  return (
    <motion.div
      initial={{ opacity: 0.95, y: 8 }}
      whileHover={{ opacity: 1, y: 0 }}
      className="absolute left-0 right-0 bottom-0 z-[65] px-[1.5rem] pb-[1.5rem]"
    >
      <div className="mx-auto w-full max-w-[114rem]">
        <div className="flex items-center gap-3">
          <input
            aria-label="Seek"
            type="range"
            min={0}
            max={Math.max(duration, 0) || 0}
            step={0.1}
            value={current}
            onChange={(e) => onSeek(parseFloat(e.target.value))}
            className="w-full accent-[#c5a47e]"
          />
          <div className="text-white text-[1.3rem] tabular-nums min-w-[7ch] text-right">
            {fmt(current)} / {fmt(duration)}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
              onClick={onTogglePlay}
              className="group inline-flex items-center gap-2 text-white hover:text-[#c5a47e] transition"
            >
              {isPlaying ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
              <span className="text-[1.4rem] hidden sm:inline">{isPlaying ? "Pausa" : "Play"}</span>
            </button>

            <button
              aria-label={muted ? "Desactivar silencio" : "Silenciar"}
              onClick={onToggleMute}
              className="group inline-flex items-center gap-2 text-white hover:text-[#c5a47e] transition"
            >
              {muted || volume === 0 ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 10v4h4l5 5V5l-5 5H5zm12.5 2l2.5 2.5-1.5 1.5L16 13.5l-2.5 2.5-1.5-1.5L14.5 12 12 9.5l1.5-1.5L16 10.5l2.5-2.5 1.5 1.5L17.5 12z" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 10v4h4l5 5V5l-5 5H5z" />
                  <path d="M16 7a5 5 0 010 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              )}
              <span className="text-[1.4rem] hidden sm:inline">{muted ? "Silencio" : "Sonido"}</span>
            </button>

            {showVolume && (
              <input
                aria-label="Volumen"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(e) => onVolume(parseFloat(e.target.value))}
                className="w-[12rem] accent-[#c5a47e]"
              />
            )}
          </div>

          <button
            aria-label={isFS ? "Salir de pantalla completa" : "Pantalla completa"}
            onClick={onToggleFS}
            className="group inline-flex items-center gap-2 text-white hover:text-[#c5a47e] transition"
          >
            {isFS ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 14H5v5h5v-4H9v-1zm0-9H5v5h4V9h1V5zm10 9h-4v1h-1v4h5v-5zm-5-9v4h1v1h4V5h-5z" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 7H5v5h2V9h2V7zm10 0h-4v2h2v3h2V7zM7 14H5v5h5v-2H7v-3zm12 3h-3v2h5v-5h-2v3z" />
              </svg>
            )}
            <span className="text-[1.4rem] hidden sm:inline">{isFS ? "Salir" : "Full"}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function SavoyeHomeSection() {
  return <SavoyeHomeHeroExact />;
}
