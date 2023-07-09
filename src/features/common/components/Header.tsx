import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.png';
import DesktopMenu from './menus/DesktopMenu';
import { selectCurrentUser } from '../../auth/slice/authSlice';
import DrawerMenu from './menus/DrawerMenu';
import { selectTheme, changeTheme } from '../slice/themeSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import SearchDialog from './SearchDialog';

const Header = () => {
  const { user } = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { dark: darkMode } = useAppSelector(selectTheme);
  const [dark, setDark] = useState(darkMode);
  const handleTheme = () => {
    setDark(!dark);
    dispatch(changeTheme(!dark));
  };
  return (
    <header>
      <div className="logo">
        <NavLink to="/">
          <img src={logo} width={50} alt="Blog" />
        </NavLink>
      </div>
      <div className="menu">
        <SearchDialog />
        <DesktopMenu user={user} />
        <span className="sp-bor">
          <input
            type="checkbox"
            id="dark"
            name="dark"
            checked={dark}
            onChange={handleTheme}
          />
          <label htmlFor="dark">Dark</label>
        </span>
        <DrawerMenu user={user} />
      </div>
    </header>
  );
};

export default Header;
