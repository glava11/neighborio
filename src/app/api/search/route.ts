import { NextRequest, NextResponse } from 'next/server';

import { CountryWithDistance } from '@/app/api/interfaces';

import { findClosestCountries } from '../country-service';
import { getLocation } from '../utils';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q');
    const [locationLat, locationLon] = await getLocation();

    if (typeof query !== 'string') {
      return new NextResponse('Bad request', {
        status: 400,
      });
    }

    const closestCountries: CountryWithDistance[] = findClosestCountries(
      query,
      locationLat,
      locationLon
    );

    return NextResponse.json(closestCountries);
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error('[API log] error: ', error);

    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
