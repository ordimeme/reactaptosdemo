import "@/styles/globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import Markets from '@/pages/MarketsPage.tsx'
import StakeToken from '@/pages/StakePage.tsx'
import NotFound from '@/pages/404Page.tsx'
import LpAssets from '@/pages/LpAssetsPage.tsx'
import DashBoard from "@/pages/DashBoardPage.tsx";
import { 
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom'

import { Toaster } from "@/components/ui/toaster.tsx";
import { WalletProvider } from "@/components/WalletProvider.tsx";
import { WrongNetworkAlert } from "@/components/WrongNetworkAlert";
import { ThemeContextProvider } from "./context/themeContext";
import { initializeGA } from './utils/analytics';
import { initializeCookieManagement } from './utils/cookieManager';
import { OIDCCallback } from './components/OIDCCallback';

// 配置 QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      // 添加序列化配置
      structuralSharing: false,
    },
  },
});

// 初始化应用
if (typeof window !== 'undefined') {
  initializeCookieManagement().catch(console.error);
  initializeGA();
}

// 创建路由配置
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route index element={<Navigate to="/markets" replace />} />
      <Route path="/markets" element={<Markets />} />
      <Route path="/lpassets" element={<LpAssets />} />
      <Route path="/stake" element={<StakeToken />} />
      <Route path="/profile" element={<DashBoard />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/auth/callback" element={<OIDCCallback />} />
    </Route>
  )
);

// 添加全局错误处理
window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.warn('Global error:', { msg, url, lineNo, columnNo, error });
  return false;
};

// 添加未处理的 Promise 错误处理
window.onunhandledrejection = function(event) {
  console.warn('Unhandled promise rejection:', event.reason);
};

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