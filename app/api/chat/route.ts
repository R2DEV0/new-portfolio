import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Kevin's information for context
const kevinContext = `
You are an AI assistant helping visitors learn about Kevin R. Chancey, a Senior Full-Stack Developer.

Key Information about Kevin:
- Currently working remotely at AREA15 in Las Vegas (February 2023 - Present)
- Previously worked at Strategy9 (August 2021 - October 2024) and J Taylor Education (June 2019 - October 2024)
- Skills: MERN stack, React, Next.js, AWS, C#, ASP.NET Core, PHP, WordPress, Python, JavaScript/TypeScript
- Education: BS Computer Science and BS Business Administration from City University of Seattle, AWS Certified Developer
- Notable achievements:
  * Designed Android Stripe ticketing kiosks with 15% increased ticket sales, serving 8,500+ customers daily
  * Reduced valet management time by 40% with SMS-based system
  * Improved platform speed by 25% and maintained 99.9% uptime
  * Created Chrome extension with 50,000+ downloads
  * Handled 800,000+ monthly emails with compliance standards
- Contact: Phone (206) 519-4870, Website: kevtech.net
- Passionate about building scalable solutions, immersive user experiences, and innovative digital experiences

Keep responses friendly, professional, and concise. If asked about something not related to Kevin, politely redirect to Kevin's portfolio information.
`

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: kevinContext,
      },
      ...(conversationHistory || []),
      {
        role: 'user',
        content: message,
      },
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      max_tokens: 300,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.'

    return NextResponse.json({ response })
  } catch (error: any) {
    console.error('OpenAI API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to get AI response' },
      { status: 500 }
    )
  }
}

