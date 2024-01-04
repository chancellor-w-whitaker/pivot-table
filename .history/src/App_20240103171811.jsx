import { useState } from "react";

import reactLogo from "./assets/react.svg";
import { Container } from "./Container";
import "./App.css";

import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Container></Container>
    </>
  );
}

export default App;
