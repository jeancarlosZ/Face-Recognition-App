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
    fetch("http://localhost:3000/imageUrl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input
      })
    })
      .then(response => response.json())
      .then(response => {
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
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          {imageUrl && <FaceRecognition imageUrl={imageUrl} faceBoxes={faceBoxes} />}
        </div>
        : (route === "signin"
          ? <SignIn onRouteChange={onRouteChange} />
          : <Register onRouteChange={onRouteChange} />
        )
      }
    </main>
  );
}
