import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL_TEXT;

function getToken() {
  return localStorage.getItem("accessToken") || "";
}

export async function analyzeText(text: string) {
  const token = getToken();
  const res = await axios.post(
    `${API_URL}/analyze`,
    { text },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.analysis || null; // Trả về đối tượng phân tích
}

export async function rephraseSentence(text: string): Promise<string[]> {
  const token = getToken();
  const res = await axios.post(
    `${API_URL}/rephrase`,
    { text },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.rephrasedSentences || [];
}

export async function checkSpelling(text: string) {
  const token = getToken();
  const res = await axios.post(
    `${API_URL}/spell-check`,
    { text },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.correctedText || "";
}

export async function checkGrammar(text: string) {
  const token = getToken();
  const res = await axios.post(
    `${API_URL}/grammar-check`,
    { text },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.correctedText || "";
}
