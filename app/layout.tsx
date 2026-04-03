import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Playfair_Display, Source_Sans_3, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SessionProvider } from "@/components/providers/SessionProvider"
import { ReduxProvider } from "@/components/providers/ReduxProvider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import "./globals.css"

const playfairDisplay = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-serif",
	weight: ["400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"]
})

const sourceSans3 = Source_Sans_3({
	subsets: ["latin"],
	variable: "--font-sans",
	weight: ["300", "400", "500", "600", "700"],
})

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
})

export const metadata: Metadata = {
	title: "Reebooking - Botanical Salon Interface",
	description: "Book your appointment with ease",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${sourceSans3.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} font-sans bg-background text-foreground antialiased`} suppressHydrationWarning>
			    {/* Essential Botanical SVG Paint / Texture filter */}
				<div className="noise-overlay" />
			    
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
					<SessionProvider>
						<ReduxProvider>
							<Suspense fallback={null}>{children}</Suspense>
						</ReduxProvider>
					</SessionProvider>
					<Toaster position="bottom-left" richColors />
					<Analytics />
				</ThemeProvider>
			</body>
		</html>
	)
}
