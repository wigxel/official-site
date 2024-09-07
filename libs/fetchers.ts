"use server";
import { builderInstance } from "~/config/builderio";
import { logServerError } from "~/libs/api";
import { PortfolioFactory } from "~/libs/factories/portfolio";
import { safeArray } from "~/utils/data.helper";

export async function getPortfolios() {
  try {
    const res = await builderInstance.getAll("portfolio", {
      sort: {
        "data.order": 1,
      },
      options: { enrich: true },
    });
    return safeArray(res).map((e) => PortfolioFactory(e));
  } catch (err) {
    logServerError(err);
    return [];
  }
}
