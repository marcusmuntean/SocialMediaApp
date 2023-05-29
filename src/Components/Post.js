import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import axios from "axios";

export default function Post(props) {
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
    </>
  );
}
