import { signUpSchema } from "./schema";
import { bookingSchema } from "./schema";
import { z } from "zod";

export type TSignUp = z.infer<typeof signUpSchema>;

export type TBooking = z.infer<typeof bookingSchema>;

export type TServerError = {
  en: Record<string, string>;
  jp: Record<string, string>;
};

export type TAppContent = {
  lang: string;
  title: string;
  login: string;
  createAccount: string;
  header: {
    navMenu: string[][];
    specialMenu: string[][];
    menu: string;
    mobileMenu: string[][];
  };
  footer: {
    terms: string;
    privacy: string;
    menus: string[][];
    newsletter: {
      title: string;
      subtitle: string;
      subscribe: string;
      given_name: string;
      full_name: string;
      email: string;
    };
  };
  stay_dates_and_filters: string;
  stay_label: string;
  nights: string;
  guests: string;
  adults: string;
  children: string;
  infants: string;
  price_range: string;
  room_type: string;
  room_options: string[];
  find_accomodation_label: string;
  accomodation_placeholder: string;
  booking_card: {
    see_more: string;
    see_less: string;
    floor_plan: string;
    floor_size: string;
    lifts_within: string;
    village_center: string;
    view: string;
    maximum: string;
    guests: string;
  };
  book_now: string;
  more_info: string;
  send_inquiry: string;
  charges_apply: string;
  general_image_advise: string;
  about: {
    about_nav_links: string[][];
    sections: {
      about: {
        title: string;
        subtitle: string;
        navlink: string;
        description: string[][];
      };
      management: {
        title: string;
        subtitle: string;
        navlink: string;
        description: string[][];
        contact: string;
      };
      "niseko-jobs": {
        title: string;
        subtitle: string;
        navlink: string;
      };
      testimonials: {
        title: string;
        subtitle: string;
        navlink: string;
      };
    };
    testimony_title: string;
    testimonies: string[][];
    jobs: {
      title: string;
      description: string;
      currentJobs: {
        seasonal: string;
        yearly: string;
      };
      seasonal: {
        jobTitle: string;
        jobDescription: string;
        jobLink: string;
        jobStartDate: string;
      }[];
      yearly: {
        jobTitle: string;
        jobDescription: string;
        jobLink: string;
      }[];
    };
  };
  niseko_informations: string[][];
  find_more_button: string;
  find_all_button: string;
  general_layout: {
    [key: string]: {
      title: string;
      sous_title: string;
      bannerIMG: string;
    };
  };
  live_camera: {
    title: string;
    body: string;
  };
  weather: {
    title: string;
    useful_links: {
      name: string;
      links: string[][];
    };
  };
  blog: {
    carousel: string[][];
    blog_intro: {
      title: string;
      desc: string;
    };
    category_part: {
      title: string;
      categories: string[][];
    };
    rss_feed: string;
    posts: {
      title: string;
    };
    newEntry: {
      header: string;
      title: string;
      banner: string;
      category: string;
      content: string;
      submit: string;
      requiredError: string;
      successfullMessage: string;
      generalError: string;
    };
  };
  read_more: string;
  faq: {
    niseko: {
      title: string;
      content: string[][];
    };
    niseko_central: {
      title: string;
      content: string[][];
    };
    japan: {
      title: string;
      content: string[][];
    };
    skiing: {
      title: string;
      content: string[][];
    };
  };
  contact: {
    enquire: string;
    contact_info: string[][];
    contact_details: { [key: string]: string | string[] };
    types: {
      accomodation: string;
      general: string;
    };
  };
  specialDeals: {
    title: string;
    articles: string[][];
  };
  guestService: {
    choose: string;
    services: {
      title: string;
      content: string[][];
    }[];
  };
  loginPage: {
    header: string;
    keepMeSigned: string;
    email: string;
    loginLink: string;
    password: string;
    login: string;
    alternative: string;
    facebook: string;
    google: string;
    new: string;
    forgotPw: string;
    agreement: string;
    terms: string;
    privacy: string;
  };
  signupPage: {
    title: string;
    signUpEmail: string;
    alternative: string;
    facebook: string;
    google: string;
    login: string;
    legality: string;
    terms: string;
    privacy: string;
    form: {
      firstName: string;
      lastName: string;
      email: string;
      pw: string;
      rpPw: string;
      validation: string[];
      backButton: string;
      submitButton: string;
    };
  };
  addBooking: {
    title: string;
    category: string;
    type_one: string;
    type_two: string;
    floorSize: string;
    lifts: string;
    villageDistance: string;
    view: string;
    rawImages: string;
    maxPax: string;
    amenities: string;
    desc: string;
    pricePerNight: string;
    submit: string;
  };
  bookings_category: {
    customers_feedback: string;
  };
  all_booking_categories: string[][];
  no_bookings_error: string;
  sorters: { key: string; value: string }[];
};

export type TAppContext = {
  currentTheme: "light" | "dark";
  handleThemeChange: () => void;
  setLang: React.Dispatch<React.SetStateAction<"en" | "jp">>;
  appContent: TAppContent;
  lang: "en" | "jp";
  loading: boolean;
  contents: bookingDetails[];
  filteredContent: bookingDetails[];
  setFilteredContent: React.Dispatch<React.SetStateAction<bookingDetails[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
};

export interface IContactState {
  firstName: string;
  lastName: string;
  email?: string;
  country?: string;
  phoneNumber?: string;
  flexible?: "yes" | "no";
  nights?: number;
  adults?: number;
  children?: number;
  infants?: number;
  interest?: Set<string>;
  message?: string;
}

export type TContactAction = {
  type:
    | "firstName"
    | "lastName"
    | "email"
    | "country"
    | "phoneNumber"
    | "date"
    | "flexible"
    | "nights"
    | "adults"
    | "children"
    | "infants"
    | "interest"
    | "message";
  payload: string | number | Set<string>;
};

export type bookingDetails = {
  id: number;
  en_title: string;
  jp_title: string;
  en_category: string;
  jp_category: string;
  en_type_one: string;
  jp_type_one: string;
  en_type_two: string;
  jp_type_two: string;
  floor_size: number;
  lifts: number;
  village_distance: number;
  view: string;
  images: { url: string; blur: string }[];
  max_pax: number;
  amenities: string[];
  short_desc: string;
  rating: number;
  price_per_night: number;
  available: 1 | 0;
  jp_view: string;
  jp_short_desc: string;
  jp_amenities: string[];
};

export type MoreInfo = {
  en: {
    title: string;
    description: string;
    feedbacks: {
      feedback: string;
      author: string;
    }[];
  };
  jp: {
    title: string;
    description: string;
    feedbacks: {
      feedback: string;
      author: string;
    }[];
  };
  banner_img: string;
  location: {
    image: string;
    url: string;
  };
};

export type SuggestionBox = Omit<bookingDetails, "images"> & { images: string };

export interface IArticleData {
  en_title: string;
  jp_title: string;
  bannerIMG: string;
  en_category: string;
  jp_category: string;
  date: string;
  en_content: string;
  jp_content: string;
}

export interface IBlogs {
  en_title: string;
  banner_img: {
    image: string;
    blur: string;
  };
  en_category: string;
  date: string;
  en_content: string;
  jp_title: string;
  jp_category: string;
  jp_content: string;
  count: string;
}
