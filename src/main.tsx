import { getTopLevelReadableElementsOnPage } from "./lib/parser";
import "./main.css";

// import HoverPlayer from "./lib/HoverPlayer";

export function Main() {
  const elements = getTopLevelReadableElementsOnPage();
  console.log(elements, "OUTPUT");
  return <></>;
  // return <HoverPlayer />;
}
