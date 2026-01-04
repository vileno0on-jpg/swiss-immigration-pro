import { NextRequest, NextResponse } from 'next/server'

// Robust mock data for a professional look
type Property = {
  id: string
  title: string
  city: string
  canton: string
  rent: number
  rooms: number
  type: 'apartment' | 'house'
  sqm: number
  image: string
  link: string
  features: string[]
  availableFrom: string
  furnished?: boolean
  petFriendly?: boolean
  balcony?: boolean
  parking?: boolean
  elevator?: boolean
  wheelchairAccessible?: boolean
}

const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Luxury Penthouse with Lake View',
    city: 'Zurich',
    canton: 'ZH',
    rent: 4500,
    rooms: 3.5,
    type: 'apartment',
    sqm: 120,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    link: 'https://www.homegate.ch',
    features: ['Lake view', 'Roof terrace', 'Modern kitchen', 'Parking'],
    availableFrom: 'Immediately',
    furnished: false,
    petFriendly: false,
    balcony: true,
    parking: true,
    elevator: true,
    wheelchairAccessible: false,
  },
  {
    id: '2',
    title: 'Modern Family House in Quiet Area',
    city: 'Winterthur',
    canton: 'ZH',
    rent: 3200,
    rooms: 5.5,
    type: 'house',
    sqm: 180,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
    link: 'https://www.immoscout24.ch',
    features: ['Garden', 'Garage', 'Renovated', 'Solar panels'],
    availableFrom: '2024-03-01',
    furnished: false,
    petFriendly: true,
    balcony: false,
    parking: true,
    elevator: false,
    wheelchairAccessible: true,
  },
  {
    id: '3',
    title: 'Cozy Studio in Old Town',
    city: 'Bern',
    canton: 'BE',
    rent: 1450,
    rooms: 1.5,
    type: 'apartment',
    sqm: 45,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    link: 'https://www.newhome.ch',
    features: ['Central location', 'Parquet floors', 'High ceilings'],
    availableFrom: '2024-04-15',
    furnished: true,
    petFriendly: false,
    balcony: false,
    parking: false,
    elevator: true,
    wheelchairAccessible: false,
  },
  {
    id: '4',
    title: 'Spacious 4.5 Room Apartment',
    city: 'Geneva',
    canton: 'GE',
    rent: 3800,
    rooms: 4.5,
    type: 'apartment',
    sqm: 110,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800',
    link: 'https://www.comparis.ch',
    features: ['Balcony', 'Lift', 'Near public transport'],
    availableFrom: 'Immediately',
    furnished: false,
    petFriendly: false,
    balcony: true,
    parking: false,
    elevator: true,
    wheelchairAccessible: true,
  },
  {
    id: '5',
    title: 'Charming Country House',
    city: 'Fribourg',
    canton: 'FR',
    rent: 2600,
    rooms: 6.5,
    type: 'house',
    sqm: 220,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
    link: 'https://www.flatfox.ch',
    features: ['Mountain view', 'Fireplace', 'Large garden', 'Quiet'],
    availableFrom: '2024-05-01',
    furnished: false,
    petFriendly: true,
    balcony: false,
    parking: true,
    elevator: false,
    wheelchairAccessible: false,
  },
  {
    id: '6',
    title: 'Urban Loft in Former Factory',
    city: 'Basel',
    canton: 'BS',
    rent: 2950,
    rooms: 2.5,
    type: 'apartment',
    sqm: 95,
    image: 'https://images.unsplash.com/photo-1536376074432-8f2037996c56?auto=format&fit=crop&q=80&w=800',
    link: 'https://www.homegate.ch',
    features: ['Industrial style', 'High ceilings', 'Open plan', 'City center'],
    availableFrom: 'Immediately',
    furnished: true,
    petFriendly: true,
    balcony: false,
    parking: true,
    elevator: true,
    wheelchairAccessible: false,
  },
  {
    id: '7',
    title: 'Elegant 3-Room Apartment with Terrace',
    city: 'Lausanne',
    canton: 'VD',
    rent: 2800,
    rooms: 3,
    type: 'apartment',
    sqm: 85,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    link: 'https://www.immoscout24.ch',
    features: ['Terrace', 'Modern', 'Lake view', 'Dishwasher'],
    availableFrom: '2024-06-01',
    furnished: false,
    petFriendly: false,
    balcony: true,
    parking: true,
    elevator: true,
    wheelchairAccessible: true,
  },
  {
    id: '8',
    title: 'Bright Studio Near University',
    city: 'Zurich',
    canton: 'ZH',
    rent: 1650,
    rooms: 1,
    type: 'apartment',
    sqm: 35,
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=800',
    link: 'https://www.flatfox.ch',
    features: ['Furnished', 'WiFi included', 'Laundry room'],
    availableFrom: 'Immediately',
    furnished: true,
    petFriendly: false,
    balcony: false,
    parking: false,
    elevator: false,
    wheelchairAccessible: false,
  },
  {
    id: '9',
    title: 'Luxurious Villa with Pool',
    city: 'Lugano',
    canton: 'TI',
    rent: 6500,
    rooms: 7.5,
    type: 'house',
    sqm: 300,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    link: 'https://www.newhome.ch',
    features: ['Pool', 'Garden', 'Sauna', 'Wine cellar', 'Smart home'],
    availableFrom: '2024-07-01',
    furnished: false,
    petFriendly: true,
    balcony: true,
    parking: true,
    elevator: false,
    wheelchairAccessible: true,
  },
  {
    id: '10',
    title: 'Renovated 2.5 Room Apartment',
    city: 'St. Gallen',
    canton: 'SG',
    rent: 1850,
    rooms: 2.5,
    type: 'apartment',
    sqm: 65,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800',
    link: 'https://www.comparis.ch',
    features: ['Recently renovated', 'New kitchen', 'Quiet area'],
    availableFrom: '2024-04-01',
    furnished: false,
    petFriendly: true,
    balcony: true,
    parking: false,
    elevator: true,
    wheelchairAccessible: false,
  },
  {
    id: '11',
    title: 'Modern Duplex with Parking',
    city: 'Bern',
    canton: 'BE',
    rent: 3400,
    rooms: 4.5,
    type: 'apartment',
    sqm: 130,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    link: 'https://www.homegate.ch',
    features: ['Duplex', '2 bathrooms', 'Storage', 'Underground parking'],
    availableFrom: '2024-05-15',
    furnished: false,
    petFriendly: false,
    balcony: true,
    parking: true,
    elevator: true,
    wheelchairAccessible: true,
  },
  {
    id: '12',
    title: 'Cozy Mountain Chalet',
    city: 'Zermatt',
    canton: 'VS',
    rent: 4200,
    rooms: 5,
    type: 'house',
    sqm: 150,
    image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=800',
    link: 'https://www.flatfox.ch',
    features: ['Mountain view', 'Fireplace', 'Ski storage', 'Traditional'],
    availableFrom: '2024-08-01',
    furnished: true,
    petFriendly: true,
    balcony: true,
    parking: true,
    elevator: false,
    wheelchairAccessible: false,
  },
]

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const city = searchParams.get('city')?.toLowerCase()
  const minRent = parseInt(searchParams.get('minRent') || '0', 10)
  const maxRent = parseInt(searchParams.get('maxRent') || '999999', 10)
  const minRooms = parseFloat(searchParams.get('minRooms') || '0')
  const maxRooms = parseFloat(searchParams.get('maxRooms') || '999')
  const minSqm = parseInt(searchParams.get('minSqm') || '0', 10)
  const maxSqm = parseInt(searchParams.get('maxSqm') || '99999', 10)
  const type = searchParams.get('type') as 'apartment' | 'house' | null
  const furnished = searchParams.get('furnished')
  const petFriendly = searchParams.get('petFriendly') === 'true'
  const parking = searchParams.get('parking') === 'true'
  const balcony = searchParams.get('balcony') === 'true'
  const elevator = searchParams.get('elevator') === 'true'
  const wheelchairAccessible = searchParams.get('wheelchairAccessible') === 'true'

  let results = PROPERTIES

  // Apply filters
  if (city) {
    results = results.filter((prop) => 
      prop.city.toLowerCase().includes(city) || 
      prop.canton.toLowerCase().includes(city)
    )
  }
  
  if (minRent > 0) {
    results = results.filter((prop) => prop.rent >= minRent)
  }
  
  if (maxRent < 999999) {
    results = results.filter((prop) => prop.rent <= maxRent)
  }
  
  if (minRooms > 0) {
    results = results.filter((prop) => prop.rooms >= minRooms)
  }
  
  if (maxRooms < 999) {
    results = results.filter((prop) => prop.rooms <= maxRooms)
  }
  
  if (minSqm > 0) {
    results = results.filter((prop) => prop.sqm >= minSqm)
  }
  
  if (maxSqm < 99999) {
    results = results.filter((prop) => prop.sqm <= maxSqm)
  }
  
  if (type && type !== 'all' as any) {
    results = results.filter((prop) => prop.type === type)
  }
  
  if (furnished === 'true') {
    results = results.filter((prop) => prop.furnished === true)
  } else if (furnished === 'false') {
    results = results.filter((prop) => prop.furnished === false)
  }
  
  if (petFriendly) {
    results = results.filter((prop) => prop.petFriendly === true)
  }
  
  if (parking) {
    results = results.filter((prop) => prop.parking === true)
  }
  
  if (balcony) {
    results = results.filter((prop) => prop.balcony === true)
  }
  
  if (elevator) {
    results = results.filter((prop) => prop.elevator === true)
  }
  
  if (wheelchairAccessible) {
    results = results.filter((prop) => prop.wheelchairAccessible === true)
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))

  return NextResponse.json({ properties: results })
}
