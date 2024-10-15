export const oktaConfig = {
    clientId: process.env.OKTA_CONFIG,
    issuer: 'https://' + process.env.OKTA_DOMAON + '/oauth2/default',
    redirectUri: window.location.origin + '/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true
};
