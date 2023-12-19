import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgres://username:password@hostname:port/database",
  ssl: {
    rejectUnauthorized: false,
  },
});


export default pool;
