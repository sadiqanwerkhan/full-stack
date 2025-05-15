const padDigit = (num: number) => (num < 10 ? `0${num}` : num);

const formatDate = (date: Date) => {
  const currentDate = new Date(date);

  const year = currentDate.getFullYear();
  const month = padDigit(currentDate.getMonth() + 1);
  const day = padDigit(currentDate.getDate());

  return `${day}/${month}/${year}`;
};

export { formatDate };
