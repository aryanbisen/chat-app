import { Link, Outlet } from "react-router-dom";
import Layout from "../components/Layout";

function HomePage() {
  return (
    <div>
      <main className="pt-8">
        <div className="flex">
          <div className="w-1/4">
            <Layout />
          </div>
          <div className="w-3/4">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
