export const BASE_URL = "http://127.0.0.1:8000";

const constructErrorForResponse = async (response: Response) => {
  if (!response.ok) {
    const details = await response.json();
    const error = new Error("An error occurred while fetching the data", {
      cause: details
    });
    return error;
  } else {
    return null;
  }
};

export async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(`${BASE_URL}${input}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    mode: "cors",
    credentials: "include",
    ...init
  });

  const error = await constructErrorForResponse(res);
  if (error) {
    throw error;
  }

  return res.json().catch(() => {});
}
