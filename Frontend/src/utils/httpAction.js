import { toast } from "react-toastify";

const httpAction = async (data) => {
  try {
    const response = await fetch(data.url, {
      method: data.method || 'GET',
      body: data.body ? JSON.stringify(data.body) : null,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    // Check content-type before parsing JSON
    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");

    const result = isJson ? await response.json() : null;

    if (!response.ok) {
      const error = new Error(result?.message || "Request failed");
      error.statusCode = response.status;
      throw error;
    }

    return result;
  } catch (error) {
    console.error("HTTP Error:", error.message);
    if (error.statusCode !== 403) {
      toast.error(error?.message || "Something went wrong!");
    }
    return { status: false }; // Always return consistent shape
  }
};

export default httpAction;
