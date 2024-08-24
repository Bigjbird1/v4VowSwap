import "./globals.css";
import MainLayout from "./SpeceficLayouts/MainLayout";
import HeroServer from "../Components/MainComponents/Hero/HeroServer";
import FeaturedListingsServerComponent from "@/Components/MainComponents/FeaturedListings/FeaturedListingsServer";
import { RenderSchemaTags } from "../../libs/seo";

export default async function Home(): Promise<JSX.Element> {
  return (
    <MainLayout>
      <main>
        <HeroServer />
        <FeaturedListingsServerComponent />
      </main>
      <RenderSchemaTags />
    </MainLayout>
  );
}
