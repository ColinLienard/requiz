import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/utils/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.body;
  const client = await clientPromise;
  const response = await client
    .db()
    .collection('users')
    .findOne({ _id: new ObjectId(userId) });
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(400).end();
  }
};
