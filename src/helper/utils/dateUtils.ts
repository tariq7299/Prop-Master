

const formatDateToMMYYYY = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-11), add 1, pad with 0
    const year = date.getFullYear(); // Get the full year (e.g., 2024)

    return `${month}-${year}`;
};

export { formatDateToMMYYYY };