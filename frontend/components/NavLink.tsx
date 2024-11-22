import { Link } from 'react-router-dom';

const Nav = () => {
  const links = [
    { to: '/markets', label: 'Markets' },
    { to: '/create', label: 'Create' },
    { to: '/lpassets', label: 'LP Assets' },
    { to: '/stake', label: 'Stake' },
    { to: '/profile', label: 'profile' },
  ];
  return (
    <div className="hidden space-x-8 lg:block">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          className="p-2 rounded-md transition-colors duration-300 ease-in-out hover:bg-[var(--softBg)] text-[var(--textColor)]"
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}

export default Nav
