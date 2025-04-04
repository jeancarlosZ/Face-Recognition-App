export const imageUrlSubmit = async (user, imageUrlEntry) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/imageurl`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        imageUrlEntry
      }),
      credentials: "include"
    });

    if (response.status === 429) {
      alert("Too many requests, please try again later.");
      return;
    }

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
      body: JSON.stringify({
        id: user.id
      }),
      credentials: "include"
    });

    if (response.status === 429) {
      alert("Too many requests, please try again later.");
      return;
    }

    if (!response.ok) {
      console.log("Failed image submission count update");
      return null;
    }

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const checkUrlIfImage = async (user, imageUrlEntry) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/check-image`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        imageUrlEntry
      }),
      credentials: "include"
    });

    if (response.status === 429) {
      alert("Too many requests, please try again later.");
      return;
    }

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
