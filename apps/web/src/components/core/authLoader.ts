import { AuthService } from "@/services";
import { queryClient } from "./Providers";

const apiService = AuthService.new();

export function AuthLoader() {
  return queryClient.fetchQuery({
    queryKey: [apiService.repo],
    queryFn: args => apiService.getMe(args),
    retry: 1,
  });
}
