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
