import type { bookingDetails } from "./types";
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

export const codeToIcon = {
  "01d": "clear_day",
  "01n": "clear_night",
  "02d": "mostly_clear_day",
  "02n": "mostly_clear_night",
  "03d": "partly_cloudy",
  "03n": "partly_cloudy",
  "04d": "cloudy",
  "04n": "cloudy",
  "09d": "drizzle",
  "09n": "drizzle",
  "10d": "rain",
  "10n": "rain",
  "11d": "tstorm",
  "11n": "tstorm",
  "13d": "snow",
  "13n": "snow",
  "50d": "fog",
  "50n": "fog",
};

export function toUrlFormat(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

type FilterFn = (
  payload: string[],
  toFilterArray: bookingDetails[]
) => bookingDetails[];

type SortFn = (
  state: "ASC" | "DESC",
  toFilterArray: bookingDetails[]
) => bookingDetails[];

const filterRecords: Record<string, FilterFn> = {
  keyword: (payload, toFilterArray) => {
    return toFilterArray.filter(
      (element) =>
        element.en_title.toLowerCase().includes(payload[0].toLowerCase()) ||
        element.short_desc.toLowerCase().includes(payload[0].toLowerCase())
    );
  },
  price_and_type: (payload, toFilterArray) => {
    if (!JSON.parse(payload[2]).length) {
      return toFilterArray.filter(
        (element) =>
          element.price_per_night * Number(payload[0]) * 100 <
          Number(payload[1])
      );
    }
    return toFilterArray.filter(
      (element) =>
        element.price_per_night * Number(payload[0]) * 100 <
          Number(payload[1]) &&
        JSON.parse(payload[2]).includes(element.en_type_one.split(", ")[0])
    );
  },
  date_duration_guests: (payload, toFilterArray) => {
    return toFilterArray.filter(
      (element) => Number(element.max_pax) > Number(payload[0])
    );
  },
};

export function filter(
  filterType: string,
  payload: string[],
  toFilterArray: bookingDetails[]
) {
  if (filterType in filterRecords) {
    return filterRecords[filterType](payload, toFilterArray);
  }
  return toFilterArray;
}

const sortRecords: Record<string, SortFn> = {
  price: (state, toSortArray) => {
    const arr = [...toSortArray];
    if (state === "ASC")
      return arr.sort((a, b) => a.price_per_night - b.price_per_night);
    return arr.sort((a, b) => b.price_per_night - a.price_per_night);
  },
  name: (state, toSortArray) => {
    const arr = [...toSortArray];
    if (state === "ASC")
      return arr.sort((a, b) => a.en_title.localeCompare(b.en_title));
    return arr.sort((a, b) => b.en_title.localeCompare(a.en_title));
  },
  size: (state, toSortArray) => {
    const arr = [...toSortArray];
    if (state === "ASC") return arr.sort((a, b) => a.floor_size - b.floor_size);
    return arr.sort((a, b) => b.floor_size - a.floor_size);
  },
  bedrooms: (state, toSortArray) => {
    const arr = [...toSortArray];
    if (state === "ASC")
      return arr.sort((a, b) => a.en_type_one.localeCompare(b.en_type_one));
    return arr.sort((a, b) => b.en_type_one.localeCompare(a.en_type_one));
  },
};

export function sorters(
  sorter: string,
  state: "ASC" | "DESC",
  toSortArray: bookingDetails[]
) {
  const jpSorters = {
    価格: "Price",
    名前: "Name",
    サイズ: "Size",
    ベッドルーム数: "Bedrooms",
  };
  let customSorter =
    sorter in jpSorters ? jpSorters[sorter as keyof typeof jpSorters] : sorter;
  if (customSorter.toLowerCase() in sortRecords) {
    return sortRecords[customSorter.toLowerCase()](state, toSortArray);
  }
  return toSortArray;
}
