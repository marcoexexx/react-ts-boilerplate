import { Providers } from "@/components/core";
import { RouterProvider } from "react-router-dom";
import routes from "./pages/router";

function App() {
  return (
    <Providers>
      <RouterProvider router={routes} />
      {/* ToastProvider */}
      {/* BackdropProvider */}
    </Providers>
  );
}

export default App;
