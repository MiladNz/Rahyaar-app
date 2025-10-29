function numberOfDays({ start, end }) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const result = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
  return result;
}
export default numberOfDays;
