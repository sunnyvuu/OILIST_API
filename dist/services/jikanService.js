var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import { rateLimiter } from "./rateLimiter.js";
import { cache } from "./cache.js";
// Function to fetch a single page of manga data
function fetchManhwaPage(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const cacheKey = `manhwa-page-${page}`;
        if (cache.has(cacheKey)) {
            console.log(`Fetching page ${page} from cache`);
            const cachedData = cache.get(cacheKey);
            if (Array.isArray(cachedData)) {
                return cachedData;
            }
        }
        yield rateLimiter.wait(); // Wait if necessary to respect rate limit
        const url = `https://api.jikan.moe/v4/manga?type=manhwa&genres=10,22&genres_exclude=28&start_date=2020-01-01&page=${page}`;
        const response = yield axios.get(url);
        // Transform the response data to match the Manhwa model
        const data = response.data.data.map((item) => ({
            manhwa_id: item.mal_id,
            title: item.title,
            img_url: item.images.jpg.image_url,
            synopsis: item.synopsis,
            authors: item.authors.map((author) => author.name).join(", "),
            serialization: item.serializations
                .map((serialization) => serialization.name)
                .join(", "),
        }));
        cache.set(cacheKey, data); // Store the fetched data in cache
        console.log(`Fetching page ${page} from API and caching it`);
        return data;
    });
}
// Function to fetch all pages
export function fetchAllManhwa() {
    return __awaiter(this, void 0, void 0, function* () {
        let page = 1;
        let results = [];
        let currentPageData = [];
        do {
            currentPageData = yield fetchManhwaPage(page);
            results = results.concat(currentPageData);
            page++;
        } while (currentPageData.length !== 0); // Assumes pagination ends when an empty page is returned
        return results;
    });
}
