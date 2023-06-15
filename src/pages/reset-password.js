import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStytchMember, StytchB2B, StytchEventType } from "@stytch/nextjs/b2b";
import { B2BProducts, AuthFlowType } from "@stytch/vanilla-js/b2b";

const MAGIC_LINKS_TOKEN = "multi_tenant_magic_links";

/*
During both the Magic link and OAuth flow, Stytch will redirect the user back to your application to a specified redirect URL (see Login.js). 
Stytch will append query parameters to the redirect URL which are then used to complete the authentication flow. 
A redirect URL for this example app will look something like:

https://test.stytch.com/v1/magic_links/redirect?public_token=PUBLIC_TOKEN&slug=example-org&stytch_token_type=multi_tenant_magic_links&token=TOKEN

The AuthenticatePage will detect the presence of a token in the query parameters, and attempt to authenticate it.
On successful authentication, a session will be created and the user will be redirect to /ORG_SLUG/profile
*/
const ResetPassword = () => {
  const { user, isInitialized } = useStytchMember();
  const router = useRouter();

  const callbacks = {
    onEvent: ({ type, data }) => {
      console.log(type, data);
    },
    onError: (data) => {
      console.log(data);
    }
  }

  return (
    <StytchB2B
    config={{
      products: [B2BProducts.passwords],
      sessionOptions: { sessionDurationMinutes: 60 },
      authFlowType: AuthFlowType.PasswordReset,
      passwordOptions: {
        loginRedirectURL: "http://localhost:3000/authenticate",
        resetPasswordRedirectURL: "http://localhost:3000/reset",
        resetPasswordExpirationMinutes: 60,
      },
    }}
    callbacks={{
      onEvent: async ({ type, data }) => {
        console.log(type, data)
        if (type === "B2B_PASSWORD_RESET_BY_SESSION") {
          router.push(`/${data.organization.organization_slug}/profile`);
        }
      },
    }}
  />
  )


  // useEffect(() => {
  //   <StytchB2B
  //     config={{
  //       products: [B2BProducts.passwords],
  //       sessionOptions: { sessionDurationMinutes: 60 },
  //       authFlowType: AuthFlowType.PasswordReset,
  //       passwordOptions: {
  //         loginRedirectURL: "http://localhost:3000/authenticate",
  //         resetPasswordRedirectURL: "http://localhost:3000/reset",
  //         resetPasswordExpirationMinutes: 60,
  //       },
  //     }}
  //   />
  // }, [isInitialized, router, user]);

  // useEffect(() => {
  //   if (!isInitialized) {
  //     return;
  //   }
  //   if (user) {
  //     router.replace("example-org" + "/profile");
  //   }
  // }, [router, user, isInitialized]);

  // return null;
};

export default ResetPassword;
