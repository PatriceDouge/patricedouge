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
  return (
    <Figure caption="A GPU runs thousands of instruction cycles per token. An ASIC flows data through a fixed pipeline.">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <div className="text-xs text-muted-foreground mb-4 font-medium uppercase tracking-wider">
            GPU · instruction cycle
          </div>
          <div className="space-y-2">
            {[
              "Fetch instruction",
              "Decode operation",
              "Schedule to core",
              "Load weights from HBM",
              "Execute multiply",
              "Write result back",
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground/50 w-4 shrink-0 text-right">
                  {i + 1}
                </span>
                <span className="text-sm text-muted">{step}</span>
              </div>
            ))}
            <div className="flex items-center gap-3 pt-1">
              <span className="font-mono text-xs text-muted-foreground/30 w-4 shrink-0 text-right">
                ↺
              </span>
              <span className="text-sm text-muted-foreground italic">
                repeat ×1000s per token
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs text-accent mb-4 font-medium uppercase tracking-wider">
            Taalas · hardwired pipeline
          </div>
          <svg viewBox="0 0 200 250" className="w-full">
            <text
              x="100" y="12" textAnchor="middle" fontSize="9"
              style={{ ...mono, fill: "var(--muted-foreground)" }}
            >
              token in
            </text>
            <line x1="100" y1="18" x2="100" y2="28" stroke="var(--accent)" strokeWidth="0.75" />

            <rect
              x="30" y="30" width="140" height="24" rx="4"
              fill="var(--accent)" opacity="0.1"
              stroke="var(--accent)" strokeWidth="0.5"
            />
            <text
              x="100" y="46" textAnchor="middle" fontSize="9" fontWeight="600"
              style={{ ...mono, fill: "var(--foreground)" }}
            >
              EMBED
            </text>
            <line x1="100" y1="54" x2="100" y2="62" stroke="var(--accent)" strokeWidth="0.75" />

            <rect
              x="30" y="64" width="140" height="30" rx="4"
              fill="var(--accent)" opacity="0.1"
              stroke="var(--accent)" strokeWidth="0.5"
            />
            <text
              x="100" y="77" textAnchor="middle" fontSize="9" fontWeight="600"
              style={{ ...mono, fill: "var(--foreground)" }}
            >
              LAYER 1
            </text>
            <text
              x="100" y="89" textAnchor="middle" fontSize="8"
              style={{ ...mono, fill: "var(--muted-foreground)" }}
            >
              attn → ffn
            </text>
            <line x1="100" y1="94" x2="100" y2="102" stroke="var(--accent)" strokeWidth="0.75" />

            <rect
              x="30" y="104" width="140" height="30" rx="4"
              fill="var(--accent)" opacity="0.1"
              stroke="var(--accent)" strokeWidth="0.5"
            />
            <text
              x="100" y="117" textAnchor="middle" fontSize="9" fontWeight="600"
              style={{ ...mono, fill: "var(--foreground)" }}
            >
              LAYER 2
            </text>
            <text
              x="100" y="129" textAnchor="middle" fontSize="8"
              style={{ ...mono, fill: "var(--muted-foreground)" }}
            >
              attn → ffn
            </text>

            {[0, 1, 2].map((i) => (
              <circle
                key={i} cx="100" cy={146 + i * 8} r="1.5"
                fill="var(--accent)" opacity="0.4"
              />
            ))}

            <line x1="100" y1="168" x2="100" y2="174" stroke="var(--accent)" strokeWidth="0.75" />
            <rect
              x="30" y="176" width="140" height="30" rx="4"
              fill="var(--accent)" opacity="0.1"
              stroke="var(--accent)" strokeWidth="0.5"
            />
            <text
              x="100" y="189" textAnchor="middle" fontSize="9" fontWeight="600"
              style={{ ...mono, fill: "var(--foreground)" }}
            >
              LAYER 32
            </text>
            <text
              x="100" y="201" textAnchor="middle" fontSize="8"
              style={{ ...mono, fill: "var(--muted-foreground)" }}
            >
              attn → ffn
            </text>
            <line x1="100" y1="206" x2="100" y2="212" stroke="var(--accent)" strokeWidth="0.75" />

            <rect
              x="30" y="214" width="140" height="24" rx="4"
              fill="var(--accent)" opacity="0.1"
              stroke="var(--accent)" strokeWidth="0.5"
            />
            <text
              x="100" y="230" textAnchor="middle" fontSize="9" fontWeight="600"
              style={{ ...mono, fill: "var(--foreground)" }}
            >
              OUTPUT
            </text>

            <line x1="100" y1="238" x2="100" y2="244" stroke="var(--accent)" strokeWidth="0.75" />
            <text
              x="100" y="254" textAnchor="middle" fontSize="9"
              style={{ ...mono, fill: "var(--muted-foreground)" }}
            >
              token out
            </text>

            <circle r="3" fill="var(--accent)" opacity="0.6">
              <animateMotion
                dur="3s" repeatCount="indefinite"
                path="M100,18 L100,244"
              />
            </circle>
          </svg>
        </div>
      </div>
    </Figure>
  );
}

function DieComparison() {
  const blocks: [number, number, string, boolean][] = [
    [0, 0, "CU", true], [0, 1, "CU", true], [0, 2, "CU", true], [0, 3, "CU", true],
    [1, 0, "CU", true], [1, 1, "CU", true], [1, 2, "L2$", false], [1, 3, "IC", false],
    [2, 0, "MC", false], [2, 1, "RF", false], [2, 2, "SCH", false], [2, 3, "IO", false],
    [3, 0, "DMA", false], [3, 1, "RT", false], [3, 2, "L1$", false], [3, 3, "CTL", false],
  ];

  return (
    <Figure>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <div className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
            General Purpose
          </div>
          <svg viewBox="0 0 200 200" className="w-full">
            <rect
              x="0" y="0" width="200" height="200" rx="6"
              fill="none" stroke="var(--border)" strokeWidth="1"
            />
            {blocks.map(([row, col, label, active]) => (
              <g key={`${row}-${col}`}>
                <rect
                  x={8 + col * 47} y={8 + row * 47}
                  width="42" height="42" rx="3"
                  fill={active ? "var(--accent)" : "var(--muted-foreground)"}
                  opacity={active ? 0.2 : 0.06}
                  stroke={active ? "var(--accent)" : "var(--border)"}
                  strokeWidth="0.5"
                />
                <text
                  x={29 + col * 47} y={33 + row * 47}
                  textAnchor="middle" fontSize="9"
                  style={{
                    ...mono,
                    fill: "var(--muted-foreground)",
                    opacity: active ? 0.8 : 0.3,
                  }}
                >
                  {label}
                </text>
              </g>
            ))}
          </svg>
          <div className="text-xs text-muted-foreground mt-2 text-center">
            ~40% of silicon active during inference
          </div>
        </div>

        <div>
          <div className="text-xs text-accent mb-3 font-medium uppercase tracking-wider">
            Model Specific
          </div>
          <svg viewBox="0 0 200 200" className="w-full">
            <rect
              x="0" y="0" width="200" height="200" rx="6"
              fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.4"
            />
            {Array.from({ length: 4 }).map((_, row) =>
              Array.from({ length: 4 }).map((_, col) => (
                <g key={`${row}-${col}`}>
                  <rect
                    x={8 + col * 47} y={8 + row * 47}
                    width="42" height="42" rx="3"
                    fill="var(--accent)" opacity="0.15"
                    stroke="var(--accent)" strokeWidth="0.5"
                  />
                  <circle
                    cx={29 + col * 47} cy={29 + row * 47} r="4"
                    fill="var(--accent)"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.15;0.5;0.15" dur="2s"
                      begin={`${(row * 4 + col) * 0.12}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))
            )}
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
            The Path to Ubiquitous AI
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
              The Path to Ubiquitous AI
            </a>{" "}
            by Taalas.
          </p>
        </div>
      </article>
    </main>
  );
}
