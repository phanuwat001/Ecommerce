import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import User from "../models/User"

export const listUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").exec()

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUser = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findOne({ _id: id }).select("-password").exec()

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params
  const { password, ...others } = req.body
  let hashPassword, updated

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: `not found user: ${id}` })

  if (password) {
    const salt = await bcrypt.genSalt(10)
    hashPassword = await bcrypt.hash(password, salt)
    updated = { ...others, password: hashPassword }
  } else {
    updated = { ...others }
  }

  try {
    await User.findByIdAndUpdate(id, updated, { new: true })

    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: `not found user: ${id}` })

  try {
    await User.findOneAndRemove(id)    

    res.status(200).json({ message: 'User deleted.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const changeStatus = async (req ,res) => {
  const { _id, enabled } = req.body

  try {
    const user = await User.findOneAndUpdate({ _id }, { enabled })

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const changeRole = async (req ,res) => {
  const { _id, role } = req.body

  try {
    const user = await User.findOneAndUpdate({ _id }, { role })

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}