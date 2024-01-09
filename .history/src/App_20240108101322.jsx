import { useBodyBgVariant } from "./hooks/useBodyBgVariant";
import { Container } from "./Container";
import { Random } from "./Random";
import "./App.css";

const App = () => {
  useBodyBgVariant("primary-subtle");

  return (
    <>
      <Container>
        <Random></Random>
      </Container>
    </>
  );
};

export default App;
