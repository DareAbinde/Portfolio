import { useEffect } from "react";
import Frame1 from "../imports/Frame17/index";
import { loadGoogleFonts } from "./utils/loadFonts";

export default function App() {
  useEffect(() => {
    loadGoogleFonts();
  }, []);

  return <Frame1 />;
}
