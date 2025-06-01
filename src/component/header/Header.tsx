import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NavLinks from './NavLinks';
import CreateTaskButton from '../CreateTaskButton';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="w-full border border-gray-300">
        <nav className="flex p-2 items-center justify-between">
          <div className="hidden sm:flex gap-2">
            <NavLinks />
          </div>
          <CreateTaskButton className="hidden sm:block" />
          <button
            className="sm:hidden ml-2 p-2 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div className="sm:hidden flex flex-col items-center p-2 gap-2">
          <NavLinks onClick={closeMenu} />
          <CreateTaskButton className="sm:hidden block max-w-40" />
        </div>
      )}
    </>
  );
};

export default Header;