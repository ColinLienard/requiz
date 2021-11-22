import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GoogleProvider from 'next-auth/providers/google';
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
        const user = await client.db().collection('users').findOne({ email });
        if (!user) {
          throw new Error('user-does-not-exist');
        }
        if (!user.password) {
          throw new Error('wrong-provider');
        }
        const checkPassword = await compare(password, user.password);
        if (!checkPassword) {
          throw new Error('wrong-password');
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
        } = credentials as {
          name: string,
          email: string,
          password: string,
        };
        const client = await clientPromise;
        const emailExist = await client.db().collection('users').findOne({ email });
        if (emailExist) {
          throw new Error('email-already-used');
        }
        const nameExist = await client.db().collection('users').findOne({ name });
        if (nameExist) {
          throw new Error('name-already-used');
        }
        await client.db().collection('users').insertOne({
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
  callbacks: {
    jwt: async ({ token, user }) => {
      const newToken = token;
      if (user) {
        // eslint-disable-next-line no-underscore-dangle
        newToken.userId = user._id;
      }
      return newToken;
    },
    session: async ({ session, token }) => {
      const newSession = session;
      if (newSession.user) {
        (newSession.user as {
          id?: string | null
        }).id = token.userId ? token.userId as string : token.sub;
      }
      return newSession;
    },
  },
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
