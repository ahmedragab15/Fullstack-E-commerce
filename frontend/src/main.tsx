import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProviderr } from "./components/ui/ChakraProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import InternetConnectionProvider from "./provider/InternetConnectionProvider.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <InternetConnectionProvider>
          <ChakraProviderr>
            <App />
          </ChakraProviderr>
        </InternetConnectionProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
