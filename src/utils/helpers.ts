export const convertIntoDays = (time: number): number => {
  if (time < 0) return 0;
  return Math.floor(time / 86400000);
};

export const room_options: string[] = [
  "Studio Room",
  "Studio Appartement",
  "1 Bedroom",
  "2 Bedroom",
  "2 Bedroom Penthouse",
  "3 Bedroom",
  "3 Bedroom Penthouse",
  "4 Bedroom",
  "5 Bedroom",
];

export const linkRegex = (link: string): boolean => {
  const HTMLRegex =
    /^http(s?):\/\/(www\.)?[a-zA-Z0-9_.-]+(\.[a-zA-Z0-9_.-]{2,})+$/;
  return HTMLRegex.test(link);
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dateFormat = (date: string): boolean => {
  const dateRegex = new RegExp(
    `^(${months.join("|")}) 20(?:2[5-9]|[3-9][0-9])$`
  );
  return dateRegex.test(date);
};
