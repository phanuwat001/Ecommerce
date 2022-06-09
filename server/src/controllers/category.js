import Category from "../models/Category"

export const list = async (req, res) => {
  try {
    const category = await Category.find({}).exec()

    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const create = async (req, res) => {
  try {
    const category = await new Category({ name: req.body.name }).save()

    res.status(201).json(category)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const read = async (req, res) => {
  const { id } = req.params

  try {
    const category = await Category.findOne(id).exec()

    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const update = async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    await Category.findOneAndUpdate(id, { name })

    res.status(204).json({ message: "Category updated.." })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const remove = async (req, res) => {
  const { id } = req.params

  try {
    await Category.findOneAndDelete(id)

    res.status(200).json({ message: "Category Delete.."})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
