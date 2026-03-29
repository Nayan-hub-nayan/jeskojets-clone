import { ReactLenis } from "lenis/react";

export default function SmoothScrolling({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 2.0, smoothWheel: true, wheelMultiplier: 1.0, touchMultiplier: 2.0 }}>
      {children}
    </ReactLenis>
  );
}
