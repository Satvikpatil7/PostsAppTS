import React, { useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { Container, Typography, Button, List, ListItem, Box } from "@mui/material";

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostsList: React.FC = () => {
  // Fetch posts using custom hook
  const { data: posts, loading, error, refresh } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  // Optimize rendering by memoizing the post list
  const renderedPosts = useMemo(
    () =>
      posts?.map((post) => (
        <ListItem
          key={post.id}
          sx={{
            marginBottom: "10px",
            padding: "10px",
            borderBottom: "1px solid #ccc",
            textAlign: "justify",
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {post.title}
            </Typography>
            <Typography variant="body2">{post.body}</Typography>
          </Box>
        </ListItem>
      )),
    [posts]
  );

  return (
    <Container sx={{ padding: "20px", background: "#f4f4f4" }}>
      {/* Title */}
      <Typography variant="h5" sx={{ marginBottom: "15px" }}>
        Posts List
      </Typography>

      {/* Show loading and error messages */}
      {loading && <Typography color="primary">Loading...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}

      {/* Refresh button to fetch posts again */}
      <Button
        variant="contained"
        color="primary"
        onClick={refresh}
        sx={{ marginBottom: "15px" }}
      >
        Refresh
      </Button>

      {/* Render list of posts */}
      <List>{renderedPosts}</List>
    </Container>
  );
};

export default PostsList;
