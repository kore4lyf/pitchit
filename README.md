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

## Setup and Usage

1. **Clone the repository:**

    ```bash
    git clone [https://github.com/kore4lyf/pitchit](https://github.com/kore4lyf/pitchit)
    ```

2. **Install dependencies:**

    ```bash
    npm i
    ```

3. **Run the project:**

    ```bash
    npm run dev
    ```

4. **Configuration:**

    * Set the following environment variables:

        ```bash
        AUTH_SECRET=
        AUTH_GITHUB_ID=
        AUTH_GITHUB_SECRET=
        NEXT_PUBLIC_SANITY_PROJECT_ID=
        NEXT_PUBLIC_SANITY_DATASET=
        SANITY_WRITE_TOKEN=
        SENTRY_AUTH_TOKEN=
        NEXT_PUBLIC_SENTRY_DSN=
        ```

    * Please make sure you have node.js installed on your computer.

5. **User Roles and Permissions:**

    * Only standard users are supported. Users log in with GitHub and can submit pitches.

6. **Usage:**

    * Users log in with their GitHub account.
    * Logged-in users can submit pitch information.

## Contribution and Support

* **Contributions:** Contributions are not accepted at this time.
* **Coding Standards:** No specific coding standards or guidelines are provided.
* **Bug Reports:** Use the Sentry feedback button, which is configured for bug reporting.
* **Support:** No direct support is provided.
* **License:** MIT

## Optional Sections

* **Screenshots:**
  * ![Pitch It Home Page](/pitchit-home.png)
* **Credits/Acknowledgments:**
  * [https://www.youtube.com/c/JavaScriptMastery](https://www.youtube.com/c/JavaScriptMastery)

## Important Notes

* Remember to fill in the environment variables with your actual keys and tokens.
* Kindly star the project if you find it useful.