import axios from "axios"

export const register = async (value) => await axios.post("/register", value)

export const login = async (value) => await axios.post("/login", value)

export const currentUser = async (authtoken) => {
  return await axios.post("/current-user", {}, { headers: { authtoken } })
}

export const currentAdmin = async (authtoken) => {
  return await axios.post("/current-admin", {}, { headers: { authtoken } })
}
