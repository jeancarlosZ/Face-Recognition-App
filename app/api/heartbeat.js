export const heartbeat = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/`);

    if (!response.ok) {
      console.log("Failed to send heartbeat");
      return null;
    }

    return response.text();
  } catch (err) {
    console.log(err);
  }
};
