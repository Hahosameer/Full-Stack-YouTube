import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {format} from 'timeago.js'

const Container = styled.div`
  width:${(props)=> props.type !== "sm" && "370px"};
 margin-bottom:  ${(props)=> props.type === "sm" ? "10px": "45px"};
 cursor: pointer;
 display: ${(props)=> props.type === "sm" && "flex"};
 margin-top:  ${(props)=> props.type === "sm" ? "10px": "20px"};
 gap: 5px;
  @media screen and (max-width: 1235px) {
    width:${(props)=> props.type !== "sm" && "350px"};
  }
  @media screen and (max-width: 1173px) {
    width:${(props)=> props.type !== "sm" && "330px"};
  }
  @media screen and (max-width: 1111px) {
    width:${(props)=> props.type !== "sm" && "310px"};
  }
  @media screen and (max-width: 1073px) {
    width:${(props)=> props.type !== "sm" && "460px"};
  }
  @media screen and (max-width: 1040px) {
    width:${(props)=> props.type !== "sm" && "440px"};
  }
  @media screen and (max-width: 1000px) {
    width:${(props)=> props.type !== "sm" && "420px"};
  }
  @media screen and (max-width: 960px) {
    width:${(props)=> props.type !== "sm" && "400px"};
  }
  @media screen and (max-width: 919px) {
    width:${(props)=> props.type !== "sm" && "380px"};
  }
  @media screen and (max-width: 875px) {
    width:${(props)=> props.type !== "sm" && "350px"};
  }
  @media screen and (max-width: 820px) {
    width:${(props)=> props.type !== "sm" && "700px"};
  }
  @media screen and (max-width: 812px) {
    width:${(props)=> props.type !== "sm" && "600px"};
  }
  @media screen and (max-width: 712px) {
    width:${(props)=> props.type !== "sm" && "500px"};
  }
  @media screen and (max-width: 618px) {
    width:${(props)=> props.type !== "sm" && "450px"};
  }
  @media screen and (max-width: 558px) {
    width:${(props)=> props.type !== "sm" && "400px"};
  }
  @media screen and (max-width: 509px) {
    width:${(props)=> props.type !== "sm" && "370px"};
  }
  @media screen and (max-width: 479px) {
    width:${(props)=> props.type !== "sm" && "350px"};
  }
  @media screen and (max-width: 459px) {
    width:${(props)=> props.type !== "sm" && "320px"};
  }
  @media screen and (max-width: 436px) {
    width:${(props)=> props.type !== "sm" && "300px"};
  }
  @media screen and (max-width: 409px) {
    width:${(props)=> props.type !== "sm" && "270px"};
  }
  @media screen and (max-width: 409px) {
    width:${(props)=> props.type !== "sm" && "250px"};
  }
  @media screen and (max-width: 378px) {
    width:${(props)=> props.type !== "sm" && "230px"};
  }
  @media screen and (max-width: 344px) {
    width:${(props)=> props.type !== "sm" && "200px"};
  }
  @media screen and (max-width: 344px) {
    width:${(props)=> props.type !== "sm" && "230px"};
  }
`;

const Image = styled.img`
 width: 100%;
 height:${(props)=> props.type === "sm" ? "100px" : "200px"} ;
 background-color: #999;
 flex: 1;
 object-fit: cover;
 border-radius: 10px;
 @media screen and (max-width: 820px) {
  height:${(props)=> props.type !== "sm" && "300px"};
  }
  @media screen and (max-width: 558px) {
    height:${(props)=> props.type !== "sm" && "250px"};
  }
  @media screen and (max-width: 479px) {
    height:${(props)=> props.type !== "sm" && "200px"};
  }
  @media screen and (max-width: 370px) {
    height:${(props)=> props.type !== "sm" && "170px"};
  }
`;

const Details = styled.div`
  display: flex;
  /* flex-direction: column; */
  margin-top: ${(props)=> props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const Channelimage = styled.img`
 width: ${(props)=> props.type === "sm" ? "25px": "36px"};
 height: ${(props)=> props.type === "sm" ? "25px": "36px"};
 border-radius: 50%;
 background-color: #999;
 display: ${(props)=> props.type === "sm" && "none"};
  @media screen and (max-width: 964px) {
    display: block; 
  }
`;


const Texts = styled.div``;

const Title = styled.h1`
 font-size:  ${(props)=> props.type === "sm" ? "12px": "14px"};;
 font-weight: 500;
 color: ${({theme})=> theme.text};
`;

const ChannelName = styled.h2`
 font-size: 12px;
 color:${({theme})=> theme.textSoft};
 margin: 9px 0px;
`;

const Info = styled.div`
font-size: 12px;
color: ${({theme})=> theme.textSoft};
`;

function Card({ type , video}) {
  const [channel, setChannel] = useState({});
  
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`https://videp-app-backend.vercel.app/api/users/find/${video.userId}`);
        setChannel(res.data);
      } catch (error) {
        console.log("Error fetching videos:", error);
      }
    };
    fetchChannel();
  }, [video.userId]);
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl}/>
        <Details type={type}>
          {type !== "sm" && <Channelimage type={type} src={channel.img}/>}
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>{video.views} views •{format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}

export default Card;
