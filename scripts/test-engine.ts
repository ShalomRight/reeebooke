import { getDb } from "../src/db/index";
import { getBookableSlots } from "../lib/zap/engine";
import { config } from "dotenv";

config({ path: ".env" });

async function run() {
  try {
    const slots = await getBookableSlots(
      "service",
      "6df611ef-3b0f-4bfa-9e85-56dd56c33b89",
      "2026-04-03",
      60,
      0
    );
    console.log("FINAL SLOTS:", slots);
  } catch (e) {
    console.error(e);
  }
}

run();
