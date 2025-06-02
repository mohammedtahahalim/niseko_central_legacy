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
    floor_plan: string;
  };
};

export type TAppContext = {
  currentTheme: "light" | "dark";
  handleThemeChange: () => void;
  setLang: React.Dispatch<React.SetStateAction<"en" | "jp">>;
  appContent: TAppContent;
  lang: "en" | "jp";
};
