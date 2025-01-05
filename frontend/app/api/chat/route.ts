import { NextResponse } from 'next/server';
import axios from 'axios';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];

    if (!lastMessage || !lastMessage.content) {
      return NextResponse.json(
        { error: 'No message content provided' },
        { status: 400 }
      );
    }

    // const LANGFLOW_API_TOKEN = process.env.LANGFLOW_API_TOKEN as string

    // if (!LANGFLOW_API_TOKEN) {
    //   throw new Error('Missing LANGFLOW_API_TOKEN');
    // }

    const options = {
      method: 'POST',
      url: 'https://api.langflow.astra.datastax.com/lf/50db0e28-1c50-4d26-a401-e9b885788af4/api/v1/run/6f38d2a8-306a-44a6-a48a-4ab28ba042e3',
      params: { stream: 'false' },
      headers: {
        Authorization: `Bearer AstraCS:SHmyzBPisdZfPevzGizQDfzt:9006f725852e6d103b6c184e6e535f9f14c16fed808db23f20fa207a4ae116c4`,
        'Content-Type': 'application/json'
      },
      data: {
        input_value: lastMessage.content,
        output_type: 'chat',
        input_type: 'chat'
      }
    };

    const response = await axios.request(options);

    if (!response.data?.outputs?.[0]?.outputs?.[0]?.results?.message?.text) {
      throw new Error('Invalid response format from API');
    }

    const aiResponseText = response.data.outputs[0].outputs[0].results.message.text;

    return NextResponse.json({
      content: aiResponseText,
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}