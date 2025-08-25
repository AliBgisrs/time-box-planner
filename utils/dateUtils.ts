
export const dateToYYYYMMDD = (date: Date): string => {
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Parses a 'YYYY-MM-DD' string into a Date object at UTC.
 * This is crucial for avoiding timezone-related issues where parsing '2024-01-01'
 * might result in '2023-12-31' in some timezones.
 */
export const yyyymmddToDate = (dateString: string): Date | null => {
    if(!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return null;
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
};

export const getLocalStorageKey = (date: Date): string => {
    return `timeBoxData-${dateToYYYYMMDD(date)}`;
};
