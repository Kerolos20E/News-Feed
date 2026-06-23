import { Container, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import NewsHeader from "./components/NewsHeader";
import NewsFeed from "./components/NewsFeed";
import { useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "lodash";

const Footer = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 0),
  display: "flex",
  justifyContent: "space-between",
}));

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(
      `https://newsapi.org/v2/top-headlines?q=${query}&page=${pageNumber}&pageSize=5&country=us&apiKey=${
        import.meta.env.VITE_NEWS_FEED_API_KEY
      }`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((data) => {
        const newArticles = (data.articles || []).map(
          ({ title, description, author, publishedAt, urlToImage }) => ({
            title,
            description,
            author,
            publishedAt,
            image: urlToImage,
          })
        );
        setArticles(newArticles);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setLoading(false);
      });

    return () => controller.abort();
  }, [query, pageNumber]);

  const handleSearchChange = useCallback(
    debounce((newQuery) => {
      setPageNumber(1);
      setQuery(newQuery);
    }, 500),
    []
  );

  const handleNextClick = () => {
    setPageNumber((prev) => prev + 1);
  };

  const handlePreviousClick = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  return (
    <Container>
      <NewsHeader onSearchChange={handleSearchChange} />
      <NewsFeed articles={articles} loading={loading} />
      <Footer>
        <Button
          variant="outlined"
          onClick={handlePreviousClick}
          disabled={pageNumber === 1}
        >
          Previous
        </Button>
        <Button variant="outlined" onClick={handleNextClick}>
          Next
        </Button>
      </Footer>
    </Container>
  );
}

export default App;
