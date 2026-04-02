"use client"

import { useState } from "react"
import { ZapBookingForm } from '@/components/SimpleBookingForm/ZapBookingForm'
import { AmeliaBookingForm } from '@/components/SimpleBookingForm/AmeliaBookingForm'

export function BookingFormToggle() {
	const [activeForm, setActiveForm] = useState<"zap" | "amelia">("zap")

	return (
		<>
			{/* Debug Toggle for Client Testing */}
			<div className="flex justify-center pt-8">
				<div className="bg-slate-100 p-1 rounded-lg inline-flex">
					<button 
						onClick={() => setActiveForm("zap")}
						className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeForm === 'zap' ? 'bg-white shadow' : 'text-slate-500 hover:text-slate-700'}`}
					>
						Zap Design
					</button>
					<button 
						onClick={() => setActiveForm("amelia")}
						className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeForm === 'amelia' ? 'bg-white shadow' : 'text-slate-500 hover:text-slate-700'}`}
					>
						Amelia Style (New)
					</button>
				</div>
			</div>

			{activeForm === "zap" ? <ZapBookingForm /> : <AmeliaBookingForm />}
		</>
	)
}
