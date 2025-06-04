"use client";
import React, { useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";

type Message = { id: string; sender: "user" | "assistant"; text: string };
type Props = { open: boolean; onClose: () => void };

export const ChatAssistantWindow: React.FC<Props> = ({ open, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (open) setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: crypto.randomUUID(), sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history: messages }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { id: crypto.randomUUID(), sender: "assistant", text: data.reply || "Desculpe, não entendi." },
      ]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { id: crypto.randomUUID(), sender: "assistant", text: "Erro ao conectar ao assistente." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 max-w-sm w-full">
      <Card className="shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Assistente Virtual</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X />
          </Button>
        </CardHeader>
        <CardContent className="h-72 overflow-y-auto flex flex-col gap-2 bg-background">
          {messages.length === 0 && (
            <span className="text-muted-foreground text-sm text-center mt-8">Como posso ajudar?</span>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded px-3 py-2 max-w-[80%] text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-muted text-foreground"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
        <CardFooter className="flex gap-2">
          <Input
            placeholder="Digite sua pergunta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
            disabled={loading}
          />
          <Button onClick={sendMessage} disabled={loading || !input.trim()}>
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};