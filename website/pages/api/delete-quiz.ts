import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/utils/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const quizId = req.body;
  const client = await clientPromise;
  const response = await client
    .db()
    .collection('quizzes')
    .deleteOne({ _id: new ObjectId(quizId) });
  if (response.deletedCount) {
    res.status(200).end();
  } else {
    res.status(400).end();
  }
};
