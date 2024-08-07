import { ErrorBoundary } from "@/components/core";
import { ContextStoreProvider } from "@/context";
import ThemeWrapper from "@/themes/themeWrapper";
import { Duration } from "@/utils";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,

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
      <ContextStoreProvider>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
              <ThemeWrapper>
                {children}
              </ThemeWrapper>
            </ErrorBoundary>
          </QueryClientProvider>
        </HelmetProvider>
      </ContextStoreProvider>
    </LocalizationProvider>
  );
}
