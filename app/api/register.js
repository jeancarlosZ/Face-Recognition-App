export const register = async (name, email, password) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
      credentials: "include"
    });

    if (response.status === 429) {
      alert("Too many requests, please try again later.");
      return;
    }

    if (!response.ok) {
      console.log("Registration failed");
      return null;
    }

    return response.json();
  } catch (err) {
    console.log(err);
  }
};
