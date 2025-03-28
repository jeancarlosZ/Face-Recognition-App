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
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [faceBoxes, setFaceBoxes] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({});

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
    const image = document.getElementById("inputimage");
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

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onButtonSubmit = () => {
    setImageUrl(input);
    fetch("http://localhost:3000/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(response => response.json())
            .then(entries => {
              setUser(prevUser => ({ ...prevUser, entries: entries }));
            })
        };
        displayFaceBoxes(calculateFaceLocations(response));
      })
      .catch(err => console.log(err));
  }

  const onRouteChange = (route) => {
    if (route === "home") {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
    setRoute(route);
  }

  return (
    <main className="app">
      <ParticlesEffect />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home"
        ? <div>
          <Logo />
          <Rank
            name={user.name}
            entries={user.entries}
          />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          {imageUrl && <FaceRecognition imageUrl={imageUrl} faceBoxes={faceBoxes} />}
        </div>
        : (route === "signin"
          ? <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
          : <Register loadUser={loadUser} onRouteChange={onRouteChange} />
        )
      }
    </main>
  );
}
