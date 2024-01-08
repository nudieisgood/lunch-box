import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";

//page comp
import {
  Home,
  Feature,
  Features,
  Item,
  Items,
  Visual,
  HomeLayout,
  Cart,
  Checkout,
  Login,
  Register,
  Completed,
  AdminLayout,
  EditItem,
  Orders,
  EditFeature,
  AddFeature,
  ErrorPage,
  AddItem,
} from "./pages";

//import actions and loaders
import { loader as homeLoader } from "./pages/Home/Home";
import { loader as featuresLoader } from "./pages/Feature/Features";
import { loader as featureLoader } from "./pages/Feature/Feature";
import { loader as itemsLoader } from "./pages/Item/Items";
import { loader as itemLoader } from "./pages/Item/Item";
import { loader as cartLoader } from "./pages/Cart/Cart";
import {
  loader as checkoutLoader,
  action as checkoutAction,
} from "./pages/Checkout/Checkout";

import { loader as ordersLoader } from "./pages/Admin/Orders";
import {
  loader as addFeatureLoader,
  action as addFeatureAction,
} from "./pages/Admin/AddFeature";
import { loader as adminLoader } from "./pages/Admin/AdminLayout";
import { action as addItemAction } from "./pages/Admin/AddItem";
import {
  loader as editItemLoader,
  action as editItemAction,
} from "./pages/Admin/EditItem";
import {
  loader as editFeatureLoader,
  action as editFeatureAction,
} from "./pages/Admin/EditFeature";
import { action as registerAction } from "./pages/User/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      { path: "register", element: <Register />, action: registerAction },
      { path: "login", element: <Login /> },
      { path: "all-items", element: <Items />, loader: itemsLoader },
      {
        path: "item/:id",
        element: <Item />,
        loader: itemLoader,
      },
      { path: "visual", element: <Visual /> },
      { path: "features", element: <Features />, loader: featuresLoader },
      { path: "feature/:id", element: <Feature />, loader: featureLoader },
      {
        path: "cart",
        element: <Cart />,
        loader: cartLoader,
      },
      {
        path: "completed",
        element: <Completed />,
      },
      {
        path: "checkout",
        element: <Checkout />,
        action: checkoutAction,
        loader: checkoutLoader,
      },
      {
        path: "admin",
        element: <AdminLayout />,
        loader: adminLoader,
        children: [
          { index: true, element: <AddItem />, action: addItemAction },
          {
            path: "editItem/:id",
            element: <EditItem />,
            loader: editItemLoader,
            action: editItemAction,
          },
          {
            path: "Orders",
            element: <Orders />,
            loader: ordersLoader,
          },
          {
            path: "manage-feature",
            element: <AddFeature />,
            loader: addFeatureLoader,
            action: addFeatureAction,
          },
          {
            path: "editFeature/:id",
            element: <EditFeature />,
            loader: editFeatureLoader,
            action: editFeatureAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
}

export default App;
