import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export function OIDCCallback() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { connect, disconnect } = useWallet();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // 获取 URL 参数
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state');
        
        if (!code || !state) {
          throw new Error('Missing required parameters');
        }

        // 验证状态
        const savedState = sessionStorage.getItem('oauth_state');
        if (state !== savedState) {
          throw new Error('Invalid state');
        }

        // 处理授权码
        console.log('Received authorization code:', code);

        // 显示成功消息
        toast({
          title: "Success",
          description: "Successfully authenticated with Google",
          className: "bg-[var(--background)] text-[var(--textColor)] border-[var(--softBg)]"
        });

        // 重定向回主页
        navigate('/');
      } catch (error) {
        console.error('OAuth callback error:', error);
        // 断开连接
        await disconnect();
        
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error instanceof Error ? error.message : "Failed to authenticate",
          className: "bg-[var(--background)] text-[var(--textColor)] border-[var(--softBg)]"
        });
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate, toast, connect, disconnect]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4 text-[var(--textColor)]">Authenticating...</h2>
        <p className="text-[var(--softTextColor)]">Please wait while we complete the authentication process.</p>
      </div>
    </div>
  );
} 