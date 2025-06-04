import React from "react";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";

type Props = { onClick: () => void };

export const ChatAssistantButton: React.FC<Props> = ({ onClick }) => (
  <div className="fixed bottom-6 right-6 z-50">
    <Button
      onClick={onClick}
      size="icon"
      className="rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 text-white w-14 h-14"
      aria-label="Abrir chat assistente"
    >
      <MessageCircle size={28} />
    </Button>
  </div>
);