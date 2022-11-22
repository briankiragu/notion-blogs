import { compareAsc } from "date-fns";

/**
 * Format the data from a journal into a format that can be used by the app.
 *
 * @param {Record<string, any>} pages Page data from API.
 *
 * @returns {Record<string, any>} The page data with the content formatted.
 * @author Brian Kariuki <bkariuki@hotmail.com>
 */
const prepareData = (pages) => ({
  ...pages,
  results: pages.results.map((page) => ({
    id: page.id,
    title: page.properties.Name.title[0].plain_text,
    status: page.properties.Status.status.name,
    // eslint-disable-next-line camelcase
    publish_date: page.properties["Post Date"].date
      ? page.properties["Post Date"].date.start
      : null,
    // eslint-disable-next-line camelcase
    last_edited_time: page.last_edited_time,
  })),
});

/**
 * When an API call is made, the incoming data is checked against the existing data to determine which folder ought to be created, updated or deleted.
 *
 * @param {Array<Record<string, any>>} incoming The incoming page data from the Notion API.
 * @param {Array<Record<string, any>>} existing The existing page data in the current master list.
 *
 * @returns {Record<string, Array<Record<string, any>>>} The pages that should be added, updated and/or deleted.
 * @author Brian Kariuki <bkariuki@hotmail.com>
 */
const compareData = (incoming, existing) => {
  // Get the IDs of the incoming pages for simpler comparisions.
  const incomingIds = incoming.map((page) => page.id);

  // Get the IDs of the existing pages for simpler comparisions.
  const existingIds = existing.map((page) => page.id);

  // Get the IDs of the pages that are in the incoming data but not in the existing data.
  // These are the new entries.
  const newEntryIds = incomingIds.filter((id) => !existingIds.includes(id));

  // Get the IDs of the pages that are in both the incoming and existing data.
  // These are the pages that MIGHT have been updated.
  const existingEntryIds = incomingIds.filter((id) => existingIds.includes(id));

  // Get the IDs of the pages that are both in the incoming and existing data but have been updated.
  // These are the pages that HAVE been updated.
  const updatedEntryIds = existingEntryIds.filter((id) => {
    // Get the incoming entry from the ID.
    const incomingEntry = incoming.find((page) => page.id === id);

    // Get the existing entry from the ID.
    const existingEntry = existing.find((page) => page.id === id);

    // Compare the last edited times.
    return (
      compareAsc(
        new Date(incomingEntry.last_edited_time),
        new Date(existingEntry.last_edited_time)
      ) === 1
    );
  });

  // Get the IDs of the pages that are in the existing data but not in the incoming data.
  // These are the pages that have been deleted.
  const deletedEntryIds = existingIds.filter((id) => !incomingIds.includes(id));

  // Get the entries that are in the newEntryIds array. These are the new entries.
  const toStore = incoming.filter((page) => newEntryIds.includes(page.id));

  // Get the entries that are in the updatedEntryIds array. These are the updated entries.
  const toUpdate = incoming.filter((page) => updatedEntryIds.includes(page.id));

  // Get the entries that are in the deletedEntryIds array. These are the deleted entries.
  const toDestroy = existing.filter((page) =>
    deletedEntryIds.includes(page.id)
  );

  // Return the entries that should be stored, updated and/or deleted.
  return {
    toStore,
    toUpdate,
    toDestroy,
  };
};

const manageFolders = (pages) => {};

// Export the methods.
export { prepareData, compareData, manageFolders };
