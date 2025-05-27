import { AccountRole } from '../types';

/* Authentication */
export const JWT_DURATION = '15m';
export const SESSION_DURATION = '7d';

/* Enumerators */
export const ACCOUNT_ROLES: AccountRole[] = ['admin', 'user', 'viewer'];
