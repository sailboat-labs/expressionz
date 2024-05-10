import Head from "next/head";

type SeoProps = { title: string; description?: string; url?: string };

const DEFAULT_PAGE_DESCRIPTION = `An emoji generation tool that enables users to emote their NFTs and consequently enriching their digital gallery`;

function Seo({ title, description = DEFAULT_PAGE_DESCRIPTION, url }: SeoProps) {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title} | Expressionz</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph (OG) Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />

      {/* Additional Meta Tags */}
      {/* Add more meta tags as needed for your specific SEO requirements */}
    </Head>
  );
}

export default Seo;
