import { Theme } from "@/lib/constants/theme";
import { useTheme } from "next-themes";
import { HashLoader } from "react-spinners";

interface HashLoaderSpinnerProps {
  size?: number;
}

export default function HashLoaderSpinner({
  size = 20,
}: HashLoaderSpinnerProps) {
  const { theme } = useTheme();
  const isDark = theme === Theme.DARK;

  return <HashLoader size={size} color={isDark ? "white" : "black"} />;
}
