import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { hash, compare } from 'bcryptjs';
import clientPromise from '../../../lib/utils/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: 'signin',
      name: 'Sign in with credentials',
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const {
          email,
          password,
        } = credentials as {
          email: string,
          password: string
        };
        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection('users').findOne({ email });
        if (!user) {
          /* TODO: handle user doesn't exist */
          return null;
        }
        const checkPassword = await compare(password, user.password);
        if (!checkPassword) {
          /* TODO: handle wrong password */
          return null;
        }
        client.close();
        return user;
      },
    }),
    CredentialsProvider({
      id: 'signup',
      name: 'Sign up with credentials',
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const {
          name,
          email,
          password,
          confirmPassword,
        } = credentials as {
          name: string,
          email: string,
          password: string,
          confirmPassword: string
        };
        if (password !== confirmPassword) {
          /* TODO: handle passwords must be the same */
          return null;
        }
        const client = await clientPromise;
        const db = client.db();
        const exist = await db.collection('users').findOne({ email });
        if (exist) {
          /* TODO: handle email already used */
          client.close();
          return null;
        }
        await db.collection('users').insertOne({
          name,
          email,
          password: await hash(password, 12),
        });
        client.close();
        return {
          name,
          email,
        };
      },
    }),
  ],
  adapter: MongoDBAdapter({
    db: (await clientPromise).db('requiz'),
  }),
  session: {
    jwt: true,
  },
  pages: {
    signIn: '/auth/signin',
  },
});
