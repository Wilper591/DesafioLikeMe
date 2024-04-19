import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pg;

const config = {
  user: "wilper591",
  host: "dpg-cog0f9ol5elc73dm5o80-a.oregon-postgres.render.com",
  database: "repertorio_x86u",
  password: "9sN5Ew742epPIWcwZ23JcIxRKAoYUumD",
  port: 5432,
  ssl: true,
};

export const pool = new Pool(config);
