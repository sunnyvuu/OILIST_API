class RateLimiter {
  private delay: number;
  private lastRequestTime: number;

  constructor(delay: number) {
    this.delay = delay;
    this.lastRequestTime = 0;
  }

  async wait(): Promise<void> {
    const now = Date.now();
    const waitTime = this.lastRequestTime + this.delay - now;
    if (waitTime > 0) {
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
    this.lastRequestTime = Date.now();
  }
}

export const rateLimiter = new RateLimiter(1000);
