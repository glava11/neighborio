import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;
    console.log('[API log] req.nextUrl.searchParams: ', query);

    // if (typeof query !== 'string') {
    //   throw new Error('query is not a string');
    // }

    return NextResponse.json({ search: 'here you go!' });
  } catch (error: Error | any) {
    console.error('[API log] error: ', error);

    return new NextResponse(JSON.stringify({ error: error?.message }), {
      status: 500,
    });
  }
}
