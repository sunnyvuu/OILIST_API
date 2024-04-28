import { Request, Response } from "express";
import { TropeModel } from "../models/tropeModel.js";
import { pool } from "../config/dbConfig.js";
import { Trope } from "../types/tropes.js";

export class TropeController {
  private tropeModel: TropeModel;

  constructor() {
    this.tropeModel = new TropeModel(); // Pass the pool instance to the TropeModel constructor
  }

  async listTropes(req: Request, res: Response): Promise<void> {
    try {
      const tropes = await this.tropeModel.getTropes();
      res.json(tropes);
    } catch (error) {
      res.status(500).json({ message: error + ". Failed to retrieve tropes." });
    }
  }

  async createTrope(req: Request, res: Response): Promise<void> {
    try {
      const trope: Trope = req.body;
      await this.tropeModel.addTrope(trope);
      res.status(201).json({
        message: "Trope added successfully: " + JSON.stringify(trope.name),
      });
    } catch (error) {
      res.status(500).json({ message: error + ".Failed to add trope." });
    }
  }
}
