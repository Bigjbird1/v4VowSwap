import About from "./aboutPage";

type Params = Promise<{ mylistingid: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function aboutPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  return (
    <div>
      <About />
    </div>
  );
}
