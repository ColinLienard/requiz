import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { FormEvent } from 'react';
import clientPromise from '../../lib/utils/mongodb';
import { UserFromDB } from '../../lib/types';

type Props = {
  quizId: string
}

type Value = {
  value: string
}

interface SettingsFormData extends EventTarget {
  title: Value,
  description: Value
}

const Creator: NextPage<Props> = ({ quizId }: Props) => {
  const handleSettings = async (event: FormEvent) => {
    event.preventDefault();
    const { title, description } = event.target as SettingsFormData;
    // const action = (event.nativeEvent as SubmitEvent).submitter?.id;
    // console.log(action);
    const response = await fetch('/api/save-quiz', {
      method: 'POST',
      body: JSON.stringify({
        quizId,
        title: title.value,
        description: description.value,
      }),
    });
    if (response.ok) {
      /* TODO: handle quiz is saved */
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/">
          <a>Home</a>
        </Link>
        <h1>Settings</h1>
        <form onSubmit={handleSettings}>
          <label htmlFor="title">
            Title
            <input type="text" name="title" required />
          </label>
          <label htmlFor="description">
            Description
            <input type="text" name="description" required />
          </label>
          <input type="submit" value="Save" id="save" />
          <input type="submit" value="Publish" id="publish" />
        </form>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
      props: {},
    };
  }

  const quiz = context.params?.quiz;
  if (!quiz) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  }
  if (quiz === 'new') {
    const { id: userId } = session.user as UserFromDB;
    const client = await clientPromise;
    const response = await client.db().collection('quizzes').insertOne({ userId });
    const quizId = response.insertedId.toHexString();

    return {
      props: {
        quizId,
      },
    };
  }

  return {
    props: {
      quizId: quiz,
    },
  };
};

export default Creator;
