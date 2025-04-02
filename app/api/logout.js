export const logout = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: "post",
      credentials: "include"
    });

    if (!response.ok) {
      console.log("Failed to logout");
      return null;
    }

    return response.text();
  } catch (err) {
    console.log(err);
  }
};
