"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InlineAlert } from "@/components/ui/inline-alert";
import type { LoginFormProps, LoginInput } from "@/interfaces";
import { NETWORK_ERROR, errorMessages, toApiError } from "@/lib/api-error";
import { loginSchema } from "./schemas";

export function LoginForm({ next }: LoginFormProps) {
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setServerErrors([]);
    let res: Response;
    try {
      res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    } catch {
      setServerErrors(NETWORK_ERROR.messages);
      return;
    }
    if (!res.ok) {
      setServerErrors(errorMessages(toApiError(res.status, await res.json().catch(() => null))));
      return;
    }
    router.replace(next);
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      <Field label="Usuário" error={errors.username?.message}>
        {(a11y) => <Input {...a11y} {...register("username")} autoComplete="username" autoFocus />}
      </Field>
      <Field label="Senha" error={errors.password?.message}>
        {(a11y) => <Input {...a11y} {...register("password")} type="password" autoComplete="current-password" />}
      </Field>
      <InlineAlert messages={serverErrors} />
      <Button type="submit" variant="primary" loading={isSubmitting} className="mt-1 w-full">
        {isSubmitting ? "Entrando…" : "Entrar"}
      </Button>
    </form>
  );
}
