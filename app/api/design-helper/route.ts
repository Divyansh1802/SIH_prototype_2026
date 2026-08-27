import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { prompt } = await request.json().catch(() => ({ prompt: '' }))
  const idea = String(prompt || '').trim().slice(0, 240)
  if (!idea) return NextResponse.json({ reply: 'Share a little idea and I will help shape it.' }, { status: 400 })
  const lower = idea.toLowerCase()
  const history = lower.includes('konark') || lower.includes('hampi') || lower.includes('ajanta') || lower.includes('history')
  const inclusion = lower.includes('braille') || lower.includes('deaf') || lower.includes('sign') || lower.includes('accessible')
  const animal = lower.includes('tiger') || lower.includes('lion') || lower.includes('elephant') || lower.includes('peacock')
  const direction = history ? 'a story-led miniature with a small discovery card about the place' : inclusion ? 'a tactile, high-contrast play set with raised symbols and sign-language prompts' : animal ? 'a friendly modular creature with swap-in parts and a tiny habitat scene' : 'a modular keepsake with one tactile detail and a story card'
  return NextResponse.json({ reply: `For “${idea}”, I suggest ${direction}. Use recycled rPET in Haldi yellow and Indigo, keep the edges rounded, and add one hands-on moment that invites a child to discover more. It could be made as a ${history ? 'heritage miniature' : inclusion ? 'learning game' : 'custom ReToy build'} with an estimated 3D print time of 3–5 hours.` })
}
