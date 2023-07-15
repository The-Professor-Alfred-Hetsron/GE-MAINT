import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '../../../lib/prismadb'

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("================================")
    console.log("Register")
    console.log("================================")

    if (req.method !== 'POST') {
      return res.status(405).end();
    }
  
    try {
      const { nom, email, matricule } = req.body;
  
      const isExistingUser = await prismadb.user.findUnique({
        where: {
          email: email,
        },
      });
  
      if (isExistingUser) {
        return res.status(422).json({ error: 'Email taken' });
      }
  
      const user = await prismadb.user.create({
        data: {
          email,
          nom,
          matricule
        },
      });
  
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).end();
    }
}
  
export default handler