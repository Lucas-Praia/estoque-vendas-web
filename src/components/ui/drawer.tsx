"use client";

import type { DrawerProps } from "@/interfaces";
import { Dialog } from "./dialog";

export function Drawer(props: DrawerProps) {
  return <Dialog {...props} placement="right" />;
}
