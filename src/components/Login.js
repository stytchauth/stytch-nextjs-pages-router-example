import { StytchB2B } from "@stytch/nextjs/b2b";

/*
Login configures and renders the StytchB2BLogin component which is a prebuilt UI component for auth powered by Stytch.

This component accepts style, config, and callbacks props. To learn more about possible options review the documentation at
https://stytch.com/docs/b2b/sdks/javascript-sdk#ui-configs
*/
const Login = () => {
  const style = {
    fontFamily: 'Arial',
  };
  
  const callbacks = {
    onEvent: ({ type, data }) => {
      console.log(type, data);
    },
    onError: (data) => {
      console.log(data);
    }
  }

  const REDIRECT_URL_BASE = "http://localhost:3000/";

  const config = {
    products: ["passwords"],
    sessionOptions: { sessionDurationMinutes: 60 },
    authFlowType: "Organization",
    passwordOptions: {
      loginRedirectURL: REDIRECT_URL_BASE + "authenticate",
      resetPasswordRedirectURL: REDIRECT_URL_BASE + "reset-password",
      resetPasswordExpirationMinutes: 60,
    },
  };

  return (
    <div>
      <StytchB2B
        config={config}
        styles={style}
        callbacks={callbacks}
      />
    </div>
  );
};

export default Login;
