"use server";

import HeroClient from "./HeroClient";

export default async function HeroServer() {
  const heroVideo =
    "https://videos.pexels.com/video-files/2853795/2853795-uhd_2560_1440_24fps.mp4";

  return (
    <div>
      <HeroClient heroVideo={heroVideo} />
    </div>
  );
}
