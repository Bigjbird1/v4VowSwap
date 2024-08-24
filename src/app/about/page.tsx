import About from "./aboutPage";

interface AboutPageProps {
  params: { [key: string]: string };
}

export default async function aboutPage({ params }: AboutPageProps) {
  return (
    <div>
      <About />
    </div>
  );
}
