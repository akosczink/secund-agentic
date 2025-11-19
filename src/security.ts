// src/security.ts
import { createHash } from 'crypto';

/**
 * THE DIGNITY GUARD
 * Ensures no raw employee PII (Personally Identifiable Information) 
 * leaks into the decision logs.
 */
export const DignityGuard = {
  /**
   * Hashes the employee ID to ensure anonymity in logs.
   * We use a one-way hash for decision auditing.
   */
  hashIdentity(rawId: string): string {
    return createHash('sha256')
      .update(rawId)
      .update('SECUND-SALT-v1') // In prod, this comes from ENV
      .digest('hex')
      .substring(0, 12);
  }
};
