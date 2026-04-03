export const drawImageToCanvas = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) => {
  const { width, height } = canvas;

  ctx.clearRect(0, 0, width, height);

  // Set high quality smoothing and subtle sharpening
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  
  // Subtle visual enhancement
  ctx.filter = "contrast(1.05) brightness(1.02)";

  // Cover-fit scaling
  const scale = Math.max(width / img.width, height / img.height);

  const x = (width - img.width * scale) / 2;
  const y = (height - img.height * scale) / 2;

  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
};

