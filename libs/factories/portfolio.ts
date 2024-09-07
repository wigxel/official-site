import type { BuilderContent } from "@builder.io/sdk";
import { DEFAULT_COVER_IMAGE, DEFAULT_PRODUCT_IMAGE } from "~/utils/constants";
import { safeObj } from "~/utils/data.helper";

export type PortfolioItem = {
  id: string;
  cover_image: string;
  thumbnail: string;
  slug: string;
  name: string;
};

export function PortfolioFactory(e: Partial<PortfolioItem>): PortfolioItem {
  return {
    id: e?.id ?? "--",
    slug: e?.slug ?? "--",
    name: e?.name ?? "No Name",
    thumbnail: e?.thumbnail ?? DEFAULT_PRODUCT_IMAGE,
    cover_image: e?.cover_image ?? DEFAULT_COVER_IMAGE,
  };
}

export function PortfolioFactoryFromBuilder(e: BuilderContent) {
  return PortfolioFactory({
    ...safeObj(e?.data),
    id: e.id ?? "",
    cover_image: e?.data?.coverImage,
  });
}
