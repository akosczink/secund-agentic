// src/security.ts
import { createHash } from 'crypto';

export const DignityGuard = {
  /**
   * Hashes the employee ID to ensure anonymity in logs.
   * Uses SHA-256 to prevent reverse-engineering of employee identity.
   */
  hashIdentity(rawId: string): string {
    return createHash('sha256')
      .update(rawId)
      .update('SECUND-SALT-v1')
      .digest('hex')
      .substring(0, 12);
  }
};
