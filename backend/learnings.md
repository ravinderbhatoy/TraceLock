## What is HttpOnly cookie?
A cookie is a small piece of data the server sends to the browser, which the browser automatically attaches to subsequent requests to that domain.

Regular Cookie  |	HttpOnly Cookie
JavaScript can read it (document.cookie) |	JavaScript cannot read it

** The browser still sends it automatically with every request — you just can't touch it from JavaScript. **

## Cookie V/s Authorization Header
Browser manages it | You manages it
No javascript access | Javascript access

## What is Token Rotation?
Token rotation means issuing a new refresh token every time you use the old one to get a new access token.

**Without Rotation**
Day 1: Login → get refresh_token_A
Day 2: Use refresh_token_A → get new access token (refresh_token_A still valid)
Day 7: refresh_token_A expires

If an attacker steals refresh_token_A on Day 1, they can use it for 7 days.

**With rotation**
Day 1: Login → get refresh_token_A
Day 2: Use refresh_token_A → get new access token + refresh_token_B
        refresh_token_A is now BLACKLISTED (invalid)
Day 3: Use refresh_token_B → get new access token + refresh_token_C
        refresh_token_B is now BLACKLISTED



