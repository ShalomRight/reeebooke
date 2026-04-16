"use client"

import SignupForm from '@/components/form/signup'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Suspense } from "react"
import { motion } from "framer-motion"

// Using a different hero image for variety - silk press image
const signupImage = "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&h=1200&fit=crop"

function SignupFormWrapper() {
	return <SignupForm />
}

export default function SignUpPage() {
	return (
		<div className="min-h-screen bg-warm-50">
			{/* Split Layout - Image left, Form right */}
			<div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
				{/* Left side - Image */}
				<motion.div
					initial={{ opacity: 0, x: -30 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="relative hidden lg:block overflow-hidden"
				>
					<div className="absolute inset-0">
						<img
							src={signupImage}
							alt="Silk press hair styling"
							className="w-full h-full object-cover"
						/>
						{/* Overlay gradient */}
						<div className="absolute inset-0 bg-gradient-to-r from-warm-900/20 to-transparent" />
					</div>
				</motion.div>

				{/* Right side - Form */}
				<div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 xl:px-12">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="w-full max-w-lg"
					>
						<Card className="glass-card border-warm-200 shadow-none">
							<CardHeader className="text-center space-y-4">
								<div className="space-y-2">
									<p className="text-[11px] uppercase tracking-widest text-terracotta-600">
										Abby Hair Studio
									</p>
									<CardTitle className="font-serif text-3xl text-warm-900">
										Create <span className="italic">Account</span>
									</CardTitle>
								</div>
								<CardDescription className="text-warm-600">
									Sign up for your Abby Hair Studio account
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Suspense fallback={<div className="text-center py-4 text-warm-600">Loading...</div>}>
									<SignupFormWrapper />
								</Suspense>
								<div className="mt-6 text-center text-sm">
									<span className="text-warm-600">Already have an account? </span>
									<Link href="/signin" className="text-terracotta-800 font-medium hover:underline">
										Sign in
									</Link>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</div>
	)
}
