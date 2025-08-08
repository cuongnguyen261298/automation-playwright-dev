import {APIRequestContext} from 'playwright';

let request: APIRequestContext;

export function getRequest(): APIRequestContext {
  return request;
}

export function setRequest(requestContext: APIRequestContext): void {
  request = requestContext;
}
