import { networkMode } from "@/app/features/networkSlice";
import { toaster } from "@/components/ui/toaster";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { useDispatch} from "react-redux";

const InternetConnectionProvider = ({ children }: { children: ReactNode }) => {
  const id = useId();
  const toastIdRef = useRef<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOffline = () => {
      dispatch(networkMode(false));
      toastIdRef.current = id;
      toaster.error({
        id,
        title: "You're Offline",
        description: "Please check your internet connection",
        duration: Infinity,
        closable: true,
        action: {
          label: "Reload",
          onClick: () => window.location.reload(),
        },
      });
    };

    const handleOnline = () => {
      dispatch(networkMode(true));
      if (toastIdRef.current) {
        toaster.dismiss(toastIdRef.current);
        toastIdRef.current = null;
      }
    };

    if (!navigator.onLine) {
      handleOffline();
    }

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [dispatch, id]);

  return <>{children}</>;
};

export default InternetConnectionProvider;
