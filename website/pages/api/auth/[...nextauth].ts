import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/utils/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter({
    db: (await clientPromise).db('requiz'),
  }),
  pages: {
    signIn: '/signin',
  },
});
