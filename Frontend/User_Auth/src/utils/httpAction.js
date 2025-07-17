import { toast } from "react-toastify";
const httpAction = async (data) => {
  try {
    const response = await fetch(data.url, {
      method: data.method || 'GET',
      body: data.body ? JSON.stringify(data.body) : null,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const result = await response.json();

    if (!response.ok) {
      const error=new Error(result?.message)
      error.statusCode=response.status
      throw new Error(result?.message || "Request failed");
    }

    return result;
  } catch (error) {
    console.error("HTTP Error:", error.message);
    error.statusCode!=403 && toast.error(error?.message || "Something went wrong!");
    return { status: false }; // make it safe for consumers
  }
};

export default httpAction;
