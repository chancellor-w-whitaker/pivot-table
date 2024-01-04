import { useEffect } from "react";

import { Container } from "./Container";
import "./App.css";

function App() {
  useEffect(() => {
    document.body.classList.add("bg-body-tertiary");

    return () => {
      document.body.classList.remove("bg-body-tertiary");
    };
  }, [third]);

  return (
    <>
      <Container></Container>
    </>
  );
}

export default App;
