import express from "express"
import authRoutes from "./auth"
import usersRoutes from './users'

const router = express.Router()

router.get("/", (req, res) => res.status(200).json("API is running!!"))
router.use(authRoutes)
router.use(usersRoutes)

export default router
