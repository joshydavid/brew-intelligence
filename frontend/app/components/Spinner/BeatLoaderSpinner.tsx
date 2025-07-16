import { Theme } from "@/lib/constants/theme";
import { useTheme } from "next-themes";
import { BeatLoader } from "react-spinners";

interface BeatLoaderSpinnerProps {
  size?: number;
}

export default function BeatLoaderSpinner({
  size = 8,
}: BeatLoaderSpinnerProps) {
  const { theme } = useTheme();
  const isDark = theme === Theme.DARK;

  return <BeatLoader size={size} color={isDark ? "white" : "black"} />;
}
