import React from "react";
import PostsList from "./components/PostsList";
import { Container, Typography } from "@mui/material";

const App: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ padding: "20px" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: "20px" , textAlign: "center"}}>
        Custom Data Fetching Hook
      </Typography>
      <PostsList />
    </Container>
  );
};

export default App;
