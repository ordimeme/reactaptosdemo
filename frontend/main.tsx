import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import Markets from './pages/marketsPage.tsx'
import CreateToken from './pages/createPage.tsx'
import StakeToken from './pages/stakePage.tsx'
import NotFound from './pages/404Page.tsx'
import LpAssets from './pages/lpAssetsPage.tsx'
import DashBoard from "./pages/dashBoardPage.tsx";
import { 
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider 
} from 'react-router-dom'
// Internal components
import { Toaster } from "@/components/ui/toaster.tsx";
import { WalletProvider } from "@/components/WalletProvider.tsx";
import { WrongNetworkAlert } from "@/components/WrongNetworkAlert";
import { ThemeContextProvider } from "./context/themeContext";
import { initializeGA } from './utils/analytics';
import { initializeCookieManagement } from './utils/cookieManager';

const queryClient = new QueryClient();

// 初始化应用
if (typeof window !== 'undefined') {
  initializeCookieManagement().catch(console.error);
  initializeGA();
}

// 创建路由配置，添加所有需要的 future flags
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<Markets />} />
      <Route path="/markets" element={<Markets />} />
      <Route path="/create" element={<CreateToken />} />
      <Route path="/lpassets" element={<LpAssets />} />
      <Route path="/stake" element={<StakeToken />} />
      <Route path="/profile" element={<DashBoard />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  ),
  {
    future: {
      // v7_startTransition: true,
      // v7_fetcherPersist: true,
    },
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <WalletProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <WrongNetworkAlert />
          <Toaster />
        </QueryClientProvider>
      </WalletProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
);
