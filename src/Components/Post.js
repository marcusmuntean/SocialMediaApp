import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Post(props) {
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
              </CardContent>
            </>
          }
        </Card>
      </Box>
    </>
  );
}
