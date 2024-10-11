export const accessTokenCookieName = 'access_token';
export const refreshTokenCookieName = 'refresh_token';
export const roleCookieName = 'role';
export const apiBaseUrl = import.meta.env.VITE_API_ENDPOINT + '/api/v1';
export const ledgerBaseUrl = import.meta.env.VITE_LEDGER_ENDPOINT;
export const NODE_ENV = import.meta.env.NODE_ENV;

/**
 * @type {{ ISSUER: "ISSUER"; INVESTOR: "INVESTOR"; ADMIN: "ADMIN"} as const}
 */
