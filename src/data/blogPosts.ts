import { BlogPost } from '@/types/blog';

export const CORNERSTONE_POSTS: BlogPost[] = [
  {
    id: 'guide-cost-per-km-odisha-2026',
    title: 'Bus Rental Cost per Km in Odisha: Complete 2026 Price & Booking Guide',
    slug: 'bus-rental-cost-per-km-odisha-price-guide',
    excerpt: 'Comprehensive 2026 price breakdown for bus and tempo traveller hire across Bhubaneswar, Cuttack, Puri, and outstation Odisha. Covers per-km rates, driver batta, tolls, night charges, and cost-saving tips.',
    featured_image: '/assets/bus-1-CMvRhSGw.jpg',
    author_id: 'editorial-desk',
    author: {
      id: 'editorial-desk',
      name: 'RentAnyBus Logistics & Fleet Desk',
      bio: 'Commercial transport specialists covering highway regulations, charter logistics, and fleet pricing across Eastern India.',
      avatar_url: null,
    },
    published_at: '2026-03-15T09:00:00Z',
    created_at: '2026-03-15T09:00:00Z',
    updated_at: '2026-03-15T09:00:00Z',
    status: 'published',
    categories: [
      { id: 'pricing-guides', name: 'Pricing & Budgeting', slug: 'pricing' },
      { id: 'odisha-travel', name: 'Odisha Travel Logistics', slug: 'odisha-logistics' },
    ],
    tags: [
      { id: 'bus-rental-cost', name: 'Bus Rental Cost', slug: 'bus-rental-cost' },
      { id: 'odisha-charter', name: 'Odisha Charter', slug: 'odisha-charter' },
      { id: 'tempo-traveller-rates', name: 'Tempo Traveller Rates', slug: 'tempo-traveller-rates' },
      { id: 'transparent-pricing', name: 'Transparent Pricing', slug: 'transparent-pricing' },
    ],
    content: `
      <h2>Planning a Group Trip in Odisha? Understanding Real Commercial Bus Rates</h2>
      <p>Whether you are organizing an ancestral pilgrimage to Puri Jagannath Dham, coordinating a 300-guest wedding procession between Bhubaneswar and Cuttack, or dispatching an IT corporate team from Infocity Patia to Chilika Lake, chartering a private bus or tempo traveller is the most comfortable and cost-effective solution. However, one of the most frequent questions travellers face is: <strong>What is the actual per-kilometer cost of renting a bus in Odisha, and what additional hidden expenses should you budget for?</strong></p>

      <p>Unlike standard taxi aggregators that calculate dynamic surge pricing per minute, commercial bus charter in India operates on a regulated blend of <em>minimum daily kilometer thresholds</em>, <em>fixed per-kilometer slabs</em>, <em>driver allowances (driver batta)</em>, and <em>interstate/intercity toll taxes</em>. In this exhaustive 2026 pricing guide, we break down every vehicle tier, examine how daily minimums function, and reveal insider tips to avoid unexpected extras on your final invoice.</p>

      <hr />

      <h2>1. Quick Reference: 2026 Odisha Bus & Tempo Traveller Rate Card</h2>
      <p>Here is the benchmark market pricing for verified, commercially licensed, air-conditioned passenger coaches across Odisha (valid for Bhubaneswar, Cuttack, Puri, Berhampur, Sambalpur, and Balasore):</p>

      <div class="overflow-x-auto my-6">
        <table class="w-full text-left border-collapse border border-slate-200">
          <thead>
            <tr class="bg-slate-100 text-slate-800">
              <th class="p-3 border border-slate-200 font-bold">Vehicle Category</th>
              <th class="p-3 border border-slate-200 font-bold">Seating Capacity</th>
              <th class="p-3 border border-slate-200 font-bold">Base Rate per Km</th>
              <th class="p-3 border border-slate-200 font-bold">Min. Daily Run</th>
              <th class="p-3 border border-slate-200 font-bold">Est. Daily Base Fare</th>
              <th class="p-3 border border-slate-200 font-bold">Driver Batta (Per Day)</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-slate-50">
              <td class="p-3 border border-slate-200 font-medium">Force Tempo Traveller (Standard AC)</td>
              <td class="p-3 border border-slate-200">12 - 14 Seats</td>
              <td class="p-3 border border-slate-200">₹20 - ₹24 / km</td>
              <td class="p-3 border border-slate-200">250 km</td>
              <td class="p-3 border border-slate-200">₹5,500 - ₹6,500</td>
              <td class="p-3 border border-slate-200">₹400 - ₹500</td>
            </tr>
            <tr class="hover:bg-slate-50">
              <td class="p-3 border border-slate-200 font-medium">Force Urbania / Luxury Maharaja 1x1</td>
              <td class="p-3 border border-slate-200">16 - 17 Seats</td>
              <td class="p-3 border border-slate-200">₹25 - ₹28 / km</td>
              <td class="p-3 border border-slate-200">250 km</td>
              <td class="p-3 border border-slate-200">₹7,500 - ₹8,500</td>
              <td class="p-3 border border-slate-200">₹500 - ₹600</td>
            </tr>
            <tr class="hover:bg-slate-50">
              <td class="p-3 border border-slate-200 font-medium">Mini Bus (SML Isuzu / Eicher Deluxe)</td>
              <td class="p-3 border border-slate-200">24 - 26 Seats</td>
              <td class="p-3 border border-slate-200">₹30 - ₹34 / km</td>
              <td class="p-3 border border-slate-200">300 km</td>
              <td class="p-3 border border-slate-200">₹9,500 - ₹11,000</td>
              <td class="p-3 border border-slate-200">₹500 - ₹700</td>
            </tr>
            <tr class="hover:bg-slate-50">
              <td class="p-3 border border-slate-200 font-medium">Deluxe Pushback Tourist Coach (BharatBenz)</td>
              <td class="p-3 border border-slate-200">35 - 40 Seats</td>
              <td class="p-3 border border-slate-200">₹38 - ₹44 / km</td>
              <td class="p-3 border border-slate-200">300 km</td>
              <td class="p-3 border border-slate-200">₹12,500 - ₹14,500</td>
              <td class="p-3 border border-slate-200">₹600 - ₹800</td>
            </tr>
            <tr class="hover:bg-slate-50">
              <td class="p-3 border border-slate-200 font-medium">Large Barat & Yatra Coach (Tata / Ashok Leyland)</td>
              <td class="p-3 border border-slate-200">45 - 55 Seats</td>
              <td class="p-3 border border-slate-200">₹44 - ₹52 / km</td>
              <td class="p-3 border border-slate-200">300 km</td>
              <td class="p-3 border border-slate-200">₹16,000 - ₹19,000</td>
              <td class="p-3 border border-slate-200">₹700 - ₹900</td>
            </tr>
            <tr class="hover:bg-slate-50">
              <td class="p-3 border border-slate-200 font-medium">Multi-Axle Luxury Sleeper / Volvo 9600</td>
              <td class="p-3 border border-slate-200">40 - 53 Berths/Seats</td>
              <td class="p-3 border border-slate-200">₹55 - ₹65 / km</td>
              <td class="p-3 border border-slate-200">350 km</td>
              <td class="p-3 border border-slate-200">₹22,000 - ₹26,000</td>
              <td class="p-3 border border-slate-200">₹800 - ₹1,200</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="text-sm text-slate-500 italic">*Rates are benchmark commercial figures for Odisha as of 2026. Peak holiday seasons (Rath Yatra in Puri, New Year beach holidays, auspicious Hindu wedding dates in Margasira and Magha) may reflect a 15% to 25% adjustment due to supply constraints.</p>

      <hr />

      <h2>2. Understanding How the "Minimum Daily Kilometer" Rule Works</h2>
      <p>A frequent surprise for first-time bus renters is the <strong>Minimum Kilometers per Day</strong> clause. In commercial passenger vehicle logistics throughout India, tourist buses cannot be booked for only 20 km or 30 km at a dry per-km rate. Bus operators have fixed capital depreciation, chauffeur salaries, and insurance overheads.</p>

      <h3>The Formula:</h3>
      <p>Most commercial contracts in Odisha enforce a <strong>250 km to 300 km daily minimum charge</strong> for outstation charters.</p>
      <ul>
        <li><strong>Example A (Outstation Excursion):</strong> If you hire a 26-seater luxury traveller for a round-trip from Bhubaneswar to Gopalpur-on-Sea (approx. 360 km total in 1 day), you will be charged for 360 actual kilometers at ₹32/km = <strong>₹11,520</strong>.</li>
        <li><strong>Example B (Short Local Run):</strong> If you hire the same 26-seater bus for a 1-day wedding within Bhubaneswar and Cuttack city limits and the bus only covers 85 km, you will still be billed for the minimum contracted threshold (usually 250 km) = <strong>₹8,000 to ₹8,500 base rate</strong>, or on a negotiated flat 8hr/80km local package.</li>
      </ul>

      <p><strong>Pro-Tip:</strong> Always clarify whether your booking is classified as a <em>Local 8 Hours / 80 Kilometers package</em> or an <em>Outstation Per-Km package</em> before paying a booking deposit.</p>

      <hr />

      <h2>3. The 4 Additional Cost Components You Must Account For</h2>
      <p>When comparing bus hire estimates from multiple vendors, never look exclusively at the per-km rate. A rogue operator may quote ₹38/km instead of ₹44/km, but inflate parking, night allowances, and garage-to-garage dead mileage. Here are the four standard extras:</p>

      <h3>1. Driver Batta (Daily Allowance)</h3>
      <p>Driver batta covers the chauffeur's food, lodging, and on-duty sustenance. For day trips returning before 10:00 PM, standard batta in Odisha is ₹400 to ₹600. For overnight journeys or multi-day tours (e.g., an all-Odisha temple tour visiting Puri, Konark, Dhauli, and Chilika), overnight driver batta ranges from ₹600 to ₹1,000 per night.</p>

      <h3>2. Toll Gate Fees & Fastag Deductions</h3>
      <p>Odisha's major travel corridors feature National Highway toll plazas (e.g., NH-16 Manguli Toll near Cuttack, Pipili Toll on NH-316 to Puri, and Gangapada Toll outside Bhubaneswar). Standard 3-axle buses pay significantly higher toll tariffs than personal hatchbacks. On a Bhubaneswar to Puri round trip, FASTag toll expenses generally total approximately ₹350 to ₹650.</p>

      <h3>3. Parking and Municipal Entry Taxes</h3>
      <p>Major pilgrimage shrines and municipal zones require commercial bus parking tokens:</p>
      <ul>
        <li><strong>Puri Grand Road / Talabania Municipal Bus Stand:</strong> ₹200 to ₹400 per bus entry.</li>
        <li><strong>Konark Sun Temple OTDC Tourist Complex:</strong> ₹150 to ₹300 per coach.</li>
        <li><strong>Biju Patnaik International Airport (BBI) Pickup Bay:</strong> Commercial parking slots charge hourly fees after the initial grace period.</li>
      </ul>

      <h3>4. Garage-to-Garage ("Dead Mileage") Kilometers</h3>
      <p>Under Odisha motor vehicle charter norms, distance tracking begins from the bus owner's base garage (usually located at Baramunda, Khandagiri, Rasulgarh, or Badambadi) and ends when the vehicle returns to the garage. To minimize dead mileage costs, rent from a platform like RentAnyBus that matches you with vehicle owners located in your immediate neighborhood.</p>

      <hr />

      <h2>4. Popular Odisha Route Cost Calculations (Real 2026 Case Studies)</h2>

      <h3>Route 1: Bhubaneswar to Puri Jagannath Dham (Day Return)</h3>
      <ul>
        <li><strong>One-Way Distance:</strong> ~60 km | <strong>Round-Trip:</strong> ~120 km (plus ~30 km local beach and temple sightseeing = 150 km total).</li>
        <li><strong>Vehicle Recommended:</strong> 17-Seater Force Urbania / 26-Seater Mini Bus.</li>
        <li><strong>Total Estimated Cost:</strong> Flat all-inclusive package of <strong>₹7,500 – ₹9,500</strong> (including vehicle hire, fuel, driver allowance, and Pipili toll).</li>
      </ul>

      <h3>Route 2: Bhubaneswar to Konark Sun Temple & Chandrabhaga Beach</h3>
      <ul>
        <li><strong>Total Distance:</strong> ~140 km round trip.</li>
        <li><strong>Vehicle Recommended:</strong> 12-Seater AC Tempo Traveller for families, 35-Seater Coach for school excursions.</li>
        <li><strong>Total Estimated Cost:</strong> <strong>₹6,800 – ₹8,500</strong> for tempo traveller; <strong>₹14,000 – ₹16,500</strong> for 35-seater bus.</li>
      </ul>

      <h3>Route 3: Bhubaneswar to Chilika Lake Satapada / Barkul</h3>
      <ul>
        <li><strong>Total Distance:</strong> ~220 km to ~240 km round trip.</li>
        <li><strong>Vehicle Recommended:</strong> 26-Seater AC Pushback Coach or 17-Seater Force Urbania.</li>
        <li><strong>Total Estimated Cost:</strong> <strong>₹9,500 – ₹12,500</strong> all-inclusive.</li>
      </ul>

      <hr />

      <h2>5. 5 Proven Ways to Save Money on Bus Hire in Odisha</h2>
      <ol class="space-y-4">
        <li><strong>Book at Least 3 to 4 Weeks in Advance for Peak Dates:</strong> During peak wedding season (November to February) and Rath Yatra festival in Puri, demand for 40+ seater buses outstrips regional supply by over 300%. Booking early guarantees transparent pricing and clean, certified coaches.</li>
        <li><strong>Match Bus Capacity Strictly to Headcount:</strong> Renting a 45-seater bus for 18 passengers incurs unnecessary fuel consumption and toll penalties. A 20-seater or 26-seater bus will reduce your fuel and toll footprint by up to 35%.</li>
        <li><strong>Consolidate Pickup Points:</strong> Asking a 40-foot coach to navigate narrow residential lanes in old Cuttack or Old Town Bhubaneswar to pick up guests individually causes severe delays, fuel waste, and clutch wear. Designate 1 or 2 prominent pickup landmarks (such as Master Canteen, Jaydev Vihar Square, or Badambadi Link Road).</li>
        <li><strong>Verify AC Performance for Summer Charters:</strong> Coastal Odisha summers can reach 40°C+. Ensure the coach features a dedicated dual-compressor rooftop air conditioning system rather than an underpowered engine-driven split AC.</li>
        <li><strong>Always Demand a Digital All-Inclusive Quote:</strong> At RentAnyBus, our quotes clearly itemize base km rate, driver allowance, tolls, and taxes with zero hidden surprises.</li>
      </ol>

      <hr />

      <h2>Summary & Instant Booking</h2>
      <p>Bus rental in Odisha is safe, accessible, and economical when you know how the pricing structure functions. With verified owner fleets, certified drivers, and upfront quotation tools, RentAnyBus makes booking commercial transport across Odisha effortless.</p>
    `
  },
  {
    id: 'guide-wedding-bus-size-odisha',
    title: 'How to Choose the Right Bus Size for an Indian Wedding in Odisha',
    slug: 'wedding-bus-rental-size-guide-odisha',
    excerpt: 'Step-by-step logistics guide for bride, groom & barat transportation. How to coordinate 17-seater Urbanias, 26-seater mini buses, and 50-seater luxury coaches across Bhubaneswar and Cuttack wedding venues.',
    featured_image: '/assets/luxury-sleeper-bus-0su9i9vW.jpg',
    author_id: 'editorial-desk',
    author: {
      id: 'editorial-desk',
      name: 'RentAnyBus Logistics & Fleet Desk',
      bio: 'Commercial transport specialists covering highway regulations, charter logistics, and fleet pricing across Eastern India.',
      avatar_url: null,
    },
    published_at: '2026-03-20T10:00:00Z',
    created_at: '2026-03-20T10:00:00Z',
    updated_at: '2026-03-20T10:00:00Z',
    status: 'published',
    categories: [
      { id: 'wedding-logistics', name: 'Wedding Transportation', slug: 'weddings' },
      { id: 'fleet-guides', name: 'Fleet Guide', slug: 'fleet-guide' },
    ],
    tags: [
      { id: 'wedding-bus', name: 'Wedding Bus', slug: 'wedding-bus' },
      { id: 'barat-coach', name: 'Barat Coach', slug: 'barat-coach' },
      { id: 'bhubaneswar-wedding', name: 'Bhubaneswar Wedding', slug: 'bhubaneswar-wedding' },
    ],
    content: `
      <h2>The Ultimate Indian Wedding Transportation Guide in Odisha</h2>
      <p>Managing wedding transport is often one of the most stressful aspects of event planning in Odisha. Between receiving out-of-town relatives at Biju Patnaik International Airport (BBI), transferring guests between hotel suites and marriage mandaps in Patia or CDA Cuttack, and dispatching a spirited Barat procession, group mobility can make or break the guest experience.</p>

      <h2>1. The 3-Tier Wedding Fleet Strategy</h2>
      <p>Experienced wedding planners rarely rely on a single massive 55-seater bus. Instead, a multi-tiered fleet configuration provides agility and prevents traffic jams in narrow mandap lanes:</p>
      <ul>
        <li><strong>Tier 1: VIP Family Shuttles (16–17 Seater Force Urbania):</strong> Ideal for immediate family, makeup artists, and wedding photographers requiring frequent, flexible trips between hotels and venues.</li>
        <li><strong>Tier 2: Out-of-Town Guest Shuttles (26-Seater Luxury Travellers):</strong> Ideal for recurring airport/railway transfers and morning haldi/mehendi transfers.</li>
        <li><strong>Tier 3: The Grand Barat Coach (45–50 Seater Pushback AC Bus):</strong> Dedicated for the festive Barat procession where the entire extended family travels together in comfort with high-power audio systems and celebratory lighting.</li>
      </ul>

      <h2>2. Calculating Luggage Capacity: The Hidden Gotcha</h2>
      <p>Traditional Indian weddings involve substantial luggage—formal sherwanis, heavy bridal lehengas, gift boxes, and ceremonial sweets. While a 17-seater tempo traveller fits 17 seated passengers, its rear boot can only accommodate approximately 6 to 8 medium suitcases. For airport transfers carrying wedding trunks, always upgrade to a 26-seater bus with dedicated overhead racks and under-floor boot luggage bays.</p>

      <h2>3. Navigating Narrow Heritage Lanes in Cuttack & Old Bhubaneswar</h2>
      <p>If your wedding or reception is located inside heritage neighborhoods such as Buxi Bazar, Chhatra Bazar, or Old Town Lingaraj Temple area, large 50-seater buses cannot navigate sharp 90-degree turns. In these sectors, deploying two 20-seater mini buses ensures smooth door-to-door transit without traffic blockades.</p>
    `
  },
  {
    id: 'guide-puri-yatra-bus-hire',
    title: 'Jagannath Dham Puri Yatra Bus Booking: Route, Parking & Darshan Checklist',
    slug: 'puri-jagannath-yatra-bus-booking-guide',
    excerpt: 'Essential pilgrim charter handbook covering NH-316 highway guidelines, Talabania RTO bus parking, senior citizen drop-off permissions, and combined Konark-Chilika day itineraries.',
    featured_image: '/assets/quote-banner-bus-DEfOEAvv.png',
    author_id: 'editorial-desk',
    author: {
      id: 'editorial-desk',
      name: 'RentAnyBus Logistics & Fleet Desk',
      bio: 'Commercial transport specialists covering highway regulations, charter logistics, and fleet pricing across Eastern India.',
      avatar_url: null,
    },
    published_at: '2026-03-25T11:00:00Z',
    created_at: '2026-03-25T11:00:00Z',
    updated_at: '2026-03-25T11:00:00Z',
    status: 'published',
    categories: [
      { id: 'pilgrimage-tours', name: 'Pilgrimage Tours', slug: 'pilgrimage' },
      { id: 'puri-yatra', name: 'Puri Dham Guides', slug: 'puri-yatra' },
    ],
    tags: [
      { id: 'puri-yatra', name: 'Puri Yatra', slug: 'puri-yatra' },
      { id: 'jagannath-temple', name: 'Jagannath Temple', slug: 'jagannath-temple' },
      { id: 'talabania-parking', name: 'Talabania Parking', slug: 'talabania-parking' },
    ],
    content: `
      <h2>The Complete Pilgrim Guide to Chartering a Bus for Jagannath Puri Dham</h2>
      <p>Visiting Shree Jagannath Temple in Puri is a sacred journey for millions of devotees each year. When travelling with grandparents, elders, and young children, relying on crowded public buses or multiple individual taxis can cause stress and fatigue. Booking a private charter coach ensures your entire family stays together, enjoys air-conditioned comfort, and receives doorstep coordination.</p>

      <h2>Key Guidelines for Pilgrimage Bus Charters:</h2>
      <ul>
        <li><strong>Route & Highway Speed:</strong> Journey follows the 4-lane NH-316 expressway (approx. 60 km from Bhubaneswar). Travel duration is 75–90 minutes under normal traffic.</li>
        <li><strong>Designated Bus Parking:</strong> Large commercial buses are directed to the municipal parking grounds at Talabania or near Malatipatpur Bus Terminal. Our experienced drivers know authorized battery-rickshaw feeder stations to minimize walking for senior citizens.</li>
        <li><strong>Same-Day Return vs Overnight Stay:</strong> Devotees frequently combine Mahaprasad ananda bazar meals with an afternoon visit to Puri Golden Beach, Chandrabhaga Beach, and Konark Sun Temple before returning to Bhubaneswar.</li>
      </ul>
    `
  }
];
