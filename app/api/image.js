export const imageUrlSubmit = async (imageUrlEntry) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/imageurl`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrlEntry }),
      credentials: "include"
    });

    if (!response.ok) {
      console.log("Failed image URL submission");
      return null;
    }

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const imageSubmitCount = async (user) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/image`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id }),
      credentials: "include"
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

export const checkUrlIfImage = async (imageUrlEntry) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/check-image`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrlEntry }),
      credentials: "include"
    });
    const data = await response.json();

    if (data.message && !data.message.includes("Failed to fetch image headers")) {
      return data;
    } else if (!response.ok) {
      console.log("Failed to verify if URL points to an image");
      return null;
    }

    return data;
  } catch (err) {
    console.log(err);
  }
};
