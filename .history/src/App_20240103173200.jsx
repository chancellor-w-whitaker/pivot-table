import { useEffect } from "react";

import { Container } from "./Container";
import "./App.css";

const useBodyBgVariant = (variant = "body-tertiary") => {
  useEffect(() => {
    typeof variant === "string" &&
      variant.length > 0 &&
      document.body.classList.add(`bg-${variant}`);

    return () => {
      variant.length > 0 && document.body.classList.remove(`bg-${variant}`);
    };
  }, [variant]);
};

function App() {
  useBodyBgVariant("primary-subtle");

  return (
    <>
      <Container></Container>
    </>
  );
}

export default App;
