const express = require('express');
const axios = require('axios');
const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  try {
    const urlList = req.query.url;

    if (!urlList || urlList.length === 0) {
      return res.status(400).json({ error: 'No URLs provided' });
    }

    const combinedNumbers = [];

    // Make requests to the provided URLs in parallel using Promise.all
    await Promise.all(
      urlList.map(async (url) => {
        try {
          const response = await axios.get(url);

          if (response.status === 200) {
            const data = response.data;
            const numbers = data.numbers || [];
            combinedNumbers.push(...numbers);
          } else {
            throw new Error(`Failed to fetch data from URL: ${url}`);
          }
        } catch (error) {
          throw new Error(`Failed to fetch data from URL: ${url}`);
        }
      })
    );

    // Sort the combined numbers array in ascending order and remove duplicates
    const sortedNumbers = Array.from(new Set(combinedNumbers)).sort((a, b) => a - b);

    return res.json({ numbers: sortedNumbers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
