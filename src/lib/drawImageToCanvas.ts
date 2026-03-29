export const drawImageToCanvas = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) => {
  const { width, height } = canvas;

  ctx.clearRect(0, 0, width, height);

  // Cover-fit scaling
  const scale = Math.max(width / img.width, height / img.height);

  const x = (width - img.width * scale) / 2;
  const y = (height - img.height * scale) / 2;

  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
};
