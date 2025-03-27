"use server";

import HeroClient from "./HeroClient";

export default async function HeroServer() {
  const heroVideo =
    "https://videos.pexels.com/video-files/1722591/1722591-uhd_2560_1440_24fps.mp4";

  // This would typically come from a database or API
  const heroData = {
    title: "Find Your Dream Wedding Treasures",
    subtitle: "Preloved wedding pieces with stories to tell, ready for your special day",
    primaryCta: {
      text: "Explore Collection",
      href: "/listings",
    },
    secondaryCta: {
      text: "Sell Your Items",
      href: "/create-listing",
    },
  };

  return (
    <div>
      <HeroClient heroVideo={heroVideo} heroData={heroData} />
    </div>
  );
}
