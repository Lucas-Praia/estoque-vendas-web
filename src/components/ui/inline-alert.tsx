import type { InlineAlertProps } from "@/interfaces";

export function InlineAlert({ messages }: InlineAlertProps) {
  if (!messages.length) return null;
  return (
    <div role="alert" className="border-l-2 border-red-600 py-0.5 pl-2 text-xs text-red-700">
      {messages.map((msg) => (
        <p key={msg}>{msg}</p>
      ))}
    </div>
  );
}
