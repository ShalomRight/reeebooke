import { getBookableSlots } from "../lib/zap/engine";
import { getDb } from "../src/db";
const db = getDb();

async function main() {
  console.log("Testing...");
  const slots = await getBookableSlots("service", "6df611ef-3b0f-4bfa-9e85-56dd56c33b89", "2026-04-07", 60, 0);
  console.log("RESULT SLOTS:", slots);
  process.exit(0);
}
main();
