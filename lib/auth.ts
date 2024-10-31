import { NextAuthOptions, Profile } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: any, account: any, profile?: Profile }) {
      // Only allow specific GitHub username
      if (account?.provider === "github" && (profile as GithubProfile).login === "seif-mamdouh") {
        console.log("Sign in successful");
        return true;
      }
      // Reject all other sign-in attempts
      console.log("Sign in failed");
      return false;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      // Always redirect to admin page after successful sign in
      return "/admin"
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};
