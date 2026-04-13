import "server-only"
import Stripe from "stripe"

const isStripeConfigured = !!process.env.STRIPE_SECRET_KEY

// Real Stripe client when configured
const realStripe = isStripeConfigured
  ? new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-11-20.acacia" as any,
    })
  : null

// Stub that returns safe dummy data when Stripe is not configured
const stripeStub = {
  products: {
    create: async (params: any) => ({ 
      id: `stub_prod_${crypto.randomUUID()}`, 
      name: params.name 
    }),
  },
  prices: {
    create: async (params: any) => ({ 
      id: `stub_price_${crypto.randomUUID()}`,
      unit_amount: params.unit_amount,
      currency: params.currency,
    }),
    retrieve: async (id: string) => ({ 
      id, 
      unit_amount: 0, 
      currency: "usd" 
    }),
  },
  checkout: {
    sessions: {
      create: async (params: any) => ({
        id: `stub_session_${crypto.randomUUID()}`,
        url: "/checkout?stub=true",
        payment_status: "unpaid",
      }),
      retrieve: async (id: string) => ({
        id,
        payment_status: "paid",
        metadata: {},
      }),
    },
  },
  paymentIntents: {
    create: async (params: any) => ({
      id: `stub_pi_${crypto.randomUUID()}`,
      client_secret: "stub_secret_not_real",
      amount: params.amount,
      currency: params.currency,
      status: "requires_payment_method",
    }),
    retrieve: async (id: string) => ({
      id,
      status: "succeeded",
      amount: 0,
    }),
  },
  webhooks: {
    constructEvent: (body: any, sig: any, secret: any) => {
      throw new Error("Stripe webhooks not configured")
    },
  },
}

export const stripe = (realStripe ?? stripeStub) as unknown as Stripe
