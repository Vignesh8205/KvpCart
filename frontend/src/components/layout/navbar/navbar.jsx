import * as React from 'react';
import logo from '../navbar/log.png'
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
import SearchComponent from '../Search';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../../loader/loader';
import { loaduser, logoutuser } from '../../../actions/registercontroller';
import { useState } from 'react';
import Profile from '../../user/profile';



export default function PrimarySearchAppBar() {

  const items=JSON.parse(localStorage.getItem('items') || "[]")

const navigate=useNavigate()

 const [isathunticate,setisathunticate]=useState(false);
 const [user,setuser]=useState(null);
 useEffect(  ()=>{
  loaduser().then(res=>{
     setisathunticate(res.success)
     setuser(res.user)
  })
//  console.log(success,user);
 },[isathunticate,user,items])




  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuCloselogout = () => {
    // logout function
     logoutuser()
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMenuClose = () => {
   
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
     
{
isathunticate&&user.role==='admin'?
      <MenuItem onClick={()=>{navigate('admin/dashboard') }}>Dashboard</MenuItem>:null}
      <MenuItem onClick={()=>{navigate('/myprofile') }}>Profile</MenuItem>
      <MenuItem onClick={()=>{navigate('/orders') }}>Orders</MenuItem>
      <MenuItem   onClick={handleMenuCloselogout}>logout</MenuItem>
     
     
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
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
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      {
      isathunticate?  
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          >
          <img src={user.avatar??`/images/default_avatar.png`} width='30px' alt="" />
        
        </IconButton>
        <p>Profile</p>
      </MenuItem>:null
      }
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" sx={{backgroundColor:'black'}}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {/* logo */}
            <Link to="/">
           {/* <img src='/images/logo.png' height="80px" /> */}
           <img src={logo} height="100px" />

           </Link>
          </Typography>
         
          <SearchComponent/>
          {isathunticate?`${user.name}`:
            <Link className='btn' id='login_btn' to="/login">login</Link>}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
{/* /images/default_avatar.png */}
              {isathunticate?
                <img src={user.avatar??`/images/default_avatar.png`} width='50px' height='50px' alt="" />:null
              }


            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              {isathunticate?
              <Link to='/cart'>
              <span id='cart' className='ml-3'>Cart</span>
              <span id='cart_count' className='ml-3' >{items.length}</span>
              </Link>:null
                  }
              {/* notification count */}
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              {/* notification count */}
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              {/* notification count */}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
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
  );
}
