import { Theme } from "@/lib/constants/theme";
import { useTheme } from "next-themes";
import { BeatLoader } from "react-spinners";

export default function BeatLoaderSpiner() {
  const { theme } = useTheme();
  const isDark = theme === Theme.DARK;

  return <BeatLoader size={8} color={isDark ? "white" : "black"} />;
}
