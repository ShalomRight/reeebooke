/**
 * Canonical booking time storage: "HH:mm" (24h, zero-padded hours).
 * Dates stored as "YYYY-MM-DD" in local business context (see timezone follow-up in audit).
 */

const TIME_24 = /^([01]\d|2[0-3]):([0-5]\d)$/

/** Normalize any accepted date input to YYYY-MM-DD. */
export function normalizeBookingDateYmd(input: string): string {
	if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return input
	const d = new Date(input)
	if (Number.isNaN(d.getTime())) throw new Error("Invalid date")
	const y = d.getFullYear()
	const m = String(d.getMonth() + 1).padStart(2, "0")
	const day = String(d.getDate()).padStart(2, "0")
	return `${y}-${m}-${day}`
}

/**
 * Parse "HH:mm", or "h:mm AM/PM" / "hh:mm AM/PM" into "HH:mm".
 */
export function normalizeTimeTo24h(input: string): string {
	const trimmed = input.trim()
	if (TIME_24.test(trimmed)) return trimmed

	const ampm = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
	if (ampm) {
		let h = parseInt(ampm[1], 10)
		const m = ampm[2]
		const ap = ampm[3].toUpperCase()
		if (h < 1 || h > 12 || parseInt(m, 10) > 59) throw new Error("Invalid time")
		if (ap === "PM" && h !== 12) h += 12
		if (ap === "AM" && h === 12) h = 0
		return `${String(h).padStart(2, "0")}:${m}`
	}

	throw new Error("Invalid time format")
}

export function format24hTo12hLabel(hhmm: string): string {
	if (!TIME_24.test(hhmm)) return hhmm
	const [hs, ms] = hhmm.split(":")
	let h = parseInt(hs, 10)
	const suffix = h >= 12 ? "PM" : "AM"
	if (h === 0) h = 12
	else if (h > 12) h -= 12
	return `${h}:${ms} ${suffix}`
}

/** Default legacy grid slots — `time` is canonical HH:mm for API + DB. */
export const DEFAULT_LEGACY_SLOT_TIMES: { time: string; displayLabel: string }[] = [
	{ time: "08:30", displayLabel: "8:30 AM" },
	{ time: "10:00", displayLabel: "10:00 AM" },
	{ time: "11:30", displayLabel: "11:30 AM" },
	{ time: "13:30", displayLabel: "1:30 PM" },
	{ time: "15:00", displayLabel: "3:00 PM" },
	{ time: "16:30", displayLabel: "4:30 PM" },
]
