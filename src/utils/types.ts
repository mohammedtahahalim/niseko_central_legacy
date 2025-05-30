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
};

export type TAppContext = {
  currentTheme: "light" | "dark";
  handleThemeChange: () => void;
  setLang: React.Dispatch<React.SetStateAction<"en" | "jp">>;
  appContent: TAppContent;
};
