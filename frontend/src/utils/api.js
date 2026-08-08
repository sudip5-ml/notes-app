import toast from "react-hot-toast";

const API_URL = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

async function request(url, options = {}) {
  try {
    const res = await fetch(url, { credentials: "include", ...options });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    // Detect network errors when backend is unreachable or down
    if (err instanceof TypeError || err.message === "Failed to fetch") {
      toast.error("Can't reach the server — is the backend running?", {
        id: "network-error-toast",
      });
    }
    throw err;
  }
}

export async function fetchNotes() {
  return request(`${API_URL}/notes`, { headers: headers() });
}

export async function createNote(data) {
  return request(`${API_URL}/notes`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  });
}

export async function updateNote(id, data) {
  return request(`${API_URL}/notes/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(data),
  });
}

export async function deleteNote(id) {
  return request(`${API_URL}/notes/${id}`, {
    method: "DELETE",
    headers: headers(),
  });
}
