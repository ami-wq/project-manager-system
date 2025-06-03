import { NavLink } from "react-router-dom";

const NavLinks = ({ onClick }: { onClick?: () => void }) => {
  const linkClass = (isActive: boolean) =>
    isActive ? 'font-bold sm:text-2xl text-primary' : 'sm:text-2xl text-secondary';

  return (
    <>
      <NavLink to="/issues" className={({ isActive }) => linkClass(isActive)} onClick={onClick}>
        Все задачи
      </NavLink>
      <NavLink to="/boards" className={({ isActive }) => linkClass(isActive)} onClick={onClick}>
        Проекты
      </NavLink>
    </>
  );
};

export default NavLinks;