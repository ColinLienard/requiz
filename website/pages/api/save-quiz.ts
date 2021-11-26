import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/utils/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    quizId,
    title,
    description,
    questions,
  } = JSON.parse(req.body);
  const client = await clientPromise;
  const response = await client
    .db()
    .collection('quizzes')
    .updateOne({ _id: new ObjectId(quizId) }, {
      $set: {
        title,
        description,
        questions,
      },
    });
  if (response.modifiedCount) {
    res.status(200).end();
  } else {
    res.status(400).end();
  }
};
