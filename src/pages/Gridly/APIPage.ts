import { APIRequestContext } from "@playwright/test";
import { Data } from "../Data";
import { getRequest } from "../../utils/requestUtils";

export class APIBase {
  readonly request: APIRequestContext;
  readonly headers = {
    Accept: "application/json",
    Authorization: `ApiKey ${process.env.API_KEY}`,
  };

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createDBViaInternalAPI(dbNames: string | string[]) {
    const dbNameArr = Array.isArray(dbNames) ? dbNames : [dbNames];
    for (const dbName of dbNameArr) {
      const response = await this.request.post(
        `https://example.com/databases`,
        {
          data: {
            name: dbName,
          },
          headers: this.headers,
        }
      );
      const responseBody = await response.json();
      Data.dbInternalIdList.push(responseBody.id);
    }
  }

  async deleteDBViaInternalAPIList(idList: string | string[]) {
    const idArr = Array.isArray(idList) ? idList : [idList];
    if (idArr.length === 0) {
      //logger.info('No database to delete');
      return;
    }
    for (const id of idArr) {
      await this.request.delete(`https://example.com/databases/${id}`, {
        headers: this.headers,
      });
    }
  }
}

export async function whitelistAccount(email: string) {
  // Whitelist an account in Gridly
  await getRequest().post(
    `https://api.gridly.com/v1/views/vvsntib663s4f/records`,
    {
      data: [
        {
          id: email,
          path: "integration",
          cells: [
            {
              value: true,
              columnId: "approved",
            },
          ],
        },
      ],
      headers: {
        Accept: "application/json",
        Authorization: "ApiKey gk_2ekBpLJbtuFime",
      },
    }
  );
}
