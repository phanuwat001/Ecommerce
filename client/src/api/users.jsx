import axios from "axios"

export const listUser = async (authtoken) => {
  return await axios.get("/users", {
    headers: {
      authtoken,
    },
  })
}

export const changeStatus = async (authtoken, value) => {
  return await axios.post("/change-status", value, {
    headers: {
      authtoken,
    },
  })
}

export const changeRole = async (authtoken, value) => {
  return await axios.post("/change-role", value, {
    headers: {
      authtoken,
    },
  })
}

export const removeUser = async (authtoken, id) => {
  return await axios.delete("/users/" + id, {
    headers: {
      authtoken,
    },
  })
}

export const resetPassword = async (authtoken, id, values) => {
  return await axios.put("/users/" + id, values, {
    headers: {
      authtoken,
    },
  })
}
