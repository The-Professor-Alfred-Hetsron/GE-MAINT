import { NextResponse } from 'next/server'
import prismadb from '../../../../lib/prismadb'

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
      const id = params.id
      const user = await prismadb.user.findUnique({
        where: {
          id: Number.parseInt(id),
        },
      });

      return NextResponse.json({ user: user }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}