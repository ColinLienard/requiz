import { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { signIn, signOut, getSession } from 'next-auth/react';
import Link from 'next/link';
import clientPromise from '../lib/utils/mongodb';
import { QuizData, UserFromDB } from '../lib/types';
import Game from '../components/Dashboard/Game/Game';
import User from '../components/Dashboard/User/User';
import Modal from '../components/Dashboard/Modal/Modal';
import objectIdToJson from '../lib/utils/objectIdToJson';

type Props = {
  user: UserFromDB,
  liveQuizzes: QuizData[],
  publishedQuizzes: QuizData[],
  creators: UserFromDB[],
  userQuizzes: QuizData[]
}

const Home: NextPage<Props> = ({
  user,
  liveQuizzes,
  publishedQuizzes,
  creators,
  userQuizzes,
}: Props) => {
  const [modalQuizId, setModalQuizId] = useState<string | undefined>();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Requiz</h1>
        {user && (
          <>
            <p>Signed in as</p>
            <h3>{user.email}</h3>
            <button type="button" onClick={() => signOut()}>Sign out</button>
            <br />
            <br />
            <h2>Live quizzes</h2>
            <ul>
              {liveQuizzes.map((quiz) => (
                <li key={quiz._id}>
                  <Game
                    id={quiz._id as string}
                    title={quiz.title as string}
                    userId={quiz.userId as string}
                    peopleIn={quiz.peopleIn as number}
                    startsIn={quiz.startDate as string}
                  />
                </li>
              ))}
            </ul>
            <br />
            <br />
            <h2>Quizzes that will start soon</h2>
            <ul>
              {publishedQuizzes.map((quiz) => (
                <li key={quiz._id}>
                  <Game
                    onClick={() => setModalQuizId(quiz._id)}
                    id={quiz._id as string}
                    title={quiz.title as string}
                    userId={quiz.userId as string}
                    peopleIn={quiz.peopleIn as number}
                    startsIn={quiz.startDate as string}
                  />
                </li>
              ))}
            </ul>
            <br />
            <br />
            <h2>Popular creators</h2>
            <ul>
              {creators.map((creator) => (
                <li key={creator._id}>
                  <User name={creator.name} image={creator.image} />
                </li>
              ))}
            </ul>
            <br />
            <br />
            <Modal id={modalQuizId} />
            <br />
            <br />
            <h2>Your quizzes</h2>
            <ul>
              {userQuizzes.map((quiz) => (
                <li key={quiz._id}>
                  <Game
                    fromUser
                    id={quiz._id as string}
                    title={quiz.title as string}
                    userId={quiz.userId as string}
                    peopleIn={quiz.peopleIn as number}
                    startsIn={quiz.startDate as string}
                  />
                </li>
              ))}
            </ul>
            <br />
            <br />
            <Link href="/creator/new">
              <a>Create a new quiz</a>
            </Link>
          </>
        )}
        {!user && (
          <>
            <p>Not signed in.</p>
            <button type="button" onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session) {
    const client = await clientPromise;

    const liveQuizzes = await client
      .db()
      .collection('quizzes')
      .find(
        {
          status: 'waiting',
        },
        {
          projection: {
            userId: 1,
            title: 1,
            startDate: 1,
            peopleIn: 1,
          },
        },
      )
      .limit(10)
      .toArray();

    const publishedQuizzes = await client
      .db()
      .collection('quizzes')
      .find(
        {
          status: 'published',
        },
        {
          projection: {
            userId: 1,
            title: 1,
            startDate: 1,
          },
        },
      )
      .limit(10)
      .toArray();

    const creators = await client
      .db()
      .collection('users')
      .find()
      .limit(10)
      .toArray();

    const userQuizzes = await client
      .db()
      .collection('quizzes')
      .find(
        {
          userId: (session.user as UserFromDB)._id,
        },
        {
          projection: {
            title: 1,
            status: 1,
            startDate: 1,
          },
        },
      )
      .toArray();

    return {
      props: {
        user: session.user,
        liveQuizzes: objectIdToJson(liveQuizzes),
        publishedQuizzes: objectIdToJson(publishedQuizzes),
        creators: objectIdToJson(creators),
        userQuizzes: objectIdToJson(userQuizzes),
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
