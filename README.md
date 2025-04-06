# Pitch It

Pitch It is a web platform designed to connect startups seeking funding with investors. Startups can showcase their projects through detailed pitches, while investors can discover and evaluate promising opportunities.

## Key Features

* **User Profiles:** Dedicated profiles for both startups and investors, showcasing relevant information.
* **Pitch Submission:** Startups can create and submit comprehensive pitch presentations.
* **Investor Search:** Investors can filter and search for startups based on industry, stage, and other criteria.

## Technologies Used

* **Next.js:** React framework for server-side rendering and efficient web development.
* **Sanity:** Headless CMS for managing and delivering content.
* **Sentry:** Error tracking and performance monitoring.

## Live Demo

* [https://pitchit-eight.vercel.app/](https://pitchit-eight.vercel.app/)

## Setup and Usage

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/kore4lyf/pitchit](https://github.com/kore4lyf/pitchit)
    ```

2.  **Install dependencies:**

    ```bash
    npm i
    ```

3.  **Run the project:**

    ```bash
    npm run dev
    ```

4.  **Configuration:**

    * Set the following environment variables in your `.env.local` file:

        ```
        AUTH_SECRET=
        AUTH_GITHUB_ID=
        AUTH_GITHUB_SECRET=
        NEXT_PUBLIC_SANITY_PROJECT_ID=
        NEXT_PUBLIC_SANITY_DATASET=
        SANITY_WRITE_TOKEN=
        SENTRY_AUTH_TOKEN=
        NEXT_PUBLIC_SENTRY_DSN=
        ```

5.  **Usage:**

    * Users can log in with their GitHub account.
    * Logged-in users can submit a pitch.

6.  **User Roles and Permissions:**

    * This application currently supports a single user role.

## Contribution and Support

* **Contributions:** Contributions are currently not accepted.
* **Coding Standards:** No specific coding standards are enforced.
* **Bug Reports:** Please use the Sentry feedback button to report issues.
* **Support:** Support is currently not provided.
* **License:** MIT

## Optional Sections

* **Screenshots:**

    * ![Pitch It Home Page](/pitchit-home.png)

* **Credits/Acknowledgments:**

    * [https://www.youtube.com/c/JavaScriptMastery](https://www.youtube.com/c/JavaScriptMastery)

**Important Notes:**

* Ensure you have Node.js and npm installed.
* The `.env.local` file should be created in the root of your project.
* Replace the placeholder values for the environment variables with your actual credentials.
* Place the "pitchit-home.png" file in the public folder of your project.