import ThemeToggle from './ThemeToggle'
import { Link } from 'react-router-dom'
import { AlignRight, X } from 'lucide-react';

interface NavMobileProps {
  isOpen: boolean;
  toggleMenu: () => void;
  connectWallet: React.ReactNode;
}

const NavMobile = ({ isOpen, toggleMenu}: NavMobileProps) => {

const links = [
        { to: '/markets', label: 'Markets' },
        { to: '/create', label: 'Create' },
        { to: '/lpassets', label: 'LP Assets' },
        { to: '/stake', label: 'Stake' },
        { to: '/profile', label: 'profile' },
      ];

  return (
    <div className="lg:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg hover:bg-[var(--softBg)] transition-colors"
      >
        {isOpen ? <X size={24} />: <AlignRight size={24} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--background)]">
          <div className="flex flex-col items-center pt-20 space-y-8">
            <div onClick={toggleMenu} className="p-2 rounded-full hover:bg-[var(--softBg)] transition-colors"> 
            <X size={30} />
            </div>
            {links.map((link, index) => (
            <Link
            key={index}
            to={link.to}
            className="p-2 rounded-md transition-colors duration-300 ease-in-out hover:bg-[var(--softBg)]"
            onClick={toggleMenu}
            >
            <p className='text-[var(--textColor)] text-xl'>{link.label}</p>
            </Link>
      ))}
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  )
}

export default NavMobile