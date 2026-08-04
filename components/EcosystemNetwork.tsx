"use client";

import { useEffect, useRef } from "react";

type Kind = "hub" | "branch" | "leaf";

type Node3D = {
  // object-space (unrotated) position, unit sphere
  ox: number;
  oy: number;
  oz: number;
  kind: Kind;
  color: string;
};

type Edge = {
  a: number;
  b: number;
  color: string;
  weak?: boolean;
};

const HUB_COLOR = "156, 93, 10"; // signal amber — the hub is the brand center
const NEUTRAL = "90, 88, 82"; // warm gray — weak cross-ties only

// Each branch (and its leaves) takes one hue from this set, so the
// clusters read as distinct — different creator ecosystems radiating from
// one center, not a monochrome mesh.
const PALETTE = [
  "156, 93, 10", // amber
  "63, 122, 91", // sage
  "70, 103, 145", // slate blue
  "163, 92, 87", // terracotta
  "58, 128, 130", // teal
  "138, 108, 168", // muted violet
];

// Camera distance as a multiple of the sphere radius. Lower = stronger
// perspective (bigger swing between near/far scale), higher = flatter.
const CAMERA_MULT = 3.8;

type Props = {
  // Set false for a decorative, non-rotating instance elsewhere on the page.
  animate?: boolean;
  // Multiplies every alpha value — use <1 for a quieter background texture.
  opacityScale?: number;
  // Fewer branches/leaves reads as sparser texture rather than a hero centerpiece.
  branchCount?: number;
  // Offsets the starting rotation so repeated instances don't look identical.
  seedAngle?: number;
};

// Full-bleed 3D node graph — a central hub branching into clusters, like a
// mind map you could walk around. Reused at full strength (animated) in the
// hero, and at reduced density/opacity (static) as a texture elsewhere on
// the page, so the "ecosystem" motif carries through instead of living only
// in the hero.
export default function EcosystemNetwork({
  animate = true,
  opacityScale = 1,
  branchCount = 8,
  seedAngle = 0.4,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion =
      !animate ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let nodes: Node3D[] = [];
    let edges: Edge[] = [];
    let rafId = 0;
    let angleY = seedAngle;
    let start = 0;
    let minScale = 0.6;
    let maxScale = 1.6;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function buildGraph() {
      nodes = [{ ox: 0, oy: 0, oz: 0, kind: "hub", color: HUB_COLOR }];
      edges = [];

      const golden = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < branchCount; i++) {
        const t = (i + 0.5) / branchCount;
        const inclination = Math.acos(1 - 2 * t);
        const azimuth = golden * i;
        const bx = Math.sin(inclination) * Math.cos(azimuth);
        const by = Math.sin(inclination) * Math.sin(azimuth);
        const bz = Math.cos(inclination);
        const branchIdx = nodes.length;
        const clusterColor = PALETTE[i % PALETTE.length];
        nodes.push({ ox: bx, oy: by, oz: bz, kind: "branch", color: clusterColor });
        edges.push({ a: 0, b: branchIdx, color: clusterColor });

        const leafCount = 3 + (i % 3);
        for (let j = 0; j < leafCount; j++) {
          const spread = 0.5;
          const lx = bx * (1 + spread) + (Math.random() - 0.5) * 0.3;
          const ly = by * (1 + spread) + (Math.random() - 0.5) * 0.3;
          const lz = bz * (1 + spread) + (Math.random() - 0.5) * 0.3;
          const leafIdx = nodes.length;
          nodes.push({ ox: lx, oy: ly, oz: lz, kind: "leaf", color: clusterColor });
          edges.push({ a: branchIdx, b: leafIdx, color: clusterColor });
        }
      }

      // A few weak cross-ties between branches so it reads as a network,
      // not a strict tree.
      const branchIndices = nodes
        .map((n, i) => (n.kind === "branch" ? i : -1))
        .filter((i) => i >= 0);
      for (let i = 0; i < branchIndices.length; i++) {
        const a = branchIndices[i];
        const b = branchIndices[(i + 3) % branchIndices.length];
        edges.push({ a, b, color: NEUTRAL, weak: true });
      }
    }

    function seed() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Precompute the achievable scale range for this radius/camera so
      // alpha and size can be normalized to it below, instead of guessing.
      const camDist = CAMERA_MULT;
      minScale = camDist / (camDist + 1.75);
      maxScale = camDist / (camDist - 1.75);
    }

    function radius() {
      return Math.min(width, height) * 0.52;
    }

    function rotate(n: Node3D, ay: number, ax: number) {
      // rotate around Y
      let x = n.ox * Math.cos(ay) + n.oz * Math.sin(ay);
      let z = -n.ox * Math.sin(ay) + n.oz * Math.cos(ay);
      const y0 = n.oy;
      // rotate around X
      const y = y0 * Math.cos(ax) - z * Math.sin(ax);
      z = y0 * Math.sin(ax) + z * Math.cos(ax);
      return { x, y, z };
    }

    function project(n: { x: number; y: number; z: number }) {
      const R = radius();
      const camDist = CAMERA_MULT * R;
      const scale = camDist / (camDist - n.z * R);
      return {
        x: width / 2 + n.x * R * scale,
        y: height / 2 + n.y * R * scale,
        scale,
      };
    }

    // Map a raw perspective scale to a 0..1 "closeness" value.
    function closeness(scale: number) {
      const t = (scale - minScale) / (maxScale - minScale);
      return Math.min(1, Math.max(0, t));
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height);

      const ax = Math.sin(time * 0.00025) * 0.2;
      const projected = nodes.map((n) => project(rotate(n, angleY, ax)));

      // edges, farthest first
      const edgeOrder = edges
        .map((e, i) => ({
          e,
          i,
          depth: (projected[e.a].scale + projected[e.b].scale) / 2,
        }))
        .sort((p, q) => p.depth - q.depth);

      for (const { e } of edgeOrder) {
        const a = projected[e.a];
        const b = projected[e.b];
        const c = closeness((a.scale + b.scale) / 2);
        const alpha = (e.weak ? 0.05 + c * 0.12 : 0.1 + c * 0.22) * opacityScale;
        ctx!.strokeStyle = `rgba(${e.color}, ${alpha})`;
        ctx!.lineWidth = e.weak ? 1 : 1.2 + c * 0.8;
        if (e.weak) ctx!.setLineDash([2, 4]);
        else ctx!.setLineDash([]);
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
      }
      ctx!.setLineDash([]);

      // nodes, farthest first
      const nodeOrder = nodes
        .map((n, i) => ({ n, i }))
        .sort((p, q) => projected[p.i].scale - projected[q.i].scale);

      for (const { n, i } of nodeOrder) {
        const p = projected[i];
        const c = closeness(p.scale);
        const baseR = n.kind === "hub" ? 14 : n.kind === "branch" ? 8.5 : 5.8;
        const r = baseR * (0.65 + c * 0.9);
        const alpha =
          (n.kind === "hub" ? 0.45 + c * 0.3 : 0.28 + c * 0.32) * opacityScale;
        ctx!.fillStyle = `rgba(${n.color}, ${alpha})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function step(t: number) {
      if (!start) start = t;
      const elapsed = t - start;
      angleY = seedAngle + elapsed * 0.00012;
      draw(elapsed);
      rafId = requestAnimationFrame(step);
    }

    buildGraph();
    seed();
    draw(0);
    if (!reduceMotion) {
      rafId = requestAnimationFrame(step);
    }

    const onResize = () => seed();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, [animate, opacityScale, branchCount, seedAngle]);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />
  );
}
