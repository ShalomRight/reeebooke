"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
	variant?: "default" | "compact"
	className?: string
	href?: string | null
}

export function Logo({ variant = "default", className, href = "/" }: LogoProps) {
	const logoContent = (
		<div className={cn("flex items-center gap-2", className)}>
			<div className="w-10 h-10 flex items-center justify-center overflow-hidden">
				<img 
					src="/Abby/Abby Logo.svg" 
					alt="Abi's Hair Creation" 
					className="w-full h-full object-contain"
				/>
			</div>
				<span
					className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
					style={{ fontFamily: "var(--font-serif)" }}
				>
					Abi's Hair Creation
				</span>
		</div>
	)

	if (href) {
		return (
			<Link href={href} className="flex items-center">
				{logoContent}
			</Link>
		)
	}

	return logoContent
}

