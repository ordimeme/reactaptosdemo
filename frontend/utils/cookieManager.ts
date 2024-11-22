interface CookieOptions {
  days?: number;
  sameSite?: 'Strict' | 'Lax' | 'None';
  secure?: boolean;
  domain?: string;
  path?: string;
  partitioned?: boolean;
}

const defaultOptions: CookieOptions = {
  days: 7,
  sameSite: 'Lax',
  secure: true,
  path: '/',
  partitioned: false
};

export const setCookie = (name: string, value: string, options: CookieOptions = {}) => {
  const opts = { ...defaultOptions, ...options };
  const d = new Date();
  d.setTime(d.getTime() + ((opts.days || 7) * 24 * 60 * 60 * 1000));

  let cookieString = `${name}=${encodeURIComponent(value)}; expires=${d.toUTCString()}`;
  
  if (opts.path) cookieString += `; path=${opts.path}`;
  if (opts.domain) cookieString += `; domain=${opts.domain}`;
  if (opts.sameSite) cookieString += `; SameSite=${opts.sameSite}`;
  if (opts.secure) cookieString += '; Secure';
  if (opts.partitioned) cookieString += '; Partitioned';

  try {
    document.cookie = cookieString;
    return true;
  } catch (error) {
    console.warn('Failed to set cookie:', error);
    return false;
  }
};

export const getCookie = (name: string): string | null => {
  try {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  } catch (error) {
    console.warn('Cookie access error:', error);
    return null;
  }
};

export const removeCookie = (name: string, options: Partial<CookieOptions> = {}) => {
  const opts = { ...defaultOptions, ...options, days: -1 };
  setCookie(name, '', opts);
};

// 检查第三方 cookie 支持
export const checkThirdPartyCookieSupport = async () => {
  try {
    const testValue = 'test';
    // 尝试设置一个第一方 cookie
    setCookie('cookieTest', testValue, { sameSite: 'Lax' });
    const result = getCookie('cookieTest');
    removeCookie('cookieTest');

    // 如果第一方 cookie 测试成功，返回 true
    if (result === testValue) {
      return true;
    }

    // 如果需要，可以在这里添加第三方 cookie 测试
    return false;
  } catch (error) {
    console.warn('Cookie support check failed:', error);
    return false;
  }
};

// 处理特定域名的 cookie
export const handleAptosLabsCookies = () => {
  const domains = [
    'api.testnet.aptoslabs.com',
    'api.mainnet.aptoslabs.com',
    'fullnode.testnet.aptoslabs.com',
    'fullnode.mainnet.aptoslabs.com',
    'api.devnet.aptoslabs.com',
    'fullnode.devnet.aptoslabs.com'
  ];

  domains.forEach(domain => {
    setCookie('GCLB', '', {
      domain,
      sameSite: 'Lax',
      secure: true,
      path: '/',
      partitioned: true
    });
  });
};

// 清理所有相关的 cookie
export const cleanupCookies = () => {
  const cookiesToClean = [
    'GCLB',
    '_hjSessionUser_3271013',
    'ar_debug'
  ];

  cookiesToClean.forEach(cookieName => {
    removeCookie(cookieName);
  });
};

// 初始化 cookie 管理
export const initializeCookieManagement = async () => {
  const cookieSupport = await checkThirdPartyCookieSupport();
  
  if (cookieSupport) {
    handleAptosLabsCookies();
  } else {
    // 使用 localStorage 作为备选方案
    const fallbackStorage = {
      setItem: (key: string, value: string) => {
        try {
          localStorage.setItem(`cookie_fallback_${key}`, value);
          return true;
        } catch {
          return false;
        }
      },
      getItem: (key: string) => {
        try {
          return localStorage.getItem(`cookie_fallback_${key}`);
        } catch {
          return null;
        }
      },
      removeItem: (key: string) => {
        try {
          localStorage.removeItem(`cookie_fallback_${key}`);
          return true;
        } catch {
          return false;
        }
      }
    };

    // 使用备选存储方案
    console.warn('Using localStorage as cookie fallback');
    return fallbackStorage;
  }
}; 