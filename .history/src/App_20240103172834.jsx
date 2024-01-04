import { useEffect } from "react";

import { Container } from "./Container";
import "./App.css";

const useBodyBgVariant = (variant = "body-tertiary") => {
  useEffect(() => {
    document.body.classList.add(`bg-${variant}`);

    return () => {
      document.body.classList.remove(`bg-${variant}`);
    };
  }, [variant]);
};

function App() {
  useBodyBgVariant;

  return (
    <>
      <Container></Container>
    </>
  );
}

export default App;
