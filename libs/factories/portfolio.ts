import type { BuilderContent } from "@builder.io/sdk";
import { safeNum, safeStr } from "~/utils/data.helper";

export type PortfolioItem = {
  id: string;
  name: string;
  description: string;
  order: number;
  imageUrl: string;
  hide: boolean;
  category: string;
};

export function PortfolioFactory(e: BuilderContent): PortfolioItem {
  return {
    id: safeStr(e?.id, crypto.randomUUID()),
    name: safeStr(e?.data?.title, "--"),
    description: safeStr(e?.data?.description, "--"),
    category: safeStr(e?.data?.category, "--"),
    order: safeNum(e?.data?.order, 1),
    imageUrl: safeStr(e?.data?.imageUrl, "--"),
    hide: e?.data?.hide ?? false,
  };
}
