import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10,
  duration: "30s",
  thresholds: {
    // "http_req_duration{type:initial_load}": ["p(95)<1670"],
    "http_req_duration{type:scroll}": ["p(95)<859"],
    // "http_req_duration{type:search_chance}": ["p(95)<1200"],
    // "http_req_duration{type:search_percent_s}": ["p(95)<1490"],
    // "http_req_duration{type:combined_search}": ["p(95)<765"], 
    // "http_req_duration{type:global_search}": ["p(95)<994"],
  },
};

export default function () {
  const baseUrl =
    "https://gateway.integration.gridly.com/gridly/api/v1/app/databases/8stjt67s8qs/views/6zrsbp4j541/records/fetch";
  const headers = {
    Accept: "application/json",
    Authorization: "ApiKey eWHe8dWT6mbeup",
  };

  let scrollPayload = JSON.stringify({
    limit: 300,
    offset: 300,
  });

  let scroll = http.post(baseUrl, scrollPayload, { headers, tags: { type: 'scroll' } });
  check(scroll, {
    'Scroll returns 300 records': (r) => {
      const res = r.json() as { records?: unknown[] };
      return res.records?.length === 300;
    },
  });

  sleep(1);
}
