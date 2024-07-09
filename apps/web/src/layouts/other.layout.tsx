import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export function OtherLayout() {
  return (
    <Box sx={{ flex: 1, height: "100vh" }}>
      Other layout
      <Outlet />
    </Box>
  );
}
