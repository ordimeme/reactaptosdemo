import { Outlet } from 'react-router-dom';
import { Header } from "@/components/Header";
import Footer from '@/components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--textColor)] px-6 lg:px-10">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;