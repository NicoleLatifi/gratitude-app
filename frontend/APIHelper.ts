import axios from "axios"

const API_URL = "http://localhost:3000/gratitudeEntries/"

async function createGratitudeEntries(entry: Entry) {
  const { data: newGratitudeEntries } = await axios.post(API_URL, {
    entry,
  })
  return newGratitudeEntries
}

async function deleteGratitudeEntries(id: ID) {
  const message = await axios.delete(`${API_URL}${id}`)
  return message
}

async function getAllGratitudeEntries() {
  const { data: gratitudeEntries } = await axios.get(API_URL)
  return gratitudeEntries
}

async function updateGratitudeEntries(id: ID, payload: Entry) {
  const { data: newGratitudeEntries } = await axios.put(`${API_URL}${id}`, payload)
  return newGratitudeEntries
}

export default { createGratitudeEntries, deleteGratitudeEntries, updateGratitudeEntries, getAllGratitudeEntries }

interface Entry {
  favorited?: boolean,
  gratitudeDescription: string,
}

type ID = string
