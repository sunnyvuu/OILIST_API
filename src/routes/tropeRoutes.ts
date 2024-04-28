import { Router } from "express";
import { TropeController } from "../controllers/tropeController.js";

const tropeController = new TropeController();

const router = Router();

router.get("/tropes", (req, res) => tropeController.listTropes(req, res));
router.post("/tropes", (req, res) => tropeController.createTrope(req, res));

export default router;
