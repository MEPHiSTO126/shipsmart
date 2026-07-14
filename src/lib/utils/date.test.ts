import { formatDate, formatRelativeTime, parseDate } from './date';

describe('date utilities', () => {
  it('should parse date strings and Date objects', () => {
    const d = new Date('2026-07-14T08:00:00Z');
    expect(parseDate('2026-07-14T08:00:00Z')).toEqual(d);
    expect(parseDate(d)).toEqual(d);
  });

  it('should format dates properly', () => {
    const d = '2026-07-14T08:30:00.000Z';
    // Contain year 2026
    expect(formatDate(d)).toContain('2026');
  });

  it('should format relative times', () => {
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    const inThreeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    expect(formatRelativeTime(twoHoursAgo)).toBe('2 hours ago');
    expect(formatRelativeTime(inThreeDays)).toBe('in 3 days');
  });
});
