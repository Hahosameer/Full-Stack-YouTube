import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { serverUrl } from "./utils/appConstans.js";
import { app } from "../firebase.js";
import axios from "axios";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 30px;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 600px;
  min-height: 440px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  z-index: 9999;
`;
const Title = styled.h1`
  text-align: center;
  cursor: pointer;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 9999;

  &::placeholder {
    color: ${({ theme }) =>
      theme.placeholderColor}; // Placeholder color based on theme
  }
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 9999;

  &::placeholder {
    color: ${({ theme }) =>
      theme.placeholderColor}; // Placeholder color based on theme
  }
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  z-index: 9999;
`;
const Label = styled.label`
  font-size: 14px;
  z-index: 9999;
`;

function Upload({ setOpen }) {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [input, setInput] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
 
  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // bhai gg ak jaga galti ha kd kaha
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track upload progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            // console.log("upload is paused");
            break;
          case "running":
            // console.log("upload is running");
            break;

          default:
            break;
        }
      },
      (error) => {},
      () => {
        // Handle successful uploads
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInput((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };
  //   ya kara tha usna ok
  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);
  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handelupload = async (e) => {
    try {
      // aik min
      e.preventDefault();
      const res = await axios.post(
        `${serverUrl}/api/videos`,
        { ...input, tags },
        { withCredentials: true }
      );
      setOpen(false);
      res.status === 200 && navigate(`/video/${res.data?._id}`);
    } catch (error) {
      console.log(error, "upload error");
    }
  };
  // ab check kro g bhai ap dakho na ok ma dakhta ho
  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>x</Close>

        <Title>Upload a new video</Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          "uploading:" + videoPerc
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />

        <Desc
          placeholder="Description"
          rows={5}
          name="desc"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Seperate the tags with commas.."
          onChange={handleTags}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={handelupload}>Upload</Button>
      </Wrapper>
    </Container>
  );
}

export default Upload;
