import { useEffect } from "react";

import { Container } from "./Container";
import "./App.css";

const useBodyBgVariant = (variant) => {
  useEffect(() => {
    document.body.classList.add("bg-body-tertiary");

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
