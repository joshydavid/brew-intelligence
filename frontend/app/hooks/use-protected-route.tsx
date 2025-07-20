import { renderErrorMessageByStatus } from "@/components/ErrorMessage";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { HTTP_STATUS_CODE } from "@/lib/constants/error-message";

export function useProtectedRoute() {
  const { authData, authLoading } = useAuthStatus();
  if (!authData && !authLoading) {
    const errorComponent = renderErrorMessageByStatus(
      HTTP_STATUS_CODE.UNAUTHENTICATED,
    );
    return { showError: true, errorComponent };
  }

  return { showError: false, authLoading, authData };
}
