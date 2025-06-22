import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.routes.js"
import weatherRouter from "./routes/weather.routes.js"
import historyRouter from "./routes/history.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path"


dotenv.config();

const app = express()

const PORT = process.env.PORT || 3000
const __dirname = path.resolve()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if(process.env.NODE_ENV !== "Production") {
  app.use(cors({ origin: 'http://localhost:5173' }))
}

app.use("/auth", authRouter)
app.use("/weather", weatherRouter)
app.use("/history", historyRouter)

if(process.env.NODE_ENV === "Production") {
  app.use(express.static(path.join(__dirname, "../client/dist")))

  app.get("/{*any}", (req, res) => {
      res.sendFile(path.join(__dirname, "../client", "dist", "index.html"))
  })
}

app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});