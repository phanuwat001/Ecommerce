import jwt from "jsonwebtoken"
import User from "../models/User"

export const auth = (req, res, next) => {
  const token = req.headers["authtoken"]

  if (!token) return res.status(401).json("no token , authorization denied")

  try {
    const decoded = jwt.verify(token, process.env.JWT_SEC)

    req.user = decoded.user
    next()
  } catch (err) {
    console.log(err)
    res.status(401).json("Token Invalid!!")
  }
}

export const adminCheck = async (req, res, next) => {
  try {
    const { username } = req.user
    const adminUser = await User.findOne({ username }).exec()
    if (adminUser.role !== "admin") {
      res.status(403).json(err, "Admin Access denied")
    } else {
      next()
    }
  } catch (err) {
    console.log(err)
    res.status(401).json("Admin Access denied")
  }
}
