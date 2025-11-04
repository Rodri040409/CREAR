"use client";

/* eslint-disable @next/next/no-page-custom-font */
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

/** ---------- Tipos WebKit/Fullscreen y prefijos ---------- */
declare global {
  interface Document {
    webkitFullscreenElement?: Element | null;
    webkitExitFullscreen?: () => Promise<void> | void;
  }
  interface Element {
    webkitRequestFullscreen?: () => Promise<void> | void;
  }
  interface HTMLVideoElement {
    webkitEnterFullscreen?: () => void;
    webkitExitFullscreen?: () => void;
    webkitPresentationMode?: "inline" | "picture-in-picture" | "fullscreen";
  }
}

const TITLE = "Proyecto Casa Diamante, Boca del Rio";
const VIDEO_SRC = "/videos/NewsVideo.mp4";

function buildVideoSources(originalPath: string) {
  const base = originalPath.replace(/\.(mp4|webm|ogg|ogv|m4v)$/i, "");
  return { webm: `${base}.webm`, mp4: `${base}.mp4`, ogg: `${base}.ogg` };
}
const sources = buildVideoSources(VIDEO_SRC);

/** --------- Utils (sin catches vacíos, SSR-safe) ---------- */
function debugLog(...args: unknown[]) {
  if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[video]", ...args);
  }
}
async function tryLockLandscape() {
  try {
    const so: any = (screen as any)?.orientation;
    if (so && typeof so.lock === "function") {
      await so.lock("landscape");
    }
  } catch (err) {
    debugLog("orientation lock not supported", err);
  }
}
async function tryUnlockOrientation() {
  try {
    const so: any = (screen as any)?.orientation;
    if (so && typeof so.unlock === "function") {
      await so.unlock();
    }
  } catch (err) {
    debugLog("orientation unlock not supported", err);
  }
}

/** ---------------- Hooks ---------------- */
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

/** ---------------- Componente ---------------- */
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
  const lastUnmuteRef = useRef<number>(0); // ventana anti “re-mute”

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(true); // muted de arranque para autoplay
  const [isFS, setIsFS] = useState(false);
  const [overlayFS, setOverlayFS] = useState(false);
  const userPausedRef = useRef(false);

  /** Eventos del <video> + compat */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoadedMeta = () => setDuration(v.duration || 0);
    const onLoadedData = () => {
      // iOS: NO hagas seek inicial; bloquea el arranque hasta un seek manual
      try {
        if (!isIOS && v.currentTime === 0) v.currentTime = 0.001; // evita “pantalla blanca” solo no-iOS
      } catch (err) {
        debugLog("bump first frame failed", err);
      }
    };
    const onTime = () => setCurrent(v.currentTime || 0);
    const onPlay = () => { setIsPlaying(true); userPausedRef.current = false; };
    const onPause = () => setIsPlaying(false);
    const onVol = () => {
      const now = performance.now?.() ?? Date.now();
      // Ignora el volumechange inmediatamente tras desmutear (Safari/Android “rebota”)
      if (now - lastUnmuteRef.current < 350) return;
      setMuted(v.muted);
      setVolume(v.muted ? 0 : v.volume ?? 1);
    };

    const onWebkitBeginFS = () => setIsFS(true);
    const onWebkitEndFS = () => setIsFS(false);

    v.addEventListener("loadedmetadata", onLoadedMeta);
    v.addEventListener("loadeddata", onLoadedData);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("volumechange", onVol);
    (v as any).addEventListener?.("webkitbeginfullscreen", onWebkitBeginFS);
    (v as any).addEventListener?.("webkitendfullscreen", onWebkitEndFS);

    // Atributos clave + PiP / controls
    try {
      v.setAttribute("playsinline", "");
      v.setAttribute("muted", "");
      v.muted = true; // autoplay “polite” en iOS
      v.setAttribute("controlsList", "nodownload noplaybackrate noremoteplayback");
      (v as any).disablePictureInPicture = true;
      v.setAttribute("disablePictureInPicture", "");
    } catch (err) {
      debugLog("attr set ignored", err);
    }

    return () => {
      v.removeEventListener("loadedmetadata", onLoadedMeta);
      v.removeEventListener("loadeddata", onLoadedData);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("volumechange", onVol);
      (v as any).removeEventListener?.("webkitbeginfullscreen", onWebkitBeginFS);
      (v as any).removeEventListener?.("webkitendfullscreen", onWebkitEndFS);
    };
  }, [isIOS]);

  /** Autoplay al primer toque en iOS (si play() inicial fue bloqueado) */
  useEffect(() => {
    if (!isIOS) return;
    const v = videoRef.current;
    if (!v) return;

    const unlock = () => {
      try {
        v.setAttribute("playsinline", "");
        v.setAttribute("muted", "");
        v.muted = true;
        void v.play().catch((err) => debugLog("ios first-touch play failed", err));
      } catch (err) {
        debugLog("ios unlock error", err);
      } finally {
        v.removeEventListener("touchstart", unlock);
        v.removeEventListener("pointerdown", unlock);
      }
    };

    v.addEventListener("touchstart", unlock, { once: true, passive: true });
    v.addEventListener("pointerdown", unlock, { once: true });

    return () => {
      v.removeEventListener("touchstart", unlock);
      v.removeEventListener("pointerdown", unlock);
    };
  }, [isIOS]);

  /** autoplay cuando visible (pausa al salir) si no está en FS */
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
          if (!userPausedRef.current) {
            void v.play().catch((err) => debugLog("autoplay blocked", err));
          }
        } else {
          v.pause();
        }
      },
      { threshold: [0, 0.25, 0.55, 0.75, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isFS, overlayFS]);

  /** track fullscreen (no-iOS) */
  useEffect(() => {
    const onFsChange = () => {
      const fsEl =
        document.fullscreenElement ||
        (document as Document).webkitFullscreenElement ||
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

  /** bloquear scroll SOLO si usamos el overlay fallback */
  useEffect(() => {
    if (!overlayFS) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [overlayFS]);

  /** Controles */
  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    const unmuteWithGesture = async () => {
      // quitar atributo y prop
      v.removeAttribute("muted");
      v.muted = false;
      setMuted(false);

      // ventana de gracia para ignorar volumechange “fantasma”
      lastUnmuteRef.current = performance.now?.() ?? Date.now();

      // subir volumen si el navegador lo permite (en iOS puede ser ignorado)
      try {
        v.volume = Math.max(0.8, volume || 0.8);
      } catch (e) {
        debugLog("volume set (gesture) failed", e);
      }

      // En iOS, bajo gesto, un micro-bump si está en 0s ayuda a “enganchar” audio
      try {
        if (isIOS && v.currentTime === 0) {
          v.currentTime = 0.001;
        }
      } catch (e) {
        debugLog("bump at gesture failed", e);
      }

      // ⚠️ SIEMPRE re-invoca play() tras desmutear (aunque ya estuviera reproduciendo)
      try {
        await v.play();
      } catch (err) {
        debugLog("unmute play failed", err);
      }

      // Reafirmar por si el navegador re-muteó
      if (v.muted) {
        v.removeAttribute("muted");
        v.muted = false;
        setMuted(false);
        lastUnmuteRef.current = performance.now?.() ?? Date.now();
        try {
          await v.play();
        } catch (e) {
          debugLog("re-assert play after unmute failed", e);
        }
      }
    };

    if (!v.paused) {
      // Ya está reproduciendo
      if (v.muted) {
        await unmuteWithGesture(); // 👉 primer toque: desmutea SIN pausar
        return;
      }
      // Si no está mute, entonces sí pausamos
      userPausedRef.current = true;
      v.pause();
      return;
    }

    // Está pausado: intentamos empezar con sonido
    userPausedRef.current = false;
    try {
      await unmuteWithGesture(); // quita mute y asegura reproducción con audio
      return;
    } catch (err1) {
      debugLog("play with sound failed", err1);
    }

    // Fallback: reproducir en mute
    try {
      v.setAttribute("muted", "");
      v.muted = true;
      setMuted(true);
      await v.play();
      return;
    } catch (err2) {
      debugLog("muted play failed, trying load()+play()", err2);
    }

    // Último recurso: recargar y reproducir
    try {
      v.load();
      await v.play();
    } catch (err3) {
      debugLog("load()+play() failed", err3);
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
    try {
      v.volume = vol;
    } catch (err) {
      debugLog("volume set failed", err);
    }
    setVolume(vol);
    if (vol > 0 && muted) {
      v.muted = false;
      setMuted(false);
      v.removeAttribute("muted");
      lastUnmuteRef.current = performance.now?.() ?? Date.now();
    }
  };
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.muted) {
      v.setAttribute("muted", "");
    } else {
      v.removeAttribute("muted");
      lastUnmuteRef.current = performance.now?.() ?? Date.now();
      try {
        v.volume = Math.max(0.8, volume || 0.8);
      } catch (err) {
        debugLog("volume set after toggle failed", err);
      }
    }
  };

  const enterOverlay = () => {
    const v = videoRef.current;
    if (v && v.paused && !userPausedRef.current) {
      try {
        void v.play();
      } catch (err) {
        debugLog("overlay play failed", err);
      }
    }
    setOverlayFS(true);
    setIsFS(true);
  };
  const exitOverlay = () => {
    setOverlayFS(false);
    setIsFS(false);
  };

  const toggleFullscreen = async () => {
    const v = videoRef.current;
    if (!v) return;

    // iOS Safari: fullscreen NATIVO
    if (isIOS && v.webkitEnterFullscreen) {
      try {
        v.webkitEnterFullscreen();
        return;
      } catch (err) {
        debugLog("iOS webkitEnterFullscreen failed", err);
        enterOverlay();
        return;
      }
    }

    // Resto: Fullscreen API sobre el <video>
    const doc = document as Document & {
      webkitFullscreenElement?: Element | null;
      webkitExitFullscreen?: () => Promise<void> | void;
    };

    const req = v.requestFullscreen?.bind(v) || v.webkitRequestFullscreen?.bind(v);
    const exit = doc.exitFullscreen?.bind(doc) || doc.webkitExitFullscreen?.bind(doc);
    const isDocFS = doc.fullscreenElement ?? doc.webkitFullscreenElement;

    if (!isDocFS) {
      try {
        await req?.();
        await tryLockLandscape();
      } catch (err) {
        debugLog("Fullscreen API failed, fallback overlay", err);
        enterOverlay();
      }
    } else {
      await tryUnlockOrientation();
      try {
        await exit?.();
      } catch (err) {
        debugLog("exit fullscreen failed", err);
      }
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
    overlayFS ? "fixed inset-0 z-[9999] bg-black w-[100svw] h-[100svh] m-0" : "";

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

      {/* Landscape */}
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
              preload="auto"
              playsInline
              autoPlay
              muted={muted}
              controls={isIOS && isFS} /* iOS: controles nativos en FS */
              className="absolute inset-0 w-full h-full object-cover"
              style={{ backgroundColor: "#000" }}
              onClick={togglePlay}
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

            {/* Oculta controles propios en FS nativo */}
            {(!isFS || overlayFS) && (
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
            )}
          </motion.div>
        </div>
      ) : (
        // Portrait
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
              preload="auto"
              playsInline
              autoPlay
              muted={muted}
              controls={isIOS && isFS}
              className={overlayFS ? "block w-full h-full object-cover" : "block w-[100vw] h-auto"}
              style={{ backgroundColor: "#000" }}
              onClick={togglePlay}
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

            {(!isFS || overlayFS) && (
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
                showVolume={hasFinePointer && !isIOS}
              />
            )}
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
  const { isPlaying, muted, isFS, duration, current, volume, onTogglePlay, onSeek, onToggleMute, onVolume, onToggleFS, fmt, showVolume = true } =
    props;

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
                  <path d="M16 7a5 5 0 0 1 0 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
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
