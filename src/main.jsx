import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import { UploadPage } from "./pages/UploadPage";
import { ViewPage } from "./pages/ViewPage";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="view/:fileId" element={<ViewPage />} />
      <Route path="upload" element={<UploadPage />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);