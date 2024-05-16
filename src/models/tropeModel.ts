import { pool } from "../config/dbConfig.js";
import { Trope } from "../types/tropes.js";

export class TropeModel {
  async getTropes(): Promise<Trope[]> {
    try {
      const { rows } = await pool.query("SELECT * FROM trope");
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async addTrope(trope: Trope): Promise<void> {
    console.log(trope);
    const { name, is_spoiler, description } = trope;

    await pool.query(
      "INSERT INTO trope (name, is_spoiler, description) VALUES ($1, $2, $3)",
      [name, is_spoiler, description]
    );
  }
}
