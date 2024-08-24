import MainLayout from "@/app/SpeceficLayouts/MainLayout";

export default function PrivacyPolicy(): JSX.Element {
  return (
    <MainLayout>
      <div className="bg-white px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <p className="text-base font-semibold leading-7 text-gray-600">
            Privacy Policy
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Privacy Policy
          </h1>

          <div className="mt-10 max-w-2xl">
            <p>
              This Privacy Policy describes how [name] operated by [name]
              (organisation number: 12 34 45 67) and its affiliates
              (&quot;we,&quot; &quot;our&quot; or &quot;us&quot;) collect, use,
              and share information in connection with your use of our websites,
              services, and applications (collectively, the
              &quot;Services&quot;). This Privacy Policy (the &quot;Privacy
              Policy&quot;) does not apply to information our customers may
              process when using our Services.
            </p>
            <br />
            <p>
              We may collect and receive information about users of our Services
              (&quot;users,&quot; &quot;you,&quot; or &quot;your&quot;) from
              various sources, including: (i) information you provide through
              your user account on the Services (your &quot;Account&quot;) if
              you register for the Services; (ii) your use of the Services; and
              (iii) from third-party websites, services, and partners.
            </p>

            <p className="mt-6">LAST UPDATED ON June 25, 2024</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
