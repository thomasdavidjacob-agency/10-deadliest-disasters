/* Generates the 10 disaster pillar pages from data. Run: node _build.js */
const fs = require('fs');
const path = require('path');
const OUT = __dirname;

const ICONS = {
  pandemic: '<circle cx="16" cy="16" r="6"/><path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M24.5 7.5l-2.8 2.8M10.3 21.7l-2.8 2.8"/>',
  flood: '<path d="M5 11l11-6 11 6"/><path d="M8 11v7M24 11v7M16 9v6"/><path d="M2 24c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 6 2M2 29c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 6 2"/>',
  quake: '<path d="M2 16h5l3-7 4 13 4-16 3 10h9"/>',
  hurricane: '<path d="M16 16c-6 0-9-2-9-5 0-2 2-4 6-4M16 16c6 0 9 2 9 5 0 2-2 4-6 4"/><circle cx="16" cy="16" r="2" fill="currentColor"/>',
  tsunami: '<path d="M2 22c3 0 3-3 6-3s3 3 6 3 3-3 6-3 3 3 6 3"/><path d="M22 12c0-4-3-7-7-7-3 0-5 2-5 4 0 0 4-1 4 2 0 4 4 5 8 4"/>',
  volcano: '<path d="M11 18l-7 11h24l-7-11"/><path d="M11 18l2-3h6l2 3"/><path d="M16 12V4M16 4l3 3M16 4l-3 3M21 9l2-2M11 9L9 7"/>',
  nuclear: '<ellipse cx="16" cy="16" rx="13" ry="5"/><ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)"/><circle cx="16" cy="16" r="1.9" fill="currentColor"/>',
  terror: '<polygon points="16.0,3.0 18.1,10.9 25.2,6.8 21.1,13.9 29.0,16.0 21.1,18.1 25.2,25.2 18.1,21.1 16.0,29.0 13.9,21.1 6.8,25.2 10.9,18.1 3.0,16.0 10.9,13.9 6.8,6.8 13.9,10.9"/>',
  wildfire: '<path d="M16 3c0 6-7 7-7 14a7 7 0 0014 0c0-3-2-5-2-5-1 3-3 3-3 1 0-4-2-6-2-10z"/>',
  cyber: '<path d="M16 3l11 4v7c0 7-5 11-11 13C10 25 5 21 5 14V7l11-4z"/><circle cx="16" cy="14" r="2.4"/><path d="M16 16.2V20"/>'
};
const icon = (k, size) => `<svg width="${size||30}" height="${size||30}" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[k]}</svg>`;

// ---------- DISASTER DATA ----------
const D = [
{
  rank:'01', key:'pandemic', slug:'pandemics', name:'Pandemics', toll:'200M+', event:'Black Death, 1347–1351',
  intro:"Disease has killed more human beings than every war in history combined. From the Black Death to COVID-19, pandemics reshape civilizations — and in an age of constant global travel, the next one will spread faster than any before it.",
  lead:"Across history, no force has killed more people than disease, and globalization has only shortened the distance between an outbreak and a pandemic.",
  stats:[['200M+','Black Death toll (est.)','#cc2200'],['50M','1918 flu deaths','#f0ece4'],['7M+','COVID-19 reported deaths','#f0ece4'],['<1yr','Fastest vaccine ever','#d4930a']],
  sections:[
    {h2:"Why pandemics outrank every other disaster",p:["Unlike an earthquake or a flood, a pandemic is not bound by geography. A novel pathogen exploits the very things that make modern life convenient — dense cities, constant travel, and global supply chains. The Black Death killed perhaps a third to a half of Europe; the 1918 influenza killed more people than the First World War.","The lethality of any outbreak comes down to three numbers: how easily it spreads, how often it kills, and how long before we can respond. Small shifts in any one of them separate a seasonal nuisance from a civilization-level event."]},
    {h2:"From contagion to collapse",p:["The direct death toll is only the first wave. Overwhelmed hospitals, broken supply chains, and a sidelined workforce mean the secondary damage of a severe pandemic can rival the disease itself. COVID-19 showed how quickly a health crisis becomes an economic and social one.","Household readiness is unglamorous but decisive: the ability to isolate, weeks of essentials on hand, and the discipline to avoid the panic-buying that strips shelves in the first 48 hours."]},
    {h2:"What individual readiness looks like",p:["You cannot vaccinate yourself against the unknown, but you can shorten your exposure. A small stock of respirators, rapid tests, and fever and rehydration supplies — plus a plan to work and learn from home — buys you the most valuable resource in an outbreak: time.","The households that fared best in 2020 weren't the ones with the most supplies. They were the ones who already had a plan before the first case arrived."]}
  ],
  quote:["A pandemic is not an event. It is a test of every system at once.","Public-health maxim"],
  pnwTitle:"PNW Focus · The regional public-health picture",
  pnwBody:["Portland's density, its international airport, and its port make the metro a plausible early entry point for an emerging pathogen — but also one of the better-resourced regions for response, anchored by OHSU and a strong public-health network.","The practical lesson from 2020 holds: keep a two-week buffer of essentials, know your clinic's telehealth options, and don't rely on just-in-time grocery delivery when everyone else is doing the same."],
  gear:[['Top Pick','N95 / KN95 Respirators','Sealed, NIOSH-rated protection — not cloth.'],['Essential','Rapid Test Kits','Know before you spread. Rotate before expiry.'],['Best Value','Pulse Oximeter','Catches silent low blood-oxygen early.'],['Overlooked','Fever & Rehydration','Electrolytes, antipyretics, the basics.']],
  checklist:["Two-week supply of food & water","N95 respirators for the household","Rapid tests and a thermometer","Prescription meds: a 30-day buffer","A work / school from-home plan","A designated isolation room"]
},
{
  rank:'02', key:'flood', slug:'floods', name:'Floods', toll:'4M', event:'China Floods, 1931',
  intro:"Water is the deadliest force in nature — not for its violence, but for its reach. Floods are the most frequent natural disaster on Earth, and the 1931 China floods may have killed more people than any single event in modern history.",
  lead:"Floods are the most common natural disaster on Earth, and by some estimates the single deadliest event in modern history happened in the water.",
  stats:[['4M','China floods, 1931 (est.)','#cc2200'],['#1','Most frequent disaster','#f0ece4'],['~90%','Of disasters are water-related','#f0ece4'],['2B+','People in flood-prone areas','#d4930a']],
  sections:[
    {h2:"The most common catastrophe",p:["Floods top every disaster-frequency chart. They arrive as overflowing rivers, coastal storm surge, flash floods in dry canyons, and the failure of the dams and levees built to stop them. The 1931 Yangtze and Huai River floods inundated an area the size of England, with death-toll estimates ranging from several hundred thousand into the millions.","What makes water so lethal is how little of it you need. Six inches of moving water can knock an adult off their feet; two feet can carry away a car."]},
    {h2:"Flash floods and the failure of warning",p:["Riverine floods build over days and can be forecast. Flash floods cannot. A thunderstorm miles upstream can send a wall of water through a dry wash with almost no notice — which is why so many flood deaths are people caught in their vehicles.","Dams and levees create a second danger: a false sense of safety. Infrastructure ages, and the worst floods often follow a structure's failure rather than the rain itself."]},
    {h2:"Preparing for rising water",p:["Know whether you live in a floodplain — FEMA flood maps are free — and whether your insurance covers flood damage, because standard homeowner policies do not. Move valuables and utilities above expected flood levels, and never drive into water of unknown depth.","When evacuation is ordered, minutes matter. The households with a go-bag and a route already chosen are the ones who leave calmly instead of becoming the rescue."]}
  ],
  quote:["Turn around, don't drown.","U.S. National Weather Service"],
  pnwTitle:"PNW Focus · Atmospheric rivers",
  pnwBody:["The Willamette and its tributaries have a long history of flooding; the 1996 floods caused widespread damage across the valley. Atmospheric rivers — long plumes of Pacific moisture — are the region's signature flood driver.","Coastal and tsunami flooding are covered separately, but for inland Portland the realistic threats are urban flash flooding and river rise during a sustained atmospheric river."],
  gear:[['Top Pick','Flood Barriers / Sandbags','Divert water before it reaches the door.'],['Essential','Sump Pump + Backup','Keeps a basement dry when power fails.'],['Best Value','Waterproof Document Safe','Protects IDs, deeds, and records.'],['Overlooked','PFDs (Life Jackets)','For moving water during evacuation.']],
  checklist:["Know your FEMA flood-zone rating","Flood insurance in force","Utilities & valuables raised","An evacuation route chosen","Go-bag staged and ready","Never drive through floodwater"]
},
{
  rank:'03', key:'quake', slug:'earthquakes', name:'Earthquakes', toll:'830K', event:'Shaanxi, China, 1556', hero:'assets/hero/earthquake.jpg',
  intro:"The ground beneath us is never truly still. From the rubble of Shaanxi to the fault lines under Portland, here is what makes earthquakes among history's most lethal — and least predictable — catastrophes.",
  lead:"Earthquakes have killed more people than any other geophysical hazard — not because the shaking itself is deadly, but because of what it brings down on top of us.",
  stats:[['830,000','Deadliest event toll','#cc2200'],['M9.5','Largest ever recorded','#f0ece4'],['~20K','Quakes / year (M3+)','#f0ece4'],['10–30s','Cascadia warning window','#d4930a']],
  sections:[
    {h2:"Why earthquakes are so lethal",p:["On the morning of January 23, 1556, the deadliest earthquake in recorded history struck Shaanxi province in China. An estimated 830,000 people died — many in cave dwellings carved into soft loess cliffs that collapsed instantly.","Unlike hurricanes or floods, earthquakes give virtually no warning. A megathrust rupture releases energy accumulated over centuries in seconds, and the secondary hazards — collapsing masonry, fires, landslides, tsunamis — are often deadlier than the shaking itself."]},
    {h2:"Reading the magnitude scale",p:["The moment magnitude scale is logarithmic: each whole number represents roughly 32 times more energy released. A magnitude 9.0 — the kind Cascadia is capable of — unleashes nearly a thousand times the energy of a magnitude 7.0.","That is why the difference between a “major” and a “great” earthquake is so stark, and why modern building codes have done more to save lives than almost any other intervention."]},
    {h2:"What survival actually requires",p:["After a Cascadia rupture, emergency services in the Portland metro could be overwhelmed for days to weeks. Bridges may be unusable, water mains broken, and the grid down. FEMA's guidance for the region is unusually blunt: prepare to be self-sufficient for a minimum of two weeks.","That means water, food, sanitation, and a plan to reconnect with family when cell networks fail. The checklist beside this article is the exact framework our editors use to evaluate readiness."]}
  ],
  quote:["It is not the earthquake that kills you. It is the building.","Seismic engineering maxim"],
  pnwTitle:"PNW Focus · The fault under your feet",
  pnwBody:["The Cascadia Subduction Zone last ruptured on January 26, 1700 — a magnitude-9.0 event that sent a tsunami across the Pacific to Japan. These full-margin ruptures recur roughly every 300–500 years, and we are now 326 years into that window.","For Portland residents the threat is twofold: violent shaking lasting up to five minutes, and — for the coast — a tsunami arriving in as little as 15 minutes. Inland Portland won't flood, but unreinforced masonry and liquefaction-prone soils along the Willamette pose serious risk."],
  gear:[['Top Pick','4-Person Survival Kit','72-hour essentials, Red Cross aligned.'],['Essential','Gravity Water Filter','Purifies 12L without power.'],['Best Value','Crank Weather Radio','NOAA alerts + phone charging.'],['Overlooked','Gas Shutoff Tool','Prevents post-quake fires.']],
  checklist:["Two weeks of water (1 gal/person/day)","Two-week shelf-stable food supply","Secured water heater & heavy furniture","Out-of-area family contact plan","Go-bag staged by every exit","Gas shutoff wrench at the meter"]
},
{
  rank:'04', key:'hurricane', slug:'hurricanes', name:'Hurricanes', toll:'500K', event:'Bhola Cyclone, 1970',
  intro:"A mature hurricane releases more energy in a day than humanity uses in a year. They are the rare catastrophe we can see coming for days — and still, a single storm has killed half a million people.",
  lead:"We can watch a hurricane coming for a week, and the largest still rank among the deadliest disasters humanity has ever recorded.",
  stats:[['500K','Bhola Cyclone, 1970','#cc2200'],['Cat 5','Maximum category','#f0ece4'],['200mph','Peak sustained winds','#f0ece4'],['#1','Storm surge = top killer','#d4930a']],
  sections:[
    {h2:"Wind gets the headlines; water does the killing",p:["Hurricane categories measure wind, but it is the water that fills the morgues. Storm surge — the dome of seawater a hurricane pushes ashore — accounts for the majority of deaths. The 1970 Bhola Cyclone drowned an estimated 500,000 people in low-lying Bangladesh.","Inland flooding from a slow, rain-heavy storm is the second great killer, sometimes hundreds of miles from where the eye made landfall."]},
    {h2:"Days of warning, and still deadly",p:["Modern forecasting can track a hurricane for a week, yet people still die because evacuation is hard — it's expensive, traffic-choked, and easy to second-guess. The deadliest modern storms pair a strong surge with a population that waited too long.","If you live in a surge or evacuation zone, the decision to leave should be made on the forecast, not on what you can see out the window."]},
    {h2:"Before, during, and after",p:["Before the season, protect your windows, secure loose outdoor items, and store water and food. During the storm, shelter in an interior room away from glass.","After landfall the danger isn't over: downed power lines, floodwater, and carbon monoxide from improperly used generators kill people in the aftermath of nearly every major storm."]}
  ],
  quote:["Hide from the wind, run from the water.","Emergency-management saying"],
  pnwTitle:"PNW Focus · Does the Northwest get hurricanes?",
  pnwBody:["True tropical hurricanes don't reach Oregon, but their remnants and powerful Pacific windstorms do. The 1962 Columbus Day Storm — fed by a dying typhoon — remains one of the most destructive windstorms in U.S. history, with gusts over 100 mph across the Willamette Valley.","The preparedness overlap is real: secure outdoor items, expect multi-day power outages, and keep the same supplies you would stage for a quake."],
  gear:[['Top Pick','Window Protection','Shutters or panels against debris.'],['Essential','Portable Generator','Plus a CO detector — always outdoors.'],['Best Value','NOAA Weather Radio','Alerts when the power and cell are out.'],['Overlooked','Water Storage','Two weeks per person, stored low.']],
  checklist:["Know your evacuation zone","Windows & doors protected","Generator + CO detector ready","Two weeks of water & food","Vehicle fueled before landfall","Documents in a waterproof bag"]
},
{
  rank:'05', key:'tsunami', slug:'tsunamis', name:'Tsunamis', toll:'227K', event:'Indian Ocean, 2004',
  intro:"A tsunami is not a wave you can surf or outswim — it is the ocean itself moving inland. The 2004 Indian Ocean tsunami killed an estimated 227,000 people across fourteen countries in a single morning.",
  lead:"A tsunami carries the energy of an earthquake across an entire ocean and delivers it, undiminished, onto a beach full of people.",
  stats:[['227K','Indian Ocean, 2004','#cc2200'],['500+mph','Open-ocean speed','#f0ece4'],['<15min','Cascadia coast arrival','#cc2200'],['100ft','Max recorded run-up','#d4930a']],
  sections:[
    {h2:"The wall of water",p:["Most tsunamis are born when a seafloor earthquake suddenly displaces a vast column of water. In the deep ocean the wave is barely noticeable and travels as fast as a jet; as it reaches shallow coastline it slows, stacks up, and surges ashore.","It arrives not as a single curling wave but as a fast, relentless flood that keeps coming. The 2004 disaster was so deadly partly because the Indian Ocean had no warning system and few people recognized the danger."]},
    {h2:"Nature's own warning",p:["The single most important tsunami fact is also the simplest: strong shaking near the coast is the warning. Often the sea withdraws dramatically first, exposing the seafloor — a deadly invitation that has lured the curious to their deaths.","For a locally generated tsunami there may be only minutes. No official alert can beat the wave; your own legs are the warning system. Move to high ground or inland, on foot, immediately."]},
    {h2:"Knowing your zone before you need it",p:["If you live, work, or vacation on the coast, learn the inundation map and the marked evacuation routes before you arrive. Walk the route to high ground at least once.","The difference between survivors and victims is usually nothing more than knowing which way to run — and not hesitating."]}
  ],
  quote:["If the ground shakes near the coast, don't wait for a siren — climb.","Tsunami safety rule"],
  pnwTitle:"PNW Focus · The Cascadia tsunami",
  pnwBody:["A Cascadia megathrust earthquake will generate a tsunami that reaches the Oregon coast in as little as 15 minutes — far faster than any official warning could help. Communities from Astoria to Brookings sit in the inundation zone.","Inland Portland is not at tsunami risk, but anyone who visits the coast should treat strong, long shaking as the only warning they will get: drop, hold on, then immediately move to high ground."],
  gear:[['Top Pick','NOAA Tsunami Radio','Coastal alerts the moment they issue.'],['Essential','Grab-and-Go Bag','Staged for a 15-minute departure.'],['Best Value','Sturdy Shoes by the Bed','You may be running over debris.'],['Overlooked','Personal Locator Beacon','Calls for help when networks fail.']],
  checklist:["Know the coastal inundation zone","Identify high ground & routes","Practice the evacuation walk","Shoes & go-bag accessible","A “shaking = move” family rule","A reunification plan set"]
},
{
  rank:'06', key:'volcano', slug:'volcanoes', name:'Volcanic Eruptions', toll:'92K', event:'Mt. Tambora, 1815',
  intro:"When Mount Tambora erupted in 1815 it did more than kill those nearby — it cooled the entire planet, causing the “year without a summer” and famine across the Northern Hemisphere.",
  lead:"A single large eruption can darken skies on the other side of the planet and starve harvests a year later.",
  stats:[['92K','Mt. Tambora, 1815','#cc2200'],['VEI 7','Tambora eruption index','#f0ece4'],['1816','“Year Without a Summer”','#f0ece4'],['~1,500','Active volcanoes worldwide','#d4930a']],
  sections:[
    {h2:"More than lava",p:["Film loves flowing lava, but it is rarely the killer. The deadly hazards are pyroclastic flows — superheated avalanches of gas and ash moving at highway speeds — and lahars, volcanic mudflows that can bury valleys miles away.","Tambora killed perhaps ten thousand directly and tens of thousands more through the starvation that followed. A large eruption is also a climate event: ash and sulfur in the stratosphere can drop global temperatures for a year or more."]},
    {h2:"Lahars: the silent valley-killer",p:["For the Pacific Northwest the greatest volcanic danger isn't an explosion — it's a lahar. These mudflows can be triggered even without an eruption and race down river valleys faster than people can drive.","The 1985 Nevado del Ruiz lahar killed more than 23,000 people in a single town. The defense is geography and warning: know whether you are in a lahar path, and know the route to high ground."]},
    {h2:"Living near a sleeping giant",p:["Volcanic preparedness blends earthquake and wildfire readiness: protect your lungs from ash, keep supplies for being cut off, and understand your evacuation routes.","Ashfall alone can collapse roofs, foul engines, and make the air dangerous to breathe for miles around — long after the eruption has ended."]}
  ],
  quote:["The mountain gives warning. The question is whether anyone is listening.","Volcanology proverb"],
  pnwTitle:"PNW Focus · The Cascade arc",
  pnwBody:["Oregon and Washington sit along a chain of active volcanoes — Mount Hood, Mount St. Helens, Mount Rainier, and more. Mount Hood looms about 50 miles from downtown Portland, and Mount St. Helens erupted catastrophically in 1980 within living memory.","Mount Rainier is considered one of the most dangerous volcanoes in the country because of the populated river valleys in its lahar path. If you live or travel near these valleys, learn the lahar evacuation routes."],
  gear:[['Top Pick','N95 / P100 Masks','Ash is abrasive and damages lungs.'],['Essential','Sealing Goggles','Protect eyes from grit and ash.'],['Best Value','HEPA Air Purifier','Keeps one room breathable indoors.'],['Overlooked','Emergency Food Supply','For being cut off after ashfall.']],
  checklist:["Know if you're in a lahar zone","Ashfall masks for everyone","A seal-up plan for the house","A spare vehicle air filter","Evacuation route to high ground","Two weeks of supplies"]
},
{
  rank:'07', key:'nuclear', slug:'nuclear-accidents', name:'Nuclear Accidents', toll:'~4,000', event:'Chernobyl, 1986 (est.)',
  intro:"Nuclear power is among the safest energy sources by deaths per kilowatt-hour — until the rare moment it isn't. Chernobyl turned a city into a ghost town and an exclusion zone that will outlast everyone alive today.",
  lead:"Nuclear accidents are rare and statistically safe — until one fails, and leaves land uninhabitable for centuries.",
  stats:[['~4,000','Chernobyl est. eventual deaths','#cc2200'],['1986','Chernobyl disaster','#f0ece4'],['INES 7','Maximum accident level','#f0ece4'],['~20,000yr','Zone uninhabitable (est.)','#d4930a']],
  sections:[
    {h2:"Rare, but uniquely persistent",p:["Counted by direct deaths, nuclear accidents rank low among disasters — the immediate Chernobyl toll was in the dozens, with thousands more attributed to long-term cancers. What sets radiation apart is its persistence: contamination that lingers for generations and renders land unusable.","Fukushima in 2011 showed the modern shape of the risk: triggered not by reactor design alone but by a tsunami overwhelming the plant's defenses."]},
    {h2:"What to actually do",p:["In a radiological emergency the guidance is unglamorous and effective: get inside, stay inside, and stay tuned. A building's mass blocks much of the radiation, and most fallout danger decays rapidly in the first hours and days.","Potassium iodide protects the thyroid from one specific isotope — it is not a cure-all, and it should only be taken when public-health authorities advise it."]},
    {h2:"Knowing your proximity",p:["If you live near a nuclear facility, learn the emergency planning zones and the local alert system. The plan is the same as for many disasters: a way to shelter, a way to evacuate, and a way to get trustworthy information.","When rumors move faster than facts, a reliable radio and a pre-arranged family plan are worth more than any gadget."]}
  ],
  quote:["Distance, shielding, and time — the three defenses against radiation.","Radiological safety principle"],
  pnwTitle:"PNW Focus · Hanford & the grid",
  pnwBody:["The Northwest's nuclear story is dominated by the Hanford Site in eastern Washington — a former plutonium-production complex that is now one of the most contaminated sites in the hemisphere and the focus of a decades-long cleanup.","Washington's Columbia Generating Station is the region's only commercial reactor. For most Portland-area residents, realistic “nuclear” planning is the same all-hazards readiness: the ability to shelter in place and a reliable source of official information."],
  gear:[['Top Pick','Potassium Iodide (KI)','Only if and when officials advise.'],['Essential','Radiation Detector','Personal dosimeter / Geiger counter.'],['Best Value','P100 Respirator','Filters fallout particulates.'],['Overlooked','Shelter Supplies','Plastic sheeting, tape, two weeks food.']],
  checklist:["Know nearby facility zones","A shelter-in-place plan","A sealed interior room identified","Battery/crank radio for alerts","KI only if advised by officials","Two weeks of supplies"]
},
{
  rank:'08', key:'terror', slug:'terrorist-attacks', name:'Terrorist Attacks', toll:'2,977', event:'September 11, 2001',
  intro:"Terrorism kills far fewer people than disease or weather, yet it reshapes nations through fear. The attacks of September 11, 2001 killed 2,977 people and changed security, travel, and policy for a generation.",
  lead:"Terrorism is the disaster whose damage is measured less in casualties than in the fear and policy it leaves behind.",
  stats:[['2,977','September 11, 2001','#cc2200'],['4','Aircraft hijacked','#f0ece4'],['102min','Towers stood after impact','#f0ece4'],['$2T+','War-on-terror cost (est.)','#d4930a']],
  sections:[
    {h2:"A disaster measured in more than deaths",p:["By raw toll, terrorism ranks below almost every other category on this list. Its power is psychological and political: a single coordinated attack can rewrite laws, economies, and the texture of daily life.","The 9/11 attacks remain the deadliest in modern history and the benchmark against which security is still designed. The threat has since fragmented — from organized cells to lone actors, and increasingly toward infrastructure rather than crowds."]},
    {h2:"Personal safety without paranoia",p:["The individual defense against terrorism isn't fear; it's awareness. Knowing the exits in any crowded venue, trusting instincts about what's out of place, and basic trauma first-aid do more good than worry ever will.","Stop-the-bleed training and a simple trauma kit have saved lives in mass-casualty events long before professional help could arrive."]},
    {h2:"Readiness that transfers",p:["The good news is that preparing for terrorism overlaps almost entirely with preparing for any sudden emergency: a way to communicate, a reunification plan, basic first aid, and the calm that comes from having thought it through in advance.","None of that capability is wasted — it works just as well for a car crash or a natural disaster as for an attack."]}
  ],
  quote:["If you see something, say something.","Public-safety campaign"],
  pnwTitle:"PNW Focus · Soft targets & infrastructure",
  pnwBody:["Portland's events, transit, and public spaces are the same kinds of “soft targets” found in any city, and the region's bridges, ports, and power infrastructure are part of the broader security picture.","The practical takeaway is all-hazards: situational awareness in crowds, a family communication plan, and trauma first-aid skills that work for any sudden injury — from an attack, an accident, or a natural disaster."],
  gear:[['Top Pick','Trauma Kit (IFAK)','Bleeding control for the first minutes.'],['Essential','Tourniquet','A trained, proven life-saver.'],['Best Value','Emergency Comms','A way to reach family when lines jam.'],['Overlooked','Personal First Aid','Everyday carry for everyday injuries.']],
  checklist:["Note exits in crowded venues","Stop-the-Bleed basics learned","A trauma kit kept accessible","A family communication plan","An out-of-area contact set","Trust — and act on — instincts"]
},
{
  rank:'09', key:'wildfire', slug:'wildfires', name:'Wildfires', toll:'1,200', event:'Peshtigo Fire, 1871',
  intro:"The deadliest wildfire in American history isn't one most people have heard of. The 1871 Peshtigo Fire killed as many as 1,200 people in a single night — and a warming climate is making the modern fire season longer and fiercer.",
  lead:"Fire is the disaster that now arrives every year, and its smoke reaches far beyond the flames.",
  stats:[['1,200','Peshtigo Fire, 1871','#cc2200'],['2,000°F','Peak flame temperatures','#f0ece4'],['Mph','Wind-driven spread','#f0ece4'],['PM2.5','The smoke health threat','#d4930a']],
  sections:[
    {h2:"Fire moves faster than you think",p:["A wind-driven wildfire can advance faster than a person can run and throw embers a mile ahead of the flame front, starting new fires behind the defenders. The Peshtigo Fire generated its own firestorm, and the 2018 Camp Fire destroyed the town of Paradise, California in a few hours.","The lethal trap is waiting too long: roads choke, visibility drops, and an orderly evacuation becomes gridlock."]},
    {h2:"Smoke is a disaster of its own",p:["You don't have to be near the flames to be harmed. Wildfire smoke carries fine PM2.5 particles deep into the lungs and can blanket cities hundreds of miles away for weeks, as the Pacific Northwest has learned firsthand.","For the elderly, the young, and anyone with heart or lung conditions, smoke is often the deadliest part of fire season. A clean-air room with a good filter is now standard preparedness gear in the West."]},
    {h2:"Defending home and lungs",p:["Harden your home by clearing the defensible space immediately around it, screening vents against wind-blown embers, and keeping a go-bag ready throughout fire season.","For smoke, a HEPA purifier and well-fitted masks protect the people who can't simply leave — and a real-time air-quality alert tells you when to use them."]}
  ],
  quote:["When you're ready to go, it's already late. Leave early.","Wildfire evacuation rule"],
  pnwTitle:"PNW Focus · The new fire reality",
  pnwBody:["The 2020 Labor Day fires burned over a million acres in Oregon and gave Portland the worst air quality on Earth for days. What was once an occasional hazard is now an annual one across the region.","Even far from any fire line, plan for smoke every late summer and fall: a clean-air room, a HEPA filter, a supply of N95s, and a way to track the air-quality index in real time."],
  gear:[['Top Pick','N95 / P100 Masks','Filter the smoke that gets indoors.'],['Essential','HEPA Air Purifier','Builds a clean-air room at home.'],['Best Value','Fire Blanket','Smothers small fires before they grow.'],['Overlooked','Evacuation Go-Bag','Ready to grab the moment you go.']],
  checklist:["Defensible space cleared","Embers blocked from vents","Go-bag ready in fire season","A clean-air room set up","AQI alerts enabled","Two evacuation routes known"]
},
{
  rank:'10', key:'cyber', slug:'cyber-attacks', name:'Cyber Attacks', toll:'$10.5T', event:'Projected annual cost, 2025',
  intro:"The only disaster on this list with no body count — yet. Cybercrime is projected to cost the world $10.5 trillion a year, and attacks on hospitals, grids, and water systems are turning digital threats into physical danger.",
  lead:"It is the only catastrophe on this list you can't see, can't hear, and increasingly can't avoid.",
  stats:[['$10.5T','Projected annual cost, 2025','#cc2200'],['#1','Fastest-growing crime','#f0ece4'],['$4.9M','Avg. data-breach cost','#f0ece4'],['Critical','Infrastructure now targeted','#d4930a']],
  sections:[
    {h2:"When code becomes a physical threat",p:["For years a cyberattack meant stolen data and a ransom payment. That is changing. Ransomware has shut down hospitals and forced ambulances to divert; attacks on pipelines, power grids, and water treatment plants show how a keyboard can now cause real-world harm.","The projected cost — over ten trillion dollars a year — would rank cybercrime as the world's third-largest economy if it were a country."]},
    {h2:"Your household is a target too",p:["You don't have to be a corporation to be hit. Phishing, account takeovers, and ransomware reach individuals through the same email and devices they use every day.","The defenses are boring and effective: unique passwords, multi-factor authentication, and backups. A single reused password is the digital equivalent of one key for your house, car, and bank."]},
    {h2:"The five-minute hardening",p:["Most personal cyber risk disappears with a few habits: a password manager, app- or hardware-based two-factor authentication, automatic backups of irreplaceable files, and a healthy suspicion of urgent messages.","None of it is glamorous; all of it works — and most of it can be set up in an afternoon."]}
  ],
  quote:["There are two kinds of organizations: those that have been breached, and those that don't know it yet.","Information-security adage"],
  pnwTitle:"PNW Focus · Grid & infrastructure",
  pnwBody:["The Northwest's power, water, and port systems depend on networked control systems like everywhere else, and the region's prominence in technology makes it a target-rich environment for attackers.","For households, a long-duration utility outage is the realistic crossover risk — the same two-week readiness you would stage for a quake also covers a grid disrupted by an attack."],
  gear:[['Top Pick','Password Manager','Unique credentials, remembered for you.'],['Essential','Hardware Security Key','Phishing-proof two-factor login.'],['Best Value','Encrypted Backup Drive','Ransomware can’t hold what you’ve copied.'],['Overlooked','Identity Monitoring','Early warning when data leaks.']],
  checklist:["Unique passwords everywhere","Two-factor on key accounts","Automatic encrypted backups","Software kept up to date","Phishing awareness practiced","Offline copies of key documents"]
}
];

// ---------- SHARED PARTS ----------
const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;0,900;1,600&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">';

const STYLE = `<style>
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;background:#141414;}
  body{font-family:Inter,system-ui,sans-serif;color:#f0ece4;-webkit-font-smoothing:antialiased;background-color:#1a1a1a;background-image:url('assets/topo.svg');background-size:cover;background-position:center;background-attachment:fixed;}
  a{text-decoration:none;color:inherit;}
  ::selection{background:#cc2200;color:#f0ece4;}
  @keyframes alertpulse{0%,100%{opacity:1;}50%{opacity:.35;}}
  .btn{cursor:pointer;font-family:Inter,sans-serif;transition:background .15s,border-color .15s,color .15s;}
  .btn-amber:hover{background:#e8a519;}
  .btn-outline:hover{background:#d4930a;color:#1a1a1a;}
  .tab{transition:color .15s,background .15s;}
  .tab:hover{color:#f0ece4;}
  .navlink:hover{color:#f0ece4;}
  .scard{transition:border-color .2s;}
  .scard:hover{border-color:#3a3a3a;}
  .ph{background:linear-gradient(135deg,#242424,#171717);display:flex;align-items:center;justify-content:center;text-align:center;color:#6c665b;font-size:10.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:8px;}
  .dd{position:relative;display:inline-block;}
  .dd-menu{position:absolute;top:100%;left:0;background:#101010;border:1px solid #2a2a2a;border-radius:5px;padding:6px 0;min-width:240px;display:none;z-index:400;box-shadow:0 16px 40px rgba(0,0,0,.55);}
  .dd-right .dd-menu{left:auto;right:0;}
  .dd:hover .dd-menu{display:block;}
  .dd-menu a{display:flex;align-items:center;gap:11px;padding:9px 16px;font-size:13px;font-weight:600;color:#b8b2a7;white-space:nowrap;}
  .dd-menu a .r{font-family:'Playfair Display',serif;font-weight:800;color:#6c665b;min-width:18px;font-size:13px;}
  .dd-menu a:hover{background:#1a1a1a;color:#d4930a;}
  .dd-menu a:hover .r{color:#d4930a;}
  .dd-menu a.active{color:#d4930a;}
  .dd-menu a.active .r{color:#d4930a;}
</style>`;

function menuItems(activeSlug){
  return D.map(d=>`<a class="${d.slug===activeSlug?'active':''}" href="${d.slug}.html"><span class="r">${d.rank}</span>${d.name}</a>`).join('');
}

// top chrome: Pillar Pages is a dropdown
function chrome(activeSlug){
  return `<div style="position:sticky;top:0;z-index:200;background:#101010;border-bottom:1px solid #2a2a2a;">
  <div style="max-width:1280px;margin:0 auto;padding:0 28px;height:60px;display:flex;align-items:center;justify-content:space-between;gap:24px;">
    <a href="index.html" style="display:flex;align-items:center;gap:11px;">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3L22 20H2L12 3Z" stroke="#cc2200" stroke-width="2" stroke-linejoin="round"/><path d="M12 10V14" stroke="#cc2200" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17" r="1" fill="#cc2200"/></svg>
      <div style="display:flex;align-items:baseline;gap:7px;font-family:'Playfair Display',serif;">
        <span style="font-size:21px;font-weight:900;color:#d4930a;line-height:1;">10</span>
        <span style="font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#f0ece4;font-family:Inter,sans-serif;">Deadliest Disasters</span>
      </div>
    </a>
    <div style="display:flex;align-items:center;gap:4px;font-size:12.5px;font-weight:600;">
      <a class="tab" href="index.html" style="padding:9px 13px;border-radius:3px;color:#8c867b;">Homepage</a>
      <div class="dd"><a class="tab" href="${activeSlug}.html" style="padding:9px 13px;border-radius:3px;color:#1a1a1a;background:#d4930a;">Disasters ▾</a><div class="dd-menu">${menuItems(activeSlug)}</div></div>
      <a class="tab" href="go-bag.html" style="padding:9px 13px;border-radius:3px;color:#8c867b;">Article</a>
      <a class="tab" href="pnw.html" style="padding:9px 13px;border-radius:3px;color:#8c867b;">PNW Focus</a>
      <span style="width:1px;height:20px;background:#2a2a2a;margin:0 8px;"></span>
      <a class="tab" href="about.html" style="padding:9px 13px;border-radius:3px;color:#8c867b;">About</a>
    </div>
  </div>
</div>`;
}

// masthead: Disasters is a dropdown (active)
function masthead(activeSlug){
  return `<header style="background:#141414;border-bottom:1px solid #242424;">
    <div style="max-width:1180px;margin:0 auto;padding:18px 28px;display:flex;align-items:center;justify-content:space-between;">
      <a href="index.html" style="display:flex;align-items:baseline;gap:9px;font-family:'Playfair Display',serif;">
        <span style="font-size:30px;font-weight:900;color:#d4930a;line-height:1;">10</span>
        <span style="font-size:15px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;font-family:Inter,sans-serif;">Deadliest&nbsp;Disasters</span>
      </a>
      <nav style="display:flex;gap:30px;font-size:13px;font-weight:600;color:#b8b2a7;align-items:center;">
        <a class="navlink" href="go-bag.html">Preparedness</a><a class="navlink" href="pnw.html">PNW Focus</a><a class="navlink" href="gear.html">Gear</a><a class="navlink" href="about.html">About</a>
      </nav>
    </div>
  </header>`;
}

function relatedCards(d){
  const i = D.indexOf(d);
  const a = D[(i+1)%D.length];
  const b = D[(i+2)%D.length];
  const cards = [
    {tag:'Disaster #'+a.rank, title:a.name, href:a.slug+'.html', label:a.name},
    {tag:'Disaster #'+b.rank, title:b.name, href:b.slug+'.html', label:b.name},
    {tag:'Preparedness', title:'Building the Perfect Go-Bag', href:'go-bag.html', label:'Go-bag flatlay'}
  ];
  return cards.map(c=>`      <a class="scard" href="${c.href}" style="background:#1f1f1f;border:1px solid #2c2c2c;border-radius:4px;overflow:hidden;cursor:pointer;display:block;">
        <div class="ph" style="width:100%;height:160px;">${c.label}</div>
        <div style="padding:20px;"><div style="font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#d4930a;margin-bottom:10px;">${c.tag}</div><h3 style="font-family:'Playfair Display',serif;font-size:19px;font-weight:700;margin:0;line-height:1.25;">${c.title}</h3></div>
      </a>`).join('\n');
}

function page(d){
  const hero = d.hero || `assets/cat/${d.key}.jpg`;
  const stats = d.stats.map((s,idx)=>`      <div style="padding:28px 20px;${idx<3?'border-right:1px solid #242424;':''}"><div style="font-family:'Playfair Display',serif;font-size:34px;font-weight:800;color:${s[2]};line-height:1;">${s[0]}</div><div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#8c867b;margin-top:8px;">${s[1]}</div></div>`).join('\n');

  // article body: lead, s1, quote, s2, pnw callout, s3
  const sec = (s)=>`        <h2 style="font-family:'Playfair Display',serif;font-size:30px;font-weight:700;color:#f0ece4;margin:44px 0 18px;line-height:1.15;">${s.h2}</h2>\n`+s.p.map(t=>`        <p style="margin:0 0 24px;">${t}</p>`).join('\n');
  const quote = `        <div style="border-left:3px solid #d4930a;padding:4px 0 4px 24px;margin:32px 0;"><p style="font-family:'Playfair Display',serif;font-style:italic;font-size:24px;line-height:1.4;color:#f0ece4;margin:0;">“${d.quote[0]}”</p><div style="font-size:13px;color:#8c867b;margin-top:12px;letter-spacing:.04em;">— ${d.quote[1]}</div></div>`;
  const pnw = `        <div style="background:#1c0d09;border:1px solid #5a1c0c;border-radius:5px;padding:32px 34px;margin:40px 0;">
          <div style="display:inline-flex;align-items:center;gap:9px;margin-bottom:16px;"><span style="width:7px;height:7px;border-radius:50%;background:#cc2200;animation:alertpulse 1.8s infinite;"></span><span style="font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#ff6a4a;">PNW Focus</span></div>
          <h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:#f0ece4;margin:0 0 14px;line-height:1.15;">${d.pnwTitle.replace('PNW Focus · ','')}</h3>
${d.pnwBody.map(t=>`          <p style="font-size:16px;line-height:1.65;color:#d8c9bf;margin:0 0 16px;">${t}</p>`).join('\n')}
        </div>`;

  const article = [
    `        <p style="font-size:21px;line-height:1.65;color:#f0ece4;font-weight:400;margin:0 0 28px;">${d.lead}</p>`,
    sec(d.sections[0]),
    quote,
    sec(d.sections[1]),
    pnw,
    sec(d.sections[2])
  ].join('\n');

  const onthis = d.sections.map((s,idx)=>`<span style="${idx===0?'color:#f0ece4;border-left:2px solid #d4930a;padding-left:12px;':'padding-left:14px;'}">${s.h2}</span>`).join('');

  const checklist = d.checklist.map(c=>`            <label style="display:flex;align-items:flex-start;gap:12px;padding:11px 0;border-bottom:1px solid #2a2a2a;cursor:pointer;"><span style="width:18px;height:18px;border:1.5px solid #4a4a4a;border-radius:3px;flex-shrink:0;margin-top:1px;"></span><span style="font-size:13.5px;line-height:1.4;color:#cfc9bd;">${c}</span></label>`).join('\n');

  const gear = d.gear.map(g=>`        <div class="scard" style="background:#1f1f1f;border:1px solid #2c2c2c;border-radius:4px;overflow:hidden;display:flex;flex-direction:column;">
          <div class="ph" style="width:100%;height:130px;">${g[1]}</div>
          <div style="padding:18px;display:flex;flex-direction:column;flex:1;">
            <div style="font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#d4930a;margin-bottom:8px;">${g[0]}</div>
            <h3 style="font-family:'Playfair Display',serif;font-size:17px;font-weight:700;margin:0 0 8px;line-height:1.2;">${g[1]}</h3>
            <p style="font-size:12.5px;color:#9a948a;line-height:1.5;margin:0 0 16px;flex:1;">${g[2]}</p>
            <a href="gear.html" class="btn btn-outline" style="display:block;text-align:center;width:100%;background:transparent;border:1px solid #d4930a;color:#d4930a;padding:10px;font-size:12.5px;font-weight:700;border-radius:3px;">Check Price →</a>
          </div>
        </div>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${d.name} — The Deadliest Disasters | 10 Deadliest Disasters</title>
<meta name="description" content="${d.intro.replace(/"/g,'&quot;').slice(0,155)}">
${FONTS}
${STYLE}
</head>
<body>

${chrome(d.slug)}

<div>

  ${masthead(d.slug)}

  <!-- PILLAR HERO -->
  <section style="position:relative;height:520px;overflow:hidden;background:#0c0c0c;">
    <img src="${hero}" alt="${d.name}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(12,12,12,.5),rgba(12,12,12,.94));"></div>
    <div style="position:relative;max-width:1000px;margin:0 auto;height:100%;padding:0 28px;display:flex;flex-direction:column;justify-content:flex-end;padding-bottom:50px;">
      <div style="font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#d4930a;margin-bottom:18px;display:flex;align-items:center;gap:10px;"><span style="color:#5c574d;">Ranked #${d.rank}</span><span style="width:24px;height:1px;background:#5c574d;"></span> The Deadliest Disasters</div>
      <h1 style="font-family:'Playfair Display',serif;font-weight:800;font-size:74px;line-height:1;margin:0 0 22px;letter-spacing:-.02em;">${d.name}</h1>
      <p style="font-size:19px;line-height:1.55;color:#cfc9bd;max-width:680px;margin:0;">${d.intro}</p>
    </div>
  </section>

  <!-- STAT BAR -->
  <section style="background:#141414;border-bottom:1px solid #242424;">
    <div style="max-width:1000px;margin:0 auto;padding:0 28px;display:grid;grid-template-columns:repeat(4,1fr);">
${stats}
    </div>
  </section>

  <!-- BODY: ARTICLE + SIDEBAR -->
  <section style="max-width:1100px;margin:0 auto;padding:64px 28px;display:grid;grid-template-columns:1fr 320px;gap:56px;align-items:start;">
    <article style="font-size:17.5px;line-height:1.75;color:#d8d3c8;">
${article}
    </article>

    <aside style="position:sticky;top:80px;display:flex;flex-direction:column;gap:24px;">
      <div style="background:#1f1f1f;border:1px solid #2c2c2c;border-radius:5px;overflow:hidden;">
        <div style="background:#cc2200;padding:14px 20px;display:flex;align-items:center;gap:9px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="9" stroke="#fff" stroke-width="2"/></svg><span style="font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;">Are You Prepared?</span></div>
        <div style="padding:8px 20px 18px;">
${checklist}
          <a href="pnw.html" class="btn btn-amber" style="display:block;text-align:center;width:100%;background:#d4930a;color:#1a1a1a;border:none;padding:12px;font-size:13px;font-weight:700;border-radius:3px;margin-top:16px;">Get the Full PNW Kit Guide →</a>
        </div>
      </div>
      <div style="background:#161616;border:1px solid #242424;border-radius:5px;padding:22px;">
        <div style="font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#d4930a;margin-bottom:14px;">On This Page</div>
        <div style="display:flex;flex-direction:column;gap:11px;font-size:13.5px;color:#9a948a;">${onthis}</div>
      </div>
    </aside>
  </section>

  <!-- RECOMMENDED GEAR -->
  <section style="background:#141414;border-top:1px solid #242424;">
    <div style="max-width:1100px;margin:0 auto;padding:60px 28px;">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:32px;gap:24px;flex-wrap:wrap;">
        <div><div style="font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#d4930a;margin-bottom:12px;">Editor-Tested</div><h2 style="font-family:'Playfair Display',serif;font-size:32px;font-weight:700;margin:0;">Recommended ${d.name} Gear</h2></div>
        <span style="font-size:12.5px;color:#7c766b;max-width:280px;text-align:right;">Affiliate links. We may earn a commission at no cost to you.</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px;">
${gear}
      </div>
    </div>
  </section>

  <!-- RELATED -->
  <section style="max-width:1100px;margin:0 auto;padding:60px 28px 72px;">
    <h2 style="font-family:'Playfair Display',serif;font-size:28px;font-weight:700;margin:0 0 28px;">Related Reading</h2>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;">
${relatedCards(d)}
    </div>
  </section>

</div>
</body>
</html>
`;
}

D.forEach(d=>{
  fs.writeFileSync(path.join(OUT, d.slug+'.html'), page(d));
  console.log('wrote', d.slug+'.html');
});
console.log('done:', D.length, 'pillar pages');
