import Navigation from 'app/components/Navigation/Navigation';
import Logo from 'app/components/Logo/Logo';
import ImageLinkForm from 'app/components/ImageLinkForm/ImageLinkForm';
import Rank from 'app/components/Rank/Rank';
import ParticlesEffect from 'app/components/ParticlesEffect/ParticlesEffect';

export function App() {
  return (
    <main>
      <ParticlesEffect />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </main>
  );
}
