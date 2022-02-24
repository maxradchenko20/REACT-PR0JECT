import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { userContext } from '../../context/Context';

import { makeStyles } from '@material-ui/core/styles';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PanToolIcon from '@mui/icons-material/PanTool';

const removeItLocalStorage = (key: string): void =>
  localStorage.removeItem(key);

const useClasses = makeStyles({
  header: {
    textAlign: 'center',
    padding: 10,
    boxShadow: 'rgb(204 204 204) 0px 2px 10px',
    height: 61,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& nav': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    '& a': {
      transition: 'all .2s linear',
      borderBottom: '2px solid transparent',
      fontSize: 18,
      margin: '0 10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        color: '#d15700'
      }
    }
  },
  active: {
    color: 'crimson',
    fontWeight: 600
  }
});

const Header = () => {
  const { header } = useClasses();

  const { isLoggedIn, setIsLoggedIn, userName } = useContext(userContext);

  const handleLogOut = () => {
    removeItLocalStorage('isLoggedIn');
    removeItLocalStorage('userName');
    setIsLoggedIn(false);
  };

  return (
    <header className={header}>
      {isLoggedIn ? (
        <nav>
          Добро пожаловать, &nbsp; <strong>{userName}</strong>
          <NavLink onClick={handleLogOut} exact to="/login">
            <MeetingRoomIcon />
            Выход
          </NavLink>
        </nav>
      ) : (
        <p>
          {' '}
          Добро пожаловать{' '}
          <PanToolIcon color="secondary" sx={{ fontSize: 20 }} />
        </p>
      )}
    </header>
  );
};

export default Header;
