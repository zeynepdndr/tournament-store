export const toUTC = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-GB');
};
