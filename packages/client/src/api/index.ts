import axios from 'axios'
import { API_CONFIG } from './config'

export const apiInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
