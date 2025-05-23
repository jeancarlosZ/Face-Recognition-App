import { useState } from "react";
import Navigation from "app/components/Navigation/Navigation";
import Logo from "app/components/Logo/Logo";
import ImageLinkForm from "app/components/ImageLinkForm/ImageLinkForm";
import Rank from "app/components/Rank/Rank";
import FaceRecognition from "app/components/FaceRecognition/FaceRecognition";
import ParticlesEffect from "app/components/ParticlesEffect/ParticlesEffect";
import SignIn from "app/components/SignIn/SignIn";
import Register from "app/components/Register/Register";
import Heartbeat from "app/components/Heartbeat/Heartbeat";
import { logout } from "app/api/logout";

export function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [faceBoxes, setFaceBoxes] = useState([]);
  const [route, setRoute] = useState("signin");
  const [user, setUser] = useState({});

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    });
  };

  const onRouteChange = async (route) => {
    if (route === "signout") {
      await logout();
      setImageUrl("");
      setFaceBoxes([]);
      setRoute("signin");
      setUser({});
    } else {
      setRoute(route);
    }
  };

  return (
    <main className="app">
      <ParticlesEffect />
      <Heartbeat />
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
              setImageUrl={setImageUrl}
              setFaceBoxes={setFaceBoxes}
              onRouteChange={onRouteChange}
              user={user}
              setUser={setUser}
            />
            {imageUrl && <FaceRecognition imageUrl={imageUrl} faceBoxes={faceBoxes} />}
          </div>
        )
        : (
          <div>
            {(route === "signin") && <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />}
            {(route === "register") && <Register loadUser={loadUser} onRouteChange={onRouteChange} />}
          </div>
        )
      }
    </main>
  );
};
