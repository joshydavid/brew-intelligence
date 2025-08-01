import { Banner, BannerClose, BannerTitle } from "@/components/ui/banner";

interface BannerComponentInterface {
  title: string;
}

export default function BannerComponent({ title }: BannerComponentInterface) {
  return (
    <Banner>
      <BannerTitle>{title}</BannerTitle>
      <BannerClose />
    </Banner>
  );
}
