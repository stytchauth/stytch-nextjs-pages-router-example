# Stytch Next.js example application

<p align="center">
  <img src="https://user-images.githubusercontent.com/100632220/217049841-b9eeb72a-3e50-4074-839a-e64ee5d4a88c.png" width="750">
</p>

## Overview

This example application demonstrates how one may use Stytch within a Next.js application. This project was bootstrapped with [Create Next App](https://nextjs.org/docs/api-reference/create-next-app).

This project uses Stytch's [Next.js SDK](https://stytch.com/docs/sdks/javascript-sdk) which provides pre-built UI components, useful React hooks, headless methods to securely interact with Stytch, and is SSR friendly. This project also utilizes Stytch's [Node Backend SDK](https://www.npmjs.com/package/stytch) for authenticating the logged in user's session.  

This application features Email Magic Links and Google OAuth authentication. You can use this application's source code as a learning resource, or use it as a jumping off point for your own project. We are excited to see what you build with Stytch!

We'd also recommend checking out our [Next.js quickstart guide](https://stytch.com/docs/guides/quickstarts/nextjs), which explains how to incorporate the Stytch authentication concepts demonstrated in this example app into your own Next.js application.

## Set up

Follow the steps below to get this application fully functional and running using your own Stytch credentials.

### In the Stytch Dashboard

1. Create a [Stytch](https://stytch.com/) account. Once your account is set up a Project called "My first project" will be automatically created for you.

2. Within your new Project, navigate to [SDK configuration](https://stytch.com/dashboard/sdk-configuration), and make the following changes:

   - Under **Test environment**, Click **Enable SDK in test**.
   - Under **Authorized applications** add the domain `http://localhost:3000` if it isn't already there.
   - Within the **Email Magic Links** drawer, toggle on **Enable the LoginOrCreate Flow**.
     
     <img width="400" alt="SDK Email Magic Links" src="https://user-images.githubusercontent.com/100632220/217053215-8c369de8-7828-4ad6-ac88-a50918520fc3.png">

   - Toggle on **OAuth**.
     
     <img width="400" alt="SDK OAuth" src="https://user-images.githubusercontent.com/100632220/217053483-e757d1aa-af18-4af3-a476-45860ca3065f.png">

3. Navigate to [Redirect URLs](https://stytch.com/dashboard/redirect-urls), and add `http://localhost:3000/authenticate` as the types **Login** and **Sign-up**.
   
   <img width="400" alt="Redirect URLs" src="https://user-images.githubusercontent.com/100632220/217983021-d8bf6fff-6a68-4e94-bffd-d062e69c8817.png">


4. Navigate to [OAuth](https://stytch.com/dashboard/oauth) and set up Google login in the Test environment. You don't need to copy the Google start URL for the Test environment because the Test environment is pre-configured to work! However, if you want to set up Google Oauth in the Live environment, follow all of the instructions provided in the Dashboard. If you are not interested in OAuth login you can skip this step. However, the _Continue with Google_ button in this application will not work in the Live environment.
   
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
