import { NavLink } from "react-router-dom";

const NavLinks = ({ onClick }: { onClick?: () => void }) => {
  const linkClass = (isActive: boolean) =>
    isActive ? 'font-bold text-[#5E4261]' : 'text-[#A079A4]';

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