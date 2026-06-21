import NewsArticle from "./NewsArticle";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
function NewsFeed(props) {
  const { articles, loading } = props;

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!articles.length) {
    return (
      <Typography align="center" variant="h6" marginTop={4}>
        No article is found.
      </Typography>
    );
  }

  return (
    <div>
      {articles.map((article, index) => (
        <NewsArticle key={index} {...article} />
      ))}
    </div>
  );
}
export default NewsFeed;
