-- Migration to add sample blog content for RentAnyBus

DO $$
DECLARE
  v_author_id UUID;
  v_cat_wedding UUID;
  v_cat_corporate UUID;
  v_cat_tourism UUID;
  v_cat_general UUID;
  v_post_wedding UUID;
  v_post_corporate UUID;
  v_post_yatra UUID;
  v_post_picnic UUID;
BEGIN
  -- 1. Ensure we have an Author
  -- Try to find existing author or create a new one
  SELECT id INTO v_author_id FROM public.blog_authors WHERE name = 'RentAnyBus Team' LIMIT 1;
  
  IF v_author_id IS NULL THEN
    INSERT INTO public.blog_authors (name, bio, avatar_url)
    VALUES (
      'RentAnyBus Team', 
      'Your trusted travel partner for bus and tempo traveller rentals across Odisha. We specialize in wedding transport, corporate events, and tour packages.',
      'https://ui-avatars.com/api/?name=Rent+Any+Bus&background=0D8ABC&color=fff'
    )
    RETURNING id INTO v_author_id;
  END IF;

  -- 2. Create Categories
  INSERT INTO public.blog_categories (name, slug, description)
  VALUES ('Wedding Transportation', 'wedding-transportation', 'Luxury buses and tempo travellers for weddings and baraats.')
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO v_cat_wedding;

  INSERT INTO public.blog_categories (name, slug, description)
  VALUES ('Corporate Travel', 'corporate-travel', 'Professional transport solutions for corporate events and employee commute.')
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO v_cat_corporate;

  INSERT INTO public.blog_categories (name, slug, description)
  VALUES ('Tourism & Pilgrimage', 'tourism-pilgrimage', 'Explore Odisha''s temples and tourist spots with comfort.')
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO v_cat_tourism;
  
  INSERT INTO public.blog_categories (name, slug, description)
  VALUES ('General Travel Tips', 'general-travel-tips', 'Tips and guides for renting buses and planning trips.')
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO v_cat_general;

  -- 3. Create Blog Posts

  -- Post 1: Wedding
  INSERT INTO public.blog_posts (title, slug, excerpt, content, featured_image, author_id, status, published_at)
  VALUES (
    'The Ultimate Guide to Booking Wedding Buses in Odisha',
    'ultimate-guide-booking-wedding-buses-odisha',
    'Planning a grand Odia wedding? Learn how to book the perfect luxury buses for your Baraat and guests in Bhubaneswar and Cuttack.',
    '<h2>Planning the Perfect Baraat Entry</h2>
    <p>Weddings in Odisha are known for their grandeur, and the Baraat is the highlight of the celebration. Ensuring your guests arrive in comfort and style is crucial. At RentAnyBus, we offer a fleet of luxury AC buses and decorated tempo travellers specifically for weddings.</p>
    
    <h3>Why Book Early?</h3>
    <p>Wedding seasons in Odisha (especially November to February) see a huge demand for transport. We recommend booking your buses at least 2-3 months in advance to get the best vehicles at competitive rates.</p>

    <h3>AC vs. Non-AC Buses</h3>
    <p>While evening temperatures in winter are pleasant, AC buses provide a dust-free and noise-free environment, allowing your guests to relax before the festivities. For budget-friendly options for shorter distances, our well-maintained Non-AC buses are also a great choice.</p>
    
    <h3>Decoration Services</h3>
    <p>We don''t just provide the bus; we help you dress it up! Ask about our flower decoration packages to match your wedding theme.</p>',
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
    v_author_id,
    'published',
    NOW() - INTERVAL '5 days'
  )
  ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title, 
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    featured_image = EXCLUDED.featured_image
  RETURNING id INTO v_post_wedding;

  -- Link Post 1 to Category
  INSERT INTO public.blog_post_categories (post_id, category_id) VALUES (v_post_wedding, v_cat_wedding) ON CONFLICT DO NOTHING;


  -- Post 2: Corporate
  INSERT INTO public.blog_posts (title, slug, excerpt, content, featured_image, author_id, status, published_at)
  VALUES (
    'Why Rent a Tempo Traveller for Your Next Corporate Outing?',
    'rent-tempo-traveller-corporate-outing-bhubaneswar',
    'Planning a team outing near Bhubaneswar? Discover why a Tempo Traveller is the best choice for team bonding and comfort.',
    '<h2>Team Bonding Starts on the Journey</h2>
    <p>Corporate outings are all about building connections. Unlike separate cars where teams get split up, a <strong>Tempo Traveller</strong> keeps everyone together. You can play games, discuss strategies, or just enjoy the music together while traveling to your destination.</p>

    <h3>Features for Corporate Comfort</h3>
    <ul>
      <li><strong>Push-back Seats:</strong> Relax after a long week of work.</li>
      <li><strong>Ample Legroom:</strong> Travel in comfort, even for tall passengers.</li>
      <li><strong>Charging Points:</strong> Keep your devices powered up.</li>
      <li><strong>Separate Luggage Space:</strong> Keep the cabin clutter-free.</li>
    </ul>

    <h3>Top Corporate Picnic Spots Near Bhubaneswar</h3>
    <p>Consider taking your team to <em>Satkosia Gorge</em>, <em>Dhabaleswar</em>, or a beach retreat in <em>Puri</em>. RentAnyBus provides reliable pick-up and drop-off services from your office campus.</p>',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop',
    v_author_id,
    'published',
    NOW() - INTERVAL '3 days'
  )
  ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title, 
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    featured_image = EXCLUDED.featured_image
  RETURNING id INTO v_post_corporate;

  -- Link Post 2 to Category
  INSERT INTO public.blog_post_categories (post_id, category_id) VALUES (v_post_corporate, v_cat_corporate) ON CONFLICT DO NOTHING;


  -- Post 3: Pilgrimage (Yatra)
  INSERT INTO public.blog_posts (title, slug, excerpt, content, featured_image, author_id, status, published_at)
  VALUES (
    'Jagannath Dham Yatra: Comfortable Bus Rentals for Pilgrims',
    'jagannath-dham-yatra-bus-rental',
    'Embark on a spiritual journey to Puri, Konark, and Bhubaneswar. Safe and reliable bus rentals for senior citizens and family groups.',
    '<h2>The Golden Triangle Tour</h2>
    <p>Odisha''s Golden Triangle (Bhubaneswar - Puri - Konark) is a must-visit for every devotee. Renting a private bus allows you to visit these sacred sites at your own pace, without the hassle of public transport schedules.</p>

    <h3>Senior Citizen Friendly Travel</h3>
    <p>We understand that pilgrimages often include elderly family members. Our buses come with:</p>
    <ul>
      <li>Low-step entry for easy boarding.</li>
      <li>Comfortable suspension for a smooth ride on all road conditions.</li>
      <li>Experienced drivers who drive responsibly.</li>
    </ul>

    <h3>Suggested Itinerary</h3>
    <p>Start with Lingaraj Temple in Bhubaneswar, head to Dhauli Shanti Stupa, proceed to Konark Sun Temple, and end your day with the divine flag changing ceremony at Jagannath Temple, Puri. We can handle the parking and logistics while you focus on your darshan.</p>',
    'https://images.unsplash.com/photo-1626105959952-44158461757d?q=80&w=2070&auto=format&fit=crop',
    v_author_id,
    'published',
    NOW() - INTERVAL '10 days'
  )
  ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title, 
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    featured_image = EXCLUDED.featured_image
  RETURNING id INTO v_post_yatra;

  -- Link Post 3 to Category
  INSERT INTO public.blog_post_categories (post_id, category_id) VALUES (v_post_yatra, v_cat_tourism) ON CONFLICT DO NOTHING;
  
  
  -- Post 4: General / Picnic
  INSERT INTO public.blog_posts (title, slug, excerpt, content, featured_image, author_id, status, published_at)
  VALUES (
    'Top 5 Picnic Spots Near Cuttack for a Day Trip',
    'top-picnic-spots-cuttack-day-trip',
    'Looking for a weekend getaway? Check out these amazing picnic spots near Cuttack and the best vehicle to get there.',
    '<h2>Escape the City Life</h2>
    <p>Sometimes you just need a break. Gather your friends and family, rent a Mini Bus (26-seater) or a Winger, and head to these spots:</p>
    
    <ol>
      <li><strong>Ansupa Lake:</strong> A fresh water lake perfect for boating and picnics.</li>
      <li><strong>Naraj:</strong> Enjoy the scenic view of the Kathajodi river.</li>
      <li><strong>Dhabaleswar Island:</strong> A spiritual yet adventurous spot accessible by hanging bridge or boat.</li>
      <li><strong>Cuttack Chandi Temple & Gadgadia Ghat:</strong> For a mix of devotion and river-side relaxation.</li>
    </ol>
    
    <p><strong>Pro Tip:</strong> Book a vehicle with a carrier if you plan to carry cooking utensils and large picnic baskets!</p>',
    'https://images.unsplash.com/photo-1533552063806-6927a74075b2?q=80&w=2070&auto=format&fit=crop',
    v_author_id,
    'published',
    NOW() - INTERVAL '1 day'
  )
  ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title, 
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    featured_image = EXCLUDED.featured_image
  RETURNING id INTO v_post_picnic;
  
  -- Link Post 4 to Category
  INSERT INTO public.blog_post_categories (post_id, category_id) VALUES (v_post_picnic, v_cat_general) ON CONFLICT DO NOTHING;

END $$;