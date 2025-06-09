import { styled, Box } from "@mui/material";
import { useRef, useEffect, useContext } from "react";
import { AppContext } from "../utils/context";

declare global {
  interface Window {
    __TOMORROW__?: {
      renderWidget: () => void;
    };
  }
}

const StyledWeatherBox = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "450px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "25px",
  position: "relative",
  paddingBottom: "22px",
}));

export default function WeatherBox() {
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const { appContent, currentTheme } = useContext(AppContext);

  useEffect(() => {
    const scriptId = "tomorrow-sdk";
    const loadScriptAndRender = () => {
      if (window.__TOMORROW__) {
        window.__TOMORROW__.renderWidget();
      }
    };
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js";
      script.async = true;
      script.onload = loadScriptAndRender;
      document.body.appendChild(script);
    } else {
      loadScriptAndRender();
    }
  }, []);

  useEffect(() => {
    const container = widgetContainerRef.current;
    if (container) {
      container.innerHTML = "";

      const widgetDiv = document.createElement("div");
      widgetDiv.className = "tomorrow";
      widgetDiv.setAttribute("data-location-id", "064145");
      widgetDiv.setAttribute(
        "data-language",
        appContent.lang === "日本語" ? "EN" : "JA"
      );
      widgetDiv.setAttribute("data-unit-system", "METRIC");
      widgetDiv.setAttribute("data-skin", currentTheme);
      widgetDiv.setAttribute("data-widget-type", "upcoming");
      widgetDiv.style.paddingBottom = "22px";
      widgetDiv.style.position = "relative";

      container.appendChild(widgetDiv);

      if (window.__TOMORROW__) {
        window.__TOMORROW__.renderWidget();
      }
    }
  }, [appContent.lang, currentTheme]);

  return <StyledWeatherBox ref={widgetContainerRef} />;
}
