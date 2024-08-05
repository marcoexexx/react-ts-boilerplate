import { ErrorBoundary } from "@/components/core";
import { StoreProvider } from "@/context";
import ThemeWrapper from "@/themes/themeWrapper";
import { Duration } from "@/utils";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,

      staleTime: Duration.fromHours(1),
    },
  },
});

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers(props: ProvidersProps) {
  const { children } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StoreProvider>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
              {/* AuthProvider */}
              <ThemeWrapper>
                {children}
              </ThemeWrapper>
            </ErrorBoundary>
          </QueryClientProvider>
        </HelmetProvider>
      </StoreProvider>
    </LocalizationProvider>
  );
}
