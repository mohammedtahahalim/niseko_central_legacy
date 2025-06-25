import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";

export default function ProtectedRoutes() {
  const [loading, setLoading] = useState<boolean>(true);
  const navigator = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/verifyToken`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          navigator("/");
        } else {
          setLoading(false);
        }
      } catch (err) {
        navigator("/");
      }
    })();
  }, []);

  if (loading) {
    return (
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        marginTop={"3rem"}
      >
        <CircularProgress />
      </Box>
    );
  }
  return <Outlet />;
}
