import { APIRequestContext } from "@playwright/test";
import { generateNameWithUUID } from "../../utils/generateUtils";
import BasePage from "../BasePage/basePage";

export class JsonPlaceHolder extends BasePage {
  readonly request: APIRequestContext;
  readonly headers = {
    Accept: "application/json",
  };

  constructor(request: APIRequestContext, browserPage?: any) {
    super(browserPage);
    this.request = request;
  }

  async createUsers(numberOfUser: number) {
    for (let i = 0; i < numberOfUser; i++) {
      const response = await this.request.post(
        `https://jsonplaceholder.typicode.com/users`,
        {
          data: {
            userId: generateNameWithUUID("userId"),
            name: generateNameWithUUID("name"),
            title: generateNameWithUUID("title"),
            agent: [
              { roles: "userSeat" },
              { module: "base" },
              {
                privileges: {
                  canCreate: true,
                  canEdit: true,
                  canDelete: false,
                },
              },
            ],
          },
        }
      );
      console.log("User created: ", await response.json());
    }
  }
}
