export const NETWORK = import.meta.env.VITE_APP_NETWORK ?? "testnet";
export const MODULE_ADDRESS = import.meta.env.VITE_MODULE_ADDRESS;
export const APTOS_API_KEY = import.meta.env.VITE_APTOS_API_KEY;
export const CREATOR_ADDRESS = import.meta.env.VITE_FA_CREATOR_ADDRESS;
export const FA_ADDRESS = import.meta.env.VITE_FA_ADDRESS;
export const IS_DEV = Boolean(import.meta.env.DEV);
export const IS_PROD = Boolean(import.meta.env.PROD);
export const NODE_API_URL = import.meta.env.VITE_NODE_API_URL;

// 添加调试信息
if (IS_DEV) {
  console.log('API Key:', APTOS_API_KEY);
  console.log('Network:', NETWORK);
  console.log('Node URL:', NODE_API_URL);
}
