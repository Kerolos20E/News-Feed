export default async function handler(req, res) {
  const { q = "", page = 1, pageSize = 5, category = "", country = "us" } = req.query;

  const params = new URLSearchParams({
    q,
    page,
    pageSize,
    country,
    apiKey: process.env.NEWS_API_KEY,
  });

  if (category) params.set("category", category);

  try {
    const apiRes = await fetch(`https://newsapi.org/v2/top-headlines?${params.toString()}`);
    const data = await apiRes.json();
    res.status(apiRes.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news", details: err.message });
  }
}
