const API = "https://lab12345-asbfanh9h5csdnc0.eastus2-01.azurewebsites.net/api";



export async function apiGet(path) {
  const res = await fetch(`${API}${path}`, {
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error(`API GET error: ${res.status}`);
  }

  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error(`API POST error: ${res.status}`);
  }

  return res.json();
}

export async function apiDelete(path) {
  const res = await fetch(`${API}${path}`, {
    method: "DELETE",
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error(`API DELETE error: ${res.status}`);
  }

  return res.json();
}
