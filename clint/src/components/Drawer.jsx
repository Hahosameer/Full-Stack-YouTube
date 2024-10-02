import * as React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import {
  Home as HomeIcon,
  Explore as ExploreIcon,
  Subscriptions as SubscribeIcon,
  History as HistoryIcon,
  VideoLibrary as VideoLibraryIcon,
  MusicNote as MusicIcon,
  SportsSoccer as SportsIcon,
  SportsEsports as GamingIcon,
  LocalMovies as MoviesIcon,
  Announcement as NewsIcon,
  LiveTv as LiveIcon,
  Settings as SettingsIcon,
  Report as ReportIcon,
  Help as HelpIcon,
  LightMode as LightModeIcon,
  ExitToApp as SignOutIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../redux/userSlice'; // Import logOut action

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

export default function TemporaryDrawer({ darkMode, setDarkMode }) {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch(); // Get the dispatch function from useDispatch

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleSignOut = () => {
    navigate("/")

    dispatch(logOut()); // Dispatch the logOut action
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        backgroundColor: darkMode ? '#333' : '#fff',
        color: darkMode ? '#fff' : '#333',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {[
          { text: 'Home', icon: <HomeIcon />, link: '/' },
          { text: 'Explore', icon: <ExploreIcon />, link: '/trends' },
          { text: 'Subscriptions', icon: <SubscribeIcon />, link: '/subscriptions' },
        ].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon sx={{ color: darkMode ? '#fff' : '#333' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Hr />
      <List>
        {[
          { text: 'History', icon: <HistoryIcon /> },
          { text: 'Video Library', icon: <VideoLibraryIcon /> },
          { text: 'Music', icon: <MusicIcon /> },
          { text: 'Sports', icon: <SportsIcon /> },
          { text: 'Gaming', icon: <GamingIcon /> },
          { text: 'Movies', icon: <MoviesIcon /> },
          { text: 'News', icon: <NewsIcon /> },
          { text: 'Live', icon: <LiveIcon /> },
        ].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: darkMode ? '#fff' : '#333' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Hr />
      <List>
        {[
          { text: 'Settings', icon: <SettingsIcon /> },
          { text: 'Report', icon: <ReportIcon /> },
          { text: 'Help', icon: <HelpIcon /> },
        ].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: darkMode ? '#fff' : '#333' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        {[
          { text: darkMode ? 'Light Mode' : 'Dark Mode', icon: <LightModeIcon /> },
        ].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => setDarkMode(!darkMode)}>
              <ListItemIcon sx={{ color: darkMode ? '#fff' : '#333' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Hr />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleSignOut}>
            <ListItemIcon sx={{ color: darkMode ? '#fff' : '#333' }}>
              <SignOutIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button
        sx={{
          '&:hover': {
            backgroundColor: darkMode ? '#373737' : '#f5f5f5',
          },
        }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon sx={{ color: darkMode ? '#fff' : '#333' }} />
      </Button>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
