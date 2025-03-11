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

Setup AUTH_SECRET

```sh
npx auth secret
```

It creates a new `env.local` file with your auth secret.

Configure Next Auth:
create the `Auth.js` config file and object. This is where you can control the behaviour of the library and specify custom authentication logic, adapters, etc. We recommend all frameworks to create an auth.ts file in the project.

## GitHub auth using next-auth

In the root of your project create /auth.ts

```ts
import NextAuth from "next-auth"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
})
```

Add a Handler under /app/api/auth/[...nextauth]/route.ts:

```ts

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

###