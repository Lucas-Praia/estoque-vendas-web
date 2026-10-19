import { AlertTriangle } from "lucide-react";
import type { ErrorStateProps } from "@/interfaces";
import { errorMessages } from "@/lib/api-error";
import { Button } from "./button";

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const messages = errorMessages(error);
  return (
    <div role="alert" className="flex flex-col items-center gap-2 px-4 py-10 text-center">
      <AlertTriangle aria-hidden className="size-5 text-red-600" strokeWidth={1.5} />
      {messages.map((msg) => (
        <p key={msg} className="max-w-md text-sm">
          {msg}
        </p>
      ))}
      {onRetry && (
        <Button size="sm" onClick={onRetry} className="mt-1">
          Tentar de novo
        </Button>
      )}
    </div>
  );
}
