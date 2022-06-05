import express from "express"
import { register, login, currentUser } from "../controllers/auth"
import { auth, adminCheck } from "../middleware/auth"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/current-user", auth, currentUser)
router.post("/current-admin", auth, adminCheck, currentUser)

export default router
