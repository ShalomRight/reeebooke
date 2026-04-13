import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DB_PATH = "reebooking.db";
const OUTPUT_PATH = "drizzle/data-migration.sql";

async function migrate() {
    console.log("🚀 Starting data extraction from SQLite...");
    const db = new Database(DB_PATH);
    
    // Get all tables
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name != '__drizzle_migrations'").all();
    
    let sqlOutput = "-- Reebooking Data Migration SQL\n-- Generated for Cloudflare D1\n\n";
    sqlOutput += "PRAGMA foreign_keys = OFF;\n\n";

    for (const { name: tableName } of tables) {
        console.log(`📦 Processing table: ${tableName}`);
        const rows = db.prepare(`SELECT * FROM ${tableName}`).all();
        
        if (rows.length === 0) continue;

        const columns = Object.keys(rows[0]);
        
        for (const row of rows) {
            // Special handling for 'services' table to add categories
            if (tableName === "services") {
                const mediaUrl = row.media_url || "";
                if (mediaUrl.includes("/natural-hair/")) row.category = "Natural Hair";
                else if (mediaUrl.includes("/locs/")) row.category = "Locs";
                else if (mediaUrl.includes("/color-chemical/")) row.category = "Color & Chemical";
                else row.category = "General";
                
                if (!columns.includes("category")) columns.push("category");
            }

            const values = columns.map(col => {
                const val = row[col];
                if (val === null) return "NULL";
                if (typeof val === "string") return `'${val.replace(/'/g, "''")}'`;
                return val;
            });

            sqlOutput += `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${values.join(", ")});\n`;
        }
        sqlOutput += "\n";
    }

    sqlOutput += "PRAGMA foreign_keys = ON;\n";
    
    fs.writeFileSync(OUTPUT_PATH, sqlOutput);
    console.log(`✅ Data migration SQL saved to ${OUTPUT_PATH}`);
}

migrate().catch(console.error);
