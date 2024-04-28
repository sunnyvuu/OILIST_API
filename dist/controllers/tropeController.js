var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TropeModel } from "../models/tropeModel.js";
export class TropeController {
    constructor() {
        this.tropeModel = new TropeModel(); // Pass the pool instance to the TropeModel constructor
    }
    listTropes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tropes = yield this.tropeModel.getTropes();
                res.json(tropes);
            }
            catch (error) {
                res.status(500).json({ message: error + ". Failed to retrieve tropes." });
            }
        });
    }
    createTrope(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trope = req.body;
                yield this.tropeModel.addTrope(trope);
                res.status(201).json({
                    message: "Trope added successfully: " + JSON.stringify(trope.name),
                });
            }
            catch (error) {
                res.status(500).json({ message: error + ".Failed to add trope." });
            }
        });
    }
}
