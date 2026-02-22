"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const mono = {
  fontFamily: "var(--font-geist-mono, ui-monospace, monospace)",
};

function Figure({
  children,
  caption,
}: {
  children: React.ReactNode;
  caption?: string;
}) {
  return (
    <figure className="my-10">
      <div className="rounded-lg border border-border p-6">{children}</div>
      {caption && (
        <figcaption className="mt-2.5 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ────────────────────────────────────
// Diagrams
// ────────────────────────────────────

function MemoryWallDiagram() {
  return (
    <Figure caption="On-chip SRAM is 100× faster than off-chip DRAM, but thousands of times less dense.">
      <svg viewBox="0 0 560 230" className="w-full">
        <rect
          x="10" y="20" width="140" height="90" rx="6"
          fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.7"
        />
        <text
          x="80" y="55" textAnchor="middle" fontSize="13" fontWeight="600"
          style={{ ...mono, fill: "var(--foreground)" }}
        >
          COMPUTE
        </text>
        <text
          x="80" y="78" textAnchor="middle" fontSize="10"
          style={{ ...mono, fill: "var(--muted-foreground)" }}
        >
          SRAM · ~1ns
        </text>

        <rect
          x="410" y="20" width="140" height="90" rx="6"
          fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" opacity="0.4"
        />
        <text
          x="480" y="55" textAnchor="middle" fontSize="13" fontWeight="600"
          style={{ ...mono, fill: "var(--foreground)" }}
        >
          MEMORY
        </text>
        <text
          x="480" y="78" textAnchor="middle" fontSize="10"
          style={{ ...mono, fill: "var(--muted-foreground)" }}
        >
          DRAM · ~100ns
        </text>

        <text
          x="280" y="38" textAnchor="middle" fontSize="9" letterSpacing="0.05em"
          style={{ ...mono, fill: "var(--muted-foreground)" }}
        >
          BANDWIDTH BOTTLENECK
        </text>

        <line x1="150" y1="58" x2="410" y2="58" stroke="var(--border)" strokeWidth="0.5" />
        <line x1="150" y1="72" x2="410" y2="72" stroke="var(--border)" strokeWidth="0.5" />

        {[0, 0.7, 1.4, 2.1].map((delay, i) => (
          <circle key={i} r="3" style={{ fill: "var(--accent)" }} opacity={0.8 - i * 0.15}>
            <animateMotion
              dur="2.5s" repeatCount="indefinite" begin={`${delay}s`}
              path="M410,65 L150,65"
            />
          </circle>
        ))}

        <text
          x="10" y="145" fontSize="9" letterSpacing="0.05em"
          style={{ ...mono, fill: "var(--muted-foreground)" }}
        >
          ACCESS LATENCY
        </text>

        <rect x="10" y="158" width="5" height="16" rx="2" fill="var(--accent)" />
        <text x="24" y="171" fontSize="11" style={{ ...mono, fill: "var(--foreground)" }}>
          SRAM ~1ns
        </text>

        <rect x="10" y="186" width="500" height="16" rx="2" fill="var(--muted-foreground)" opacity="0.15" />
        <text x="24" y="199" fontSize="11" style={{ ...mono, fill: "var(--foreground)" }}>
          DRAM ~100ns
        </text>
        <text
          x="520" y="199" textAnchor="end" fontSize="10" fontWeight="600"
          style={{ ...mono, fill: "var(--muted-foreground)" }}
        >
          100×
        </text>
      </svg>
    </Figure>
  );
}

function ArchitectureComparison() {
  return (
    <Figure caption="Traditional chips shuttle data between separate memory and compute. Taalas processes data where it's stored.">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <div className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
            Traditional
          </div>
          <svg viewBox="0 0 220 180" className="w-full">
            <rect
              x="10" y="10" width="200" height="50" rx="4"
              fill="none" stroke="var(--muted-foreground)" strokeWidth="1" opacity="0.4"
            />
            <text
              x="110" y="32" textAnchor="middle" fontSize="11" fontWeight="600"
              style={{ ...mono, fill: "var(--foreground)" }}
            >
              HBM MEMORY
            </text>
            <text
              x="110" y="48" textAnchor="middle" fontSize="8"
              style={{ ...mono, fill: "var(--muted-foreground)" }}
            >
              dense · slow to access
            </text>

            {[50, 110, 170].map((x, i) => (
              <g key={i}>
                <line
                  x1={x} y1={60} x2={x} y2={90}
                  stroke="var(--muted-foreground)" strokeWidth="0.75" strokeDasharray="3 3"
                />
                <circle r="2" fill="var(--muted-foreground)" opacity="0.5">
                  <animateMotion
                    dur="1.5s" repeatCount="indefinite" begin={`${i * 0.3}s`}
                    path={`M${x},60 L${x},90`}
                  />
                </circle>
                <circle r="2" fill="var(--muted-foreground)" opacity="0.3">
                  <animateMotion
                    dur="1.5s" repeatCount="indefinite" begin={`${i * 0.3 + 0.75}s`}
                    path={`M${x},90 L${x},60`}
                  />
                </circle>
              </g>
            ))}

            <rect
              x="10" y="90" width="200" height="50" rx="4"
              fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.4"
            />
            <text
              x="110" y="112" textAnchor="middle" fontSize="11" fontWeight="600"
              style={{ ...mono, fill: "var(--foreground)" }}
            >
              GPU COMPUTE
            </text>
            <text
              x="110" y="128" textAnchor="middle" fontSize="8"
              style={{ ...mono, fill: "var(--muted-foreground)" }}
            >
              fast · starved for data
            </text>

            <text
              x="110" y="165" textAnchor="middle" fontSize="8"
              style={{ ...mono, fill: "var(--muted-foreground)" }}
            >
              data moves constantly
            </text>
          </svg>
        </div>

        <div>
          <div className="text-xs text-accent mb-3 font-medium uppercase tracking-wider">
            Taalas
          </div>
          <svg viewBox="0 0 220 180" className="w-full">
            <rect
              x="10" y="10" width="200" height="130" rx="6"
              fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5"
            />

            {Array.from({ length: 5 }).map((_, row) =>
              Array.from({ length: 6 }).map((_, col) => (
                <rect
                  key={`${row}-${col}`}
                  x={20 + col * 31} y={20 + row * 22}
                  width="25" height="16" rx="2"
                  fill="var(--accent)" opacity="0.1"
                  stroke="var(--accent)" strokeWidth="0.3"
                />
              ))
            )}

            {[
              [0, 0], [1, 2], [2, 4], [3, 1], [4, 3],
              [0, 5], [2, 0], [1, 4], [3, 5], [4, 1],
            ].map(([row, col], i) => (
              <rect
                key={`p-${i}`}
                x={20 + col * 31} y={20 + row * 22}
                width="25" height="16" rx="2"
                fill="var(--accent)"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.35;0" dur="2.5s"
                  begin={`${i * 0.25}s`} repeatCount="indefinite"
                />
              </rect>
            ))}

            <text
              x="110" y="165" textAnchor="middle" fontSize="8"
              style={{ ...mono, fill: "var(--accent)" }}
            >
              compute happens where data lives
            </text>
          </svg>
        </div>
      </div>
    </Figure>
  );
}

function ExecutionComparison() {
  const steps = [
    { label: "FETCH", y: 20 },
    { label: "DECODE", y: 66 },
    { label: "SCHEDULE", y: 112 },
    { label: "LOAD WEIGHTS", y: 158, accent: true },
    { label: "EXECUTE", y: 204 },
    { label: "WRITE BACK", y: 250 },
  ];

  return (
    <Figure caption="The GPU repeats a 6-step instruction cycle thousands of times per token. In the ASIC, data flows straight through fixed silicon.">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* GPU - instruction cycle as a visual loop */}
        <div>
          <div className="text-xs text-muted-foreground mb-4 font-medium uppercase tracking-wider">
            GPU · instruction cycle
          </div>
          <svg viewBox="0 0 260 340" className="w-full">
            {steps.map((step, i) => (
              <g key={i}>
                <rect
                  x="56" y={step.y} width="176" height="30" rx="4"
                  fill={step.accent ? "var(--accent)" : "var(--muted-foreground)"}
                  opacity={step.accent ? 0.08 : 0.04}
                  stroke={step.accent ? "var(--accent)" : "var(--border)"}
                  strokeWidth={step.accent ? 1 : 0.75}
                />
                <text
                  x="144" y={step.y + 19} textAnchor="middle" fontSize="10"
                  style={{
                    ...mono,
                    fill: step.accent ? "var(--accent)" : "var(--muted-foreground)",
                  }}
                >
                  {step.label}
                </text>
                {i < steps.length - 1 && (
                  <line
                    x1="144" y1={step.y + 30} x2="144" y2={steps[i + 1].y}
                    stroke="var(--border)" strokeWidth="0.75"
                  />
                )}
              </g>
            ))}

            {/* Loop-back dashed path */}
            <path
              d="M144,280 L144,296 L32,296 L32,20 L54,20"
              fill="none" stroke="var(--muted-foreground)" strokeWidth="0.75"
              strokeDasharray="4 3" opacity="0.25"
            />
            <polygon
              points="54,16 54,24 58,20"
              fill="var(--muted-foreground)" opacity="0.25"
            />

            <text
              x="144" y="326" textAnchor="middle" fontSize="9"
              style={{ ...mono, fill: "var(--muted-foreground)", opacity: 0.5 }}
            >
              {"× 4,096 per token"}
            </text>

            {/* Animated dot cycling the loop */}
            <circle r="3" fill="var(--muted-foreground)" opacity="0.4">
              <animateMotion
                dur="3.5s" repeatCount="indefinite"
                path="M144,35 L144,296 L32,296 L32,20 L144,20 L144,35"
              />
            </circle>
          </svg>
        </div>

        {/* Taalas - pipeline with expanded layer internals */}
        <div>
          <div className="text-xs text-accent mb-4 font-medium uppercase tracking-wider">
            Taalas · hardwired pipeline
          </div>
          <svg viewBox="0 0 260 340" className="w-full">
            {/* Token in */}
            <text
              x="130" y="12" textAnchor="middle" fontSize="9"
              style={{ ...mono, fill: "var(--muted-foreground)" }}
            >
              token in
            </text>
            <line x1="130" y1="18" x2="130" y2="26" stroke="var(--accent)" strokeWidth="0.75" />

            {/* Embed */}
            <rect
              x="40" y="28" width="180" height="24" rx="4"
              fill="var(--accent)" opacity="0.08"
              stroke="var(--accent)" strokeWidth="0.5"
            />
            <text
              x="130" y="44" textAnchor="middle" fontSize="9" fontWeight="600"
              style={{ ...mono, fill: "var(--foreground)" }}
            >
              EMBED
            </text>
            {[-20, -8, 4, 16].map((dx, i) => (
              <circle key={`e${i}`} cx={130 + dx} cy={49} r="1" fill="var(--accent)" opacity="0.35" />
            ))}
            <line x1="130" y1="52" x2="130" y2="60" stroke="var(--accent)" strokeWidth="0.75" />

            {/* Layer 1 - expanded container */}
            <rect
              x="20" y="62" width="220" height="138" rx="6"
              fill="var(--accent)" opacity="0.03"
              stroke="var(--accent)" strokeWidth="0.75"
            />
            <text
              x="32" y="76" fontSize="8" fontWeight="600"
              style={{ ...mono, fill: "var(--accent)", opacity: 0.6 }}
            >
              LAYER 1
            </text>

            {/* Norm */}
            <rect
              x="40" y="82" width="180" height="14" rx="2"
              fill="var(--accent)" opacity="0.05"
              stroke="var(--accent)" strokeWidth="0.3"
            />
            <text
              x="130" y="92" textAnchor="middle" fontSize="7"
              style={{ ...mono, fill: "var(--muted-foreground)" }}
            >
              NORM
            </text>
            <line x1="130" y1="96" x2="130" y2="104" stroke="var(--accent)" strokeWidth="0.5" />

            {/* Q, K, V projections */}
            {[
              { label: "Q", x: 44 },
              { label: "K", x: 103 },
              { label: "V", x: 162 },
            ].map((p) => (
              <g key={p.label}>
                <rect
                  x={p.x} y={106} width="54" height="22" rx="3"
                  fill="var(--accent)" opacity="0.1"
                  stroke="var(--accent)" strokeWidth="0.5"
                />
                <text
                  x={p.x + 27} y={119} textAnchor="middle" fontSize="9"
                  style={{ ...mono, fill: "var(--foreground)" }}
                >
                  {p.label}
                </text>
                {[-8, 0, 8].map((dx, i) => (
                  <circle key={i} cx={p.x + 27 + dx} cy={124} r="1" fill="var(--accent)" opacity="0.35" />
                ))}
              </g>
            ))}

            {/* Converge lines to attention */}
            <line x1="71" y1="128" x2="130" y2="140" stroke="var(--accent)" strokeWidth="0.4" opacity="0.4" />
            <line x1="130" y1="128" x2="130" y2="140" stroke="var(--accent)" strokeWidth="0.4" opacity="0.4" />
            <line x1="189" y1="128" x2="130" y2="140" stroke="var(--accent)" strokeWidth="0.4" opacity="0.4" />

            {/* Attention */}
            <rect
              x="60" y="142" width="140" height="20" rx="3"
              fill="var(--accent)" opacity="0.08"
              stroke="var(--accent)" strokeWidth="0.5"
            />
            <text
              x="130" y="155" textAnchor="middle" fontSize="8"
              style={{ ...mono, fill: "var(--foreground)" }}
            >
              ATTEND
            </text>
            <line x1="130" y1="162" x2="130" y2="170" stroke="var(--accent)" strokeWidth="0.5" />

            {/* FFN */}
            <rect
              x="60" y="172" width="140" height="20" rx="3"
              fill="var(--accent)" opacity="0.1"
              stroke="var(--accent)" strokeWidth="0.5"
            />
            <text
              x="130" y="185" textAnchor="middle" fontSize="8"
              style={{ ...mono, fill: "var(--foreground)" }}
            >
              FFN
            </text>
            {[-12, -4, 4, 12].map((dx, i) => (
              <circle key={`f${i}`} cx={130 + dx} cy={189} r="1" fill="var(--accent)" opacity="0.35" />
            ))}

            {/* End of Layer 1 → dots */}
            <line x1="130" y1="200" x2="130" y2="210" stroke="var(--accent)" strokeWidth="0.75" />
            {[0, 1, 2].map((i) => (
              <circle key={i} cx="130" cy={220 + i * 10} r="1.5" fill="var(--accent)" opacity="0.4" />
            ))}

            {/* Layer 32 */}
            <line x1="130" y1="248" x2="130" y2="254" stroke="var(--accent)" strokeWidth="0.75" />
            <rect
              x="40" y="256" width="180" height="26" rx="4"
              fill="var(--accent)" opacity="0.08"
              stroke="var(--accent)" strokeWidth="0.5"
            />
            <text
              x="130" y="273" textAnchor="middle" fontSize="9" fontWeight="600"
              style={{ ...mono, fill: "var(--foreground)" }}
            >
              LAYER 32
            </text>
            <line x1="130" y1="282" x2="130" y2="288" stroke="var(--accent)" strokeWidth="0.75" />

            {/* Output */}
            <rect
              x="40" y="290" width="180" height="24" rx="4"
              fill="var(--accent)" opacity="0.08"
              stroke="var(--accent)" strokeWidth="0.5"
            />
            <text
              x="130" y="306" textAnchor="middle" fontSize="9" fontWeight="600"
              style={{ ...mono, fill: "var(--foreground)" }}
            >
              OUTPUT
            </text>
            <line x1="130" y1="314" x2="130" y2="320" stroke="var(--accent)" strokeWidth="0.75" />

            <text
              x="130" y="334" textAnchor="middle" fontSize="9"
              style={{ ...mono, fill: "var(--muted-foreground)" }}
            >
              token out
            </text>

            {/* Animated dot flowing straight through */}
            <circle r="3" fill="var(--accent)" opacity="0.6">
              <animateMotion
                dur="3.5s" repeatCount="indefinite"
                path="M130,18 L130,334"
              />
            </circle>
          </svg>
        </div>
      </div>
    </Figure>
  );
}

function DieComparison() {
  const overhead = [
    { label: "Cache", x: 8, y: 92, w: 100, h: 32 },
    { label: "Instruction", x: 112, y: 92, w: 100, h: 32 },
    { label: "Scheduler", x: 8, y: 128, w: 68, h: 32 },
    { label: "Registers", x: 80, y: 128, w: 68, h: 32 },
    { label: "I/O", x: 152, y: 128, w: 60, h: 32 },
    { label: "Mem Controller", x: 8, y: 164, w: 136, h: 32 },
    { label: "DMA", x: 148, y: 164, w: 64, h: 32 },
  ];

  const layers = [0, 1, 2, 3];

  return (
    <Figure caption="On a GPU, ~60% of silicon is infrastructure that doesn't compute tokens. On a model-specific ASIC, every block runs part of the model.">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* GPU die - realistic layout */}
        <div>
          <div className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
            General Purpose
          </div>
          <svg viewBox="0 0 220 230" className="w-full">
            <rect
              x="0" y="0" width="220" height="230" rx="6"
              fill="none" stroke="var(--border)" strokeWidth="1"
            />

            {/* Compute area - active, highlighted */}
            <rect
              x="8" y="8" width="204" height="76" rx="4"
              fill="var(--accent)" opacity="0.12"
              stroke="var(--accent)" strokeWidth="0.5"
            />
            {/* Core grid inside compute area */}
            {Array.from({ length: 2 }).map((_, row) =>
              Array.from({ length: 4 }).map((_, col) => (
                <rect
                  key={`c-${row}-${col}`}
                  x={16 + col * 48} y={16 + row * 32}
                  width="40" height="24" rx="2"
                  fill="var(--accent)" opacity="0.1"
                />
              ))
            )}
            <text
              x="110" y="78" textAnchor="middle" fontSize="8"
              style={{ ...mono, fill: "var(--accent)", opacity: 0.7 }}
            >
              Compute Cores
            </text>

            {/* Overhead blocks - very dim */}
            {overhead.map((b) => (
              <g key={b.label}>
                <rect
                  x={b.x} y={b.y} width={b.w} height={b.h} rx="3"
                  fill="var(--muted-foreground)" opacity="0.04"
                  stroke="var(--border)" strokeWidth="0.5"
                />
                <text
                  x={b.x + b.w / 2} y={b.y + b.h / 2 + 3}
                  textAnchor="middle" fontSize="8"
                  style={{ ...mono, fill: "var(--muted-foreground)", opacity: 0.25 }}
                >
                  {b.label}
                </text>
              </g>
            ))}

            <text
              x="110" y="214" textAnchor="middle" fontSize="7"
              style={{ ...mono, fill: "var(--muted-foreground)", opacity: 0.2 }}
            >
              idle during inference
            </text>
          </svg>
          <div className="text-xs text-muted-foreground mt-2 text-center">
            ~40% of silicon active during inference
          </div>
        </div>

        {/* Model-specific die - labeled transformer blocks */}
        <div>
          <div className="text-xs text-accent mb-3 font-medium uppercase tracking-wider">
            Model Specific
          </div>
          <svg viewBox="0 0 220 230" className="w-full">
            <rect
              x="0" y="0" width="220" height="230" rx="6"
              fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.4"
            />

            {/* Embed strip */}
            <rect
              x="8" y="8" width="204" height="24" rx="3"
              fill="var(--accent)" opacity="0.15"
              stroke="var(--accent)" strokeWidth="0.5"
            />
            <text
              x="110" y="24" textAnchor="middle" fontSize="8"
              style={{ ...mono, fill: "var(--foreground)" }}
            >
              EMBED
            </text>

            {/* 4 rows of ATTN + FFN blocks */}
            {layers.map((row) => (
              <g key={`layer-${row}`}>
                <rect
                  x="8" y={40 + row * 38} width="100" height="32" rx="3"
                  fill="var(--accent)" opacity="0.15"
                  stroke="var(--accent)" strokeWidth="0.5"
                />
                <text
                  x="58" y={60 + row * 38} textAnchor="middle" fontSize="8"
                  style={{ ...mono, fill: "var(--foreground)" }}
                >
                  {`ATTN ${row * 8 + 1}–${(row + 1) * 8}`}
                </text>

                <rect
                  x="112" y={40 + row * 38} width="100" height="32" rx="3"
                  fill="var(--accent)" opacity="0.15"
                  stroke="var(--accent)" strokeWidth="0.5"
                />
                <text
                  x="162" y={60 + row * 38} textAnchor="middle" fontSize="8"
                  style={{ ...mono, fill: "var(--foreground)" }}
                >
                  {`FFN ${row * 8 + 1}–${(row + 1) * 8}`}
                </text>
              </g>
            ))}

            {/* Output strip */}
            <rect
              x="8" y="194" width="204" height="24" rx="3"
              fill="var(--accent)" opacity="0.15"
              stroke="var(--accent)" strokeWidth="0.5"
            />
            <text
              x="110" y="210" textAnchor="middle" fontSize="8"
              style={{ ...mono, fill: "var(--foreground)" }}
            >
              OUTPUT
            </text>

            {/* Subtle pulse across blocks */}
            {[
              { x: 8, y: 40, w: 100, h: 32 },
              { x: 112, y: 78, w: 100, h: 32 },
              { x: 8, y: 116, w: 100, h: 32 },
              { x: 112, y: 154, w: 100, h: 32 },
              { x: 8, y: 8, w: 204, h: 24 },
              { x: 8, y: 194, w: 204, h: 24 },
            ].map((b, i) => (
              <rect
                key={`pulse-${i}`}
                x={b.x} y={b.y} width={b.w} height={b.h} rx="3"
                fill="var(--accent)"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.15;0" dur="2.5s"
                  begin={`${i * 0.4}s`} repeatCount="indefinite"
                />
              </rect>
            ))}
          </svg>
          <div className="text-xs text-accent mt-2 text-center">
            100% serves the model
          </div>
        </div>
      </div>
    </Figure>
  );
}

function PerformanceBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const metrics = [
    { label: "Speed", unit: "tokens / sec", baseline: "~1,700", taalas: "17,000", baselineWidth: "10%", taalasWidth: "100%" },
    { label: "Build cost", unit: "relative", baseline: "1×", taalas: "0.05×", baselineWidth: "100%", taalasWidth: "5%" },
    { label: "Power", unit: "relative", baseline: "1×", taalas: "0.1×", baselineWidth: "100%", taalasWidth: "10%" },
  ];

  return (
    <Figure>
      <div ref={ref} className="space-y-6">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-sm text-foreground font-medium">{m.label}</span>
              <span className="text-xs text-muted-foreground">{m.unit}</span>
            </div>

            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-xs text-muted-foreground w-10 shrink-0 text-right">
                GPU
              </span>
              <div className="flex-1 h-3.5 rounded-sm bg-foreground/[0.04] overflow-hidden">
                <div
                  className="h-full rounded-sm transition-all duration-1000 ease-out"
                  style={{
                    width: visible ? m.baselineWidth : "0%",
                    background: "var(--muted-foreground)",
                    opacity: 0.2,
                  }}
                />
              </div>
              <span className="font-mono text-xs text-muted-foreground w-14 shrink-0 text-right">
                {m.baseline}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-accent w-10 shrink-0 text-right">
                HC1
              </span>
              <div className="flex-1 h-3.5 rounded-sm bg-foreground/[0.04] overflow-hidden">
                <div
                  className="h-full rounded-sm transition-all duration-1000 ease-out"
                  style={{
                    width: visible ? m.taalasWidth : "0%",
                    background: "var(--accent)",
                    opacity: 0.6,
                    transitionDelay: "200ms",
                  }}
                />
              </div>
              <span className="font-mono text-xs text-foreground font-medium w-14 shrink-0 text-right">
                {m.taalas}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Figure>
  );
}

// ────────────────────────────────────
// Article
// ────────────────────────────────────

export function SiliconArticle() {
  return (
    <main className="min-h-screen px-6 py-16 md:py-24 bg-background text-foreground transition-colors">
      <article className="mx-auto max-w-xl">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            &larr; Back
          </Link>
          <ThemeToggle />
        </div>

        <header className="mt-8 mb-12">
          <h1 className="text-3xl font-bold tracking-tight">
            The Path to Ubiquitous AI, Visualized
          </h1>
          <time className="mt-3 block text-sm text-muted-foreground">
            February 21, 2026
          </time>
        </header>

        <div className="space-y-5">
          <p className="text-muted leading-relaxed">
            AI inference is the most significant computational workload humanity
            has created. Every chat completion, every image generation, every
            code suggestion requires trillions of arithmetic operations.
          </p>
          <p className="text-muted leading-relaxed">
            The hardware running these workloads—GPUs designed for rendering
            pixels—was never built for this. A company called{" "}
            <a
              href="https://taalas.com"
              className="text-foreground hover:underline underline-offset-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Taalas
            </a>{" "}
            is rethinking the stack from the silicon up: custom chips where every
            transistor serves a single model. This is a deep dive into how that
            works.
          </p>
        </div>

        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-4">The Memory Wall</h2>
          <div className="space-y-5">
            <p className="text-muted leading-relaxed">
              When a language model generates a token, it reads its entire weight
              matrix from memory. For an 8B parameter model at 16-bit precision,
              that&apos;s ~16 gigabytes of data. Every single token.
            </p>
            <p className="text-muted leading-relaxed">
              The arithmetic itself is simple—multiply and accumulate. The
              bottleneck is feeding data to the compute units fast enough. DRAM
              is dense and cheap but takes ~100 nanoseconds to access. On-chip
              SRAM is fast (~1ns) but tiny and expensive.
            </p>

            <MemoryWallDiagram />

            <p className="text-muted leading-relaxed">
              This is the memory wall. Compute speed has grown exponentially over
              decades, but memory bandwidth hasn&apos;t kept pace. For AI
              inference—which is almost entirely memory-bound—this is the
              fundamental constraint.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-4">The GPU Approach</h2>
          <div className="space-y-5">
            <p className="text-muted leading-relaxed">
              Modern GPUs address the memory wall with brute force. High
              Bandwidth Memory (HBM) stacks DRAM dies vertically, connected via
              silicon interposers, delivering terabytes per second of bandwidth.
              Thousands of cores operate in parallel.
            </p>
            <p className="text-muted leading-relaxed">
              This works, but it&apos;s expensive. HBM costs 5-10× more per
              gigabyte than standard DRAM. Silicon interposers are among the most
              expensive components in modern semiconductors. Power consumption
              reaches 300-700 watts per chip, requiring liquid cooling.
            </p>
            <p className="text-muted leading-relaxed">
              The entire modern AI infrastructure stack—advanced packaging, HBM,
              massive I/O bandwidth, liquid cooling—exists to work around the
              memory wall. What if you could eliminate it instead?
            </p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-4">
            Compute Where the Data Lives
          </h2>
          <div className="space-y-5">
            <p className="text-muted leading-relaxed">
              Taalas inverts the problem. Instead of moving data faster, they
              eliminate data movement entirely.
            </p>
            <p className="text-muted leading-relaxed">
              Their approach: embed compute circuits directly inside the memory
              array. Each memory cell stores a model weight AND performs the
              multiply-accumulate operation in place. The data never leaves the
              memory.
            </p>

            <ArchitectureComparison />

            <p className="text-muted leading-relaxed">
              This is compute-in-memory at DRAM-level density. The bit-line and
              word-line structure of a memory array maps naturally to
              matrix-vector multiplication—the core operation of neural network
              inference. Store the weight matrix in the array, apply input
              activations as voltages, and read out the result as currents. The
              entire multiply happens in one memory access cycle.
            </p>
            <p className="text-muted leading-relaxed">
              No HBM stacks. No silicon interposer. No massive I/O bandwidth. No
              liquid cooling.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-4">One Chip, One Model</h2>
          <div className="space-y-5">
            <p className="text-muted leading-relaxed">
              Taalas goes further. Each chip is hardwired for a specific
              model&apos;s computation graph. To understand what that means,
              consider how a GPU actually runs a model.
            </p>
            <p className="text-muted leading-relaxed">
              A transformer like Llama 3.1 8B has a fixed structure: an
              embedding layer, then 32 identical transformer blocks (each
              containing self-attention and a feed-forward network), then a final
              output projection. This computation graph—the exact sequence of
              matrix multiplications—is known ahead of time and never changes.
            </p>
            <p className="text-muted leading-relaxed">
              On a GPU, this fixed graph is executed dynamically. For every
              operation, the processor fetches an instruction from memory,
              decodes it, schedules it to a free core, loads the relevant
              weights, executes the multiply, and writes the result back. Then
              repeats. Thousands of times per token.
            </p>

            <ExecutionComparison />

            <p className="text-muted leading-relaxed">
              A Taalas chip eliminates all of that overhead. The model&apos;s
              computation graph is physically wired into the silicon. Layer
              1&apos;s output connects directly to layer 2&apos;s input. The
              attention weights for each head sit in dedicated memory cells that
              also perform the multiply. There are no instructions to fetch, no
              cores to schedule, no results to shuttle around. The chip IS the
              model.
            </p>
            <p className="text-muted leading-relaxed">
              Think of it this way: a GPU is a programmable calculator—you enter
              each step, wait for the answer, enter the next step. A Taalas chip
              is a purpose-built machine—data flows in one end and the answer
              comes out the other.
            </p>

            <DieComparison />

            <p className="text-muted leading-relaxed">
              This also enables aggressive quantization. Standard models use
              16-bit precision (2 bytes per weight). Taalas co-designs the
              quantization with the hardware—3-bit and 6-bit formats on
              HC1—shrinking model size by 3-5× with minimal quality loss. When
              you control both the silicon and the model mapping, you can tune
              precision to exactly what each layer needs.
            </p>
            <p className="text-muted leading-relaxed">
              The tradeoff is real: each chip runs exactly one model. A new model
              requires a new chip. Taalas&apos;s bet is that a handful of
              dominant models—the ones handling billions of daily
              requests—justify dedicated silicon.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-4">The Numbers</h2>
          <div className="space-y-5">
            <p className="text-muted leading-relaxed">
              HC1, their first-generation platform, is hardwired for Llama 3.1
              8B.
            </p>

            <PerformanceBars />

            <p className="text-muted leading-relaxed">
              Built by 24 people. $30M spent of more than $200M raised. The
              efficiency comes from total specialization: one chip, one model,
              compute in memory.
            </p>
            <p className="text-muted leading-relaxed">
              HC2, the second generation, adopts standard 4-bit floating-point
              formats with higher density and speed, targeting frontier-scale
              models.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-4">Why This Matters</h2>
          <div className="space-y-5">
            <p className="text-muted leading-relaxed">
              If AI inference can be made 10-20× cheaper and more efficient, it
              changes what&apos;s possible. Real-time AI in every device.
              Inference at the edge. AI as utility infrastructure, not a luxury
              compute resource.
            </p>
            <p className="text-muted leading-relaxed">
              Total specialization—one chip, one model, compute in memory—is
              Taalas&apos;s bet on the path to ubiquitous AI.
            </p>
          </div>
        </section>

        <div className="mt-16 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Based on{" "}
            <a
              href="https://taalas.com/the-path-to-ubiquitous-ai/"
              className="text-foreground hover:underline underline-offset-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Path to Ubiquitous AI, Visualized
            </a>{" "}
            by Taalas.
          </p>
        </div>
      </article>
    </main>
  );
}
