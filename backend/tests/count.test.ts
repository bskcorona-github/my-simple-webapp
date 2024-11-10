import handler from "../pages/api/count";
import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";

describe("API Route /api/count", () => {
  it("should increment visit count on each request", () => {
    // 初回リクエストのシミュレーション
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>();
    handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData()).count).toBe(1);

    // 2回目のリクエストのシミュレーション
    const { req: req2, res: res2 } = createMocks<
      NextApiRequest,
      NextApiResponse
    >();
    handler(req2, res2);

    expect(res2._getStatusCode()).toBe(200);
    expect(JSON.parse(res2._getData()).count).toBe(2);
  });
});
