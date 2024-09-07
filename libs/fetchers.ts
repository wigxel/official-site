"use server";
import { builderInstance } from "~/config/builderio";
import { logServerError } from "~/libs/api";
import {
  PortfolioFactoryFromBuilder,
  type PortfolioItem,
} from "~/libs/factories/portfolio";
import { safeArray } from "~/utils/data.helper";

export async function getPortfolios() {
  try {
    const res = await builderInstance.getAll("portfolio", {
      options: { enrich: true },
    });
    return safeArray(res);
  } catch (err) {
    logServerError(err);
    return [];
  }
}
