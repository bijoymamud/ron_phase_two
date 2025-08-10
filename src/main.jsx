import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Loading from "./Loading/Loading";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </StrictMode>
  </Provider>
);
