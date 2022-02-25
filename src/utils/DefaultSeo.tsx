import { DefaultSeo as Seo } from "next-seo";

export const DefaultSeo: React.FC = () => {
  return (
    <Seo
      title="Quiz App"
      description="Fun quiz with diverse techincal questions"
      canonical="https://www.canonical.ie/"
      openGraph={{
        type: "website",
        locale: "is",
        url: "https://www.nokkvi.io/",
        site_name: "Nökkvi | Portfolio",
      }}
      twitter={{
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image",
      }}
    />
  );
};
