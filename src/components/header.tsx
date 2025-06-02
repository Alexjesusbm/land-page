"use client";

import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { ActiveLink } from "./active-link";
import { Logo } from "./logo";

// Estrutura de dados para navegação
const navItems = [
	{ href: "/", label: "Home" },
	{ href: "/blog", label: "Blog" },
];

export const Header = () => {
	return (
		<div className="fixed top-0 z-50 bg-background/30 backdrop-blur border-b border-white/10 supports-[backdrop-filter]:background/15">
			<div className="flex gap-2 items-center w-screen justify-between mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center gap-2">
					<Logo />
				</div>
				<div className="flex items-center gap-2">
					{navItems.map((item) => (
						<ActiveLink key={item.href} href={item.href}>
							<span className="text-sm font-medium transition-colors">
								{item.label}
							</span>
						</ActiveLink>
					))}
					<Button variant={"secondary"}>
						<span>Começar</span>
					</Button>
					<ModeToggle />
				</div>
			</div>
		</div>
	);
};
