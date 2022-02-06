import { WithId, ObjectId, Document } from 'mongodb';

const objectIdToJson = (array: WithId<Document>[]) => (
  array.map((quiz: {
    _id: ObjectId | string,
  }) => {
    const newQuiz = quiz;
    newQuiz._id = (quiz._id as ObjectId).toHexString();
    return newQuiz;
  })
);

export default objectIdToJson;
