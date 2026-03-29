"use client";

import { useRef, useEffect, useState } from "react";

export const useImagePreloader = (path: string, count: number) => {
  const images = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let completedCount = 0;

    for (let i = 1; i <= count; i++) {
      const img = new Image();
      // Match the actual file naming: ezgif-frame-001.jpg, ezgif-frame-002.jpg, etc.
      img.src = `${path}/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
      img.onload = () => {
        completedCount++;
        setLoadedCount(completedCount);
        if (completedCount === count) {
          setLoaded(true);
        }
      };
      loadedImages.push(img);
    }

    images.current = loadedImages;
  }, [path, count]);

  return { images, loaded, loadedCount, total: count };
};
