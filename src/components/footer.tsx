import React from "react";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <footer className="flex items-center justify-between border-t border-white/10 px-4 py-2 sm:px-6 lg:px-8">
      <div>
        <Logo />
      </div>
      <div>
        <div className="flex gap-10 items-center justify-center">
          <span className="text-sm text-muted-foreground">Termos de Uso</span>
          <span className="text-sm text-muted-foreground">
            Política de Privacidade
          </span>
          <span className="text-sm text-muted-foreground">Enviar feedback</span>
        </div>
      </div>
    </footer>
  );
};
