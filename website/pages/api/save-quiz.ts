import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { QuizData } from '../../lib/types';
import clientPromise from '../../lib/utils/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    quizId,
    status,
    title,
    description,
    theme,
    maxPlayers,
    startDate,
    questions,
  } = JSON.parse(req.body) as QuizData;
  const client = await clientPromise;
  const response = await client
    .db()
    .collection('quizzes')
    .updateOne({ _id: new ObjectId(quizId) }, {
      $set: {
        status,
        title,
        description,
        theme,
        maxPlayers,
        startDate,
        questions,
      },
    });
  if (response.modifiedCount) {
    res.status(200).end();
  } else {
    res.status(400).end();
  }
};
