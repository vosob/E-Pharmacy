import { Routes, Route } from "react-router-dom";
import { Layout } from "./Components/Layout";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { AllOrders } from "./pages/AllOrders/AllOrders";
import { AllProducts } from "./pages/AllProducts/AllProducts";
import { AllSuppliers } from "./pages/AllSuppliers/AllSuppliers";
import { AllCustomers } from "./pages/AllCustomers/AllCustomers";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" index element={<Dashboard />} />
        <Route path="/all-orders" element={<AllOrders />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/all-suppliers" element={<AllSuppliers />} />
        <Route path="/all-customers" element={<AllCustomers />} />
      </Routes>
    </Layout>
  );
}

export default App;
