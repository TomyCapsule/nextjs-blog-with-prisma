// pages/api/auth/[...nextauth].ts

import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import prisma from '../../../lib/prisma';

export const options = {
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
    callbacks: {
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token and user id from a provider.
        return session
      }
    }
  };
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

