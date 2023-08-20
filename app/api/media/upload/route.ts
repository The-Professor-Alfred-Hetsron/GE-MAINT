import { NextResponse } from 'next/server'
import fs from 'fs/promises'

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
    try {
      //const json = await req.json();
      const data = await req.formData()
      const image = data.get('image') as File
      if (!image) return NextResponse.json({ error: 'image file missing' }, { status: 403 })
      if(!image.type.startsWith('image')) return NextResponse.json({ error: 'invalid image file' }, { status: 403 })

      //try to save the image
      let serverFilename: string = ''
      try {
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const name = image.name.split('.')[image.name.split('.').length-1]
        const path = `public/assets/upload/${Date.now()}.${name}`
        await fs.writeFile(path, buffer)
        serverFilename = path.split('public')[1]
      } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'unable to save image' }, { status: 405 })
      }
      return NextResponse.json({ serverFilename: serverFilename }, { status: 200 },);
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}