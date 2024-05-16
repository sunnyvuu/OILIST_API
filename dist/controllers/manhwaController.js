var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ManhwaModel } from "../models/manhwaModel.js";
import { fetchAllManhwa } from "../services/jikanService.js";
export class ManhwaController {
    constructor() {
        this.manhwaModel = new ManhwaModel();
    }
    listManhwas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const manhwas = yield this.manhwaModel.getManhwa();
                res.json(manhwas);
            }
            catch (error) {
                res.status(500).json({ message: error + ". Failed to retrieve tropes." });
            }
        });
    }
    processAndSaveManhwa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allManhwa = yield fetchAllManhwa();
                for (const manhwa of allManhwa) {
                    yield this.manhwaModel.addManhwa(manhwa);
                }
                res
                    .status(200)
                    .json({ message: "Manhwa data fetched and saved successfully!" });
            }
            catch (error) {
                console.error("Failed to process and save Manhwa:", error);
                res
                    .status(500)
                    .json({ message: error + ". Failed to process and save Manhwa." });
            }
        });
    }
}
