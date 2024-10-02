import styled from "styled-components";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import "./index.css";
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
  AccountCircle as SignInIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  background-color: ${({theme}) =>theme.bgLighter};
  width: 60px;

  height: 10vh;

  color: ${({theme}) =>theme.text};
  font-size: 10px;
  position: sticky;
  height: 90vh;
top: 10vh;
  @media screen and (max-width: 768px) { // Adjust width for screens less than or equal to 768px
   
  }
`;
const Wrapper = styled.div`
  padding: 18px 5px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 5px;
  cursor: pointer;
  margin-bottom: 20px;
font-size: 7px;
&:hover{
background-color: ${({theme}) =>theme.soft};
}

`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
   color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500; 
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  font-size: 10px; 
`;
const Login = styled.div``;


function Menu() {
  const {currentUser} = useSelector(state=> state.user)

  return (
    <Container>
      <Wrapper className="Wrapper">
      <Link to="/" style={{textDecoration: "none", color: "inherit"}}>
        <Item className="item">
          <HomeIcon className="itemIcon" />
          Home
        </Item>
    </Link>
        <Item className="item">
          <OndemandVideoIcon className="itemIcon" />
          Shorts
        </Item>
        <Link to="/subscriptions" style={{textDecoration: "none", color: "inherit"}}>
        <Item className="item">
          <SubscribeIcon className="itemIcon" />
          Subscriptions
        </Item>
        </Link>
        <Item className="item">
          <VideoLibraryIcon className="itemIcon" />
          Yoy
        </Item>
        <Item>
        { !currentUser &&    <Link to="signin" style={{textDecoration: "none"}}>
        <Button>
        <SignInIcon />SIGN IN
      </Button>
          </Link>}
        </Item>
      </Wrapper>
    </Container>
  );
}

export default Menu;
