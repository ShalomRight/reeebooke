import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../src/db/schema.ts";
import "dotenv/config";

async function main() {
  const client = createClient({
    url: "file:reebooking.db",
  });
  const db = drizzle(client, { schema });

  console.log("🧹 Clearing inconsistent data due to service overhaul...");

  try {
    // We clear tables that reference services by ID, as the old IDs are now invalid
    await db.delete(schema.bookings);
    console.log("✅ Cleared bookings table");
    
    await db.delete(schema.carts);
    console.log("✅ Cleared carts table");
    
    await db.delete(schema.ratings);
    console.log("✅ Cleared ratings table");
    
    await db.delete(schema.favorites);
    console.log("✅ Cleared favorites table");

    console.log("\n✨ Data cleanup complete. The dashboard should now load correctly with new services.");
  } catch (error) {
    console.error("❌ Cleanup failed:", error);
  } finally {
    process.exit(0);
  }
}

main();
