export interface Battle {
  id: string;
  name: string;
  emoji: string;
  lat: number;
  lng: number;
  startDate: string;
  endDate: string;
  timelineStep: number;
  front: 'western' | 'eastern' | 'other';
  allies: string;
  central: string;
  narrative: string;
  casualties: string;
  result: string;
}

export interface TimelinePeriod {
  step: number;
  year: string;
  label: string;
  description: string;
  frontKey: string;
}

export type LatLng = [number, number];

// ── TIMELINE ──────────────────────────────────────────────────────────────────
export const timelinePeriods: TimelinePeriod[] = [
  {
    step: 0,
    year: 'Jun–Jul 1914',
    label: 'The Spark',
    description: 'Archduke Franz Ferdinand is assassinated in Sarajevo. Within weeks, the alliance system drags all of Europe into war.',
    frontKey: 'none',
  },
  {
    step: 1,
    year: 'Aug–Sep 1914',
    label: 'War Erupts',
    description: "Germany invades Belgium, bringing Britain into the war. The Schlieffen Plan fails at the Marne. Russia's invasion of East Prussia is crushed at Tannenberg.",
    frontKey: 'forming',
  },
  {
    step: 2,
    year: 'Late 1914',
    label: 'Race to the Sea',
    description: 'Both sides try to outflank each other northward. By December, 700 km of trenches stretch from the English Channel to the Swiss border.',
    frontKey: '1914',
  },
  {
    step: 3,
    year: '1915',
    label: 'Stalemate',
    description: 'Poison gas debuts at Ypres. The Gallipoli campaign ends in Allied withdrawal. Italy switches sides and joins the Allies. The war of attrition grinds on.',
    frontKey: '1914',
  },
  {
    step: 4,
    year: '1916',
    label: 'Year of Blood',
    description: 'Verdun (303 days) and the Somme (5 months) kill over 2 million men between them — with almost no territorial change.',
    frontKey: '1915-16',
  },
  {
    step: 5,
    year: '1917',
    label: 'Turning Points',
    description: 'America enters the war. Russia collapses and signs an armistice. Passchendaele costs 310,000 casualties for 8 km. The tide is slowly turning.',
    frontKey: '1917',
  },
  {
    step: 6,
    year: 'Spring 1918',
    label: "Germany's Last Gamble",
    description: "Germany's Spring Offensive shatters Allied lines. German troops reach the Marne — 90 km from Paris. It is the deepest advance since 1914.",
    frontKey: '1918-spring',
  },
  {
    step: 7,
    year: 'Autumn 1918',
    label: 'The 100 Days',
    description: 'The Allies launch the 100 Days Offensive. Germany retreats along the entire front. On 11 November 1918, at the 11th hour, the guns fall silent.',
    frontKey: '1918-autumn',
  },
];

// ── WESTERN FRONT LINES ────────────────────────────────────────────────────────
// Coordinates run south (Swiss border) → north (Channel coast)
export const westernFrontLines: Record<string, LatLng[]> = {
  none: [],

  // German advance before line stabilised — line tilted, closer to Paris
  forming: [
    [47.54, 7.14],
    [48.10, 6.65],
    [48.69, 5.95],
    [49.16, 5.39],
    [48.80, 3.70], // German advance close to Paris
    [49.00, 3.00],
    [49.40, 2.80],
    [49.70, 2.60],
    [50.00, 2.55],
    [50.28, 2.65],
    [50.60, 2.75],
    [50.85, 2.88],
    [51.13, 2.77],
  ],

  // December 1914 — stabilised trench lines
  '1914': [
    [47.54, 7.14],
    [48.10, 6.65],
    [48.89, 5.54],
    [49.16, 5.39],
    [49.26, 4.03],
    [49.40, 3.45],
    [49.78, 3.25],
    [50.00, 2.90],
    [50.28, 2.77],
    [50.45, 2.80],
    [50.69, 2.87],
    [50.85, 2.88],
    [51.13, 2.77],
  ],

  // 1915–16 — minimal change despite massive battles
  '1915-16': [
    [47.54, 7.14],
    [48.10, 6.65],
    [48.89, 5.54],
    [49.16, 5.39],
    [49.25, 4.05],
    [49.38, 3.33],
    [49.80, 3.10],
    [50.00, 2.65],
    [50.20, 2.73],
    [50.45, 2.75],
    [50.69, 2.87],
    [50.85, 2.88],
    [51.13, 2.77],
  ],

  // 1917 — Germans retreat to Hindenburg Line (shorter, stronger)
  '1917': [
    [47.54, 7.14],
    [48.10, 6.65],
    [48.89, 5.54],
    [49.16, 5.39],
    [49.25, 4.00],
    [49.40, 3.20],
    [49.65, 3.10],
    [49.90, 2.90],
    [50.15, 2.77],
    [50.45, 2.75],
    [50.69, 2.87],
    [50.85, 2.88],
    [51.13, 2.77],
  ],

  // Spring 1918 — German Spring Offensive pushes far west
  '1918-spring': [
    [47.54, 7.14],
    [48.10, 6.65],
    [48.89, 5.54],
    [49.16, 5.39],
    [49.08, 3.80], // Chemin des Dames breakthrough
    [49.05, 3.40],
    [49.40, 2.90],
    [49.65, 2.45], // Montdidier — threatening Amiens
    [49.85, 2.10], // Near Amiens!
    [50.10, 2.20],
    [50.40, 2.60],
    [50.55, 2.70],
    [50.69, 2.87],
    [50.85, 2.88],
    [51.20, 2.77],
  ],

  // Autumn 1918 — Allied 100 Days push Germans back east
  '1918-autumn': [
    [47.54, 7.14],
    [48.40, 7.40],
    [49.10, 6.50],
    [49.40, 5.50],
    [49.70, 5.30],
    [49.88, 5.00],
    [50.15, 4.70],
    [50.45, 4.40],
    [50.63, 4.35],
    [51.05, 3.72],
    [51.23, 3.22],
    [51.30, 2.90],
  ],
};

// ── EASTERN FRONT LINES ────────────────────────────────────────────────────────
export const easternFrontLines: Record<string, LatLng[]> = {
  none: [],
  forming: [],

  // 1914-1916 — eastern front (relatively stable after initial moves)
  '1914': [
    [56.95, 24.11], // Riga
    [55.90, 26.55],
    [54.60, 25.20],
    [53.10, 24.40],
    [52.10, 23.70], // Brest-Litovsk
    [51.20, 24.70],
    [50.00, 25.30],
    [49.55, 25.60], // Tarnopol
    [48.30, 25.94], // Czernowitz
    [47.20, 27.00], // Romanian border
  ],

  '1915-16': [
    [56.95, 24.11],
    [55.90, 26.55],
    [54.60, 25.20],
    [53.10, 24.40],
    [52.10, 23.70],
    [51.20, 24.70],
    [50.00, 25.30],
    [49.55, 25.60],
    [48.30, 25.94],
    [47.20, 27.00],
  ],

  // 1917 — Russia weakening, line moves east
  '1917': [
    [57.50, 25.00],
    [56.50, 26.80],
    [55.20, 26.90],
    [53.90, 27.60],
    [52.50, 26.80],
    [51.50, 28.70],
    [50.40, 28.30],
    [49.00, 29.50],
    [47.90, 29.90],
  ],

  // Spring/Autumn 1918 — Brest-Litovsk: Russia out, Germany occupies vast territory
  '1918-spring': [],
  '1918-autumn': [],
};

// ── BATTLES ────────────────────────────────────────────────────────────────────
export const battles: Battle[] = [
  {
    id: 'marne-1914',
    name: 'First Battle of the Marne',
    emoji: '⚔️',
    lat: 48.87,
    lng: 3.53,
    startDate: '5 Sep 1914',
    endDate: '12 Sep 1914',
    timelineStep: 1,
    front: 'western',
    allies: 'France · Britain',
    central: 'Germany',
    narrative: 'The German advance on Paris was halted at the Marne River. Paris taxis famously rushed 6,000 reserve troops to the front. This miracle stopped the Schlieffen Plan and transformed the war into a long siege — the trenches followed within weeks.',
    casualties: '~500,000 on both sides',
    result: 'Allied victory — Paris saved',
  },
  {
    id: 'tannenberg-1914',
    name: 'Battle of Tannenberg',
    emoji: '🎖️',
    lat: 53.47,
    lng: 20.08,
    startDate: '26 Aug 1914',
    endDate: '30 Aug 1914',
    timelineStep: 1,
    front: 'eastern',
    allies: 'Russia',
    central: 'Germany',
    narrative: "Germany destroyed the entire Russian 2nd Army in just five days, capturing 92,000 prisoners. Generals Hindenburg and Ludendorff became national heroes overnight. Russia's catastrophic defeat exposed the weakness that would ultimately lead to revolution in 1917.",
    casualties: '170,000 Russian · 12,000 German',
    result: 'German victory',
  },
  {
    id: 'ypres-1914',
    name: 'First Battle of Ypres',
    emoji: '🪖',
    lat: 50.85,
    lng: 2.88,
    startDate: '19 Oct 1914',
    endDate: '22 Nov 1914',
    timelineStep: 2,
    front: 'western',
    allies: 'Britain · France · Belgium',
    central: 'Germany',
    narrative: 'The British Expeditionary Force held Ypres against overwhelming odds. By November, 90% of the original BEF had been killed or wounded. Ypres would be fought over three more times — it became the defining city of British WW1 memory.',
    casualties: '~300,000 total',
    result: 'Allied victory — Ypres held',
  },
  {
    id: 'ypres-1915',
    name: 'Second Battle of Ypres',
    emoji: '☠️',
    lat: 50.86,
    lng: 2.92,
    startDate: '22 Apr 1915',
    endDate: '25 May 1915',
    timelineStep: 3,
    front: 'western',
    allies: 'Britain · France · Canada',
    central: 'Germany',
    narrative: 'Germany released 168 tonnes of chlorine gas — the first large-scale use of chemical warfare. A yellow-green cloud drifted toward Allied lines. Canadian troops improvised gas masks from urine-soaked cloths. This single act changed the nature of warfare forever.',
    casualties: '~105,000 Allied · ~35,000 German',
    result: 'German tactical gain',
  },
  {
    id: 'gallipoli',
    name: 'Gallipoli Campaign',
    emoji: '🚢',
    lat: 40.14,
    lng: 26.41,
    startDate: '25 Apr 1915',
    endDate: '9 Jan 1916',
    timelineStep: 3,
    front: 'other',
    allies: 'Britain · France · ANZAC',
    central: 'Ottoman Empire',
    narrative: "Churchill's bold plan to knock Turkey out of the war and supply Russia ended in disaster. ANZAC troops landed at dawn on 25 April 1915, fighting uphill against Ottoman defenders under Mustafa Kemal. After 8 months and 250,000 casualties, the Allies withdrew in darkness — having gained nothing.",
    casualties: '~250,000 Allied · ~175,000 Ottoman',
    result: 'Ottoman victory — Allied withdrawal',
  },
  {
    id: 'verdun',
    name: 'Battle of Verdun',
    emoji: '💀',
    lat: 49.16,
    lng: 5.39,
    startDate: '21 Feb 1916',
    endDate: '18 Dec 1916',
    timelineStep: 4,
    front: 'western',
    allies: 'France',
    central: 'Germany',
    narrative: "Germany's plan was to 'bleed France white.' At 303 days, it became the longest battle in history. The Sacred Way — a single road — kept French supplies flowing. Every French family was touched by Verdun. The forts exchanged hands 16 times. France held, but at a cost that scarred a nation.",
    casualties: '~700,000 total',
    result: 'French victory — line held',
  },
  {
    id: 'somme',
    name: 'Battle of the Somme',
    emoji: '🩸',
    lat: 50.00,
    lng: 2.70,
    startDate: '1 Jul 1916',
    endDate: '18 Nov 1916',
    timelineStep: 4,
    front: 'western',
    allies: 'Britain · France',
    central: 'Germany',
    narrative: '57,470 British soldiers were killed or wounded on the first day alone — 1 July 1916 remains the worst day in British military history. Tanks were used in battle for the first time. After five months of fighting, the Allies had advanced just 10 km.',
    casualties: '~1.2 million total',
    result: 'Inconclusive — minimal Allied gains',
  },
  {
    id: 'jutland',
    name: 'Battle of Jutland',
    emoji: '⚓',
    lat: 56.92,
    lng: 6.10,
    startDate: '31 May 1916',
    endDate: '1 Jun 1916',
    timelineStep: 4,
    front: 'other',
    allies: 'Britain (Royal Navy)',
    central: 'Germany (High Seas Fleet)',
    narrative: 'The only major naval battle of WW1 — 250 ships and 100,000 men clashed in the North Sea. Britain lost more ships, but the German fleet never ventured out in force again. As one journalist wrote: "The German fleet has assaulted its jailer, but it is still in jail."',
    casualties: '6,000+ British · 2,500 German',
    result: 'Strategic British victory',
  },
  {
    id: 'passchendaele',
    name: 'Battle of Passchendaele',
    emoji: '🌧️',
    lat: 50.90,
    lng: 3.01,
    startDate: '31 Jul 1917',
    endDate: '10 Nov 1917',
    timelineStep: 5,
    front: 'western',
    allies: 'Britain · Canada · Australia · NZ',
    central: 'Germany',
    narrative: 'Three months of fighting in the worst mud in history. Relentless rain and shelled drainage turned the battlefield into a swamp. Men and horses drowned in shell craters. 310,000 casualties for a gain of 8 km. Field Marshal Haig reportedly wept when he visited the battlefield afterwards.',
    casualties: '~310,000 Allied · ~260,000 German',
    result: 'Allied pyrrhic victory',
  },
  {
    id: 'caporetto',
    name: 'Battle of Caporetto',
    emoji: '⛰️',
    lat: 46.24,
    lng: 13.58,
    startDate: '24 Oct 1917',
    endDate: '19 Nov 1917',
    timelineStep: 5,
    front: 'other',
    allies: 'Italy',
    central: 'Germany · Austria-Hungary',
    narrative: "Using new stormtrooper infiltration tactics, German and Austro-Hungarian forces destroyed the Italian Army. 300,000 Italians surrendered in a single day. The Italian front collapsed. Hemingway set 'A Farewell to Arms' in its aftermath. Caporetto became synonymous with catastrophic military failure.",
    casualties: '~700,000 Italian (inc. prisoners)',
    result: 'Central Powers victory',
  },
  {
    id: 'spring-offensive',
    name: 'German Spring Offensive',
    emoji: '💥',
    lat: 50.10,
    lng: 2.78,
    startDate: '21 Mar 1918',
    endDate: '18 Jul 1918',
    timelineStep: 6,
    front: 'western',
    allies: 'Britain · France',
    central: 'Germany',
    narrative: "Operation Michael — Germany's last gamble. Stormtrooper tactics broke through British lines in hours, advancing 65 km in days — more than any army had moved on the Western Front in 3 years. Paris was shelled by the 'Paris Gun.' But Germany had no reserves to exploit the breakthrough.",
    casualties: '~350,000 per side',
    result: 'Initial German success — then stalled',
  },
  {
    id: 'amiens',
    name: 'Battle of Amiens',
    emoji: '🏆',
    lat: 49.90,
    lng: 2.30,
    startDate: '8 Aug 1918',
    endDate: '12 Aug 1918',
    timelineStep: 7,
    front: 'western',
    allies: 'Britain · Canada · Australia · France',
    central: 'Germany',
    narrative: '600 tanks, massed aircraft, and infantry advanced 12 km in a single day without any preliminary bombardment. German units surrendered en masse. Ludendorff called it "the Black Day of the German Army." This launched the 100 Days Offensive. Germany signed the armistice on 11 November 1918.',
    casualties: '~45,000 Allied · ~75,000 German',
    result: 'Allied victory — the war effectively decided',
  },
];
