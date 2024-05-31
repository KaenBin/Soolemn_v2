import { Navigate, Route, Routes } from "react-router-dom";

import * as page from "@/pages";
import * as ROUTES from "@/constants/routes";
import { SideBar, Footer } from "@/components/common";

const VendorRouter = () => {
  const selectedTab = () => {
    switch (window.location.pathname.split("/")[1]) {
      case "dashboard":
        return "Dashboard";
      case "order":
        return "Manage Orders";
      case "product":
        return "Manage Products";
      case "transport":
        return "Manage Transport";
      case "shop":
        return "Manage Shop";
      default:
        break;
    }
  };

  return (
    <div className="app">
      <main className="content" style={{ paddingTop: 0 }}>
        <SideBar selectedTab={selectedTab()} />
        <Routes>
          <Route
            exact
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route
            exact
            path="/signin"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route path={ROUTES.DASHBOARD} Component={page.DashBoard} />
          <Route path={ROUTES.MANAGE_ORDERS} Component={page.OrderManage} />
          <Route path={ROUTES.MANAGE_PRODUCTS} Component={page.ProductManage} />
          <Route path={ROUTES.ADD_PRODUCTS} Component={page.AddProduct} />
          <Route
            path={ROUTES.MANAGE_TRANSPORT}
            Component={page.ProductManage}
          />
          <Route path={ROUTES.MANAGE_SHOP} Component={page.ShopManage} />

          <Route path={ROUTES.ADMIN_USERS} Component={page.UserManage} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default VendorRouter;
