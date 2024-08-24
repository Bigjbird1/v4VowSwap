import MainLayout from "@/app/SpeceficLayouts/MainLayout";

export default function TermsAndConditions(): JSX.Element {
  return (
    <MainLayout>
      <div className="bg-white px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <p className="text-base font-semibold leading-7 text-gray-600">
            Terms and Conditions
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Terms and Conditions
          </h1>

          <div className="mt-10 max-w-2xl">
            <p>
              These terms of use govern your use of our site [site]. Please read
              these terms in full before you use this Website. If you do not
              accept these terms of use, please do not use this Website. Your
              continued use of this site confirms your acceptance of these
              terms.
            </p>
            <p>
              This website is operated as [name]. Throughout the site, the terms
              “we”, “us” and “our” refer to [name] operated by [name].[name]
              offers this website, including all information, tools and services
              available from this site to you, the user, conditioned upon your
              acceptance of all terms, conditions, policies and notices stated
              here.
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-6">
              More information
            </h2>
            <p>legal text here. legal text here. legal text here. legal text</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-6">
              USE OF WEBSITE
            </h2>
            <p className="mt-2  mt-6">LAST UPDATED ON June 25,2024</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
