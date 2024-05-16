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
export class ManhwaModel {
    getManhwa() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows } = yield pool.query("SELECT * FROM manhwa");
                return rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addManhwa(manhwa) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(manhwa);
            const { manhwa_id, title, img_url, synopsis, authors, serialization } = manhwa;
            try {
                yield pool.query("INSERT INTO manhwa (manhwa_id, title, img_url, synopsis, authors, serialization) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (manhwa_id) DO NOTHING;", [manhwa_id, title, img_url, synopsis, authors, serialization]);
            }
            catch (error) {
                console.error("Failed to insert manga data:", error);
                throw error;
            }
        });
    }
}
