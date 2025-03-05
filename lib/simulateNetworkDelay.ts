export async function simulateNetworks() {
  const shouldError = Math.random() < 0.4;

  if (shouldError) {
    const errorTypes = [
      "Network request failed",
      "Server responded with status code 500",
      "API rate limit exceeded",
    ];
    const randomErrorMessage =
      errorTypes[Math.floor(Math.random() * errorTypes.length)];
    throw new Error(randomErrorMessage);
  }

  const minDelay = 200;
  const maxDelay = 1200;
  const randomDelay =
    Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

  return new Promise((resolve) => setTimeout(resolve, randomDelay));
}
