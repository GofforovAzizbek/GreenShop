import axios from "axios";

export const api = axios.create({
  baseURL: "https://e-commerce-api-v3.nt.azimumarov.uz/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
