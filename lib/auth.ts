import { NextAuthOptions, Profile } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import { redirect } from "next/navigation";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const allowedUsernames = process.env.LIBRARY_MANAGER_ADMIN_GITHUB_USERNAMES?.split(',') || [];
      if (account?.provider === "github" && allowedUsernames.includes((profile as GithubProfile)?.login)) {
        console.log("Sign in successful");
        return true;
      }
      redirect('/auth/error')
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return "/admin"
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};
