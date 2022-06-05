import express from "express"
import { listUsers, getUser, updateUser, deleteUser } from "../controllers/users"
import { auth, adminCheck } from "../middleware/auth"

const router = express.Router()

router.get("/users", auth, adminCheck, listUsers)
router.get("/users/:id", getUser)
router.put("/users/:id", auth, adminCheck, updateUser)
router.delete("/users/:id", deleteUser)

export default router
