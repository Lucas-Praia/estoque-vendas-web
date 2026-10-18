import { AlertTriangle, Inbox } from "lucide-react";
import { errorMessages } from "@/lib/api-error";
import { Button } from "./button";

/** Lista vazia: mensagem curta + ação. */
export function EmptyState({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
      <Inbox aria-hidden className="size-5 text-neutral-400" strokeWidth={1.5} />
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="max-w-sm text-xs text-muted">{description}</p>}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}

/** Erro de carregamento com a mensagem da API e "Tentar de novo". */
export function ErrorState({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
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

/** Aviso inline (ex.: erro geral de formulário), sem bloco colorido grande. */
export function InlineAlert({ messages }: { messages: string[] }) {
  if (!messages.length) return null;
  return (
    <div role="alert" className="border-l-2 border-red-600 py-0.5 pl-2 text-xs text-red-700">
      {messages.map((msg) => (
        <p key={msg}>{msg}</p>
      ))}
    </div>
  );
}
