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
  };
  book_now: string;
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
};

export type TAppContext = {
  currentTheme: "light" | "dark";
  handleThemeChange: () => void;
  setLang: React.Dispatch<React.SetStateAction<"en" | "jp">>;
  appContent: TAppContent;
  lang: "en" | "jp";
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
