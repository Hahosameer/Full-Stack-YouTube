import React, { useEffect } from 'react'
import styled from 'styled-components'
import { serverUrl } from './utils/appConstans'

const Container = styled.div`
display: flex;
gap: 20px;
margin: 30px 0px;

/* @media screen and (max-width: 965px) {
display: none;
} */
`

const Avater = styled.img`
    width: 50px;
 height: 50px;
 border-radius: 50%;
`

const Details = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
color: ${({ theme }) => theme.text};
`

const Name = styled.span`
font-size: 13px;
font-weight: 500;
margin-left: 5px;

`
const Date = styled.span`
font-size: 12px;
font-weight: 400;


color: ${({ theme }) => theme.soft};
`
const Text = styled.span``
function Comment({comment}) {

const [channel, setChannel] = useState();

useEffect(()=> {
 const fetchComment = async ()=> {
  const res = await axios.get(`${serverUrl}/api/videos/find/${comment.userId}`);
  setChannel(res.data)
 }
 fetchComment()
}, [comment.userId])
  return (
    <Container>
     <Avater src={channel.img}/>
   <Details>
    <Name>{channel.name} <Date>1 day ago</Date> </Name>
    <Text>
      {comment.desc}
    </Text>
   </Details>
    </Container>
  )
}

export default Comment