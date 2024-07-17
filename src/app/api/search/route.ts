import { NextRequest, NextResponse } from 'next/server';

import * as countriesJson from './countries.json';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q');
    console.log('[API log] req.nextUrl.searchParams: ', query);

    if (typeof query !== 'string') {
      //   throw new Error('query is not a string');
      return new NextResponse('Bad request', {
        status: 400,
      });
    }

    // countriesJson.forEach((country: any) => {
    //   console.log('[API log] country.name: ', country.name);
    //   console.log('[API log] country.latlng: ', country.latlng);
    //   console.log('[API log] country.flag: ', country.flag);
    // });

    const countriesResult = countriesJson.filter((country: any) => {
      return country.name.toLowerCase().includes(query.toLowerCase());
    });
    console.log('[API log] countriesResult: ', countriesResult);

    return NextResponse.json(countriesResult);
  } catch (error: Error | any) {
    console.error('[API log] error: ', error);

    return new NextResponse(JSON.stringify({ error: error?.message }), {
      status: 500,
    });
  }
}
