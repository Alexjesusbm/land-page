import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface ActiveLinkProps {
    children: React.ReactNode;
    href: string;
}

export const ActiveLink = ({children, href}: ActiveLinkProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isBlogPage = pathname.startsWith("/blog");
  return (
  <div>
    <Link href={href}
    className={cn(
      "text-sm font-medium transition-colors hover:text-primary",
      isHomePage ? "text-blue-500" : "",
      isBlogPage ? "text-blue-500" : ""
    )}
  >
    {children}
  </Link>
  </div> 
  );
};