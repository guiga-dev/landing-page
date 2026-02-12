import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./hooks/useTheme";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'bg-white dark:bg-[#0A1628] border-slate-200 dark:border-blue-500/20 text-slate-900 dark:text-white',
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
