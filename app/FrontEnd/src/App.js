import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [data, setData] = useState([]);

  const setUserImage = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  const inputHandler = () => {
    if (!imagePreview) return;
    uploadImage(imagePreview);
  };

  const uploadImage = async (base64Image) => {
    try {
      const data = {
        name: name,
        userName: userName,
        image: base64Image,
      };

      const postData = await axios.post("http://localhost:5000/image", data);
      console.log("postData=> ", postData);
    } catch (error) {
      console.log(error);
    }
  };

  const getApiData = async () => {
    const response = await axios.get("http://localhost:5000/images");
    const data = await response.data.getImages;
    setData(data);
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter UserName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <input type="file" onChange={(e) => setUserImage(e)} />
      <br />
      <button onClick={inputHandler}>Upload</button>
      {imagePreview && <img src={imagePreview} width={200} height={200} />}
      <div>
        {data.map((val) => {
          return (
            <>
              <p>{val.name}</p>
              <p>{val.userName}</p>
              <img src={val.image.url} width={200} height={200} />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default App;
