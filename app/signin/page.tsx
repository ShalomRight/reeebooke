"use client"

import SingninForm from '@/components/form/singnin'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"

export default function SignInPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-warm-50 px-4 relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-terracotta-100/50 blur-3xl" />
				<div className="absolute -bottom-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-terracotta-200/30 blur-3xl" />
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="w-full max-w-lg"
			>
				<Card className="w-full glass-card border-warm-200">
					<CardHeader className="text-center space-y-4">
						<div className="space-y-2">
							<p className="text-[11px] uppercase tracking-widest text-terracotta-600">
								Abby Hair Studio
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
						<SingninForm />
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
	)
}
