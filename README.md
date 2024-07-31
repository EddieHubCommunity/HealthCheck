> [!NOTE]
> Sponsored by the Open Source project Flagsmith https://github.com/Flagsmith/flagsmith

# HealthCheck

How friendly is your GitHub Open Source Repo? This project will check to make sure you are using Best Practices to attract more users, contributors and Stars, as well as suggest steps as to how you can improve the Repo to achieve this.

![Screenshot of repo checks](https://github.com/user-attachments/assets/9ba48d9a-4aca-4bf2-ae2d-3997c8248a80)

## Features

- [x] GitHub OAuth
- [x] Integration with Flagsmith
- [x] Add GitHub repo URL
- [x] List of checks and show detailed report
- [x] Badges to show latest status in project's README
- [ ] ...

## Usage

1. Login with your GitHub _(only public info required)_
2. Add GitHub repo URL
3. Run HealthCheck against repo and view the report
4. Add a HealthCheck badge to your project

## Quickstart guide for local development

> [!CAUTION]
> Node `v21+` is required

1. Clone this GitHub Repo
2. Install the dependencies with `npm ci`
3. Copy `.env.example` to `.env` (you will need an environment key from Flagsmith, this is shown later on)
4. Create a **free** account on Flagsmith https://www.flagsmith.com (you can also sign in with GitHub)
5. Create an Organisation and Project
6. Create the Feature Flags with these steps

   a. Create the feature `tagline` by clicking `Create Feature`

   ![Create feature screenshot](https://github.com/EddieHubCommunity/HealthCheck/assets/624760/20bcf62c-a4be-487c-80ee-f5d39bcafde6)

   b. Fill in the Feature Flag form with these details and click `Create Feature`

   ![Save feature flag screenshot](https://github.com/EddieHubCommunity/HealthCheck/assets/624760/f0399aae-2b2f-4e47-83e2-9d3d21797a42)

   c. (OPTIONAL) Import the flags to your Flagsmith account using the file `src/config/flagsmith.json` (note this will be per environment, for example `development`)

   ![Import flags on Flagsmith](https://github.com/user-attachments/assets/825525e2-11ec-48a5-9c89-a45353142c29)

7. Get your environment key from Flagsmith and add to `.env` file

![How to get environment key](https://github.com/EddieHubCommunity/HealthCheck/assets/624760/0fb56934-2d27-486a-9859-365672771407)

8. To be able to log in using GitHub OAuth

   a. create a GitHub OAuth app on GitHub https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app

   ![GitHub OAuth app](https://github.com/user-attachments/assets/cf2e4358-4b13-4c86-a8bb-5c6d83c37b4a)

   b. In your GitHub OAuth app, GitHub will generate the `client id` and `client secret`, add these to your the `.env` file

9. Run the project with one of these

   a. If you have Postgres installed, you can run the app locally `npm run dev` OR

   b. Running with Docker Compose (Recommended if you don't have Postgres installed)

   1. Once you done above steps and have the `.env` file ready
   2. Run the command `docker compose up -d`
   3. Once the containers are ready, run the command `npm run db:migrate:dev`
   4. Visit `http://localhost:3000` in your browser

   c. Running in Github Codespaces

   1. Start a new codespace
   2. Run `npm ci` and `npm run dev`
   3. When the project is running in the browser visit this and copy the generated URL. You will use this URL in place of localhost in step 8 above for creating your OAuth app
   4. Update the environment file with your client id and secret. Make sure to also update the `NEXTAUTH_URL=` to the generated codespace URL as well.
   5. Continue with step `9b` to run the docker container and database migration.
