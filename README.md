# Stytch Next.js example application

<p align="center">
  <img src="https://user-images.githubusercontent.com/100632220/217049841-b9eeb72a-3e50-4074-839a-e64ee5d4a88c.png" width="750">
</p>

## Overview

This example application demonstrates how one may use Stytch within a Next.js application. This project was bootstrapped with [Create Next App](https://nextjs.org/docs/api-reference/create-next-app).

This project uses Stytch's [Next.js SDK](https://stytch.com/docs/sdks/javascript-sdk) which provides pre-built UI components, useful React hooks, headless methods to securely interact with Stytch, and is SSR friendly. This project also utilizes Stytch's [Node Backend SDK](https://www.npmjs.com/package/stytch) for authenticating the logged in user's session.  

This application features Email Magic Links and Google OAuth authentication. You can use this application's source code as a learning resource, or use it as a jumping off point for your own project. We are excited to see what you build with Stytch!

## Set up

Follow the steps below to get this application fully functional and running using your own Stytch credentials.

### In the Stytch Dashboard

1. Create a [Stytch](https://stytch.com/) account. Once your account is set up a Project called "My first project" will be automatically created for you.

2. Within your new Project, navigate to [SDK configuration](https://stytch.com/dashboard/sdk-configuration), and make the following changes:

   - Click **Enable SDK**.
   - Under **Authorized environments** add the domain `http://localhost:3000`.
     
     <img width="400" alt="Authorized environments" src="https://user-images.githubusercontent.com/100632220/217052985-2e6fc264-7b8b-452b-9d24-66a76c143d10.png">

   - Within the **Email Magic Links** drawer, toggle on **Enable the LoginOrCreate Flow**.
     
     <img width="400" alt="SDK Email Magic Links" src="https://user-images.githubusercontent.com/100632220/217053215-8c369de8-7828-4ad6-ac88-a50918520fc3.png">

   - Toggle on **OAuth**.
     
     <img width="400" alt="SDK OAuth" src="https://user-images.githubusercontent.com/100632220/217053483-e757d1aa-af18-4af3-a476-45860ca3065f.png">

3. Navigate to [Redirect URLs](https://stytch.com/dashboard/redirect-urls), and add `http://localhost:3000/authenticate` as the types **Login** and **Sign-up**.
   
   <img width="400" alt="Redirect URLs" src="https://user-images.githubusercontent.com/100632220/217983021-d8bf6fff-6a68-4e94-bffd-d062e69c8817.png">

4. Navigate to [OAuth](https://stytch.com/dashboard/oauth), and set up login for Google in the Test environment. Follow all the instructions provided in the Dashboard. If you are not interested in OAuth login you can skip this step. However, the _Continue with Google_ button in this application will not work.
   
   <img width="400" alt="OAuth configuration" src="https://user-images.githubusercontent.com/100632220/217055674-a7dafc17-6ad3-492f-8dd2-92560d60dc00.png">

5. Finally, navigate to [API Keys](https://stytch.com/dashboard/api-keys). You will need the `project_id`, `secret`, and `public_token` values found on this page later on.

### On your machine

In your terminal clone the project and install dependencies:

```bash
git clone https://github.com/cal-stytch/test-stytch-nextjs-example.git
cd test-stytch-nextjs-example
npm i
```

Next, create `.env.local` file by running the command below which copies the contents of `.env.template`.
```bash
cp .env.template .env.local
```

Open `.env.local` in the text editor of your choice, and set the environment variables using the `project_id`, `secret`, and `public_token` found on [API Keys](https://stytch.com/dashboard/api-keys). Leave the `STYTCH_PROJECT_ENV` value as `test`.

```
# This is what a completed .env.local file will look like
STYTCH_PROJECT_ENV=test
STYTCH_PROJECT_ID=project-test-00000000-0000-1234-abcd-abcdef1234
NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN=public-token-test-abcd123-0000-0000-abcd-1234567abc
STYTCH_SECRET=secret-test-12345678901234567890abcdabcd
```

## Running locally

After completing all the set up steps above the application can be run with the command:

```bash
npm run dev
```

The application will be available at [`http://localhost:3000`](http://localhost:3000).

You'll be able to login with Email Magic Links or Google OAuth and see your Stytch User object, Stytch Session, and see how logging out works.

## Adding Stytch authentication to your own application

Now that you've checked out our example app, you may be looking to add a similar Stytch authentication flow to your own Next.js application. Here are some steps to help you do so:

1. First, you'll need to add a `StytchLogin` component to your login page, [like we do here](https://github.com/stytchauth/stytch-nextjs-example/blob/main/src/components/Login.js#L11). You can configure which authentication methods you'd like to offer by modifying the `products` array [in your `config` object](https://stytch.com/docs/sdks/javascript-sdk/ui-config). We also offer [headless JavaScript methods](https://stytch.com/docs/sdks/javascript-sdk) that you can call directly if you'd prefer to build your own login UI, though we'll focus on the `StytchLogin` component in this guide.

2. The authentication flow will begin when your user interacts with the `StytchLogin` component. There are two general types of authentication flows: those where the user is redirected to or must navigate to a different page (like OAuth or Email Magic Links), and those where the user remains on the same page in your application (like OTP or Passwords).

3. For flows where the user is redirected to or must navigate to a different page, you'll next need to handle the redirect back to your application. First, you'll need to specify the URL that users should be redirected back to, [as we do here](https://github.com/stytchauth/stytch-nextjs-example/blob/main/src/components/Login.js#L24) (be sure to also add that URL to [the Redirect URLs tab](https://stytch.com/dashboard/redirect-urls) in the Stytch Dashboard). Next, you'll need to implement logic on the page that users are redirect to that retrieves the `token` value included in the redirect URL query parameters and passes that token to the appropriate Stytch `.authenticate` method, [as we do here](https://github.com/stytchauth/stytch-nextjs-example/blob/main/src/pages/authenticate.js#L23). For flows where the user remains on the same page in your application, the `.authenticate` method will be called automatically by the `StytchLogin` component.

4. Upon successful authentication, the `session` and `user` objects from our frontend JavaScript SDK will automatically be populated. You can listen for changes in the `session` and `user` objects using our `useStytchSession` and `useStytchUser` hooks, [as we do here](https://github.com/stytchauth/stytch-nextjs-example/blob/main/src/pages/authenticate.js#L17). Once your application detects a non-null `user` object, you can [redirect to a page that displays logged-in content](https://github.com/stytchauth/stytch-nextjs-example/blob/main/src/pages/authenticate.js#L42). Each page that displays logged-in content should also [check to make sure a `user` is present](https://github.com/stytchauth/stytch-nextjs-example/blob/main/src/pages/profile.js#L13).

5. You can add authentication to your protected server-side routes as well by [loading our backend Node SDK](https://github.com/stytchauth/stytch-nextjs-example/blob/main/lib/loadStytch.js), [retrieving the Stytch `session_token` or `session_jwt` from the request cookies](https://github.com/stytchauth/stytch-nextjs-example/blob/main/src/pages/profile.js#L36) (automatically set by our frontend JavaScript SDK and included in requests by the browser), and then [calling our `sessions.authenticate` or `sessions.authenticateJwt` methods](https://github.com/stytchauth/stytch-nextjs-example/blob/main/src/pages/profile.js#L47).

At this point, your application will have a Stytch-powered login flow and logic to determine when to display protected content. Now you can get back to focusing on your own application's functionality, and we'll handle the rest!

## Next steps

This example app showcases a small portion of what you can accomplish with Stytch. Here are a few ideas to explore:

1. Add additional login methods like [Passwords](https://stytch.com/docs/passwords#guides_getting-started-sdk).
2. Replace the prebuilt UI with your own using by using the SDK's [headless methods](https://stytch.com/docs/sdks/javascript-sdk).
3. Replace the Google OAuth button with the high converting [Google One Tap UI](https://stytch.com/docs/oauth#guides_google-sdk).
4. Secure your app further by building MFA authentication using methods like [WebAuthn](https://stytch.com/docs/sdks/javascript-sdk#webauthn).

## Get help and join the community

#### :speech_balloon: Stytch community Slack

Join the discussion, ask questions, and suggest new features in our ​[Slack community](https://join.slack.com/t/stytch/shared_invite/zt-nil4wo92-jApJ9Cl32cJbEd9esKkvyg)!

#### :question: Need support?

Check out the [Stytch Forum](https://forum.stytch.com/) or email us at [support@stytch.com](mailto:support@stytch.com).