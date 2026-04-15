"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/layout/Container"
import { Star, Clock, Users, Award } from "lucide-react"

const stats = [
	{ number: "5,000+", label: "Happy Clients", icon: Users },
	{ number: "12+", label: "Years Experience", icon: Clock },
	{ number: "4.9", label: "Average Rating", icon: Star },
	{ number: "15+", label: "Expert Stylists", icon: Award },
]

export function StatsSection() {
	return (
		<section className="py-20 bg-warm-900">
			<Container>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					{stats.map((stat, idx) => {
						const Icon = stat.icon
						return (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: idx * 0.1 }}
								className="text-center"
							>
								<div className="inline-flex items-center justify-center w-14 h-14 rounded bg-warm-800 text-white mb-4">
									<Icon className="w-6 h-6" />
								</div>
								<div className="font-serif text-3xl md:text-4xl text-white mb-2">
									{stat.number}
								</div>
								<div className="text-[11px] uppercase tracking-widest text-warm-400">
									{stat.label}
								</div>
							</motion.div>
						)
					})}
				</div>
			</Container>
		</section>
	)
}

