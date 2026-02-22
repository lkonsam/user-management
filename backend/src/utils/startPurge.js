import { purgeExpiredTokens } from "../repositories/logoutToken.repository.js";

let intervalId = null;

export const startRevokedTokenPurger = (intervalMs = 1000 * 60 * 60) => {
  // default: run every hour
  if (intervalId) return;

  // Run once immediately
  purgeExpiredTokens().catch((err) => console.error("Failed to purge expired tokens:", err));

  intervalId = setInterval(() => {
    purgeExpiredTokens().catch((err) => console.error("Failed to purge expired tokens:", err));
  }, intervalMs);

  console.log(`Started revoked token purger (every ${intervalMs}ms)`);
};

export const stopRevokedTokenPurger = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

export default { startRevokedTokenPurger, stopRevokedTokenPurger };
