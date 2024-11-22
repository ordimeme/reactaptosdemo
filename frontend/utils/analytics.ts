declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    trustedTypes: {
      createPolicy: (name: string, rules: any) => any;
    };
  }
}

export const initializeGA = () => {
  // 只在生产环境中加载 GA
  if (process.env.NODE_ENV === 'production') {
    try {
      // 创建 Trusted Types 策略
      if (window.trustedTypes && window.trustedTypes.createPolicy) {
        // 创建 GA 专用策略
        const gaPolicy = window.trustedTypes.createPolicy('ga-policy', {
          createScriptURL: (url: string) => {
            // 允许本地和 Google Analytics 的 URL
            const allowedUrls = [
              'https://www.googletagmanager.com/',
              window.location.origin
            ];
            
            if (allowedUrls.some(allowed => url.startsWith(allowed))) {
              return url;
            }

            // 允许所有本地路径
            if (url.startsWith('/')) {
              return url;
            }

            return url;
          },
          createScript: (script: string) => {
            // 允许所有脚本内容
            return script;
          },
          createHTML: (html: string) => {
            // 基本的 HTML 净化
            return html
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
          }
        });

        // 使用策略创建脚本元素
        const script = document.createElement('script');
        script.src = gaPolicy.createScriptURL('https://www.googletagmanager.com/gtag/js?id=G-GNVVWBL3J9').toString();
        script.async = true;
        document.head.appendChild(script);

        // 初始化 GA
        const initScript = gaPolicy.createScript(`
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', 'G-GNVVWBL3J9', {
            cookie_flags: 'SameSite=Lax;Secure;Partitioned'
          });
        `);

        const initScriptElement = document.createElement('script');
        initScriptElement.textContent = initScript.toString();
        document.head.appendChild(initScriptElement);
      } else {
        // 降级处理：直接加载 GA
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-GNVVWBL3J9';
        script.async = true;
        document.head.appendChild(script);
      }
    } catch (error) {
      console.warn('Failed to load Google Analytics:', error);
    }
  }
};

// 添加类型安全的 gtag 函数
export const gtag = (...args: any[]): void => {
  if (window.gtag) {
    window.gtag(...args);
  }
};

// 添加类型安全的 dataLayer 访问
export const pushToDataLayer = (data: any): void => {
  if (window.dataLayer) {
    window.dataLayer.push(data);
  }
}; 