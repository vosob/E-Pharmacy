import { Routes, Route } from "react-router-dom";
import { Layout } from "./Components/Layout";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { AllOrders } from "./pages/AllOrders/AllOrders";
import { AllProducts } from "./pages/AllProducts/AllProducts";
import { AllSuppliers } from "./pages/AllSuppliers/AllSuppliers";
import { AllCustomers } from "./pages/AllCustomers/AllCustomers";
import { Auth } from "./pages/Auth/Auth";
import { PrivateRoute } from "./pages/PrivateRoute";
import { PublicRoute } from "./pages/PublicRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="all-orders" element={<AllOrders />} />
        <Route path="all-products" element={<AllProducts />} />
        <Route path="all-suppliers" element={<AllSuppliers />} />
        <Route path="all-customers" element={<AllCustomers />} />
      </Route>
    </Routes>
  );
}

export default App;
