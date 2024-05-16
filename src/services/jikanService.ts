import axios from "axios";
import { rateLimiter } from "./rateLimiter.js";
import { Manhwa } from "../types/manhwas.js";
import { cache } from "./cache.js";

// Function to fetch a single page of manga data
async function fetchManhwaPage(page: number): Promise<Manhwa[]> {
  const cacheKey = `manhwa-page-${page}`;
  if (cache.has(cacheKey)) {
    console.log(`Fetching page ${page} from cache`);
    const cachedData = cache.get(cacheKey);
    if (Array.isArray(cachedData)) {
      return cachedData;
    }
  }

  await rateLimiter.wait(); // Wait if necessary to respect rate limit
  const url = `https://api.jikan.moe/v4/manga?type=manhwa&genres=10,22&genres_exclude=28&start_date=2020-01-01&page=${page}`;
  const response = await axios.get(url);

  // Transform the response data to match the Manhwa model
  const data: Manhwa[] = response.data.data.map((item: any) => ({
    manhwa_id: item.mal_id,
    title: item.title,
    img_url: item.images.jpg.image_url,
    synopsis: item.synopsis,
    authors: item.authors.map((author: any) => author.name).join(", "),
    serialization: item.serializations
      .map((serialization: any) => serialization.name)
      .join(", "),
  }));

  cache.set(cacheKey, data); // Store the fetched data in cache
  console.log(`Fetching page ${page} from API and caching it`);
  return data;
}

// Function to fetch all pages
export async function fetchAllManhwa(): Promise<Manhwa[]> {
  let page = 1;
  let results: Manhwa[] = [];
  let currentPageData: Manhwa[] = [];

  do {
    currentPageData = await fetchManhwaPage(page);
    results = results.concat(currentPageData);
    page++;
  } while (currentPageData.length !== 0); // Assumes pagination ends when an empty page is returned

  return results;
}
