import { useState, useContext } from "react"
import { WalletSelector } from "./WalletSelector";
import Nav from "./NavLink"
import NavMobile from "./NavMobile"
import ThemeToggle from "./ThemeToggle";
import { Link } from 'react-router-dom';
import { ThemeContext } from "@/context/themeContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState("Aptos")
  const { theme } = useContext(ThemeContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="px-4 h-[100px] flex items-center justify-between">
      {/* 左侧 Logo 区域 */}
      <div className="flex">
        <Link to="/markets" className="flex items-center gap-4">
          <img 
            src={theme === 'dark' ? '/aptos-dark.svg' : '/aptos.png'} 
            alt='React + Aptos'
            title='React + Aptos'
            className="h-10 md:h-12 w-auto pl-2"
          />
          <h1 className="font-bold text-2xl md:text-4xl hidden md:block">ReactAptos</h1>
        </Link>
      </div>

      {/* 中间导航区域 */}
      <div className="hidden lg:flex flex-1 justify-center">
        <Nav />
      </div>

      {/* 右侧工具区域 */}
      <div className="flex items-center gap-1 lg:gap-4">
        {/* 网络选择框 */}
        <div className="ml-auto mx-2">
          <Select 
            value={selectedNetwork}
            onValueChange={setSelectedNetwork}
          >
            <SelectTrigger className="w-[100px] md:w-[180px]">
              <SelectValue>{selectedNetwork}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Aptos">Aptos</SelectItem>
                <SelectItem value="Sui">Sui</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        
        <div className="hidden md:block">
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
