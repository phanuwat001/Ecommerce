import bcrypt from "bcryptjs"
import User from "../models/User"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  const { password, confirmPassword, ...others } = req.body

  if (password !== confirmPassword)
    return res.status(400).json({ message: "Password not match." })

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  const newUser = new User({ ...others, password: hashPassword })

  try {
    await newUser.save()

    res.status(201).json({ message: "create user successfully." })
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).json({ message: "User already exists." })
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  const { username, password } = req.body

  let user = await User.findOneAndUpdate({ username }, { new: true })
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) return res.status(400).json({ message: "Password Invalid." })
  if (user.enabled == false)
    return res.status(400).json({ message: "User is disabled." })

  const payload = {
    user: { username: user.username, role: user.role },
  }

  try {
    jwt.sign(
      payload,
      process.env.JWT_SEC,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err

        res.status(200).json({ token, payload })
      }
    )
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username })
      .select("-password")
      .exec()
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
