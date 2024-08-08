import { SignInUserForm } from "@/components/auth";
import { EnhancedText } from "@/components/common";
import { SuspenseLoader } from "@/components/core";
import { useGetMe } from "@/hooks";
import { Box, Container, Grid, Link, styled } from "@mui/material";
import { useEffect } from "react";
import { Link as BrowserLink, useLocation, useNavigate } from "react-router-dom";

const GridWrapper = styled(Grid)(({ theme }) => ({
  background: theme.colors.alpha.white[70],
  borderRadius: theme.shape.borderRadius,
}));

const MainContent = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

interface SignInProps {}

export default function SignIn(props: SignInProps) {
  const {} = props;

  const query = useGetMe();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "/home";

  useEffect(() => {
    if (query.data) navigate(from, { replace: true });
  }, [query.data]);

  if (query.isLoading) return <SuspenseLoader />;

  return (
    <MainContent>
      <GridWrapper
        xs={12}
        md={6}
        alignItems="center"
        display="flex"
        justifyContent="center"
        item
      >
        <Container maxWidth="sm">
          <Box textAlign="center">
            <EnhancedText variant="h1" sx={{ my: 2 }}>
              Welcome back
            </EnhancedText>
            <EnhancedText
              variant="h4"
              fontWeight="normal"
              sx={{ mb: 4 }}
            >
              Please sign-in to your account and start the adventure
            </EnhancedText>

            <SignInUserForm />

            <EnhancedText
              variant="h4"
              fontWeight="normal"
              sx={{ my: 2 }}
            >
              Need an account?{" "}
              <Link component={BrowserLink} to="/auth/sign-up">
                Create an account
              </Link>
            </EnhancedText>

            {/* <OAuthForm /> */}
          </Box>
        </Container>
      </GridWrapper>
    </MainContent>
  );
}
