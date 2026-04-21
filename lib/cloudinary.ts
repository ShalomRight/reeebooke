export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo"
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || ""
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || ""
export const CLOUDINARY_UPLOAD_PRESET = "abby_upload" // Uploads to ABBY folder

export async function uploadToCloudinary(file: File): Promise<string> {
	const formData = new FormData()
	formData.append("file", file)
	formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
	// Unsigned uploads don't need api_key, timestamp, or signature when using upload_preset

	try {
		const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
			method: "POST",
			body: formData,
		})

		if (!response.ok) {
			const errorData = await response.json() as any
			console.error("Cloudinary error response:", errorData)
			throw new Error(`Upload failed: ${errorData.error?.message || "Unknown error"}`)
		}

		const data = await response.json() as any
		return data.secure_url
	} catch (error) {
		console.error("Cloudinary upload error:", error)
		throw error
	}
}

// Helper to construct Cloudinary URLs with transformations
export function getCloudinaryUrl(
	publicId: string,
	options: {
		width?: number
		height?: number
		crop?: string
		quality?: number
		format?: string
	} = {}
): string {
	const { width, height, crop = "fill", quality = 80, format = "auto" } = options

	let transformations = ""
	if (width || height) {
		transformations += "c_" + crop
		if (width) transformations += ",w_" + width
		if (height) transformations += ",h_" + height
	}
	transformations += transformations ? "," : ""
	transformations += `q_${quality},f_${format}`

	return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`
}

// Build public ID from Cloudinary URL
export function extractPublicIdFromUrl(url: string): string | null {
	try {
		const match = url.match(/\/v\d+\/(.+?)\.[^.]+$/)
		return match ? match[1] : null
	} catch {
		return null
	}
}
