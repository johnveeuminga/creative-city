import FeaturedArtists from "@/components/index/FeaturedArtists";
import FeaturedArtworks from "@/components/index/FeaturedArtworks";
import LiveAuctions from "@/components/index/LiveAuction";
import ShopBanner from "@/components/layout/ShopBanner";

export default async function Index() {
  return (
    <div className="shop-index">
      <ShopBanner />
      <FeaturedArtworks />
      <FeaturedArtists />
      <LiveAuctions />
    </div>
  )
}