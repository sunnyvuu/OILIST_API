import express from "express";
import tropeRoutes from "./routes/tropeRoutes.js";
import cors from "cors";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World with TypeScript!");
});
app.use("/api", tropeRoutes);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
