import { Router } from "express";
import { ManhwaController } from "../controllers/manhwaController.js";

const router = Router();
const manhwaController = new ManhwaController();

router.get("/manhwas", (req, res) => {
  console.log("Accessing /manhwas route");
  manhwaController.processAndSaveManhwa(req, res);
});

export default router;
