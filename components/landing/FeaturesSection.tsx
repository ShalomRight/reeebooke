"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/layout/Container"
import {
	Calendar,
	CreditCard,
	Leaf,
	Clock,
	Droplets,
	Sparkles,
	ShoppingCart,
	Star,
} from "lucide-react"

const features = [
	{
		title: "Easy Online Booking",
		description: "Select your service, choose a date and time with our intuitive calendar interface",
		icon: Calendar,
	},
	{
		title: "Service Cart",
		description: "Add multiple services to your cart and book them all in one session",
		icon: ShoppingCart,
	},
	{
		title: "Botanical Products",
		description: "Premium natural and organic hair care products for healthy hair",
		icon: Leaf,
	},
	{
		title: "Real-time Availability",
		description: "See available time slots and stylist schedules updated instantly",
		icon: Clock,
	},
	{
		title: "Expert Stylists",
		description: "Certified professionals specializing in natural hair and locs",
		icon: Star,
	},
	{
		title: "Deep Hydration",
		description: "Steam treatments and deep conditioning for optimal hair health",
		icon: Droplets,
	},
	{
		title: "Transformation Gallery",
		description: "Browse before & after photos from our satisfied clients",
		icon: Sparkles,
	},
	{
		title: "Secure Payments",
		description: "Book with confidence using our secure payment processing",
		icon: CreditCard,
	},
]

export function FeaturesSection() {
	return (
		<section id="features" className="py-20 bg-warm-50">
			<Container>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<p className="text-[11px] uppercase tracking-widest text-terracotta-600 mb-4">
						Why Choose Us
					</p>
					<h2 className="font-serif text-3xl md:text-4xl text-warm-900 mb-4">
						The <span className="italic">Abby</span> Experience
					</h2>
					<p className="text-sm text-warm-600 max-w-xl mx-auto">
						Everything you need for a premium salon experience,
						from booking to beautiful results.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{features.map((feature, idx) => {
						const Icon = feature.icon
						return (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: idx * 0.05 }}
								className="glass-card rounded-lg p-6 hover:shadow-lg transition-all duration-300"
							>
								<div className="w-10 h-10 rounded bg-terracotta-100 flex items-center justify-center mb-4">
									<Icon className="w-5 h-5 text-terracotta-700" />
								</div>
								<h3 className="font-medium text-warm-900 mb-2">{feature.title}</h3>
								<p className="text-sm text-warm-600 leading-relaxed">{feature.description}</p>
							</motion.div>
						)
					})}
				</div>
			</Container>
		</section>
	)
}
