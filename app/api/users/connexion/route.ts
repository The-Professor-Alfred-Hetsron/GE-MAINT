import { NextResponse } from 'next/server'
import prismadb from '../../../../lib/prismadb'

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

export async function POST(req: Request) {
    try {
      const json = await req.json();
      const existingUser = await prismadb.user.findUnique({
        where: {
          email: json.email,
        },
      });
  
      if (!existingUser) {
        return NextResponse.json({ error: 'unknown user' }, { status: 401 });
      }

      if (existingUser.matricule !== json.matricule) {
        return NextResponse.json({ error: 'invalid user' }, { status: 402 });
      }

      return NextResponse.json({ user: existingUser }, { status: 200 },);

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}