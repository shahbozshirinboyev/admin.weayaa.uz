import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import RootLayout from "./layouts/RootLayout";

// pages
import News from "./components/News/News";
import Members from "./components/Members/Members";
import Design from "./components/Design/Design";
import Company from "./components/Company/Company";

const routes = createBrowserRouter([
  {
    path : "/",
    element: <RootLayout />,
    children: [
      {
        path: "news",
        element: <News />
      },
      {
        path: "design",
        element: <Design />
      },
      {
        path: "members",
        element: <Members />
      },
      {
        path: "company",
        element: <Company />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
