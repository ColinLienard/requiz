import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { PropsToGetDBData } from '../../lib/types';
import clientPromise from '../../lib/utils/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    id,
    collection,
    projection,
  }: PropsToGetDBData = JSON.parse(req.body);
  const client = await clientPromise;
  const response = await client
    .db()
    .collection(collection)
    .findOne(
      { _id: new ObjectId(id) },
      projection ? { projection } : undefined,
    );
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(400).end();
  }
};
