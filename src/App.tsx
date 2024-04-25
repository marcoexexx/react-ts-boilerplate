import { Providers } from "@/components/core";
import { commonAction } from "./context/common";
import { useStore } from "./hooks";

function Test() {
  const { state: { common }, dispatch } = useStore();

  return (
    <>
      <h1>{common.theme}</h1>
      <button
        onClick={() =>
          dispatch(commonAction({
            type: "TOGGLE_THEME",
          }))}
      >
        Toggle theme
      </button>
    </>
  );
}

function App() {
  return (
    <Providers>
      <Test />
    </Providers>
  );
}

export default App;
