import { stringify } from "qs";

export async function get(endpoint: string, params: Object = {}) {
  const pathString: string = endpoint + "?" + stringify(params);
  try {
    const res = await fetch(pathString, { method: "GET" });
    const json = await res.json();
    return json;
  } catch (error) {
    return null;
  }
}

export async function post(endpoint: string, body: Object = {}) {
  try {
    const res = await fetch(endpoint, {
      body: JSON.stringify(body),
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(`POST req to ${endpoint} failed:\n${error}`);
    return null;
  }
}

export async function del(endpoint: string, params: Object = {}) {
  const pathString: string = endpoint + "?" + stringify(params);
  try {
    const res = await fetch(pathString, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
    });
    return res.ok ? res.json() : null;
  } catch (error) {
    console.log(`DELETE req to ${endpoint} failed:\n${error}`);
    return null;
  }
}

export type User = { email: string; username: string };