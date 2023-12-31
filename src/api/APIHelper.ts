import axios from "axios"
import { API_URL } from '@env';

async function createGratitudeEntry(entry: Entry) {
  const { data: newGratitudeEntries } = await axios.post(API_URL, entry)
  return newGratitudeEntries
}

async function deleteGratitudeEntry(id: ID) {
  const message = await axios.delete(`${API_URL}${id}`)
  return message
}

async function getAllGratitudeEntries(userID: string) {
  const { data: gratitudeEntries } = await axios.get(`${API_URL}${userID}`)
  return gratitudeEntries
}

async function updateGratitudeEntry(id: ID, payload: Entry) {
  const { data: newGratitudeEntries } = await axios.put(`${API_URL}${id}`, payload)
  return newGratitudeEntries
}

export default { createGratitudeEntry, deleteGratitudeEntry, updateGratitudeEntry, getAllGratitudeEntries }

interface Entry {
  favorited?: boolean,
  gratitudeDescription: string,
  userID: string,
}

type ID = string
