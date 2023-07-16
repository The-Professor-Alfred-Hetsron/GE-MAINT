import { NextResponse } from 'next/server'
import prismadb from '../../../../lib/prismadb'

export async function POST(req: Request) {
    try {
      const json = await req.json();
      const isExistingUser = await prismadb.user.findUnique({
        where: {
          email: json.email,
        },
      });
  
      if (isExistingUser) {
        return NextResponse.json({ error: 'existing user' }, { status: 422 });
      }
  
      const user = await prismadb.user.create({
        data: json,
      });
  
      return NextResponse.json({ user: user }, { status: 500 },);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}