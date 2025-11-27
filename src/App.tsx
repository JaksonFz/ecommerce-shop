import { Route, Routes } from "react-router-dom";
import { ProductListPage } from "./pages/product-list.page";
import { ProductDetailPage } from "./pages/product-detail.page";
import { Header } from "./components/layout/header";
import { CartPage } from "./pages/cart-page";
import { CategoryMenu } from "./cases/categories/components/category-menu";

function App() {
  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header />

      <main className="bg-white">
        <div className="container mx-auto flex gap-6 py-6">

          {/* Sidebar */}
          <aside className="w-60 hidden md:block">
            <CategoryMenu />
          </aside>

          {/* Conteúdo (rotas) */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<ProductListPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
