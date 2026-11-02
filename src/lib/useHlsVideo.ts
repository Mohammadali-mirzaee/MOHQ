import { useEffect, type RefObject } from "react";
import Hls from "hls.js";

export function useHlsVideo(ref: RefObject<HTMLVideoElement | null>, src: string) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let hls: Hls | null = null;
    if (Hls.isSupported()) {
      hls = new Hls({ capLevelToPlayerSize: true });
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    video.play().catch(() => {
      /* autoplay can be blocked; the video simply stays on its first frame */
    });

    return () => {
      hls?.destroy();
    };
  }, [ref, src]);
}
