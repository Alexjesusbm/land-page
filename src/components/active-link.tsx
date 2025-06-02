"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link href={href}>
      <Button variant="ghost" className={isActive ? "text-blue-600 hover:text-blue-600" : ""}>
        {children}
      </Button>
    </Link>
  );
};