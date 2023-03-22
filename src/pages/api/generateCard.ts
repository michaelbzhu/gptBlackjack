// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
// Fetch data from the API
fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPEN_AI_API_KEY}`
  },
  body: JSON.stringify({
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Randomly generate a single playing card with the format suit (D, H, C, S) : rank (1 - 13)"}]
  })
})
  .then(response => response.json())
  .then(data => {
    // Process the data here
      console.log(data.choices[0].message.content)
      res.status(200).json(data.choices[0].message.content)
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    // Respond with an error
    res.status(500).json(error);
  });
}
