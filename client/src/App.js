import Landing from "./pages/Landing";
import Error from "./pages/Error";
import Register from "./pages/Register";
import {
  AddProduct,
  AllProducts,
  Profile,
  SharedLayout,
  Cart,
} from "./dashboard/index";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ProtectedRouter from "./components/ProtectedRoute";
import ProtectedSupplierRoute from "./components/ProtectedSupplierRoute";
import ProtectedCustomerRoute from "./components/ProtectedCustomerRoute";
import Orders from "./dashboard/Orders";

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouter>
                  <SharedLayout />
                </ProtectedRouter>
              }
            >
              <Route index element={<AllProducts />} />
              <Route
                path="add-product"
                element={
                  <ProtectedSupplierRoute>
                    <AddProduct />
                  </ProtectedSupplierRoute>
                }
              />
              <Route
                path="orders"
                element={
                  <ProtectedSupplierRoute>
                    <Orders />
                  </ProtectedSupplierRoute>
                }
              />
              <Route path="profile" element={<Profile />} />
              <Route
                path="add-to-cart"
                element={
                  <ProtectedCustomerRoute>
                    <Cart />
                  </ProtectedCustomerRoute>
                }
              />
            </Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/landing" element={<Landing />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
