import express from "express"
import { auth, adminCheck } from "../middleware/auth"
import { list, create, read, update, remove } from "../controllers/category"

const router = express.Router()

router.get("/category", list)
router.post("/category", create)
router.get("/category/:id", read)
router.put("/category/:id", update)
router.delete("/category/:id", remove)

export default router
