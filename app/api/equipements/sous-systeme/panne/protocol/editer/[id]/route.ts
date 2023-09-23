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
    try {
      const id = params.id
      const json = await req.json();
      console.log(json);
      const protocol = await prismadb.protocol.findUnique({
        where: {
          id: Number.parseInt(id),
        },
      });

      if (!protocol){
        return NextResponse.json({ error: "aucun Protocol trouvé" }, { status: 401 });
      }

      const updated = await prismadb.protocol.update({
        where: {
          id: Number.parseInt(id),
        },
        data: {
          description: json.description || protocol.description,
        }
      });

      return NextResponse.json({ protocol: updated }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}