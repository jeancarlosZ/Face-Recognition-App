export const signin = async (email, password) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (!response.ok) {
      console.log("Failed to login");
      return null;
    }

    return response.json();
  } catch (err) {
    console.log(err);
  }
};
