export const signin = async (email, password) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include"
    });

    if (response.status === 429) {
      alert("Too many requests, please try again later.");
      return;
    }

    if (!response.ok) {
      console.log("Failed to login");
      return null;
    }

    return response.json();
  } catch (err) {
    console.log(err);
  }
};
