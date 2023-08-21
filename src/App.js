import "./App.css";
import * as React from "react";
import TodoData from "./components/TodoData";
import NotesData from "./components/NotesData";
import { Box, IconButton } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
function App() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <ToggleColorMode />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
const ToggleColorMode = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <IconButton
          onClick={colorMode.toggleColorMode}
          color="inherit"
          className="ms-auto d-block"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
        <div className="row mx-0">
          <div className="col-lg-6">
            <TodoData />
          </div>
          <div className="col-lg-6">
            <NotesData />
          </div>
        </div>
      </Box>
    </>
  );
};
export default App;
