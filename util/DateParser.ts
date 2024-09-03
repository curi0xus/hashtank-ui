export const dateToTimestamp = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.getTime();
  };