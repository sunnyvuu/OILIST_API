var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from "../config/dbConfig.js";
export class TropeModel {
    getTropes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows } = yield pool.query("SELECT * FROM trope");
                return rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addTrope(trope) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(trope);
            const { name, is_spoiler, description } = trope;
            yield pool.query("INSERT INTO trope (name, is_spoiler, description) VALUES ($1, $2, $3)", [name, is_spoiler, description]);
        });
    }
}
