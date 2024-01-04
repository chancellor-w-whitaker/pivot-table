import { useEffect } from "react";

import { Container } from "./Container";
import "./App.css";

const useBodyBgVariant = (variant = "body-tertiary") => {
  useEffect(() => {
    document.body.classList.add(`bg-${variant}`);

    return () => {
      document.body.classList.remove("bg-body-tertiary");
    };
  }, []);
};

function App() {
  return (
    <>
      <Container></Container>
    </>
  );
}

export default App;
