import { useEffect } from "react";

import { useBodyBgVariant } from "./hooks/useBodyBgVariant";
import { Container } from "./Container";
import "./App.css";

const App = () => {
  useBodyBgVariant("primary-subtle");

  return (
    <>
      <Container>
        <Dashboard></Dashboard>
      </Container>
    </>
  );
};

export default App;
