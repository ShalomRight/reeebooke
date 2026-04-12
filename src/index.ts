/**
 * Placeholder Cloudflare Worker entry referenced by wrangler.jsonc.
 * The Next.js app runs on Node by default; for production on Cloudflare use the
 * official OpenNext / @cloudflare/next-on-pages adapter and point `main` there instead.
 */
export default {
	fetch(): Response {
		return new Response(
			"Worker placeholder: configure OpenNext or your framework adapter for this app.",
			{ status: 404, headers: { "content-type": "text/plain; charset=utf-8" } },
		)
	},
}
