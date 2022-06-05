import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import morgan from "morgan"
import mongoose from "mongoose"
import dotenv from "dotenv"
import rootRoutes from "./src/routes"

dotenv.config()

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.json({ limit: "20mb" }))
app.use("/api", rootRoutes)

mongoose
  .connect(process.env.MONGO_DB)
  .then(() =>
    app.listen(process.env.PORT, () => console.log("Server is running..."))
  )
  .catch((error) => console.log(error))
