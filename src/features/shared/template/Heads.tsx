import Head from "next/head";
import { FC } from "react";
import { useRouter } from "next/router";
import { getAbsoluteUrl } from "@/features/shared/utils/utils";
import { useI18n } from '@/features/localization/hooks/useI18n';

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const Heads: FC<Props> = ({ title, description}) => {
  const { asPath } = useRouter();
  const currentUrl = `${getAbsoluteUrl()}${asPath}`;
  const { t } = useI18n();
  const thumbnailUrl = `${getAbsoluteUrl()}/assets/logo/logo.png`;

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no"
      />
      <title>{`${t("app_name")} ${title ? " | " + title : ""}`}</title>
      <meta
        name="title"
        content={`${t("app_name")} ${title ? " | " + title : ""}`}
      />
      <meta
        name="description"
        content={description ?? t("app_description")}
      />
      <meta
        itemProp="name"
        content={`${t("app_name")} ${title ? " | " + title : ""}`}
      />
      <meta itemProp="url" content={currentUrl} />
      <meta itemProp="author" content={t("app_name")} />
      <>
        <meta itemProp="image" content={thumbnailUrl} />
        <meta property="og:image" content={thumbnailUrl} />
      </>

      {/* OpenGraph meta */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta
        property="og:title"
        content={`${t("app_name")} ${title ? " | " + title : ""}`}
      />
      <meta
        property="og:site_name"
        content={`${t("app_name")} ${title ? " | " + title : ""}`}
      />
      <meta
        property="og:description"
        content={description ?? t("app_description")}
      />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="600" />
      <meta name="og:image:alt" content={t("app_name")} />

      {/* Twitter meta */}
      <meta name="twitter:site" content="@sulealothman" />
      <meta name="twitter:creator" content="@sulealothman" />
      <meta property="twitter:card" content="summary_large_image" />

      <link
        rel="icon"
        href={`${getAbsoluteUrl()}/favicon.svg`}
        sizes="any"
      />
    </Head>
  );
};

export default Heads;
