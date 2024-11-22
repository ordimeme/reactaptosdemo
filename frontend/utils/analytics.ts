export const initializeGA = () => {
  // 只在生产环境中加载 GA
  if (process.env.NODE_ENV === 'production') {
    try {
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-GNVVWBL3J9';
      script.async = true;
      document.head.appendChild(script);

      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', 'G-GNVVWBL3J9');
    } catch (error) {
      console.warn('Failed to load Google Analytics:', error);
    }
  }
}; 