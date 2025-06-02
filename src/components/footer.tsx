import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex items-center justify-between border-t border-white/10 px-4 py-2 sm:px-6 lg:px-8">
      <div>
        <Link href="/">
          <Image
            src="/brand-logo.png"
            alt="Logo"
            width={116}
            height={32}
            className="rounded-full"
          />
        </Link>
      </div>
      <div>
        <div className="flex gap-2 items-center justify-center">
          <span>Termos de Uso</span>
          <span>Política de Privacidade</span>
          <span>Enviar feedback</span>
        </div>
      </div>
    </footer>
  );
};
