import { Container } from "@mui/material";
import NewsHeader from "./components/NewsHeader";
import NewsFeed from "./components/NewsFeed";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(
      `https://newsapi.org/v2/top-headlines?q=${query}&country=us&apiKey=${import.meta.env.VITE_NEWS_FEED_API_KEY}`,
      { signal: controller.signal },
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
          }),
        );
        setArticles(newArticles);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setLoading(false);
      });

    return () => controller.abort();
  }, [query]);

  const handleSearchChange = debounce(
    debounce((newQuery) => {
      setQuery(newQuery);
    }, 500),
    [],
  );

  return (
    <Container>
      <NewsHeader onSearchChange={handleSearchChange} />
      <NewsFeed articles={articles} loading={loading} />
    </Container>
  );
}

export default App;
