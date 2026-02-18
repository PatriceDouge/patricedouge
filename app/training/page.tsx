import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WorkoutCalendar } from "@/components/WorkoutCalendar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training",
  description: "Workout tracker and training schedule.",
};

export default function TrainingPage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 md:py-12 bg-background text-foreground transition-colors">
      <div className="mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-10">
          <Link
            href="/"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            &larr; Back
          </Link>
          <ThemeToggle />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-8">Training</h1>
        <WorkoutCalendar />
      </div>
    </main>
  );
}
