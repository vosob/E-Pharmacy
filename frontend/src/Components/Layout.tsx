import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import { Nav } from "./Nav/Nav";

// type LayoutProps = {
//   children: React.ReactNode;
// };

export const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Nav />
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
