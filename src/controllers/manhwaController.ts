import { Request, Response } from "express";
import { ManhwaModel } from "../models/manhwaModel.js";
import { Manhwa } from "../types/manhwas.js";
import { fetchAllManhwa } from "../services/jikanService.js";

export class ManhwaController {
  private manhwaModel: ManhwaModel;

  constructor() {
    this.manhwaModel = new ManhwaModel();
  }

  async listManhwas(req: Request, res: Response): Promise<void> {
    try {
      const manhwas = await this.manhwaModel.getManhwa();
      res.json(manhwas);
    } catch (error) {
      res.status(500).json({ message: error + ". Failed to retrieve tropes." });
    }
  }

  async processAndSaveManhwa(req: Request, res: Response): Promise<void> {
    try {
      const allManhwa: Manhwa[] = await fetchAllManhwa();
      for (const manhwa of allManhwa) {
        await this.manhwaModel.addManhwa(manhwa);
      }
      res
        .status(200)
        .json({ message: "Manhwa data fetched and saved successfully!" });
    } catch (error) {
      console.error("Failed to process and save Manhwa:", error);
      res
        .status(500)
        .json({ message: error + ". Failed to process and save Manhwa." });
    }
  }
}
