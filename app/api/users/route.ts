import { NextResponse } from 'next/server'
import prismadb from '../../../lib/prismadb'

export async function GET(req: Request) {
    try {
      const users = await prismadb.user.findMany();

      return NextResponse.json({ users: users }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}