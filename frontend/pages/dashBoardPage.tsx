import { useWallet } from "@aptos-labs/wallet-adapter-react";
// Internal Components
import { WalletDetails } from "@/components/WalletDetails";
import { NetworkInfo } from "@/components/NetworkInfo";
import { AccountInfo } from "@/components/AccountInfo";
import { TransferAPT } from "@/components/TransferAPT";
import { MessageBoard } from "@/components/MessageBoard";
// import { TopBanner } from "@/components/TopBanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DashBoard() {
  const { connected } = useWallet();
  return (
      <div className="flex items-center justify-center flex-col">
        {connected ? (
          <Card>
            <CardContent className="flex flex-col gap-10 pt-6">
              <WalletDetails />
              <NetworkInfo />
              <AccountInfo />
              <TransferAPT />
              <MessageBoard />
            </CardContent>
          </Card>
        ) : (
          <CardHeader>
            <CardTitle>To get started Connect a wallet</CardTitle>
          </CardHeader>
        )}
      </div>
  )
}

export default DashBoard;