"use client";

import { useEffect, useRef, useState } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

type RaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "right"
  | "left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

type LightRaysBackgroundProps = {
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  intensity?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
};

const DEFAULT_COLOR = "#a855f7";

const hexToRgb = (hex: string): [number, number, number] => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match
    ? [parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255]
    : [0.66, 0.33, 0.97];
};

const getAnchorAndDir = (
  origin: RaysOrigin,
  width: number,
  height: number,
): { anchor: [number, number]; dir: [number, number] } => {
  const outside = 0.2;
  switch (origin) {
    case "top-left":
      return { anchor: [0, -outside * height], dir: [0, 1] };
    case "top-right":
      return { anchor: [width, -outside * height], dir: [0, 1] };
    case "left":
      return { anchor: [-outside * width, 0.5 * height], dir: [1, 0] };
    case "right":
      return { anchor: [(1 + outside) * width, 0.5 * height], dir: [-1, 0] };
    case "bottom-left":
      return { anchor: [0, (1 + outside) * height], dir: [0, -1] };
    case "bottom-center":
      return { anchor: [0.5 * width, (1 + outside) * height], dir: [0, -1] };
    case "bottom-right":
      return { anchor: [width, (1 + outside) * height], dir: [0, -1] };
    default:
      return { anchor: [0.5 * width, -outside * height], dir: [0, 1] };
  }
};

type Vec2 = [number, number];
type Vec3 = [number, number, number];

type Uniforms = {
  iTime: { value: number };
  iResolution: { value: Vec2 };
  rayPos: { value: Vec2 };
  rayDir: { value: Vec2 };
  raysColor: { value: Vec3 };
  raysSpeed: { value: number };
  lightSpread: { value: number };
  rayLength: { value: number };
  intensity: { value: number };
  mousePos: { value: Vec2 };
  mouseInfluence: { value: number };
};

export function LightRaysBackground({
  raysOrigin = "top-right",
  raysColor = DEFAULT_COLOR,
  raysSpeed = 0.85,
  lightSpread = 2.4,
  rayLength = 3.2,
  intensity = 1,
  followMouse = false,
  mouseInfluence = 0.08,
}: LightRaysBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<Uniforms | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationIdRef = useRef<number | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    cleanupRef.current?.();
    cleanupRef.current = null;

    const container = containerRef.current;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
    });
    rendererRef.current = renderer;

    const gl = renderer.gl;
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    container.replaceChildren(gl.canvas);

    const vertex = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragment = `
      precision highp float;

      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec2 rayPos;
      uniform vec2 rayDir;
      uniform vec3 raysColor;
      uniform float raysSpeed;
      uniform float lightSpread;
      uniform float rayLength;
      uniform float intensity;
      uniform vec2 mousePos;
      uniform float mouseInfluence;

      float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                        float seedA, float seedB, float speed) {
        vec2 sourceToCoord = coord - raySource;
        vec2 dirNorm = normalize(sourceToCoord);
        float cosAngle = dot(dirNorm, rayRefDirection);
        float spreadFactor = pow(max(cosAngle, 0.0), 1.0 / max(lightSpread, 0.001));

        float distance = length(sourceToCoord);
        float maxDistance = iResolution.x * rayLength;
        float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.25, 1.0);

        float baseStrength = clamp(
          (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
          (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)),
          0.0,
          1.0
        );

        return baseStrength * lengthFalloff * spreadFactor;
      }

      void main() {
        vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);

        vec2 finalRayDir = rayDir;
        if (mouseInfluence > 0.0) {
          vec2 mouseScreenPos = mousePos * iResolution.xy;
          vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
          finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
        }

        vec4 rays1 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
        vec4 rays2 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);

        vec4 color = (rays1 * 0.6 + rays2 * 0.48) * intensity;
        color.rgb *= raysColor;
        gl_FragColor = vec4(color.rgb, min(color.a, 1.0));
      }
    `;

    const uniforms: Uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      rayPos: { value: [0, 0] },
      rayDir: { value: [0, 1] },
      raysColor: { value: hexToRgb(raysColor) },
      raysSpeed: { value: raysSpeed },
      lightSpread: { value: lightSpread },
      rayLength: { value: rayLength },
      intensity: { value: intensity },
      mousePos: { value: [0.5, 0.5] },
      mouseInfluence: { value: followMouse ? mouseInfluence : 0 },
    };
    uniformsRef.current = uniforms;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms,
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    meshRef.current = mesh;

    const updatePlacement = () => {
      if (!container || !renderer) return;

      renderer.dpr = Math.min(window.devicePixelRatio, 2);
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);

      const width = clientWidth * renderer.dpr;
      const height = clientHeight * renderer.dpr;
      uniforms.iResolution.value = [width, height];

      const { anchor, dir } = getAnchorAndDir(raysOrigin, width, height);
      uniforms.rayPos.value = anchor;
      uniforms.rayDir.value = dir;
    };

    const loop = (time: number) => {
      if (!rendererRef.current || !uniformsRef.current || !meshRef.current) return;

      uniforms.iTime.value = time * 0.001;

      if (followMouse && mouseInfluence > 0) {
        const smoothing = 0.92;
        smoothMouseRef.current.x =
          smoothMouseRef.current.x * smoothing + mouseRef.current.x * (1 - smoothing);
        smoothMouseRef.current.y =
          smoothMouseRef.current.y * smoothing + mouseRef.current.y * (1 - smoothing);
        uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y];
      }

      renderer.render({ scene: mesh });
      animationIdRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("resize", updatePlacement);
    updatePlacement();
    animationIdRef.current = requestAnimationFrame(loop);

    cleanupRef.current = () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", updatePlacement);

      try {
        const ext = renderer.gl.getExtension("WEBGL_lose_context");
        ext?.loseContext();
        gl.canvas.remove();
      } catch {
        // ignore cleanup errors
      }

      rendererRef.current = null;
      uniformsRef.current = null;
      meshRef.current = null;
    };

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [followMouse, intensity, isVisible, lightSpread, mouseInfluence, rayLength, raysColor, raysOrigin, raysSpeed]);

  useEffect(() => {
    const uniforms = uniformsRef.current;
    const renderer = rendererRef.current;
    const container = containerRef.current;
    if (!uniforms || !renderer || !container) return;

    uniforms.raysColor.value = hexToRgb(raysColor);
    uniforms.raysSpeed.value = raysSpeed;
    uniforms.lightSpread.value = lightSpread;
    uniforms.rayLength.value = rayLength;
    uniforms.intensity.value = intensity;
    uniforms.mouseInfluence.value = followMouse ? mouseInfluence : 0;

    const { clientWidth, clientHeight } = container;
    const { anchor, dir } = getAnchorAndDir(
      raysOrigin,
      clientWidth * renderer.dpr,
      clientHeight * renderer.dpr,
    );
    uniforms.rayPos.value = anchor;
    uniforms.rayDir.value = dir;
  }, [followMouse, intensity, lightSpread, mouseInfluence, rayLength, raysColor, raysOrigin, raysSpeed]);

  useEffect(() => {
    if (!followMouse) return;

    const handleMouseMove = (event: MouseEvent) => {
      const node = containerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      mouseRef.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [followMouse]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-[#030303]" aria-hidden>
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
