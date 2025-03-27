export const imageUrlSubmit = async (token, imageUrlEntry) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/imageurl`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        imageUrlEntry: imageUrlEntry
      })
    });
    const data = await response.json();

    if (data.message === "Unauthorized: Token expired") {
      return "Unauthorized: Token expired";
    } else if (!response.ok) {
      console.log("Failed image URL submission");
      return null;
    }

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const imageSubmitCount = async (token, user) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/image`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        id: user.id
      })
    });

    if (!response.ok) {
      console.log("Failed image submission count update");
      return null;
    }

    return response.json();
  } catch (err) {
    console.log(err);
  }
};
