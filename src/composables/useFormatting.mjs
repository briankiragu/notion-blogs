/**
 * Format the data from a journal into a format that can be used by the app.
 *
 * @param {Record<string, any>} pages Page data from API.
 *
 * @returns {Record<string, any>} The page data with the content formatted.
 * @author Brian Kariuki <bkariuki@hotmail.com>
 */
const formatPages = (pages) => ({
  ...pages,
  results: pages.results.map((page) => ({
    id: page.id,
    title: page.properties.Name.title[0].plain_text,
    // eslint-disable-next-line camelcase
    last_edited_time: page.last_edited_time,
  })),
});

// Export the methods.
export { formatPages };
