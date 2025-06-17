import { Box, Stack, Typography } from "@mui/material";
import Accordion from "../components/Accordion";
import { useContext, useState } from "react";
import { AppContext } from "../utils/context";

export default function FAQ() {
  const [currentActiveAccordion, setCurrentActiveAccordtion] = useState<
    string | null
  >(null);
  const { appContent } = useContext(AppContext);

  return (
    <Stack direction={"column"} width={"100%"} p={"2rem"}>
      {(Object.keys(appContent.faq) as Array<keyof typeof appContent.faq>).map(
        (box, firstIndex) => {
          return (
            <Box key={box} py={"2rem"}>
              <Typography variant="h6" color="primary">
                {appContent.faq[box].title}
              </Typography>
              {appContent.faq[box].content.map((element, secondIndex) => {
                return (
                  <Accordion
                    title={element[0]}
                    content={element[1]}
                    handleActive={() =>
                      setCurrentActiveAccordtion(`${firstIndex}-${secondIndex}`)
                    }
                    key={element[0]}
                    isClicked={
                      `${firstIndex}-${secondIndex}` === currentActiveAccordion
                    }
                    isLast={
                      secondIndex === appContent.faq[box].content.length - 1
                    }
                  />
                );
              })}
            </Box>
          );
        }
      )}
    </Stack>
  );
}
