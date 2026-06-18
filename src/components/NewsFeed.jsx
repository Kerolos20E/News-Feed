import NewsArticle from "./NewsArticle";

function NewsFeed(props) {
  const { articles } = props;
  return (
    <div>
      {articles.map((article, index) => (
        <NewsArticle key={index} {...article} />
      ))}
    </div>
  );
}
export default NewsFeed;
