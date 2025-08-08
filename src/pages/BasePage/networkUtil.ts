import { getPage } from "./pageUtil";

export async function waitForResponseWithAction({
  requestUrlPathToMatch,
  uiAction,
  statusCode,
  requestMethod,
  delay,
}: {
  requestUrlPathToMatch: string;
  uiAction: Promise<void>;
  statusCode: number;
  requestMethod?: string;
  delay?: number;
}) {
  delay = delay ?? 0;
  await Promise.all([
    getPage().waitForResponse((resp) => {
      const urlMatches = resp.url().includes(requestUrlPathToMatch);
      const statusMatches = resp.status() === statusCode;
      const methodMatches =
        !requestMethod || resp.request().method() === requestMethod;

      return urlMatches && statusMatches && methodMatches;
    }),
    uiAction,
  ]);
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}
