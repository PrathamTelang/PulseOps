"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Loader2, CheckCircle2 } from "@/components/ui/icons";

const steps = [
  { id: "reading", label: "Reading workbook..." },
  { id: "analyzing", label: "Analyzing sheets..." },
  { id: "calculating", label: "Calculating KPIs..." },
  { id: "generating", label: "Generating insights..." },
  { id: "complete", label: "Complete!" },
];

interface LoadingProcessProps {
  onComplete: () => void;
}

export function LoadingProcess({ onComplete }: LoadingProcessProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= steps.length - 1) {
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setCurrentStep((s) => s + 1), 800 + Math.random() * 600);
    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <div className="mx-auto max-w-sm py-12">
      <div className="space-y-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`flex items-center gap-3 rounded-xl border p-3.5 transition-all ${
              i === currentStep
                ? "border-primary/20 bg-primary/5 shadow-xs"
                : i < currentStep
                ? "border-transparent bg-muted/30"
                : "border-transparent opacity-40"
            }`}
          >
            {i < currentStep ? (
              <CheckCircle2 className="size-5 text-green-600 shrink-0" />
            ) : i === currentStep ? (
              <Loader2 className="size-5 text-primary animate-spin shrink-0" />
            ) : (
              <div className="size-5 shrink-0" />
            )}
            <span className={`text-sm font-medium ${
              i === currentStep ? "text-foreground" : "text-muted-foreground"
            }`}>
              {step.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
