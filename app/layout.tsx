import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SessionProvider } from "@/components/providers/SessionProvider"
import { ReduxProvider } from "@/components/providers/ReduxProvider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-space-grotesk",
	weight: ["700"],
})

const dmSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-dm-sans",
	weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
	title: "Reebooking - Service Appointment Booking scheduling system Full Stack Application",
	description: "Book your appointment with ease using Reebooking",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`font-sans ${spaceGrotesk.variable} ${dmSans.variable}`} suppressHydrationWarning>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
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
