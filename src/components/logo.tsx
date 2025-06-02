import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/brand-logo.png"
        alt="Logo"
        width={116}
        height={32}
        className="rounded-full"
      />
    </Link>
  );
};
