import Image from "next/image";
import React from "react";
import { ModeToggle } from "./mode-toggle";

export const Header = () => {
  return (
    <div className="fixed top-0 z-50 bg-background backdrop-blur supports-[backdrop-filter]:background/60">
      <div className="flex gap-2 items-center justify-between mx-auto w-screen">
        <Image
          src={"/brand-logo.png"}
          alt={"Site.set"}
          width={115}
          height={32}
        />
        <div>
          <span>Home</span>
          <span>Blog</span>
          <div>
            <span>Começar</span>
            <ModeToggle /> {/* Botão para alternar tema */}
          </div>
        </div>
      </div>
    </div>
  );
};
