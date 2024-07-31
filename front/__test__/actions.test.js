import { fetchEvents } from '../js/actions.js';

test('fetchEvents should return events array', async () => {
  const events = await fetchEvents();
  expect(Array.isArray(events)).toBe(true);
});
