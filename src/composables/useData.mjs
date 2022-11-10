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

/**
 * Get the journals from the database based on the name.
 *
 * @param {string} title Get the title of the database to query for.
 *
 * @returns Returns an array of journals.
 * @author Brian Kariuki <bkariuki@hotmail.com>
 */
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

/**
 * Get the pages from the database based on the name.
 *
 * @param {string} databaseId The ID of the journal to query pages from.
 *
 * @returns Returns an array of journals.
 * @author Brian Kariuki <bkariuki@hotmail.com>
 */
const getPages = async (databaseId) => {
  // Make a request to the API.
  const response = await fetch(`${apiUrl}/v1/databases/${databaseId}/query`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      filter: {
        or: [
          {
            property: "Status",
            status: { equals: "Active" },
          },
        ],
      },
      sorts: [
        {
          property: "Post Date",
          direction: "descending",
        },
      ],
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

/**
 * Get the page from the database based on the ID.
 *
 * @param {string} pageId The ID of the page to retrieve.
 *
 * @returns Returns a page from a journals.
 * @author Brian Kariuki <bkariuki@hotmail.com>
 */
const getPage = async (pageId) => {
  // Make a request to the API.
  const response = await fetch(`${apiUrl}/v1/pages/${pageId}`, { headers });

  // Check if the request was successful.
  if (!response.ok) {
    throw new Error(`Unexpected response ${response.statusText}`);
  }

  // Get the data from the response.
  const data = await response.json();

  // Return the data.
  return data;
};

// Export the functions.
export { getJournals, getPages, getPage };
