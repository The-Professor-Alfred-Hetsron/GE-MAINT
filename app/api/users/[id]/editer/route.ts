import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    console.log('patch')
    try {
      const json = await req.json();
      const isExistingUser = await prismadb.user.findUnique({
        where: {
          id: Number.parseInt(params.id),
        },
      });
  
      if (!isExistingUser) {
        return NextResponse.json({ error: 'not existing user' }, { status: 422 });
      }
  
      const user = await prismadb.user.update({
        where: {
            id: Number.parseInt(params.id)
        },
        data: json,
      });
  
      return NextResponse.json({ user: user }, { status: 500 },);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}