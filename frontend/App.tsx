import { Outlet } from 'react-router-dom';
import { Header } from "@/components/Header";
import Footer from '@/components/Footer'
import { WrongNetworkAlert } from "@/components/WrongNetworkAlert";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--textColor)]">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
      <WrongNetworkAlert />
      <Toaster />
    </div>
  );
}

export default App;