export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank' | 'image-match' | 'drag-match';
export type AgeGroup = '8-13' | '13-18';

export interface Question {
  id: string;
  type: QuestionType;
  difficulty: Difficulty;
  category: string;
  topicSlug?: string;
  ageGroup: AgeGroup | 'both';
  question: string;
  options?: string[];      // for multiple-choice
  answer: string;          // correct answer string
  pairs?: { left: string; right: string }[]; // for drag-match
  explanation: string;     // shown on wrong answer
  points: number;
}

export const questions: Question[] = [
  // ── CAUSES ──────────────────────────────────────────────
  {
    id: 'c1',
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'causes',
    topicSlug: 'assassination-franz-ferdinand',
    ageGroup: 'both',
    question: 'Who was assassinated on 28 June 1914, sparking World War One?',
    options: ['Kaiser Wilhelm II', 'Archduke Franz Ferdinand', 'Tsar Nicholas II', 'Winston Churchill'],
    answer: 'Archduke Franz Ferdinand',
    explanation: 'Archduke Franz Ferdinand, heir to the Austro-Hungarian throne, was shot in Sarajevo by Gavrilo Princip on 28 June 1914. This assassination triggered the July Crisis and the start of World War One.',
    points: 10,
  },
  {
    id: 'c2',
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'causes',
    topicSlug: 'assassination-franz-ferdinand',
    ageGroup: 'both',
    question: 'In which city was Archduke Franz Ferdinand assassinated?',
    options: ['Vienna', 'Belgrade', 'Sarajevo', 'Prague'],
    answer: 'Sarajevo',
    explanation: 'Franz Ferdinand was assassinated in Sarajevo, the capital of Bosnia, which had recently been annexed by Austria-Hungary. The city is now the capital of Bosnia and Herzegovina.',
    points: 10,
  },
  {
    id: 'c3',
    type: 'true-false',
    difficulty: 'easy',
    category: 'causes',
    ageGroup: 'both',
    question: 'The Triple Alliance was made up of France, Russia and Britain.',
    options: ['True', 'False'],
    answer: 'False',
    explanation: 'False! The Triple Alliance was Germany, Austria-Hungary, and Italy. France, Russia, and Britain formed the Triple Entente — the opposing alliance.',
    points: 10,
  },
  {
    id: 'c4',
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'causes',
    topicSlug: 'alliance-systems',
    ageGroup: '13-18',
    question: 'What was the name of Germany\'s pre-war strategic plan for fighting a two-front war?',
    options: ['The Hindenburg Plan', 'The Schlieffen Plan', 'The Bismarck Plan', 'The Ludendorff Plan'],
    answer: 'The Schlieffen Plan',
    explanation: 'The Schlieffen Plan (1905, revised 1914) was Germany\'s strategy to defeat France quickly in the west, then turn east to fight Russia — avoiding a prolonged two-front war. It required invading France through neutral Belgium, which brought Britain into the war.',
    points: 20,
  },
  {
    id: 'c5',
    type: 'fill-blank',
    difficulty: 'medium',
    category: 'causes',
    topicSlug: 'assassination-franz-ferdinand',
    ageGroup: '13-18',
    question: 'The assassin Gavrilo Princip was a member of a secret society connected to Serbian military intelligence called the ___.',
    options: ['Black Hand', 'Red Army', 'Iron Guard', 'Young Turks'],
    answer: 'Black Hand',
    explanation: 'The Black Hand (officially "Unification or Death") was a Serbian secret society with connections to Serbian military intelligence. Princip was connected to this organisation through Young Bosnia, a Bosnian Serb nationalist group.',
    points: 20,
  },
  {
    id: 'c6',
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'causes',
    ageGroup: '13-18',
    question: 'Which of Bismarck\'s treaties did Kaiser Wilhelm II allow to lapse in 1890, driving Russia towards France?',
    options: ['The Dual Alliance', 'The Reinsurance Treaty', 'The Triple Alliance', 'The Entente Cordiale'],
    answer: 'The Reinsurance Treaty',
    explanation: 'The Reinsurance Treaty (1887) was a secret agreement between Germany and Russia. When Kaiser Wilhelm II dismissed Bismarck in 1890 and let the treaty lapse, Russia sought alliances elsewhere — eventually forming the Franco-Russian Alliance (1894), creating the two-bloc system that made a continental war likely.',
    points: 30,
  },

  // ── BATTLES ──────────────────────────────────────────────
  {
    id: 'b1',
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'battles',
    topicSlug: 'battle-of-the-somme',
    ageGroup: 'both',
    question: 'On 1 July 1916, the first day of the Battle of the Somme, how many British soldiers were killed or wounded?',
    options: ['About 5,000', 'About 20,000', 'About 57,000', 'About 100,000'],
    answer: 'About 57,000',
    explanation: '57,470 British soldiers were killed or wounded on just the first day of the Battle of the Somme — making it the single worst day in British military history. 19,240 of those were killed.',
    points: 10,
  },
  {
    id: 'b2',
    type: 'true-false',
    difficulty: 'easy',
    category: 'battles',
    topicSlug: 'battle-of-the-somme',
    ageGroup: 'both',
    question: 'Tanks were first used in battle during the Battle of the Somme in 1916.',
    options: ['True', 'False'],
    answer: 'True',
    explanation: 'True! The first tanks — British Mark I tanks — were used in battle on 15 September 1916 during the Battle of the Somme, at the Battle of Flers-Courcelette. It was the first time armoured fighting vehicles had ever been used in combat.',
    points: 10,
  },
  {
    id: 'b3',
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'battles',
    topicSlug: 'battle-of-verdun',
    ageGroup: 'both',
    question: 'How long did the Battle of Verdun last, making it the longest battle in history?',
    options: ['30 days', '100 days', '200 days', '303 days'],
    answer: '303 days',
    explanation: 'The Battle of Verdun lasted 303 days — from 21 February to 18 December 1916. It is the longest battle in recorded history. Germany\'s aim was to "bleed France white" by causing so many casualties that France would be forced to surrender.',
    points: 10,
  },
  {
    id: 'b4',
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'battles',
    topicSlug: 'gallipoli',
    ageGroup: 'both',
    question: 'What does ANZAC stand for?',
    options: [
      'Australian and New Zealand Army Corps',
      'Allied Nations Zone of Active Combat',
      'Australian Naval and Zonal Armed Command',
      'Anglo-New Zealand Allied Corps',
    ],
    answer: 'Australian and New Zealand Army Corps',
    explanation: 'ANZAC stands for Australian and New Zealand Army Corps. The ANZACs landed at Gallipoli on 25 April 1915 — a date still commemorated as ANZAC Day, the most important national day in both Australia and New Zealand.',
    points: 10,
  },
  {
    id: 'b5',
    type: 'drag-match',
    difficulty: 'medium',
    category: 'battles',
    ageGroup: 'both',
    question: 'Match each battle to the correct year:',
    pairs: [
      { left: 'Battle of the Somme', right: '1916' },
      { left: 'Gallipoli', right: '1915' },
      { left: 'Battle of Verdun', right: '1916' },
      { left: 'Battle of Tannenberg', right: '1914' },
    ],
    answer: 'Battle of the Somme:1916|Gallipoli:1915|Battle of Verdun:1916|Battle of Tannenberg:1914',
    explanation: 'The Battle of Tannenberg (1914) was one of the first major battles of the war. Gallipoli (1915) was the Allied attempt to knock Turkey out of the war. Both Verdun and the Somme were fought in 1916 — the bloodiest year of the war.',
    points: 20,
  },
  {
    id: 'b6',
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'battles',
    topicSlug: 'gallipoli',
    ageGroup: '13-18',
    question: 'Who commanded the Ottoman defenders at Gallipoli and later became the founder of modern Turkey?',
    options: ['Sultan Mehmed V', 'Enver Pasha', 'Mustafa Kemal', 'Talaat Pasha'],
    answer: 'Mustafa Kemal',
    explanation: 'Mustafa Kemal (later known as Atatürk) commanded Ottoman forces at Gallipoli, famously ordering his troops: "I am not ordering you to attack. I am ordering you to die." His success at Gallipoli made him a national hero. He later led the Turkish War of Independence and founded the Republic of Turkey in 1923.',
    points: 20,
  },
  {
    id: 'b7',
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'battles',
    topicSlug: 'battle-of-the-somme',
    ageGroup: '13-18',
    question: 'What was the name of the battle on 8 August 1918 that Ludendorff called "the Black Day of the German Army"?',
    options: ['Battle of the Marne', 'Battle of Amiens', 'Battle of Cambrai', 'Battle of Passchendaele'],
    answer: 'Battle of Amiens',
    explanation: 'The Battle of Amiens (8 August 1918) launched the 100 Days Offensive — the final Allied campaign that won the war. Using 600+ tanks, coordinated with aircraft and infantry, Allied forces advanced 12km in one day. Ludendorff called it "the Black Day of the German Army" and told the Kaiser the war was lost.',
    points: 30,
  },

  // ── PEOPLE ──────────────────────────────────────────────
  {
    id: 'p1',
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'people',
    topicSlug: 'red-baron',
    ageGroup: 'both',
    question: 'The "Red Baron" was the nickname for which famous WW1 pilot?',
    options: ['Hermann Göring', 'Manfred von Richthofen', 'Ernst Udet', 'Oswald Boelcke'],
    answer: 'Manfred von Richthofen',
    explanation: 'Manfred von Richthofen — the "Red Baron" — was the top-scoring ace of WW1 with 80 confirmed aerial victories. He painted his plane red so enemies would recognise him. He was killed on 21 April 1918, aged 25.',
    points: 10,
  },
  {
    id: 'p2',
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'people',
    topicSlug: 'red-baron',
    ageGroup: 'both',
    question: 'How many aerial victories did the Red Baron achieve — the most of any pilot in WW1?',
    options: ['40', '60', '80', '100'],
    answer: '80',
    explanation: 'The Red Baron achieved 80 confirmed aerial victories — the highest of any pilot on either side in WW1. He was so respected that even his enemies, the Royal Flying Corps, gave him a full military funeral when he was shot down.',
    points: 10,
  },
  {
    id: 'p3',
    type: 'true-false',
    difficulty: 'easy',
    category: 'people',
    topicSlug: 'sergeant-stubby',
    ageGroup: 'both',
    question: 'Sergeant Stubby was a dog who served in WW1 and could detect poison gas.',
    options: ['True', 'False'],
    answer: 'True',
    explanation: 'True! Sergeant Stubby was a bull terrier mix who served with the 102nd Infantry of the US Army. He could smell mustard gas before human alarm systems detected it, giving soldiers crucial extra warning time. He is still the most decorated war dog in American history.',
    points: 10,
  },
  {
    id: 'p4',
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'people',
    topicSlug: 'war-poets',
    ageGroup: 'both',
    question: 'Which WW1 poet wrote "Dulce et Decorum Est", describing a gas attack in the trenches?',
    options: ['Rupert Brooke', 'Siegfried Sassoon', 'Wilfred Owen', 'John McCrae'],
    answer: 'Wilfred Owen',
    explanation: '"Dulce et Decorum Est" by Wilfred Owen is one of the most powerful anti-war poems ever written. It describes a gas attack in horrifying detail and ends by calling the idea of dying gloriously for your country "the old Lie." Owen was killed in battle just one week before the armistice in 1918.',
    points: 20,
  },
  {
    id: 'p5',
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'people',
    topicSlug: 'war-poets',
    ageGroup: 'both',
    question: 'Which Canadian doctor wrote "In Flanders Fields" — the poem that inspired the wearing of red poppies?',
    options: ['Wilfred Owen', 'John McCrae', 'Siegfried Sassoon', 'Rupert Brooke'],
    answer: 'John McCrae',
    explanation: '"In Flanders Fields" was written by Canadian Lieutenant Colonel John McCrae in 1915, after attending his friend\'s funeral near Ypres. The red poppies growing over the graves inspired the poem. It led to the tradition of wearing red poppies on Remembrance Day.',
    points: 10,
  },
  {
    id: 'p6',
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'people',
    ageGroup: '13-18',
    question: 'Wilfred Owen was killed on 4 November 1918. How long before the armistice was this?',
    options: ['One month', 'Two weeks', 'One week', 'One day'],
    answer: 'One week',
    explanation: 'Wilfred Owen was killed in action on 4 November 1918 — exactly one week before the armistice on 11 November 1918. His mother received the telegram notifying her of his death on the same morning church bells rang to celebrate the end of the war.',
    points: 30,
  },

  // ── TECHNOLOGY ──────────────────────────────────────────────
  {
    id: 't1',
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'technology',
    topicSlug: 'tanks',
    ageGroup: 'both',
    question: 'Why were tanks called "tanks"?',
    options: [
      'Because they stored water',
      'Because they were shipped labelled as water tanks to keep them secret',
      'Because their inventor was called Tank',
      'Because the German word for armour is "tank"',
    ],
    answer: 'Because they were shipped labelled as water tanks to keep them secret',
    explanation: 'When the British were developing their new armoured fighting vehicles in secret, they were shipped by train labelled as "water tanks" to fool German spies. The cover story worked so well that the name "tank" stuck permanently.',
    points: 10,
  },
  {
    id: 't2',
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'technology',
    topicSlug: 'poison-gas',
    ageGroup: 'both',
    question: 'What was the first type of poison gas used in large-scale warfare in WW1?',
    options: ['Mustard gas', 'Phosgene', 'Chlorine', 'Sarin'],
    answer: 'Chlorine',
    explanation: 'Chlorine gas was first used in large-scale warfare on 22 April 1915, by Germany at the Second Battle of Ypres. It was yellow-green in colour and smelled like bleach. Although terrifying, soldiers quickly learned to use wet cloths as basic protection.',
    points: 10,
  },
  {
    id: 't3',
    type: 'true-false',
    difficulty: 'medium',
    category: 'technology',
    topicSlug: 'poison-gas',
    ageGroup: 'both',
    question: 'Mustard gas killed most of its victims quickly within minutes of exposure.',
    options: ['True', 'False'],
    answer: 'False',
    explanation: 'False! Mustard gas was not immediately lethal. It was a vesicant (blister agent) that caused terrible blisters on skin and eyes. It was actually phosgene gas that caused the most deaths — responsible for approximately 85% of all gas fatalities in WW1.',
    points: 20,
  },
  {
    id: 't4',
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'technology',
    topicSlug: 'tanks',
    ageGroup: '13-18',
    question: 'At which battle in 1917 were tanks first used in a large coordinated mass assault (476 tanks)?',
    options: ['Battle of Passchendaele', 'Battle of Cambrai', 'Battle of Arras', 'Battle of the Marne'],
    answer: 'Battle of Cambrai',
    explanation: 'The Battle of Cambrai (November 1917) was the first major massed tank assault in history, with 476 Mark IV tanks advancing on a 6-mile front. Without a preliminary artillery bombardment (preserving surprise), Allied forces advanced 8km in one day — more than months of fighting had gained elsewhere. It proved the potential of tanks in combined-arms warfare.',
    points: 20,
  },

  // ── HOME FRONT ──────────────────────────────────────────────
  {
    id: 'h1',
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'homefront',
    topicSlug: 'christmas-truce',
    ageGroup: 'both',
    question: 'In which year did the famous Christmas Truce take place?',
    options: ['1913', '1914', '1915', '1916'],
    answer: '1914',
    explanation: 'The Christmas Truce happened in December 1914 — during the very first Christmas of the war. Soldiers spontaneously left their trenches and met in No Man\'s Land. It never happened on the same scale in later years, as the war hardened attitudes on both sides.',
    points: 10,
  },
  {
    id: 'h2',
    type: 'true-false',
    difficulty: 'medium',
    category: 'homefront',
    topicSlug: 'christmas-truce',
    ageGroup: 'both',
    question: 'The Christmas Truce of 1914 was officially organised by the generals on both sides.',
    options: ['True', 'False'],
    answer: 'False',
    explanation: 'False! The Christmas Truce was completely spontaneous and unofficial. Officers on both sides were furious when they discovered it happening — fraternising with the enemy was technically mutinous. It grew from small acts of humanity: candles on parapets, carol singing across No Man\'s Land.',
    points: 20,
  },
  {
    id: 'h3',
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'homefront',
    ageGroup: '13-18',
    question: 'What was the "Voie Sacrée" (Sacred Way) during the Battle of Verdun?',
    options: [
      'A prayer said by French soldiers before battle',
      'A single road used to keep the French army at Verdun supplied',
      'A French military cemetery near Verdun',
      'The name given to the French front line',
    ],
    answer: 'A single road used to keep the French army at Verdun supplied',
    explanation: 'The Voie Sacrée (Sacred Way) was a 75km road — the only supply route to Verdun. General Pétain organised a relay of 6,000 vehicles using it daily, with a truck passing every 14 seconds. Vehicles that broke down were pushed off the road to keep traffic moving. It kept the French army fighting for 10 months.',
    points: 20,
  },

  // ── TURNING POINTS ──────────────────────────────────────────────
  {
    id: 'tp1',
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'turning-points',
    ageGroup: 'both',
    question: 'When did the United States enter World War One?',
    options: ['August 1914', 'May 1915', 'April 1917', 'January 1918'],
    answer: 'April 1917',
    explanation: 'The USA declared war on Germany on 6 April 1917. The main reasons were Germany\'s unrestricted submarine warfare (which sank American ships) and the Zimmermann Telegram — a secret German proposal to Mexico to attack the USA in exchange for Texas, New Mexico, and Arizona.',
    points: 10,
  },
  {
    id: 'tp2',
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'turning-points',
    topicSlug: 'zimmermann-telegram',
    ageGroup: 'both',
    question: 'The Zimmermann Telegram proposed that Germany would help which country attack the United States?',
    options: ['Canada', 'Japan', 'Mexico', 'Cuba'],
    answer: 'Mexico',
    explanation: 'In January 1917, Germany\'s Foreign Secretary Arthur Zimmermann sent a secret telegram to Mexico, proposing that Germany would help Mexico recover Texas, New Mexico, and Arizona if Mexico attacked the USA. British codebreakers intercepted and decoded it. When the telegram was published in American newspapers, public outrage helped push the USA into the war.',
    points: 20,
  },
  {
    id: 'tp3',
    type: 'true-false',
    difficulty: 'medium',
    category: 'turning-points',
    ageGroup: '13-18',
    question: 'Germany confirmed the Zimmermann Telegram was genuine after it was published, making things much worse.',
    options: ['True', 'False'],
    answer: 'True',
    explanation: 'True! Foreign Secretary Zimmermann confirmed the telegram\'s authenticity in a press conference — probably the greatest diplomatic blunder of the war. He believed denial was impossible, but in doing so, he handed war advocates in America their most powerful argument. Many historians believe denial might have worked.',
    points: 20,
  },

  // ── AFTERMATH ──────────────────────────────────────────────
  {
    id: 'a1',
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'aftermath',
    topicSlug: 'treaty-of-versailles',
    ageGroup: 'both',
    question: 'When was the Treaty of Versailles signed, officially ending WW1?',
    options: ['11 November 1918', '28 June 1919', '1 January 1920', '4 July 1919'],
    answer: '28 June 1919',
    explanation: 'The Treaty of Versailles was signed on 28 June 1919 — exactly five years after the assassination of Franz Ferdinand that started the war. The armistice (ceasefire) had been signed on 11 November 1918, but the formal peace treaty wasn\'t agreed until seven months later.',
    points: 10,
  },
  {
    id: 'a2',
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'aftermath',
    topicSlug: 'treaty-of-versailles',
    ageGroup: 'both',
    question: 'Which article of the Treaty of Versailles forced Germany to accept sole blame for starting the war?',
    options: ['Article 1', 'Article 100', 'Article 231', 'Article 14'],
    answer: 'Article 231',
    explanation: 'Article 231 — known as the "War Guilt Clause" — forced Germany to accept full responsibility for causing the war. This clause was used to justify the enormous reparations payments demanded of Germany. Many Germans felt this was deeply unjust, and the resulting anger helped fuel the rise of Adolf Hitler.',
    points: 20,
  },
  {
    id: 'a3',
    type: 'true-false',
    difficulty: 'medium',
    category: 'aftermath',
    topicSlug: 'treaty-of-versailles',
    ageGroup: 'both',
    question: 'France\'s leader Clemenceau predicted "This is not a peace. It is an armistice for twenty years." — and he was almost exactly right.',
    options: ['True', 'False'],
    answer: 'True',
    explanation: 'True! Georges Clemenceau made this prediction at the Paris Peace Conference. World War Two began on 1 September 1939 — exactly 20 years and 65 days after the Treaty of Versailles was signed on 28 June 1919. It\'s one of the most chillingly accurate predictions in history.',
    points: 20,
  },
  {
    id: 'a4',
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'aftermath',
    topicSlug: 'treaty-of-versailles',
    ageGroup: '13-18',
    question: 'In what year did Germany make its final reparations payment from the Treaty of Versailles?',
    options: ['1945', '1953', '1983', '2010'],
    answer: '2010',
    explanation: 'Germany made its final reparations payment on 3 October 2010 — 92 years after the end of WW1. The payment of €70 million cleared the last of the debt imposed by the Treaty of Versailles. Payments had been interrupted and restructured multiple times, including by the Dawes Plan (1924) and the Young Plan (1929).',
    points: 30,
  },

  // ── GENERAL / MIXED ──────────────────────────────────────────────
  {
    id: 'g1',
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'general',
    ageGroup: 'both',
    question: 'On what date did World War One officially end with the armistice?',
    options: ['4 August 1918', '11 September 1918', '11 November 1918', '28 June 1919'],
    answer: '11 November 1918',
    explanation: 'The armistice — a ceasefire agreement — was signed at 11:00 AM on 11 November 1918. This is why Remembrance Day is observed at 11 AM on 11 November every year. The fighting stopped at "the 11th hour of the 11th day of the 11th month."',
    points: 10,
  },
  {
    id: 'g2',
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'general',
    ageGroup: 'both',
    question: 'Approximately how many soldiers were killed in World War One?',
    options: ['1 million', '5 million', '10 million', '50 million'],
    answer: '10 million',
    explanation: 'Approximately 10 million soldiers were killed in World War One, with a further 21 million wounded. Including civilian deaths from war-related causes, the total rises to 17-20 million. The Spanish flu pandemic that followed killed an estimated 50-100 million people worldwide.',
    points: 10,
  },
  {
    id: 'g3',
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'general',
    ageGroup: 'both',
    question: 'What was the name of the carrier pigeon that delivered a message saving 194 surrounded American soldiers?',
    options: ['Sergeant Stubby', 'Cher Ami', 'Kaiser Bill', 'Liberty'],
    answer: 'Cher Ami',
    explanation: 'Cher Ami ("Dear Friend" in French) was a US Army carrier pigeon who delivered a crucial message from the "Lost Battalion" — 194 surrounded American soldiers — despite being shot through the chest and leg. She saved their lives and was awarded the French Croix de Guerre medal.',
    points: 20,
  },
  {
    id: 'g4',
    type: 'image-match',
    difficulty: 'easy',
    category: 'general',
    ageGroup: 'both',
    question: 'The red poppy is worn to remember WW1 soldiers. Which poem inspired this tradition?',
    options: ['Dulce et Decorum Est', 'In Flanders Fields', 'The Soldier', 'Anthem for Doomed Youth'],
    answer: 'In Flanders Fields',
    explanation: '"In Flanders Fields" by Canadian doctor John McCrae (1915) described red poppies growing over the graves of soldiers in Belgium. This image inspired the tradition of wearing red poppies on Remembrance Day, still observed every 11 November across the Commonwealth.',
    points: 10,
  },
  {
    id: 'g5',
    type: 'true-false',
    difficulty: 'hard',
    category: 'general',
    ageGroup: '13-18',
    question: 'Walt Disney served in World War One — driving ambulances for the Red Cross in France.',
    options: ['True', 'False'],
    answer: 'True',
    explanation: 'True! Walt Disney was too young to enlist when the USA entered WW1, but at age 16 he lied about his age to join the Red Cross Ambulance Corps. He arrived in France in 1918, after the armistice. He decorated his ambulance with cartoon characters — the beginning of a career that would eventually create Mickey Mouse.',
    points: 30,
  },
];

export type BadgeId =
  | 'first-answer'
  | 'trench-expert'
  | 'battle-commander'
  | 'ace-pilot'
  | 'codebreaker'
  | 'historian'
  | 'perfect-score'
  | 'daily-streak';

export interface Badge {
  id: BadgeId;
  name: string;
  description: string;
  emoji: string;
  color: string;
}

export const badges: Badge[] = [
  { id: 'first-answer', name: 'First Answer', description: 'Answered your first question', emoji: '✍️', color: '#c9a84c' },
  { id: 'trench-expert', name: 'Trench Expert', description: 'Answered 5 questions about the Home Front & battles', emoji: '🪖', color: '#8b4513' },
  { id: 'battle-commander', name: 'Battle Commander', description: 'Got all Battles questions correct', emoji: '⚔️', color: '#8b2020' },
  { id: 'ace-pilot', name: 'Ace Pilot', description: 'Scored 5 correct answers in a row', emoji: '✈️', color: '#2d5f8a' },
  { id: 'codebreaker', name: 'Codebreaker', description: 'Answered a Hard difficulty question correctly', emoji: '🔐', color: '#5c3d8f' },
  { id: 'historian', name: 'Historian', description: 'Completed the full comprehensive exam', emoji: '📚', color: '#2d6b5f' },
  { id: 'perfect-score', name: 'Perfect Score', description: 'Got 100% on any quiz', emoji: '🏆', color: '#c9a84c' },
  { id: 'daily-streak', name: 'Daily Challenger', description: 'Completed 3 daily challenges', emoji: '🔥', color: '#c94c20' },
];

export const BADGES_KEY = 'gw_badges';
export const SCORES_KEY = 'gw_scores';
export const STREAK_KEY = 'gw_streak';

export function getEarnedBadges(): BadgeId[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(BADGES_KEY) || '[]'); } catch { return []; }
}

export function awardBadge(id: BadgeId) {
  const earned = getEarnedBadges();
  if (!earned.includes(id)) {
    earned.push(id);
    localStorage.setItem(BADGES_KEY, JSON.stringify(earned));
  }
}

export function getScores(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(SCORES_KEY) || '{}'); } catch { return {}; }
}

export function saveScore(quizId: string, score: number) {
  const scores = getScores();
  scores[quizId] = Math.max(score, scores[quizId] || 0);
  localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
}
