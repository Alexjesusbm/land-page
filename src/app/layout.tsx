"use client";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChatAssistantButton } from "@/components/ChatAssistantButton";
import { ChatAssistantWindow } from "@/components/ChatAssistantWindow";
import React from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [chatOpen, setChatOpen] = React.useState(false);

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1 pt-16 pb-4">{children}</main>
          <Footer />
          <ChatAssistantButton onClick={() => setChatOpen(true)} />
          <ChatAssistantWindow open={chatOpen} onClose={() => setChatOpen(false)} />
        </ThemeProvider>
      </body>
    </html>
  );
}
