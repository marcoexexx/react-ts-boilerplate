import { EnhancedButton, EnhancedText } from "@/components/common";
import { Box, styled } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const MainContent = styled(Box)(({}) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  alignItems: "center",
  justifyContent: "center",
}));

export default function FailedLoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const from = `/auth/sign-in`;

  const handleGoToLogin = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    navigate(from, { state: { from: location } });
  };

  return (
    <MainContent>
      <EnhancedText
        variant="h3"
        text="Your session has expired or your authentication failed. Please log in again to continue."
      />
      <EnhancedButton onClick={handleGoToLogin}>Go to Login</EnhancedButton>
    </MainContent>
  );
}
