import "./App.css";
import { useState, React, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Post from "./Components/Post";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

function App() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [allPosts, setAllPosts] = useState(null);
  const [idArray, setIdArray] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9000/posts/info")
      .then((res) => res.json())
      .then((text) => {
        setAllPosts(text.result);
        setIdArray(text.ids);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:9000/posts/post", {
        Username: username,
        Content: content,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="App">
      <h1>Social Media App</h1>
      <Button variant="contained" onClick={() => handleClickOpen()}>
        + Create New Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Post:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            fullWidth
            variant="standard"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Content"
            fullWidth
            variant="standard"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      {allPosts &&
        idArray &&
        allPosts.map((obj, index) => (
          <>
            <Post
              content={obj.Content}
              username={obj.Username}
              id={idArray[index]}
            />
          </>
        ))}
    </div>
  );
}

export default App;
