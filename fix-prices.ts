import { getDb } from "./src/db/index.js";
import { services } from "./src/db/schema.js";
import { sql } from "drizzle-orm";

async function fixPrices() {
  const db = getDb();
  console.log("Fixing prices...");
  const result = await db.update(services)
    .set({ price: sql`price / 100` })
    .where(sql`price >= 1000`);
  console.log("Done");
}

fixPrices().catch(console.error);
