"use client";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { SnackbarProvider } from "notistack";

export function Provs({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <SnackbarProvider
        maxSnack={1}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {children}
      </SnackbarProvider>
    </SessionProvider>
  );
}
