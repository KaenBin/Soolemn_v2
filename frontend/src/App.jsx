import { Provider } from "react-redux";
import PropType from "prop-types";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/utils/utils";
import AppRouter from "./routers/AppRouter";
import { render } from "@testing-library/react";

const App = ({ store, persistor }) => (
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

App.propTypes = {
  store: PropType.any.isRequired,
  persistor: PropType.any.isRequired,
};

export default App;

const customRender = (ui, options) =>
  render(ui, { wrapper: Provider, ThemeProvider, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
