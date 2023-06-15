import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStytchMember, StytchB2B } from "@stytch/nextjs/b2b";


const MAGIC_LINKS_TOKEN = "multi_tenant_magic_links";

/*
During both the Magic link and OAuth flow, Stytch will redirect the user back to your application to a specified redirect URL (see Login.js). 
Stytch will append query parameters to the redirect URL which are then used to complete the authentication flow. 
A redirect URL for this example app will look something like:

https://test.stytch.com/v1/magic_links/redirect?public_token=PUBLIC_TOKEN&slug=example-org&stytch_token_type=multi_tenant_magic_links&token=TOKEN

The AuthenticatePage will detect the presence of a token in the query parameters, and attempt to authenticate it.
On successful authentication, a session will be created and the user will be redirect to /ORG_SLUG/profile
*/
const Authenticate = () => {
  const { user, isInitialized } = useStytchMember();
  const router = useRouter();

  useEffect(() => {
    if (stytch && !user && isInitialized) {
      const stytch_token_type = router?.query?.stytch_token_type?.toString();
      const token = router?.query?.token?.toString();
      if (token && stytch_token_type === OAUTH_TOKEN) {
        stytch.oauth.authenticate(token, {
          session_duration_minutes: 60,
        });
      } else if (token && stytch_token_type === MAGIC_LINKS_TOKEN) {
        stytch.magicLinks.authenticate(token, {
          session_duration_minutes: 60,
        });
      }
    }
  }, [isInitialized, router, stytch, user]);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    if (user) {
      router.replace("example-org" + "/profile");
    }
  }, [router, user, isInitialized]);

  return null;
};

export default Authenticate;
