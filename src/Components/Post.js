import { useState, React } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function Post(props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  async function handleDelete() {
    let url = "http://localhost:9000/posts/delete/" + props.id;
    axios
      .delete(url)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  async function handleEdit() {
    let url = "http://localhost:9000/posts/edit/" + props.id;
    axios
      .put(url, {
        Username: props.username,
        Content: message,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  return (
    <>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          {
            <>
              <CardContent>
                <Typography variant="h5" component="div">
                  Post
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Username: {props.username}
                </Typography>
                <Typography variant="body2">
                  Content: {props.content}
                </Typography>
                <Button
                  sx={{
                    color: "blue",
                    ":hover": { bgcolor: "blue", color: "white" },
                  }}
                  onClick={() => setOpen(true)}
                  autoFocus
                >
                  Edit
                </Button>
                <Button
                  sx={{
                    color: "red",
                    ":hover": { bgcolor: "#9c1e1e", color: "white" },
                  }}
                  onClick={() => handleDelete()}
                  autoFocus
                >
                  Delete
                </Button>
              </CardContent>
            </>
          }
        </Card>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Editing Post:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New message"
            fullWidth
            variant="standard"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => handleEdit()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
