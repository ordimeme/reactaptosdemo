import { useState } from "react"
import { WalletSelector } from "./WalletSelector";
import Nav from "./NavLink"
import NavMobile from "./NavMobile"
import ThemeToggle from "./ThemeToggle";
import { Link } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
        <div className="h-[100px] flex items-center justify-between">
          {/* 左侧 Logo 区域 */}
          <div className="flex">
          <Link to="/markets" className="flex items-center gap-4">
            <img 
              src='/aptos.png' 
              alt='React + Aptos'
              title='React + Aptos'
              className="h-12 w-auto"
            />
            <h1 className="font-bold text-2xl md:text-4xl hidden md:block">ReactAptos</h1>
          </Link>
          </div>

          {/* 中间导航区域 */}
          <div className="hidden lg:flex flex-1 justify-center">
            <Nav />
          </div>

          {/* 右侧工具区域 */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
            <ThemeToggle />
            </div>
           
            <div className="">
            <WalletSelector />
            </div>
            <div className="lg:hidden">
              <NavMobile 
                isOpen={isMenuOpen} 
                toggleMenu={toggleMenu} 
                connectWallet={<WalletSelector />}
              />
            </div>
          </div>
        </div>
  )
}
