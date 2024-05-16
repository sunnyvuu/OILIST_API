import { Router } from "express";
import { ManhwaController } from "../controllers/manhwaController.js";
const router = Router();
const manhwaController = new ManhwaController();
router.get("/manhwas", (req, res) => {
    manhwaController.listManhwas(req, res);
});
router.get("/updateManhwas", (req, res) => {
    manhwaController.processAndSaveManhwa(req, res);
});
export default router;
