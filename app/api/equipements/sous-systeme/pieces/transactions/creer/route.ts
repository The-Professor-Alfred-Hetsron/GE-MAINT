import { NextResponse } from 'next/server'
import prismadb from '../../../../../../../lib/prismadb'

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

export async function POST(req: Request) {
  const json = await req.json();

  if(json.type_transaction !== 'TRANSACTION-AJOUT' && json.type_transaction !== 'TRANSACTION-RETRAIT'){
    return NextResponse.json({ error: "type de transaction inconnue" }, { status: 404 },);
  }
  
  try {
    const piece = await prismadb.piece.findUnique({
      where: {
          id: json.piece_id
      }
    })
    
    if(!piece){
      return NextResponse.json({ error: 'piece introuvable' }, { status: 401 })
    }
    
    const transaction = await prismadb.transaction.create({
      data: {...json},
    });
    
    return NextResponse.json({ transaction: transaction }, { status: 200 },);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'internal server error' }, { status: 500 })
  }
}