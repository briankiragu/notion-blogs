// Import dependencies...
import fetch from "node-fetch";

// Get the API URL.
const apiUrl = "https://api.notion.com";

// Get the API version.
const apiVersion = "2022-06-28";

// Get the API key
const apiKey = "secret_KtsPE4M8GZKB1PH7AiT9gcxlfZPMcyHl9yhTf6a7dEM";

// Get the user credentials.
const apiCredentials = {
  email: "team@mastermathmentor.com",
  password: "#digitalwars4314",
};

// Create the default headers with an authorization token.
const headers = {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
  "Notion-Version": apiVersion,
};
/**
 * Authenticate with the Notion API to get the authentication credentials for downloading HMTL (zip) files.
 *
 * @param {Record<string, string>} credentials The authentication credentials.
 *
 * @returns {Promise<Record<string, string>>} The authentication credentials
 * @author Brian Kariuki <bkariuki@hotmail.com>
 */
const authenticate = async () => {
  // Make a request to the API.
  const response = await fetch("https://www.notion.so/api/v3/loginWithEmail", {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify(apiCredentials),
  });

  // Check if the request was successful.
  if (!response.ok) {
    throw new Error(`Unexpected response: ${response.statusText}`);
  }

  // Get the data from the response body.
  const data = await response.json();

  // Return the data.
  return { ...response.headers, ...data };
};

/**
 * Get the journals from the database based on the name.
 *
 * @param {string} title Get the title of the database to query for.
 *
 * @returns {Promise<Record<string, any>[]>} Returns an array of journals.
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
 * @returns {Promise<Record<string, any>[]>} Returns an array of journals.
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
 * @returns {Promise<Record<string, any>>} Returns a page from a journals.
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

/**
 * Enqueue a task to export a page to HTML.
 *
 * @param {string} pageId The ID of the page to export to HTML.
 *
 * @returns {Promise<string>} The ID of the export block.
 * @author Brian Kariuki <bkariuki@hotmail.com>
 */
const enqueuePageExport = async (pageId) => {
  // Make a request to the API.
  const response = await fetch("https://www.notion.so/api/v3/enqueueTask", {
    headers,
    credentials: "include",
    body: JSON.stringify({
      task: {
        eventName: "exportPage",
        request: {
          pageId,
          exportOptions: {
            exportType: "html",
            timeZone: "Europe/Paris",
            locale: "en",
          },
        },
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
 * Get the status of the export block(s) provided.
 *
 * @param {String[]} blockIds The IDs of the blocks to check the status of.
 *
 * @returns {Promise<Record<string, any>[]>} The status (and export URL} of the blocks.
 * @author Brian Kariuki <bkariuki@hotmail.com>
 */
const getPageExportStatus = async (blockIds) => {
  // Make a request to the API.
  const response = await fetch("https://www.notion.so/api/v3/getTasks", {
    headers,
    credentials: "include",
    body: JSON.stringify({ taskIds: blockIds }),
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

// Export the functions.
export {
  authenticate,
  getJournals,
  getPages,
  getPage,
  enqueuePageExport,
  getPageExportStatus,
};
