import { NextRequest, NextResponse } from 'next/server'

// Dummy in-memory listings for MVP
type Apartment = {
  id: string
  title: string
  city: string
  rent: number
  rooms: number
  link: string
}

const DUMMY_APARTMENTS: Apartment[] = [
  {
    id: '1',
    title: 'Modern 2.5-room flat near city center',
    city: 'Zurich',
    rent: 2200,
    rooms: 2.5,
    link: 'https://example.com/listing/1',
  },
  {
    id: '2',
    title: 'Cozy studio in old town',
    city: 'Bern',
    rent: 1200,
    rooms: 1,
    link: 'https://example.com/listing/2',
  },
  {
    id: '3',
    title: 'Spacious 4-room family apartment',
    city: 'Basel',
    rent: 2500,
    rooms: 4,
    link: 'https://example.com/listing/3',
  },
]

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const city = searchParams.get('city')?.toLowerCase()
  const maxRent = parseInt(searchParams.get('maxRent') || '0', 10)
  const minRooms = parseFloat(searchParams.get('minRooms') || '0')

  let results = DUMMY_APARTMENTS

  if (city) {
    results = results.filter((apt) => apt.city.toLowerCase() === city)
  }
  if (maxRent) {
    results = results.filter((apt) => apt.rent <= maxRent)
  }
  if (minRooms) {
    results = results.filter((apt) => apt.rooms >= minRooms)
  }

  return NextResponse.json({ apartments: results })
}