import { useContext, useReducer, useState } from "react";
import {
  Button,
  CircularProgress,
  Stack,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { AppContext } from "../utils/context";
import useMessage from "../hooks/useMessage";

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  width: "100%",
  maxWidth: "550px",
});

interface INewBlogEntry {
  title: string;
  banner_IMG: string;
  category: string;
  content: string;
}

const initialState: INewBlogEntry = {
  title: "",
  banner_IMG: "",
  category: "",
  content: "",
};

interface IActions {
  type: "title" | "banner_IMG" | "category" | "content" | "reset";
  payload: string;
}

const reducer = (state: INewBlogEntry, action: IActions): INewBlogEntry => {
  if (action.type in state) {
    return { ...state, [action.type]: action.payload };
  }
  if (action.type === "reset") {
    return initialState;
  }
  return state;
};

export default function NewBlogEntry() {
  const { appContent, lang } = useContext(AppContext);
  const theme = useTheme();
  const { message, setMessage } = useMessage(2000);
  const [articleElements, setArticleElements] = useReducer(
    reducer,
    initialState
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitArticle = async () => {
    for (let key in articleElements) {
      if (!articleElements[key as keyof INewBlogEntry]) {
        setMessage(appContent.blog.newEntry.requiredError);
        return;
      }
    }
    setLoading(true);
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ ...articleElements, lang }),
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/newArticle`,
        options
      );
      if (response.ok) {
        setMessage(appContent.blog.newEntry.successfullMessage);
        setArticleElements({ type: "reset", payload: "" });
        return;
      }
      setMessage(appContent.blog.newEntry.generalError);
      return;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      direction={"column"}
      width={"100%"}
      p={"2rem 1rem 5rem"}
      alignItems={"center"}
      gap={"10px"}
    >
      <Typography variant="h6" color="primary">
        {appContent.blog.newEntry.header}
      </Typography>
      <StyledTextField
        label={appContent.blog.newEntry.title}
        value={articleElements.title}
        onChange={(e) =>
          setArticleElements({ type: "title", payload: e.target.value })
        }
      />
      <StyledTextField
        label={appContent.blog.newEntry.banner}
        value={articleElements.banner_IMG}
        onChange={(e) =>
          setArticleElements({ type: "banner_IMG", payload: e.target.value })
        }
      />
      <StyledTextField
        label={appContent.blog.newEntry.category}
        value={articleElements.category}
        onChange={(e) =>
          setArticleElements({ type: "category", payload: e.target.value })
        }
      />
      <ReactQuill
        theme="snow"
        placeholder={appContent.blog.newEntry.content}
        value={articleElements.content}
        onChange={(e) => setArticleElements({ type: "content", payload: e })}
        style={{
          width: "100%",
          maxWidth: "950px",
          minHeight: "500px",
          color: theme.palette.primary.main,
        }}
      />
      {loading ? (
        <CircularProgress sx={{ marginTop: "4rem" }} />
      ) : (
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: "4rem" }}
          onClick={handleSubmitArticle}
        >
          {appContent.blog.newEntry.submit}
        </Button>
      )}
      <Typography variant="body1" color="secondary" minHeight={"25px"}>
        {message}
      </Typography>
    </Stack>
  );
}
