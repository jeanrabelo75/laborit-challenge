import Groq from "groq-sdk";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const edenAiClient = axios.create({
  baseURL: 'https://api.edenai.run/v2',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: `Bearer ${process.env.EDENAI_API_KEY}`,
  }
});