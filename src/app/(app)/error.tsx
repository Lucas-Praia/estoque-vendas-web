"use client";

import { ErrorState } from "@/components/ui/error-state";
import type { RouteErrorProps } from "@/interfaces";

export default function AppError({ error, reset }: RouteErrorProps) {
  return <ErrorState error={error} onRetry={reset} />;
}
