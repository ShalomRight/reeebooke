import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SessionProvider } from "@/components/providers/SessionProvider"
import { ReduxProvider } from "@/components/providers/ReduxProvider"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollProvider } from "@/components/providers/ScrollProvider"
import { Toaster } from "sonner"
import "./globals.css"

const playfairDisplay = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-serif",
	weight: ["400", "500", "600", "700"],
	style: ["normal", "italic"],
	display: "swap",
})

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
	weight: ["200", "300", "400", "500", "600", "700"],
	display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	display: "swap",
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
			<body className={`${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} font-sans bg-background text-foreground antialiased`} suppressHydrationWarning>
			    {/* Essential Botanical SVG Paint / Texture filter */}
				<div className="noise-overlay" />
			    
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
					<ScrollProvider>
						<SessionProvider>
							<ReduxProvider>
								<Suspense fallback={null}>{children}</Suspense>
							</ReduxProvider>
						</SessionProvider>
					</ScrollProvider>
					<Toaster position="bottom-left" richColors />
					<Analytics />
				</ThemeProvider>
			</body>
		</html>
	)
}
