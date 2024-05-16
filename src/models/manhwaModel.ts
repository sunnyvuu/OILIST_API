import { pool } from "../config/dbConfig.js";
import { Manhwa } from "../types/manhwas.js";

export class ManhwaModel {
  async getManhwa(): Promise<Manhwa[]> {
    try {
      const { rows } = await pool.query("SELECT * FROM manhwa");
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async addManhwa(manhwa: Manhwa): Promise<void> {
    console.log(manhwa);

    const { manhwa_id, title, img_url, synopsis, authors, serialization } =
      manhwa;
    try {
      await pool.query(
        "INSERT INTO manhwa (manhwa_id, title, img_url, synopsis, authors, serialization) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (manhwa_id) DO NOTHING;",
        [manhwa_id, title, img_url, synopsis, authors, serialization]
      );
    } catch (error) {
      console.error("Failed to insert manga data:", error);
      throw error;
    }
  }
}
