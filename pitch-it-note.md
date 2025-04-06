# Start up pitch app note

## Install package/dependencies

Install Nextjs

```sh
npm create-next-app@latest startup-pitch-app
```

Install next-auth

```sh
npm install next-auth@beta
```

Install tailwindcss animate and typography

```sh
npm i tailwind-animate
npm i @tailwindcss/typography
```

go to you `tailwind.config.ts` and add the tailwind-animate and @tailwindcss/typography as a plugin.

```ts
import type { Config } from "tailwindcss";

export default {
  content: [
  ],
  theme: {
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

```

If you have custom styles you can set them up in your tailwind.config.ts

```ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        primary: {
          "100": "#FFE8F0",
          DEFAULT: "EE2869"
        },
        secondary: "#FBE843",
        black: {
          "100": "#333333",
          "200": "#141413",
          "300": "#7D8087"
        },
        white:{
          "100": "#F7F7F7",
          DEFAULT: "#FFFFFF"
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    fontFamily: {
      "work-sans": ["var(--font-work-sans)"]
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) = 4px)"
    }
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
```

Installing ShadCN:

```sh
npx shadcn@latest init
```
You'd also get a prompt to choose the Shadcn style you want and also a base color.

## GitHub auth using next-auth

Setup AUTH_SECRET

```sh
npx auth secret
```

It creates a new `env.local` file with your auth secret.

Configure Next Auth:
create the `Auth.js` config file and object. This is where you can control the behaviour of the library and specify custom authentication logic, adapters, etc. We recommend all frameworks to create an auth.ts file in the project.

In the root of your project create /auth.ts

```ts
import NextAuth from "next-auth"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
})
```

Add a Handler under /app/api/auth/[...nextauth]/route.ts:

```ts
import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers
```

Go to GitHub
In the upper-right corner of any page on GitHub, click your profile photo, then click  Settings.

In the left sidebar, click  Developer settings.

In the left sidebar, click OAuth apps.

Click New OAuth App.

Once registered, you should receive a Client ID and Client Secret. Add those in your application environment file:

```ts
AUTH_SECRET="**********************" 
AUTH_GITHUB_ID="**********************"
AUTH_GITHUB_SECRET="**********************"
```

Update /auth.ts

```ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
})
```

## NavBar

create a new component called app/components/NavBar.tsx

```tsx
import { auth, signIn, signOut } from "@/auth";
import Image from "next/image"
import Link from "next/link"
import React from 'react'

const NavBar = async () => {
  const session = await auth();

  return (
    <div className="px-5 py-3 bg-white shadow-sm">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo"  width={144} height={30} />
        </Link>

        <div  className="flex item-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form action={async () => {
                "use server"
                await signOut({redirectTo: "/"})
              }}>
                <button type="submit"> Logout </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <span> {session?.user?.name} </span>
              </Link>
            </>
          ):(
            <form action={async () => {
              "use server"
              await signIn("github")
            }}>
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>

    </div>
  )
}

export default NavBar
```

### Add local fonts

If you are using a variable font, setup your font in layout.tsx like this.

```ts
const workSans = localFont({
  src: "./fonts/WorkSans.woff",
  variable: "--font-work-sans",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${works.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

If you are not using a variable font, setup your font in layout.tsx like this.

```ts
const workSans = localFont({
  src:[
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "900",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-ExtraBold.ttf",
      weight: "800",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-SemiBold.ttf",
      weight: "700",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-Medium.ttf",
      weight: "600",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-Regular.ttf",
      weight: "500",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-Light.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-ExtraLight.ttf",
      weight: "300",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-Thin.ttf",
      weight: "200",
      style: "normal"
    },
  ],
  variable: "--font-work-sans"
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

### Using sanity

create a new project, copy the code to initialize it your local directory.

#### using markdown datatype in sanity

```sh
npm i sanity-plugin-markdown
```

add `markdownSchema()` to plugins at `sanity.config.ts`, import from `import { markdownSchema} from 'sanity-plugin-markdown'`.

The markdown plugin also requires a style
Go to `app/layout.tsx` then `import 'easymde/dist/easymde.min.css'`

## Markdown Parser

```sh
npm i markdown-it

# if you are using typescript
npm i -D @types/markdown-it
```

### Setting up parsed HTML

```js
import MarkdownIt from "markdown-it"

const page = async ({ params }: { params: Promise<{ id: string }>}) => {

  const parsedContent = md.render(pitch) || ""

  return (
    <>
      { parsedContent ? <article className="prose" dangerouslySetInnerHTML={{ __html: parsedContent }} /> : <span> No details provide </span> }
    </>
  )
}
```

Since you are using easymde, set `prose` className to your compiled Markdown.

## Mark Down Editor

```sh
npm i @uiw/react-md-editor
```
