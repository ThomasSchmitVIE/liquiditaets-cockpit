import { NextResponse } from "next/server";
import { Pool } from "pg";

export async function GET() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    const r = await pool.query("SELECT count(*)::int as count FROM accounts;");
    return NextResponse.json({ success: true, count: r.rows[0].count });
  } catch (e: any) {
    return NextResponse.json({
      success: false,
      error: String(e?.message ?? e),
    });
  } finally {
    await pool.end();
  }
}