export class RateLimiter {
  private requests: Map<string, { count: number; timestamp: number }> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  limit(identifier: string): boolean {
    const now = Date.now();
    const requestData = this.requests.get(identifier);

    if (!requestData) {
      this.requests.set(identifier, { count: 1, timestamp: now });
      return true;
    }

    if (now - requestData.timestamp > this.windowMs) {
      this.requests.set(identifier, { count: 1, timestamp: now });
      return true;
    }

    if (requestData.count >= this.maxRequests) {
      return false;
    }

    requestData.count++;
    return true;
  }
}
