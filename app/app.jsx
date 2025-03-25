import { useState } from "react";
import Navigation from "app/components/Navigation/Navigation";
import Logo from "app/components/Logo/Logo";
import ImageLinkForm from "app/components/ImageLinkForm/ImageLinkForm";
import Rank from "app/components/Rank/Rank";
import FaceRecognition from "app/components/FaceRecognition/FaceRecognition";
import ParticlesEffect from "app/components/ParticlesEffect/ParticlesEffect";
import SignIn from "app/components/SignIn/SignIn";
import Register from "app/components/Register/Register";

export function App() {
  const [imageUrlEntry, setImageUrlEntry] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [faceBoxes, setFaceBoxes] = useState([]);
  const [route, setRoute] = useState("signin");
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }

  const calculateFaceLocations = (faceBoxes) => {
    const image = document.getElementById("image-from-url");
    const width = Number(image.width);
    const height = Number(image.height);

    faceBoxes.map((faceBox) => {
      faceBox.topRow = faceBox.topRow * height;
      faceBox.rightCol = width - (faceBox.rightCol * width);
      faceBox.bottomRow = height - (faceBox.bottomRow * height);
      faceBox.leftCol = faceBox.leftCol * width;
    })

    return faceBoxes;
  }

  const displayFaceBoxes = (faceBoxes) => {
    setFaceBoxes(faceBoxes);
  }

  const onImageUrlEntryChange = (event) => {
    setImageUrlEntry(event.target.value);
  }

  const onButtonSubmit = () => {
    setImageUrl(imageUrlEntry);

    fetch(`${import.meta.env.VITE_API_URL}/imageurl`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        imageUrlEntry: imageUrlEntry
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.message === "Unauthorized: Token expired") {
          alert("Session expired. Logging out...");
          onRouteChange("signout");
        } else if (Array.isArray(response)) {
          fetch(`${import.meta.env.VITE_API_URL}/image`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(response => response.json())
            .then(entries => {
              setUser(prevUser => ({ ...prevUser, entries: entries }));
            }).catch(err => console.log(err));

          displayFaceBoxes(calculateFaceLocations(response));
        }
      })
      .catch(err => console.log(err));

    setImageUrlEntry("");
  }

  const onRouteChange = (route) => {
    if (route === "signout") {
      setImageUrlEntry("");
      setImageUrl("");
      setFaceBoxes([]);
      setRoute("signin");
      setUser({});
      setToken("");
    } else {
      setRoute(route);
    }
  }

  return (
    <main className="app">
      <ParticlesEffect />
      <Navigation onRouteChange={onRouteChange} route={route} />
      {route === "home"
        ? (
          <div>
            <Logo />
            <Rank
              name={user.name}
              entries={user.entries}
            />
            <ImageLinkForm
              imageUrlEntry={imageUrlEntry}
              onImageUrlEntryChange={onImageUrlEntryChange}
              onButtonSubmit={onButtonSubmit}
            />
            {imageUrl && <FaceRecognition imageUrl={imageUrl} faceBoxes={faceBoxes} />}
          </div>
        )
        : (
          <div>
            {(route === "signin") && <SignIn loadUser={loadUser} onRouteChange={onRouteChange} setToken={setToken} />}
            {(route === "register") && <Register loadUser={loadUser} onRouteChange={onRouteChange} setToken={setToken} />}
          </div>
        )
      }
    </main>
  );
}
