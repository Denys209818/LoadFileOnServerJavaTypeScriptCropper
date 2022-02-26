import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

// Стилі для блоку поля пошуку
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  // Стилі для обгортки поля пошуку
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  // Стилі для поля пошуку
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

const Navbar: React.FC = () => 
{
    //  Обєкт для навігації. Використовується для переадресації на інші сторінки
    const navigate = useNavigate();
    //  Встановлює кнопку, до якої прикріплюється меню (на ПК)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // Встановлює кнопку, до якої прикріплюється меню (на планшетах та смартфонах)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);
    // Встановлення чи меню відкрите (на ПК)
    const isMenuOpen = Boolean(anchorEl);
    // Встановлення чи меню відкрите (на планшетах та смартфонах)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // Подія, яка встановлює кнопку, до якої привязується меню
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        // Встановлення даної кнопки як обєкт, до якого привязується меню
        setAnchorEl(event.currentTarget);
    };
    // Подія яка спрацьовує при нажатті на пункт меню і закриває його (на планшетах та смартфонах)
    const handleMobileMenuClose = () => {
      //  Встановлення нульового посилання на обєкт кнопки(на планшетах та смартфонах)
        setMobileMoreAnchorEl(null);
    };
    // Подія яка спрацьовує при нажатті на пункт меню і закриває його (на ПК)
    const handleMenuClose = () => {
      //  Встановлення нульового посилання на обєкт кнопки (на ПК)
        setAnchorEl(null);
        //  Встановлення нульового посилання на обєкт кнопки (на планшетах та смартфонах)
        handleMobileMenuClose();
    };

    // Подія, яка відкриває меню на мобільному телефоні
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      // Встановлення кнопки, до якої привязується меню
        setMobileMoreAnchorEl(event.currentTarget);
    };

    
    const menuId = 'primary-search-account-menu';
    // Меню, яке відображається на ПК
    const renderMenu = (
    <Menu
      // Елемент, до якого привяується меню
      anchorEl={anchorEl}
      // anchorOrigin: { vertical{top}, horizontal{right}} - вказує розміщення відносно кнопки привязки
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      // Ідентифікатор меню
      id={menuId}
      // Створює затримку меню
      keepMounted
      // Вказує чи модальне вікно відкрите
      open={isMenuOpen}
      // Подія яка закриваає меню
      onClose={handleMenuClose}
    >
      {/* MenuItem - елемент меню (подібно до ul>li) */}
      <MenuItem onClick={handleMenuClose}>Профіль</MenuItem>
      <MenuItem onClick={handleMenuClose}>Mій аккаунт</MenuItem>
      <MenuItem onClick={() => {handleMenuClose();
        navigate("/create");
        }}>Створити нову тварину</MenuItem>

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  // Меню, яке виникатиме на мобільних девайсах.
  // Робота параметрів однакова із звичайним меню
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      {/* IconButton - Кнопка, яка є іконкою одночасно. Параметр size вказує на розмір кнопки,
      а color на колір іконки */}
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          {/* Badge - відображення кількості елементів у кружечку навколо кнопки
          badgeContent - контент даного блоку
          color - колів даного кружечка */}
          <Badge badgeContent={4} color="error">
            {/* Іконка із сайту https://mui.com/components/material-icons/ */}
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Повідомлення</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Вхідні виклики</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Профіль</p>
      </MenuItem>
    </Menu>
  );
  return (<>
  {/* Box - блок для контенту (sx - надає можливість задавати css стилі для блоку) */}
  <Box sx={{ flexGrow: 1 }}>
    {/* AppBar - компонент для вертикального меню. 
    position - вказує позицію елемента відносно сторінки */}
      <AppBar position="static">
        {/* Панель інструментів для вертикального меню */}
        <Toolbar>
          {/* Кнопка (іконка). size - розмір. edge - до якого краю притискається. color - колір. sx - власні стилі */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {/*Typography Надає можливість формувати елемент html, який міститиме усі параметри,
            що передаються атрибутами */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, color: 'white'}}
          >
            Зоопарк
          </Typography>
          {/* Search тег, який формує поле для пошуку */}
          <Search>
            {/* SearchIconWrapper - тег, у який вложується відображення для пошуку  */}
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            {/* StyledInputBase Тег, який містить базові стилі для поля Input */}
            <StyledInputBase
              placeholder="Пошук..."
            />
          </Search>
          {/* Проміжний блок (між лівими і правими елементами) */}
          <Box sx={{ flexGrow: 1 }} />
          {/* Панель керування, яка складається з іконок-кнопок */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    </>);
}
// Експорт компоненту навбара (шапки дефолтного шаблону)
export default Navbar;