import { EnhancedText } from "@/components/common";
import { withGuard } from "@/components/core";
import { useStore } from "@/hooks";
import { Box } from "@mui/material";

const Home = withGuard(() => {
  const { state: { common: { auth } } } = useStore();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "end",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <EnhancedText variant="h4" p={2} px={5}>Hello, {auth?.username}</EnhancedText>

      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          minWidth: "100vw",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EnhancedText variant="h1">Home landing page</EnhancedText>
      </Box>
    </Box>
  );
});

export default Home;
