// Import dependencies...
import fetch from "node-fetch";

// Get the API URL.
const apiUrl = "https://api.notion.com";

// Get the API key
const apiKey = "secret_KtsPE4M8GZKB1PH7AiT9gcxlfZPMcyHl9yhTf6a7dEM";

// Create the default headers with an authorization token.
const headers = {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
  "Notion-Version": "2022-06-28",
};

const getJournals = async (title) => {
  // Make a request to the API.
  const response = await fetch(`${apiUrl}/v1/search`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: title,
      filter: {
        value: "database",
        property: "object",
      },
    }),
  });

  // Check if the request was successful.
  if (!response.ok) {
    throw new Error(`Unexpected response ${response.statusText}`);
  }

  // Get the data from the response.
  const data = await response.json();

  // Return the data.
  return data;
};

const getPages = async () => [];

export { getJournals, getPages };
