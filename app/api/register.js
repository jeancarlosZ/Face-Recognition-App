export const register = async (name, email, password) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    });

    if (!response.ok) {
      console.log("Registration failed");
      return null;
    }

    return response.json();
  } catch (err) {
    console.log(err);
  }
};
