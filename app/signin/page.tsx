"use client"

import SingninForm from '@/components/form/singnin'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Suspense } from "react"
import { motion } from "framer-motion"
import { useGallerySection } from "@/lib/swr/hooks/gallery"
import { getSingleSectionImage, SIGNIN_FALLBACK } from "@/lib/gallery"

export default function SignInPage() {
	const { data } = useGallerySection("signin")
  const signinImageInfo = getSingleSectionImage(data?.images, SIGNIN_FALLBACK.url, SIGNIN_FALLBACK.alt)

	return (
		<div className="min-h-screen bg-warm-50">
			{/* Split Layout - Form left, Image right (mirrored from signup) */}
			<div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
				{/* Left side - Form */}
				<div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 xl:px-12 order-2 lg:order-1">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="w-full max-w-lg"
					>
						<Card className="glass-card shadow-none border-warm-200">
							<CardHeader className="text-center space-y-4">
								<div className="space-y-2">
									<p className="text-[11px] uppercase tracking-widest text-terracotta-600">
										Abi's Hair Creation
									</p>
									<CardTitle className="font-serif text-3xl text-warm-900">
										Welcome <span className="italic">Back</span>
									</CardTitle>
								</div>
								<CardDescription className="text-warm-600">
									Sign in to manage your appointments
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Suspense fallback={<div className="text-center py-4 text-warm-600">Loading...</div>}>
									<SingninForm />
								</Suspense>
								<div className="mt-6 text-center text-sm">
									<span className="text-warm-600">Don&apos;t have an account? </span>
									<Link href="/signup" className="text-terracotta-800 font-medium hover:underline">
										Sign up
									</Link>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>

				{/* Right side - Image */}
				<motion.div
					initial={{ opacity: 0, x: 30 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="relative hidden lg:block overflow-hidden order-1 lg:order-2"
				>
					<div className="absolute inset-0">
						<img
							src={signinImageInfo.url}
							alt={signinImageInfo.alt}
							className="w-full h-full object-cover"
						/>
						{/* Overlay gradient */}
						<div className="absolute inset-0 bg-gradient-to-l from-warm-900/20 to-transparent" />
					</div>
				</motion.div>
			</div>
		</div>
	)
}
