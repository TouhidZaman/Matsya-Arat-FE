import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
// import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
