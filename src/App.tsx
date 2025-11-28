
import { Route, Routes, useLocation } from "react-router-dom";
import { ProductListPage } from "./pages/product-list.page";
import { ProductDetailPage } from "./pages/product-detail.page";
import { Header } from "./components/layout/header";
import { CartPage } from "./pages/cart-page";
import { CategoryMenu } from "./cases/categories/components/category-menu";
import { SearchPage } from "./pages/search-page";
import { SignInPage } from "./pages/signin-page";
import { SignUpPage } from "./pages/signup-page";

function App() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header />

      <main className="bg-white">
        <div className="container mx-auto flex gap-6 py-6">
          {!hideSidebar && <CategoryMenu />}

          <div className={`flex-1 ${hideSidebar ? "mx-auto max-w-md" : ""}`}>
            <Routes>
              <Route path="/" element={<ProductListPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
