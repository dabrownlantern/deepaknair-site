"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type Kind = "hub" | "branch" | "leaf";

type Node3D = {
  // object-space (unrotated) position, unit sphere
  ox: number;
  oy: number;
  oz: number;
  kind: Kind;
  color: string;
  // Cluster index each node belongs to. -1 for the hub itself.
  cluster: number;
};

type Edge = {
  a: number;
  b: number;
  color: string;
  cluster: number; // same convention; -1 for hub links & weak ties
  weak?: boolean;
};

export type ClusterLabel = {
  name: string;
  metric: string;
  // When set, the cluster is clickable and navigates here on click.
  // Typically a case-study URL so the visualization doubles as navigation.
  href?: string;
};

const HUB_COLOR = "156, 93, 10"; // signal amber — the hub is the brand center
const NEUTRAL = "90, 88, 82"; // warm gray — weak cross-ties only

// Each branch (and its leaves) takes one hue from this set, so the
// clusters read as distinct — different creator ecosystems radiating from
// one center, not a monochrome mesh.
const PALETTE = [
  "156, 93, 10", // amber      → Roblox
  "63, 122, 91", // sage       → Fortnite Creative
  "70, 103, 145", // slate blue → Meta Horizon
  "163, 92, 87", // terracotta → Nitrate Games
  "58, 128, 130", // teal       → Steam / indie
  "138, 108, 168", // muted violet → Media
];

// Camera distance as a multiple of the sphere radius. Lower = stronger
// perspective (bigger swing between near/far scale), higher = flatter.
const CAMERA_MULT = 3.8;

// How close the mouse (in screen px) must be to a branch node to
// "select" that cluster on hover.
const HIT_RADIUS = 60;

type Props = {
  // When present, each cluster is labeled and hover-interactive. Length
  // determines the number of branches (so clusters exactly match your
  // ecosystems, not an arbitrary count).
  labels?: ClusterLabel[];
  // Set false for a decorative, non-rotating instance elsewhere on the page.
  animate?: boolean;
  // Multiplies every alpha value — use <1 for a quieter background texture.
  // Labels ignore this and stay legible.
  opacityScale?: number;
  // Ignored if `labels` is provided (labels.length wins).
  branchCount?: number;
  // Offsets the starting rotation so repeated instances don't look identical.
  seedAngle?: number;
};

// Slowly-rotating 3D node graph — a central hub branching into clusters,
// like a mind map you could walk around. When `labels` is passed each
// cluster is named and hover-interactive: hover a cluster to brighten it,
// dim the rest, and see its metric callout.
export default function EcosystemNetwork({
  labels,
  animate = true,
  opacityScale = 1,
  branchCount,
  seedAngle = 0.4,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  const effectiveBranchCount = labels ? labels.length : (branchCount ?? 8);

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
    // Mouse tracking + which cluster is currently under the cursor.
    let mouseX = -9999;
    let mouseY = -9999;
    let hovered: number | null = null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function buildGraph() {
      nodes = [
        { ox: 0, oy: 0, oz: 0, kind: "hub", color: HUB_COLOR, cluster: -1 },
      ];
      edges = [];

      const golden = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < effectiveBranchCount; i++) {
        const t = (i + 0.5) / effectiveBranchCount;
        const inclination = Math.acos(1 - 2 * t);
        const azimuth = golden * i;
        const bx = Math.sin(inclination) * Math.cos(azimuth);
        const by = Math.sin(inclination) * Math.sin(azimuth);
        const bz = Math.cos(inclination);
        const branchIdx = nodes.length;
        const clusterColor = PALETTE[i % PALETTE.length];
        nodes.push({
          ox: bx,
          oy: by,
          oz: bz,
          kind: "branch",
          color: clusterColor,
          cluster: i,
        });
        edges.push({ a: 0, b: branchIdx, color: clusterColor, cluster: i });

        const leafCount = 3 + (i % 3);
        for (let j = 0; j < leafCount; j++) {
          const spread = 0.5;
          const lx = bx * (1 + spread) + (Math.random() - 0.5) * 0.3;
          const ly = by * (1 + spread) + (Math.random() - 0.5) * 0.3;
          const lz = bz * (1 + spread) + (Math.random() - 0.5) * 0.3;
          const leafIdx = nodes.length;
          nodes.push({
            ox: lx,
            oy: ly,
            oz: lz,
            kind: "leaf",
            color: clusterColor,
            cluster: i,
          });
          edges.push({
            a: branchIdx,
            b: leafIdx,
            color: clusterColor,
            cluster: i,
          });
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
        edges.push({ a, b, color: NEUTRAL, cluster: -1, weak: true });
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

      const camDist = CAMERA_MULT;
      minScale = camDist / (camDist + 1.75);
      maxScale = camDist / (camDist - 1.75);
    }

    function radius() {
      return Math.min(width, height) * 0.52;
    }

    function rotate(n: Node3D, ay: number, ax: number) {
      let x = n.ox * Math.cos(ay) + n.oz * Math.sin(ay);
      let z = -n.ox * Math.sin(ay) + n.oz * Math.cos(ay);
      const y0 = n.oy;
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

    function closeness(scale: number) {
      const t = (scale - minScale) / (maxScale - minScale);
      return Math.min(1, Math.max(0, t));
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height);

      const ax = Math.sin(time * 0.00025) * 0.2;
      const projected = nodes.map((n) => project(rotate(n, angleY, ax)));

      // Update hover: find nearest branch node within HIT_RADIUS of the mouse.
      hovered = null;
      if (labels && mouseX > -9000) {
        let bestDist = HIT_RADIUS;
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (n.kind !== "branch") continue;
          const p = projected[i];
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < bestDist) {
            bestDist = d;
            hovered = n.cluster;
          }
        }
      }

      // How much to boost the hovered cluster's alpha, and how much to
      // dim everything else. Only active when hover interaction is on.
      const boost = hovered !== null ? 3 : 1;
      const dim = hovered !== null ? 0.35 : 1;

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
        const isHovered = hovered !== null && e.cluster === hovered;
        const clusterMult = hovered === null ? 1 : isHovered ? boost : dim;
        const alpha =
          (e.weak ? 0.05 + c * 0.12 : 0.1 + c * 0.22) *
          opacityScale *
          clusterMult;
        ctx!.strokeStyle = `rgba(${e.color}, ${Math.min(alpha, 1)})`;
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
        const isHovered =
          hovered !== null && n.cluster === hovered && n.kind !== "hub";
        const clusterMult =
          hovered === null || n.kind === "hub"
            ? 1
            : n.cluster === hovered
              ? boost
              : dim;
        const baseR = n.kind === "hub" ? 14 : n.kind === "branch" ? 8.5 : 5.8;
        const r = baseR * (0.65 + c * 0.9) * (isHovered ? 1.25 : 1);
        const alpha =
          (n.kind === "hub" ? 0.45 + c * 0.3 : 0.28 + c * 0.32) *
          opacityScale *
          clusterMult;
        ctx!.fillStyle = `rgba(${n.color}, ${Math.min(alpha, 1)})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Labels: draw ALL cluster names, always. Front-facing clusters
      // (positive rotated z) get full-strength labels; back-facing ones
      // are dimmed so depth still reads without hiding them. On hover,
      // the metric appears below the name as a callout.
      if (labels) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (n.kind !== "branch") continue;
          const label = labels[n.cluster];
          if (!label) continue;
          const p = projected[i];
          const isFront = p.scale >= 1; // 1 = at equator; >1 = closer than center
          const isThisHovered = hovered === n.cluster;
          const nameAlpha = isThisHovered ? 1 : isFront ? 0.85 : 0.4;

          ctx!.font = "600 11px ui-monospace, monospace";
          ctx!.textBaseline = "middle";
          const offsetX = p.x > width / 2 ? -18 : 18;
          const anchorX = p.x + offsetX;
          const anchorY = p.y;
          ctx!.textAlign = offsetX < 0 ? "right" : "left";

          const nameText = label.name.toUpperCase();
          // Backdrop pill for readability against the moving graph.
          const padX = 6;
          const padY = 3;
          const metrics = ctx!.measureText(nameText);
          const textW = metrics.width;
          const boxX = offsetX < 0 ? anchorX - textW - padX : anchorX - padX;
          const boxY = anchorY - 8 - padY;
          const boxW = textW + padX * 2;
          const boxH = 16 + padY * 2;
          ctx!.fillStyle = `rgba(255, 255, 255, ${
            isThisHovered ? 0.92 : isFront ? 0.75 : 0.45
          })`;
          ctx!.fillRect(boxX, boxY, boxW, boxH);

          ctx!.fillStyle = `rgba(${n.color}, ${nameAlpha})`;
          ctx!.fillText(nameText, anchorX, anchorY);

          // Metric callout on hover
          if (isThisHovered) {
            ctx!.font = "500 12px ui-monospace, monospace";
            const metricText = label.metric;
            const metricY = anchorY + 22;
            const mMetrics = ctx!.measureText(metricText);
            const mW = mMetrics.width;
            const mBoxX = offsetX < 0 ? anchorX - mW - padX : anchorX - padX;
            const mBoxY = metricY - 8 - padY;
            const mBoxW = mW + padX * 2;
            const mBoxH = 16 + padY * 2;
            ctx!.fillStyle = "rgba(255, 255, 255, 0.95)";
            ctx!.fillRect(mBoxX, mBoxY, mBoxW, mBoxH);
            ctx!.fillStyle = "rgba(27, 30, 36, 0.9)";
            ctx!.fillText(metricText, anchorX, metricY);
          }
        }
      }
    }

    function step(t: number) {
      if (!start) start = t;
      const elapsed = t - start;
      angleY = seedAngle + elapsed * 0.00012;
      draw(elapsed);
      rafId = requestAnimationFrame(step);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      // Reflect click affordance in the cursor when the hovered cluster
      // has an href attached.
      const hoveredHref =
        hovered !== null && labels && labels[hovered]?.href;
      canvas!.style.cursor = hoveredHref ? "pointer" : "default";
      if (reduceMotion) draw(0);
    }

    function onMouseLeave() {
      mouseX = -9999;
      mouseY = -9999;
      canvas!.style.cursor = "default";
      if (reduceMotion) draw(0);
    }

    function onClick() {
      if (hovered === null || !labels) return;
      const href = labels[hovered]?.href;
      if (href) router.push(href);
    }

    buildGraph();
    seed();
    draw(0);
    if (!reduceMotion) {
      rafId = requestAnimationFrame(step);
    }

    const onResize = () => seed();
    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
    };
  }, [animate, opacityScale, effectiveBranchCount, seedAngle, labels, router]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="h-full w-full"
      style={labels ? { cursor: "default" } : undefined}
    />
  );
}
