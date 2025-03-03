import type { Route } from "./+types/home";
import { App } from "../app";
import 'tachyons';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Face Recognition App" },
    { name: "description", content: "This website will detect faces in your pictures." },
  ];
}

export default function Home() {
  return <App />;
}
