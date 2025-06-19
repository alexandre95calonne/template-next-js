export default function rateLimit({
  interval,
  uniqueTokenPerInterval = 500,
}: {
  interval: number;
  uniqueTokenPerInterval?: number;
}) {
  const tokens = new Map();

  return {
    check: (limit: number, token: string) =>
      new Promise((resolve, reject) => {
        const tokenCount = tokens.get(token) || [0];
        const now = Date.now();
        const oldTokens = tokenCount.filter(
          (timestamp: number) => now - timestamp < interval,
        );
        const newTokens = [...oldTokens, now];

        tokens.set(token, newTokens);

        if (newTokens.length > limit) {
          reject();
        } else {
          resolve(true);
        }
      }),
  };
}
