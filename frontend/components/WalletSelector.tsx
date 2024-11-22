import {
  APTOS_CONNECT_ACCOUNT_URL,
  AboutAptosConnect,
  AboutAptosConnectEducationScreen,
  AnyAptosWallet,
  AptosPrivacyPolicy,
  WalletItem,
  groupAndSortWallets,
  isAptosConnectWallet,
  isInstallRequired,
  truncateAddress,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { ArrowLeft, ArrowRight, ChevronDown, Copy, LogOut, User, WalletMinimal} from "lucide-react";
import { useCallback, useState } from "react";
// Internal components
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

export function WalletSelector() {
  const { account, connected, disconnect, wallet } = useWallet();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = useCallback(() => setIsDialogOpen(false), []);

  const copyAddress = useCallback(async () => {
    if (!account?.address) return;
    try {
      await navigator.clipboard.writeText(account.address);
      toast({
        title: "Success",
        description: "Copied wallet address to clipboard.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy wallet address.",
      });
    }
  }, [account?.address, toast]);

  return connected ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-[var(--buttonBg)] text-[var(--buttonText)] hover:bg-[var(--buttonHover)]">
        <WalletMinimal />{account?.ansName || truncateAddress(account?.address) || "Unknown"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[var(--background)] text-[var(--textColor)] border-[var(--softBg)]">
        <DropdownMenuItem onSelect={copyAddress} className="gap-2 hover:bg-[var(--softBg)] cursor-pointer">
          <Copy className="h-4 w-4" /> Copy address
        </DropdownMenuItem>
        {wallet && isAptosConnectWallet(wallet) && (
          <DropdownMenuItem asChild>
            <a href={APTOS_CONNECT_ACCOUNT_URL} 
               target="_blank" 
               rel="noopener noreferrer" 
               className="flex gap-2 hover:bg-[var(--softBg)] cursor-pointer">
              <User className="h-4 w-4" /> Account
            </a>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onSelect={disconnect} className="gap-2 hover:bg-[var(--softBg)] cursor-pointer">
          <LogOut className="h-4 w-4" /> Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[var(--buttonBg)] text-[var(--buttonText)] hover:bg-[var(--buttonHover)]">
        <WalletMinimal />CONNECT WALLET
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="max-h-screen overflow-auto bg-[var(--background)] text-[var(--textColor)] border-[var(--softBg)]"
        aria-describedby="wallet-dialog-description"
      >
        <div id="wallet-dialog-description" className="sr-only">
          Select a wallet to connect to this application
        </div>
        <ConnectWalletDialogContent close={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}

interface ConnectWalletDialogProps {
  close: () => void;
}

function ConnectWalletDialogContent({ close }: ConnectWalletDialogProps) {
  const { wallets = [] } = useWallet();
  const { aptosConnectWallets, availableWallets, installableWallets } = groupAndSortWallets(wallets);

  const hasAptosConnectWallets = !!aptosConnectWallets.length;

  return (
    <AboutAptosConnect renderEducationScreen={renderEducationScreen}>
      <DialogHeader>
        <DialogTitle id="wallet-dialog-title" className="flex flex-col text-center leading-snug">
          {hasAptosConnectWallets ? (
            <>
              <span>[WELLCOME TO REACTAPTOS]</span>
              <span>with Google + Aptos Connect</span>
            </>
          ) : (
            "CONNECT WALLET"
          )}
        </DialogTitle>
      </DialogHeader>

      {hasAptosConnectWallets && (
        <div className="flex flex-col gap-2 pt-3">
          {aptosConnectWallets.map((wallet) => (
            <AptosConnectWalletRow 
              key={wallet.name} 
              wallet={wallet} 
              onConnect={close}
            />
          ))}
          <p className="flex gap-1 justify-center items-center text-muted-foreground text-sm">
            Learn more about{" "}
            <AboutAptosConnect.Trigger className="flex gap-1 py-3 items-center text-foreground">
              Aptos Connect <ArrowRight size={16} />
            </AboutAptosConnect.Trigger>
          </p>
          <AptosPrivacyPolicy className="flex flex-col items-center py-1">
            <p className="text-xs leading-5">
              <AptosPrivacyPolicy.Disclaimer />{" "}
              <AptosPrivacyPolicy.Link className="text-muted-foreground underline underline-offset-4" />
              <span className="text-muted-foreground">.</span>
            </p>
            <AptosPrivacyPolicy.PoweredBy className="flex gap-1.5 items-center text-xs leading-5 text-muted-foreground" />
          </AptosPrivacyPolicy>
          <div className="flex items-center gap-3 pt-4 text-muted-foreground">
            <div className="h-px w-full bg-secondary" />
            Or
            <div className="h-px w-full bg-secondary" />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-3">
        {availableWallets.map((wallet) => (
          <WalletRow 
            key={wallet.name} 
            wallet={wallet} 
            onConnect={close}
          />
        ))}
        {!!installableWallets.length && (
          <Collapsible className="flex flex-col gap-3">
            <CollapsibleTrigger asChild>
              <Button 
                size="sm" 
                variant="ghost" 
                className="gap-2"
                aria-label="Show more wallets"
              >
                More wallets <ChevronDown />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-3">
              {installableWallets.map((wallet) => (
                <WalletRow 
                  key={wallet.name} 
                  wallet={wallet} 
                  onConnect={close}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    </AboutAptosConnect>
  );
}

interface WalletRowProps {
  wallet: AnyAptosWallet;
  onConnect?: () => void;
}

function WalletRow({ wallet, onConnect }: WalletRowProps) {
  return (
    <WalletItem
      wallet={wallet}
      onConnect={onConnect}
      className="flex items-center justify-between px-4 py-3 gap-4 border rounded-md bg-[var(--softBg)] text-[var(--textColor)]"
      data-wallet-name={wallet.name}
    >
      <div className="flex items-center gap-4">
        <WalletItem.Icon className="h-6 w-6" />
        <WalletItem.Name className="text-base font-normal" />
      </div>
      {isInstallRequired(wallet) ? (
        <Button 
          size="sm" 
          variant="ghost" 
          asChild 
          className="hover:bg-[var(--buttonHover)] hover:text-[var(--buttonText)]"
        >
          <WalletItem.InstallLink />
        </Button>
      ) : (
        <WalletItem.ConnectButton asChild>
          <Button 
            size="sm" 
            className="bg-[var(--buttonBg)] text-[var(--buttonText)] hover:bg-[var(--buttonHover)]"
          >
            Connect
          </Button>
        </WalletItem.ConnectButton>
      )}
    </WalletItem>
  );
}

function AptosConnectWalletRow({ wallet, onConnect }: WalletRowProps) {
  return (
    <WalletItem wallet={wallet} onConnect={onConnect}>
      <WalletItem.ConnectButton asChild>
        <Button 
          size="lg" 
          variant="outline" 
          className="w-full gap-4 bg-[var(--softBg)] text-[var(--textColor)] hover:bg-[var(--buttonHover)] hover:text-[var(--buttonText)] border-[var(--softTextColor)]"
        >
          <WalletItem.Icon className="h-5 w-5" />
          <WalletItem.Name className="text-base font-normal" />
        </Button>
      </WalletItem.ConnectButton>
    </WalletItem>
  );
}

function renderEducationScreen(screen: AboutAptosConnectEducationScreen) {
  return (
    <>
      <DialogHeader className="grid grid-cols-[1fr_4fr_1fr] items-center space-y-0">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={screen.cancel}
          className="hover:bg-[var(--softBg)]"
        >
          <ArrowLeft />
        </Button>
        <DialogTitle className="leading-snug text-base text-center">
          About Aptos Connect
        </DialogTitle>
      </DialogHeader>

      <div className="flex h-[162px] pb-3 items-end justify-center">
        <screen.Graphic />
      </div>
      <div className="flex flex-col gap-2 text-center pb-4">
        <screen.Title className="text-xl" />
        <screen.Description className="text-sm text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a]:text-foreground" />
      </div>

      <div className="grid grid-cols-3 items-center">
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={screen.back} 
          className="justify-self-start hover:bg-[var(--softBg)]"
        >
          Back
        </Button>
        <div className="flex items-center gap-2 place-self-center">
          {screen.screenIndicators.map((ScreenIndicator, i) => (
            <ScreenIndicator key={i} className="py-4">
              <div className="h-0.5 w-6 transition-colors bg-[var(--softBg)] [[data-active]>&]:bg-[var(--textColor)]" />
            </ScreenIndicator>
          ))}
        </div>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={screen.next} 
          className="gap-2 justify-self-end hover:bg-[var(--softBg)]"
        >
          {screen.screenIndex === screen.totalScreens - 1 ? "Finish" : "Next"}
          <ArrowRight size={16} />
        </Button>
      </div>
    </>
  );
}
