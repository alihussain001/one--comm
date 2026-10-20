/**
 * api.ts — typed fetch wrapper for all non-auth API calls.
 *
 * Rules (PROJECT_PLAN.md § 3):
 *  - Every non-auth request goes through here with Authorization: Bearer <token>.
 *  - On error, throws a typed ApiError so callers can inspect `code` / `statusCode`.
 *  - The browser never sends price, totalMinor, userId, productId, or status.
 */

import type { ApiErrorBody } from "../types";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export class ApiError extends Error {
  readonly body: ApiErrorBody;
  readonly status: number;

  constructor(body: ApiErrorBody, status: number) {
    super(body.message);
    this.name = "ApiError";
    this.body = body;
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    let body: ApiErrorBody;
    try {
      body = await res.json();
    } catch {
      body = {
        statusCode: res.status,
        code: "UNKNOWN",
        message: res.statusText || "Something went wrong",
        details: null,
        path,
        timestamp: new Date().toISOString(),
        requestId: "",
      };
    }
    throw new ApiError(body, res.status);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

// ─── Public endpoints ─────────────────────────────────────────────────────────

export const api = {
  get: <T>(path: string, token?: string) =>
    request<T>(path, { method: "GET" }, token),

  post: <T>(path: string, body: unknown, token?: string, extraHeaders?: Record<string, string>) =>
    request<T>(
      path,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: extraHeaders,
      },
      token,
    ),

  patch: <T>(path: string, body: unknown, token?: string) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }, token),
};
