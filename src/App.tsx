import { Providers } from "./components";
import { useStore } from "./hooks";

function Test() {
  const { state: { common }, dispatch } = useStore();

  return <><h1>{common.theme}</h1>
    <button onClick={() => dispatch({common: {""}})}>Toggle theme</button>
  </>
}

function App() {
  return (
    <Providers>
      <Test />
    </Providers>
  );
}

export default App;
