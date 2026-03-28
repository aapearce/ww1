export type AgeGroup = '8-13' | '13-18';

export type TopicCategory =
  | 'causes'
  | 'battles'
  | 'people'
  | 'technology'
  | 'homefront'
  | 'turning-points'
  | 'aftermath';

export interface TopicSection {
  heading: string;
  body: string; // markdown-lite: supports **bold**, *italic*, and \n for paragraphs
}

export interface Topic {
  slug: string;
  title: string;
  category: TopicCategory;
  year?: string; // for chronological view
  emoji: string;
  isWow?: boolean; // gets special spotlight treatment
  readingTime: number; // minutes
  summary: {
    '8-13': string;
    '13-18': string;
  };
  sections: {
    '8-13': TopicSection[];
    '13-18': TopicSection[];
  };
  keyFacts: string[];
  didYouKnow?: string;
  imageCaption?: string;
}

export const categories: Record<TopicCategory, { label: string; color: string; icon: string }> = {
  causes: { label: 'Causes & Build-up', color: '#8b4513', icon: '⚡' },
  battles: { label: 'Battles', color: '#8b2020', icon: '⚔️' },
  people: { label: 'People', color: '#2d5f8a', icon: '👤' },
  technology: { label: 'Technology', color: '#4a6741', icon: '⚙️' },
  homefront: { label: 'Home Front', color: '#6b4c11', icon: '🏠' },
  'turning-points': { label: 'Turning Points', color: '#5c3d8f', icon: '🔄' },
  aftermath: { label: 'Aftermath', color: '#2d6b5f', icon: '🕊️' },
};

export const topics: Topic[] = [
  // ── CAUSES ──────────────────────────────────────────────
  {
    slug: 'alliance-systems',
    title: 'The Alliance Systems',
    category: 'causes',
    year: '1882–1914',
    emoji: '🤝',
    readingTime: 4,
    summary: {
      '8-13': 'Before the war, the countries of Europe had made promises to protect each other. When one country got into a fight, all its friends had to join in — like a school argument that pulled in the whole playground.',
      '13-18': 'By 1914, Europe was divided into two armed camps: the Triple Alliance (Germany, Austria-Hungary, Italy) and the Triple Entente (France, Russia, Britain). These interlocking defence treaties meant a local conflict could automatically escalate into a continental war.',
    },
    sections: {
      '8-13': [
        {
          heading: 'Making Promises',
          body: 'Imagine you and your friends make a deal: if anyone picks on one of you, you all stick up for them together. That\'s exactly what the countries of Europe did before World War One.\n\nGermany, Austria-Hungary, and Italy made a promise called the **Triple Alliance** in 1882. France, Russia, and Britain made their own group of promises called the **Triple Entente**.',
        },
        {
          heading: 'Why This Was Dangerous',
          body: 'The problem was that these promises meant a small argument between two countries could drag everyone else into a huge fight.\n\nWhen Austria-Hungary declared war on tiny Serbia in 1914, Russia stepped in to help Serbia. Then Germany helped Austria-Hungary. Then France helped Russia. Then Britain joined in. In just a few weeks, almost all of Europe was at war — all because of one set of promises.',
        },
      ],
      '13-18': [
        {
          heading: 'The Two Armed Camps',
          body: 'Europe by 1914 was divided into two alliance blocs, each armed to the teeth and deeply suspicious of the other.\n\nThe **Triple Alliance** (formed 1882) bound Germany, Austria-Hungary, and Italy together, though Italy would switch sides in 1915, claiming the terms of the alliance did not obligate it to join a war of aggression. The **Triple Entente** evolved from a series of bilateral agreements: the Franco-Russian Alliance (1894), the Entente Cordiale between Britain and France (1904), and the Anglo-Russian Convention (1907).',
        },
        {
          heading: 'The Fatal Mechanism',
          body: 'The alliances created what historians call a "doomsday machine." Each power\'s mobilisation schedule was pre-written; a declaration of war by one triggered the mobilisation of others automatically.\n\nGermany\'s **Schlieffen Plan** assumed a two-front war against France and Russia simultaneously. The plan required attacking France first — through neutral Belgium — before turning east. This meant that once Germany mobilised, it *had* to invade Belgium, which *had* to bring Britain in. The alliances transformed the assassination of one man into a world war in under six weeks.',
        },
        {
          heading: 'Bismarck\'s Warning',
          body: 'Ironically, it was Germany\'s own Iron Chancellor, Otto von Bismarck, who had constructed the original alliance system — precisely to *prevent* war by isolating France. After his dismissal in 1890, Kaiser Wilhelm II allowed Germany\'s treaty with Russia to lapse, driving Russia into France\'s arms. Bismarck had warned: *"One day the great European war will come out of some damned foolish thing in the Balkans."*',
        },
      ],
    },
    keyFacts: [
      'Triple Alliance formed in 1882: Germany, Austria-Hungary, Italy',
      'Triple Entente: France, Russia, Britain',
      'Italy switched sides to join the Allies in 1915',
      'The alliance system turned a Balkan crisis into a world war in weeks',
    ],
    didYouKnow: 'Kaiser Wilhelm II of Germany was the grandson of Queen Victoria, and cousins with both Tsar Nicholas II of Russia and King George V of Britain. The First World War was partly a family quarrel between royal cousins.',
  },
  {
    slug: 'assassination-franz-ferdinand',
    title: 'The Assassination of Franz Ferdinand',
    category: 'causes',
    year: '28 June 1914',
    emoji: '💥',
    readingTime: 5,
    summary: {
      '8-13': 'On 28 June 1914, a young man fired a gun at an important visitor to the city of Sarajevo — and that one moment sparked the biggest war the world had ever seen.',
      '13-18': 'The assassination of Archduke Franz Ferdinand in Sarajevo on 28 June 1914 was the spark that ignited the tinder-box of European tensions. It triggered the July Crisis and set in motion the alliance system that plunged thirty nations into war.',
    },
    sections: {
      '8-13': [
        {
          heading: 'Who Was Franz Ferdinand?',
          body: 'Archduke Franz Ferdinand was a very important man — he was next in line to become the ruler of the Austro-Hungarian Empire, which covered a huge chunk of Europe. He and his wife Sophie were visiting the city of Sarajevo in Bosnia.\n\nNot everyone was happy he was there. Bosnia had only recently been taken over by Austria-Hungary, and many people there wanted to be free.',
        },
        {
          heading: 'The Day Everything Changed',
          body: 'On the morning of 28 June 1914, something extraordinary happened. A first attacker threw a bomb at Franz Ferdinand\'s car — but it bounced off and blew up the car behind instead!\n\nFranz Ferdinand continued with his visit, but on the way back, his driver took a wrong turn by accident. He stopped to turn around — right next to a young man called **Gavrilo Princip**, who was 19 years old. Princip couldn\'t believe his luck. He stepped forward and fired two shots.\n\nBoth Franz Ferdinand and his wife Sophie were killed.',
        },
        {
          heading: 'The Snowball That Became an Avalanche',
          body: 'Austria-Hungary was furious. They blamed Serbia for the attack and declared war. Then, because of all those promises countries had made to each other, more and more countries joined in.\n\nWithin six weeks, most of Europe was at war — all because of one wrong turn on a street in Sarajevo.',
        },
      ],
      '13-18': [
        {
          heading: 'The Conspirators',
          body: 'The assassination was planned by the **Black Hand**, a Serbian secret society officially called "Unification or Death," with connections to Serbian military intelligence. Seven conspirators positioned themselves along the Appel Quay route.\n\n**Gavrilo Princip** was a 19-year-old Bosnian Serb who had failed the entrance exam for Serbian military officer school due to his small stature. Dying of tuberculosis, he had nothing to lose.',
        },
        {
          heading: 'The Extraordinary Accident',
          body: 'The first assassination attempt failed when Nedeljko Čabrinović\'s bomb bounced off Franz Ferdinand\'s folded-back convertible hood and exploded under the following car, wounding several people.\n\nFranz Ferdinand insisted on visiting the wounded in hospital. His driver, unfamiliar with the changed route, turned down Franz Josef Street — and stalled the car directly in front of Princip, who had given up and stopped for a sandwich at Schiller\'s Delicatessen. Princip fired from less than five feet away. Both the Archduke and Sophie died within an hour.',
        },
        {
          heading: 'The July Crisis',
          body: 'Austria-Hungary used the assassination as a pretext to crush Serbia, presenting a deliberately unacceptable **10-point ultimatum** on 23 July. Serbia accepted all but one clause. Austria-Hungary declared war anyway on 28 July.\n\nThe dominoes fell: Russia mobilised to protect Serbia → Germany declared war on Russia (1 Aug) → Germany declared war on France (3 Aug) → Germany invaded Belgium → Britain declared war (4 Aug). Europe was at war in five weeks.\n\nPrincip was 19 — too young to hang under Austro-Hungarian law. He died in prison of tuberculosis in 1918, just months before the war ended.',
        },
      ],
    },
    keyFacts: [
      'Date: 28 June 1914, in Sarajevo, Bosnia',
      'Assassin: Gavrilo Princip, aged 19, Bosnian Serb',
      'The attack succeeded due to a driver taking a wrong turn',
      'Six weeks later, most of Europe was at war',
      'Princip died in prison in 1918, aged 23, never knowing the war had ended',
    ],
    didYouKnow: 'The car Franz Ferdinand was riding in had the licence plate "A III 118" — which some have noted reads like 11/11/18, the date the war ended. Whether coincidence or myth, it has fascinated historians for over a century.',
  },

  // ── BATTLES ──────────────────────────────────────────────
  {
    slug: 'battle-of-the-somme',
    title: 'The Battle of the Somme',
    category: 'battles',
    year: '1 July – 18 November 1916',
    emoji: '⚔️',
    readingTime: 6,
    summary: {
      '8-13': 'The Battle of the Somme was one of the most terrible battles in history. On the very first day, nearly 60,000 British soldiers were hurt or killed — more than any other single day in British military history.',
      '13-18': 'The Battle of the Somme (1 July – 18 November 1916) resulted in over one million casualties combined. The 1st of July 1916 remains the single bloodiest day in British military history, with 57,470 casualties. It also saw the first use of tanks in warfare.',
    },
    sections: {
      '8-13': [
        {
          heading: 'Before the Battle',
          body: 'The British army fired over **one and a half million shells** at the German trenches for seven days before the battle. The generals hoped this would destroy the German defences so their soldiers could walk across safely.\n\nBut the Germans had built very deep underground shelters. They waited underground while the shells exploded above them — and when the shelling stopped, they came back up to their machine guns.',
        },
        {
          heading: 'The Terrible First Day',
          body: 'On the morning of 1 July 1916, thousands of British soldiers climbed out of their trenches and began walking towards the German lines. Many had been told the German defences were destroyed.\n\nThey weren\'t. German machine guns opened fire. Soldiers fell in rows.\n\nBy the end of that one day, **57,470 British soldiers had been killed or wounded** — nearly 60,000 people in a single day. It was the worst day in the history of the British Army.',
        },
        {
          heading: 'Something New: The Tank',
          body: 'Although the battle was terrible, it brought one exciting new invention. On 15 September 1916, the British used **tanks** in battle for the very first time.\n\nThese huge metal machines rolled over barbed wire and shell holes. Germans who had never seen anything like them were terrified. Though there were only a few that day and many broke down, it showed that tanks could one day help win the war.',
        },
      ],
      '13-18': [
        {
          heading: 'Strategic Context',
          body: 'The Somme offensive had two purposes: to relieve pressure on the French at **Verdun** — where France was being "bled white" — and to deliver a knockout blow to Germany. British Commander Sir Douglas **Haig** planned a massive artillery bombardment followed by infantry advance.\n\nThe 7-day barrage fired 1.5 million shells. It was the largest bombardment in history to that point — and almost entirely failed. German dugouts, up to 40 feet deep, sheltered troops safely. Crucially, the shells failed to cut the wire in many sectors.',
        },
        {
          heading: '1 July 1916: The Bloodiest Day',
          body: 'Zero hour was 7:28 AM. British and Dominion troops advanced in waves across No Man\'s Land. In sectors where the wire was intact and dugout Germans reached their machine guns in time, the slaughter was catastrophic.\n\n**57,470 British casualties** (including 19,240 dead) in a single day. Some battalions — composed of men from the same town, the "Pals Battalions" — were essentially wiped out in minutes. The village of Accrington, Lancashire lost 584 men from its 720-strong battalion in 20 minutes. Communities across Britain would never be the same.',
        },
        {
          heading: 'First Use of Tanks',
          body: 'On 15 September 1916, at the Battle of Flers-Courcelette, **49 Mark I tanks** were used in action for the first time. Developed in total secrecy — shipped labelled as "water tanks" to deceive German spies, giving them their name — they achieved local breakthroughs. A biplane pilot reported: *"Tank walking up the High Street of Flers with the British army cheering behind it."*\n\nMost broke down or were destroyed, but their potential was clear. The **Battle of Cambrai** (November 1917) would demonstrate what massed tanks could achieve.',
        },
        {
          heading: 'Legacy',
          body: 'After 141 days, the British and French had advanced approximately **6 miles** at a cost of over **1 million total casualties**. Was it worth it? The debate over Haig\'s command remains one of the most contested in military history.\n\nDefenders argue the Somme was a strategic success — it relieved Verdun, drew in German reserves, and inflicted unsustainable losses on Germany. Critics call it needless slaughter driven by outdated tactics. The Somme entered British cultural memory as a symbol of the tragedy of industrial warfare.',
        },
      ],
    },
    keyFacts: [
      '57,470 British casualties on 1 July 1916 — the worst single day in British military history',
      'Over 1 million total casualties across the 141-day battle',
      'Tanks used in battle for the first time on 15 September 1916',
      'The British advanced approximately 6 miles over the entire campaign',
      '"Pals Battalions" — men from the same town — were wiped out together',
    ],
    didYouKnow: 'Before the battle, the British Army fired so many shells that the sound could be heard in London — over 100 miles away. People reportedly stopped in the streets of the capital to listen to the distant rumble.',
  },
  {
    slug: 'battle-of-verdun',
    title: 'The Battle of Verdun',
    category: 'battles',
    year: 'February – December 1916',
    emoji: '🔥',
    readingTime: 5,
    summary: {
      '8-13': 'The Battle of Verdun lasted almost the whole of 1916 and was the longest battle of the entire war. Germany\'s plan was to kill so many French soldiers that France would give up. France\'s motto became: "They shall not pass!"',
      '13-18': 'At 303 days, Verdun was the longest battle in history. Germany\'s commander Falkenhayn designed it not to capture ground, but to "bleed France white" — inflicting casualties faster than France could replace them. It failed to break France, but left both sides devastated.',
    },
    sections: {
      '8-13': [
        {
          heading: 'Germany\'s Plan',
          body: 'The German general Falkenhayn had a horrible idea. He didn\'t just want to capture the French city of Verdun — he wanted to force France into a battle where so many French soldiers would die that France would have to give up the war.\n\nHe called it his plan to "bleed France white."',
        },
        {
          heading: 'They Shall Not Pass',
          body: 'The battle began on 21 February 1916 with the biggest artillery bombardment ever seen. Over the following months, the fighting was like nothing humans had ever experienced — constant shellfire, poison gas, men fighting over the same small pieces of ground again and again.\n\nThe French general **Pétain** rallied his troops with the famous words: *"Ils ne passeront pas"* — **"They shall not pass."** A single road — the "Sacred Way" — was kept open day and night to keep the French army supplied, with a truck passing every 14 seconds.',
        },
        {
          heading: 'How It Ended',
          body: 'The battle dragged on for 303 days — nearly the whole year of 1916. In the end, the French held Verdun. Germany\'s plan had failed.\n\nBut the cost was enormous. About **700,000 soldiers** on both sides were killed or wounded. The land around Verdun was so completely destroyed by shells that parts of it are still fenced off as dangerous today — more than 100 years later.',
        },
      ],
      '13-18': [
        {
          heading: 'Operation Gericht: The Mincing Machine',
          body: 'General Erich von Falkenhayn\'s strategic memo proposed attacking a target so vital to French national pride that France would commit its entire army to defend it — then destroy that army with artillery. Verdun, with its ancient fortress and symbolic importance, was the chosen site.\n\nHis operational code name was **Operation Gericht** — German for "Place of Execution." The plan was industrial attrition: not to break through, but to create a "mincing machine" that ground French manpower to nothing.',
        },
        {
          heading: 'The Sacred Way',
          body: 'France\'s only resupply route was a single road: the **Voie Sacrée** (Sacred Way), 75km long. General Pétain organised a relay system: 6,000 vehicles used it daily, a truck every 14 seconds. Soldiers who broke down were pushed aside to keep the flow moving.\n\nThe battle was divided into **phases**. Germany captured Fort Douaumont in February 1916 — France\'s strongest fort — without a shot, as it had been stripped of its garrison. France retook it in October. The same ground changed hands repeatedly, at catastrophic cost each time.',
        },
        {
          heading: 'Outcome and Legacy',
          body: 'Falkenhayn\'s strategy backfired: Germany suffered almost as many casualties as France (~330,000 each, though estimates vary up to 700,000 combined). The Allied **Somme offensive** (July 1916) forced Germany to divert resources, relieving Verdun.\n\nFrance held. But the psychological cost was immense. The French Army **mutinies of 1917** — when entire units refused to attack — were rooted in the trauma of Verdun. Pétain, who replaced Nivelle after the mutinies, treated the men with relative restraint, restoring morale through better conditions rather than mass executions.\n\nThe **Zone Rouge** around Verdun remains fenced off. An estimated 12 million unexploded shells still lie in the soil. Human remains are still discovered regularly.',
        },
      ],
    },
    keyFacts: [
      '303 days — the longest battle in history',
      'German strategy: deliberately "bleed France white"',
      '"They shall not pass" — France\'s rallying cry, attributed to General Pétain',
      '~700,000 total casualties (estimates vary)',
      'Zone Rouge: large areas near Verdun remain fenced off and uninhabitable today',
    ],
    didYouKnow: 'Fort Douaumont — France\'s largest fort at Verdun — was captured by Germany without a single shot. It had been stripped of most of its garrison. Nine German soldiers bluffed their way inside. France then lost thousands of men trying to retake it.',
  },
  {
    slug: 'gallipoli',
    title: 'Gallipoli & the ANZAC Story',
    category: 'battles',
    year: 'April 1915 – January 1916',
    emoji: '🌺',
    readingTime: 6,
    summary: {
      '8-13': 'Soldiers from Australia and New Zealand — called ANZACs — landed on a beach in Turkey to try to open a new route through to help their allies. It became one of the most important stories in Australian and New Zealand history.',
      '13-18': 'The Gallipoli campaign was a bold Allied attempt to knock the Ottoman Empire out of the war by seizing the Dardanelles Strait. It failed catastrophically, but forged the national identities of Australia and New Zealand. ANZAC Day (25 April) remains their most sacred national day.',
    },
    sections: {
      '8-13': [
        {
          heading: 'Who Were the ANZACs?',
          body: 'ANZAC stands for **Australian and New Zealand Army Corps**. When Britain went to war, Australia and New Zealand — which were part of the British Empire — sent their own soldiers to help.\n\nThese young men had mostly grown up on farms and in the outdoors. Many had never left their country before. They were about to face something none of them could have imagined.',
        },
        {
          heading: 'The Landing',
          body: 'On **25 April 1915**, Australian and New Zealand soldiers landed on a beach in what is now Turkey, near a place called Gallipoli. The plan was to capture the area and open a sea route to help their Russian allies.\n\nBut the Turkish defenders — led by a brilliant officer called **Mustafa Kemal** — were waiting. The beach was overlooked by steep cliffs. The ANZACs were pinned down on the narrow shore, unable to advance.',
        },
        {
          heading: 'Eight Months of Fighting',
          body: 'The battle lasted eight months. The ANZACs dug into the cliffs and fought desperately, but they could not break through. In January 1916, the Allied forces secretly withdrew at night — so quietly that the Turkish defenders didn\'t realise until morning.\n\nAlthough Gallipoli was a defeat, the ANZACs became famous for their bravery, their humour, and their "mateship" — looking out for each other. **25 April is still celebrated as ANZAC Day** in Australia and New Zealand — the most important national day in both countries.',
        },
      ],
      '13-18': [
        {
          heading: 'Churchill\'s Grand Strategy',
          body: 'The Dardanelles campaign was championed by **Winston Churchill**, First Lord of the Admiralty. The strategic logic was compelling: seize the Dardanelles Strait, capture Constantinople, knock the Ottoman Empire out of the war, open a supply route to Russia, and attack the Central Powers from the south.\n\nA purely naval attack failed in March 1915, after three battleships struck mines. The decision was made to land troops instead — a decision made with inadequate intelligence about Ottoman defences.',
        },
        {
          heading: 'The Landing and Its Failures',
          body: '25 April 1915: ANZACs landed at what became known as ANZAC Cove, while British and French forces landed at Cape Helles. The element of surprise had been lost during the abortive naval attack. **Mustafa Kemal** — later Atatürk, founder of modern Turkey — rushed reinforcements to the heights, with his famous order: *"I am not ordering you to attack. I am ordering you to die. In the time that passes until we die, other troops and commanders can come forward and take our places."*\n\nThe terrain was catastrophic: steep ravines, dense scrub, and determined defenders. The Allies never broke through the first ridgeline.',
        },
        {
          heading: 'The Human Cost and Legacy',
          body: 'The campaign lasted until January 1916: ~250,000 Allied casualties, ~250,000 Ottoman casualties. Churchill resigned from Cabinet. The evacuation — conducted in total secrecy and considered one of the campaign\'s few tactical successes — removed 80,000 men without a single casualty.\n\nFor Australia and New Zealand, Gallipoli became a founding myth. The campaign forged a national character — the "ANZAC spirit" of endurance, courage, and egalitarianism. For Turkey, Mustafa Kemal\'s defence was the foundation of his political authority that led to the Turkish Republic. For Britain, Gallipoli became a byword for strategic hubris and the cost of poor planning.',
        },
      ],
    },
    keyFacts: [
      'ANZAC = Australian and New Zealand Army Corps',
      '25 April 1915: the date of the ANZAC landings, now ANZAC Day',
      'The campaign lasted 8 months and ended in Allied withdrawal',
      'Mustafa Kemal (later Atatürk) led the Ottoman defence — and founded modern Turkey',
      'The evacuation was so well-planned that not a single Allied soldier was killed',
    ],
    didYouKnow: 'Mustafa Kemal told his troops at Gallipoli: "I am not ordering you to attack. I am ordering you to die." This extraordinary order worked — his men held the line. Kemal survived the war, became Atatürk, and founded the Republic of Turkey. He is today buried in Ankara in a mausoleum visited by millions.',
  },

  // ── PEOPLE ──────────────────────────────────────────────
  {
    slug: 'red-baron',
    title: 'The Red Baron',
    category: 'people',
    year: '1916–1918',
    emoji: '✈️',
    isWow: true,
    readingTime: 4,
    summary: {
      '8-13': 'Manfred von Richthofen — the Red Baron — was the most famous fighter pilot of World War One. He painted his plane red so everyone would know it was him. His enemies respected him so much they gave him a full military funeral when he was shot down.',
      '13-18': 'Manfred von Richthofen was the top-scoring air ace of WW1 with 80 confirmed aerial victories. His legend — the red Fokker triplane, the air circus, the chivalric ethos — made him a celebrity on both sides of the front. He was 25 when he was killed on 21 April 1918.',
    },
    sections: {
      '8-13': [
        {
          heading: 'The Red Plane',
          body: 'In the skies above the trenches, pilots from both sides fought in what were called **dogfights** — fast, spinning battles between aeroplanes. The best pilots were called **aces**.\n\n**Manfred von Richthofen** was Germany\'s greatest ace. He painted his plane bright red so that his enemies would know it was him coming — and be afraid. Soldiers below nicknamed him **"The Red Baron."**',
        },
        {
          heading: '80 Victories',
          body: 'By the time he was shot down, the Red Baron had won **80 aerial battles** — more than any other pilot in the entire war. He led a group of pilots called the "Flying Circus" because their planes were painted in so many bright colours.\n\nThe Red Baron treated his victories very seriously. He collected a small silver cup for each enemy plane he shot down and kept them on a shelf at home. When there was no more silver left in Germany because of the war, he stopped at 60 cups.',
        },
        {
          heading: 'A Hero on Both Sides',
          body: 'On 21 April 1918, the Red Baron was shot down and killed. He was only **25 years old**.\n\nHere\'s the remarkable part: his enemies — the Royal Flying Corps — gave him a **full military funeral with full honours**. They laid him in a coffin, fired a salute over his grave, and dropped a wreath from a plane with a note saying: *"To our gallant and worthy foe."*\n\nEven in war, courage was respected.',
        },
      ],
      '13-18': [
        {
          heading: 'The Making of an Ace',
          body: 'Manfred von Richthofen was a cavalry officer who transferred to the air service after becoming bored on the Eastern Front. Taught to fly by another ace, **Oswald Boelcke**, he shot down his first enemy aircraft in September 1916.\n\nHis tactics were disciplined and analytical — he wrote *"Dicta Boelcke,"* a set of air combat rules he rigidly followed. Attack from above, from the sun, at close range. Never stay in a fight that isn\'t in your favour. He was the opposite of a reckless daredevil.',
        },
        {
          heading: 'The Flying Circus',
          body: 'Richthofen commanded **Jagdgeschwader I** — a large, mobile fighter wing that could be moved rapidly along the front to wherever air superiority was needed. Allied pilots nicknamed it the **"Flying Circus"** because of the colourful aircraft and the circus tents used for accommodation that moved with the unit.\n\nHis preferred aircraft was the **Fokker Dr.I triplane** — the iconic red machine. Though not the fastest plane on the front, its manoeuvrability made it devastating in the right hands.',
        },
        {
          heading: 'Death and Controversy',
          body: 'On 21 April 1918, Richthofen was killed over the Somme. The cause of death remains disputed. **Captain Arthur Roy Brown** of the RCAF was credited officially, but forensic evidence suggests the fatal bullet came from ground fire — either Australian anti-aircraft gunners or riflemen.\n\nThe Royal Flying Corps gave him a full military funeral at Bertangles, France, with six RFC pallbearers. A wreath was dropped from a plane: *"To our gallant and worthy foe."* Allied propaganda suppressed the ceremony — such respect for the enemy was embarrassing.\n\nHe was 25. His brother Lothar was also an ace (40 kills). His cousin Wolfram von Richthofen commanded the Condor Legion in the Spanish Civil War and led the bombing of Guernica.',
        },
      ],
    },
    keyFacts: [
      '80 confirmed aerial victories — the highest of any pilot in WW1',
      'His red Fokker triplane gave him the nickname "The Red Baron"',
      'Led Jagdgeschwader I — the "Flying Circus"',
      'Killed 21 April 1918, aged 25 — who shot him is still debated',
      'Given a full military funeral by his enemies, the Royal Flying Corps',
    ],
    didYouKnow: 'Richthofen collected a small silver cup for every enemy pilot he shot down, engraved with the date and type of aircraft. When Germany ran out of silver due to wartime shortages, he stopped ordering new cups at 60. He kept them on a shelf in his room at home — a chilling trophy collection.',
  },
  {
    slug: 'war-poets',
    title: 'The War Poets',
    category: 'people',
    year: '1914–1918',
    emoji: '✍️',
    readingTime: 5,
    summary: {
      '8-13': 'Some soldiers wrote poems about the war to show people back home what it was really like. Their poems are still read in schools today because they are so powerful and moving.',
      '13-18': 'The war poets — most famously Wilfred Owen and Siegfried Sassoon — wrote some of the most powerful anti-war literature ever created, directly challenging the propaganda that sent young men to die. Owen was killed one week before the armistice.',
    },
    sections: {
      '8-13': [
        {
          heading: 'In Flanders Fields',
          body: 'One of the most famous poems from the war was written by a Canadian doctor called **John McCrae** in 1915. He wrote it after watching his friend\'s funeral in Belgium, where red poppies were growing among the graves.\n\n*"In Flanders fields the poppies blow / Between the crosses, row on row..."*\n\nThis poem is why we wear **red poppies** to remember the soldiers who died. Poppies still grow in Belgium and France on the old battlefields.',
        },
        {
          heading: 'Wilfred Owen',
          body: '**Wilfred Owen** was a young British officer who wrote about what war was really like — the mud, the fear, the gas attacks, the death of his friends. His most famous poem, **"Dulce et Decorum Est,"** describes a gas attack in horrifying detail.\n\nThe title comes from a Latin phrase that means *"It is sweet and right to die for your country."* Owen called it **"the old Lie."** He didn\'t think dying in the trenches was sweet or glorious at all.\n\nSadly, Owen was killed in battle on **4 November 1918** — just **one week before the war ended**. His mother received the telegram telling her he was dead on the same morning the church bells rang to celebrate the end of the war.',
        },
      ],
      '13-18': [
        {
          heading: 'Two Kinds of War Poetry',
          body: 'War poetry divides sharply into two phases. **Early war poetry (1914)** was largely patriotic and romantic — Rupert Brooke\'s *"The Soldier"* (*"If I should die, think only this of me / That there\'s some corner of a foreign field / That is forever England"*) was written before anyone had experienced the trenches.\n\n**Later war poetry (1916-18)** was devastating in its honesty. These were poems written by men who had lived in the trenches, watched friends die in the mud, and felt betrayed by the gap between official rhetoric and reality.',
        },
        {
          heading: 'Wilfred Owen',
          body: '**Wilfred Owen** (1893–1918) is the defining voice of WW1 poetry. A sensitive, deeply literary young man, he suffered shell shock at the Somme and was sent to Craiglockhart War Hospital in Edinburgh, where he met **Siegfried Sassoon** — who mentored him.\n\nHis masterpiece **"Dulce et Decorum Est"** describes a gas attack: men fumbling for masks, one soldier drowning in his gas mask, the speaker haunted by the dying man\'s face. The final stanza confronts the reader directly: *"If you could hear, at every jolt, the blood / Come gargling from the froth-corrupted lungs... / My friend, you would not tell with such high zest / To children ardent for some desperate glory, / The old Lie: Dulce et decorum est / Pro patria mori."*\n\nOwen was killed on 4 November 1918 — seven days before the armistice.',
        },
        {
          heading: 'Sassoon\'s Protest',
          body: '**Siegfried Sassoon** (1886–1967) was different from Owen — older, more establishment, and angrier. In 1917 he made an extraordinary act of protest: he refused to return to the front and published a letter — *"Finished with the War: A Soldier\'s Declaration"* — read in Parliament.\n\nRather than court-martial him (which would have made him a martyr), the Army declared him shell-shocked and sent him to Craiglockhart. There he met Owen.\n\nHis poems are satirical and savage: officers enjoying port at the base while men die up the line; generals sending men to death from comfortable châteaux. *"Does it matter? — losing your legs?... For people will always be kind..."* — a bitter attack on the comfortable indifference of civilians.',
        },
      ],
    },
    keyFacts: [
      'Red poppies are worn to remember WW1 soldiers — inspired by John McCrae\'s poem "In Flanders Fields" (1915)',
      'Wilfred Owen was killed 4 November 1918 — one week before the armistice',
      'Siegfried Sassoon publicly refused to return to the front in 1917 — and was sent to a hospital instead of prison',
      '"Dulce et Decorum Est" is Owen\'s most famous poem — it directly calls the idea of dying for your country "the old Lie"',
    ],
    didYouKnow: 'Wilfred Owen\'s mother received the telegram announcing her son\'s death on the morning of 11 November 1918 — the same morning the church bells were ringing to celebrate the armistice and the end of the war.',
  },

  // ── WOW STORIES ──────────────────────────────────────────────
  {
    slug: 'christmas-truce',
    title: 'The Christmas Truce',
    category: 'homefront',
    year: 'December 1914',
    emoji: '⚽',
    isWow: true,
    readingTime: 4,
    summary: {
      '8-13': 'On Christmas Eve 1914, something magical happened on the Western Front. Soldiers from both sides put down their guns, climbed out of their trenches, and met in No Man\'s Land to share food, sing songs, and even play football.',
      '13-18': 'The Christmas Truce of 1914 was a spontaneous, unofficial ceasefire along sections of the Western Front. German and British soldiers fraternised in No Man\'s Land, exchanging food, cigarettes and gifts. Officers on both sides were furious. It never happened on the same scale again.',
    },
    sections: {
      '8-13': [
        {
          heading: 'Christmas Eve in the Trenches',
          body: 'Imagine spending Christmas in a cold, muddy trench, with an enemy just 50 metres away across a stretch of broken ground. That was the situation for thousands of soldiers on the Western Front in December 1914.\n\nThen something extraordinary happened. German soldiers began lighting candles along the top of their trenches. British soldiers watched, confused. Then the Germans began to **sing carols**.\n\nBritish soldiers joined in from their own trenches. Both sides knew the same songs.',
        },
        {
          heading: 'Meeting in No Man\'s Land',
          body: 'The next morning — Christmas Day — German soldiers climbed out of their trenches. Unarmed. They walked towards the British lines, shouting "Merry Christmas!"\n\nBritish soldiers climbed out too. The two sides met in the middle — in **No Man\'s Land**, the dangerous ground between the trenches where no one was supposed to go.\n\nThey shook hands. They shared **chocolate, cigarettes, and sausages**. They showed each other photographs of their families. They buried their dead, side by side.\n\nAnd in some places — they played **football**.',
        },
        {
          heading: 'Why It Ended',
          body: 'The truce lasted a day or two in most places. Then the officers on both sides ordered the men back to fighting.\n\nThe Christmas Truce never happened on the same scale again. The longer the war went on, the more hatred grew on both sides. By 1915, 1916, and 1917, there was no Christmas truce.\n\nBut for one brief moment in December 1914, soldiers on both sides showed that even in the middle of the world\'s worst war, human kindness could break through.',
        },
      ],
      '13-18': [
        {
          heading: 'How It Started',
          body: 'The Christmas Truce was not organised or planned. It grew spontaneously from small acts — a group of German soldiers lighting Christmas trees on their parapet, carol singing that crossed No Man\'s Land, a shout of "Merry Christmas" that wasn\'t answered with a rifle shot.\n\nIt occurred along significant portions of the British sector of the Western Front, though not universally — in some sectors, fighting continued throughout Christmas Day. The French sector saw far less fraternisation; the French had experienced the German invasion of their country and their hatred ran deeper.',
        },
        {
          heading: 'What Actually Happened',
          body: 'First-hand accounts describe Germans emerging with a small Christmas tree decorated with candles. British soldiers emerged to meet them. There were handshakes, exchanges of food (German sausages for British plum pudding, cigarettes, buttons as souvenirs), and the burial of dead from both sides who had been lying in No Man\'s Land.\n\nFootball did happen — but accounts vary. The games were informal, with improvised balls (including a tin can), on ground churned by shellfire. The famous image of a formal match with a referee is almost certainly mythologised. But football, in some form, did occur.\n\nCaptain Sir Edward Hulse wrote to his mother: *"They were coming to meet us, so I doubled out, and we met a crowd of men in the middle... I do not quite know who made the first start, but soon each was taking the other\'s hand, and then in a few minutes we were talking and exchanging cigarettes."*',
        },
        {
          heading: 'The Officers\' Fury and the Aftermath',
          body: 'Senior officers on both sides were appalled. Fraternisation with the enemy was technically mutinous. General Sir Horace Smith-Dorrien issued a strict order that it must not happen again.\n\nIt largely didn\'t. By Christmas 1915, veterans of the truce had been killed or transferred; new men had experienced more of the war\'s brutality. The poison gas attacks at Ypres (April 1915), the Somme (July 1916), and Verdun hardened attitudes on both sides.\n\nThe Christmas Truce endures as one of the most powerful stories of the war precisely because it shows what was lost. These were ordinary men — farmers, shopkeepers, teachers — who had far more in common with each other than with the politicians and generals who sent them to fight.',
        },
      ],
    },
    keyFacts: [
      'Occurred spontaneously along sections of the Western Front, Christmas Eve/Day 1914',
      'German and British soldiers exchanged food, cigarettes, and souvenirs',
      'Football was played in some sectors — though less formally than legend suggests',
      'Officers on both sides were furious — it was technically mutinous',
      'Nothing like it happened again on the same scale for the rest of the war',
    ],
    didYouKnow: 'Some of the men who participated in the Christmas Truce — who shook hands with German soldiers and shared cigarettes with them on Christmas Day — were killed fighting those same men just days later, when the truce ended and the war resumed.',
  },
  {
    slug: 'sergeant-stubby',
    title: 'Sergeant Stubby',
    category: 'people',
    year: '1917–1918',
    emoji: '🐕',
    isWow: true,
    readingTime: 3,
    summary: {
      '8-13': 'Sergeant Stubby was a stray dog who became one of the most famous heroes of World War One. He could detect poison gas before humans could, found wounded soldiers in No Man\'s Land, and even caught a German spy!',
      '13-18': 'Sergeant Stubby was a stray bull terrier mix who served with the 102nd Infantry Regiment of the US Army. He participated in 17 battles, detected gas attacks, located wounded soldiers, and boosted troop morale. He became the most decorated war dog in American history and the only dog to be promoted through combat action.',
    },
    sections: {
      '8-13': [
        {
          heading: 'A Stray Dog Goes to War',
          body: 'In 1917, a small stray dog wandered onto a military training ground in Connecticut, USA, where soldiers were preparing to go to war. A young soldier called **Corporal Robert Conroy** took a liking to him and taught him to salute by putting his paw to his eyebrow.\n\nWhen the regiment shipped out to France, Conroy smuggled Stubby aboard the ship hidden under his coat. When the commanding officer discovered the dog, Stubby raised his paw in a salute — and the officer let him stay.',
        },
        {
          heading: 'Stubby the Hero',
          body: 'Stubby served through **17 battles** and became absolutely extraordinary:\n\n🐕 He could **smell poison gas** before the gas alarm sounded — he would bark and run through the trenches waking soldiers up, giving them precious extra seconds to put on their masks.\n\n🐕 He would go out into **No Man\'s Land** to find wounded soldiers, listening for English voices or movement, then staying with them until stretcher-bearers arrived.\n\n🐕 He once caught a **German spy** by grabbing the man\'s trouser leg and holding on until soldiers arrived.',
        },
        {
          heading: 'The Most Decorated War Dog',
          body: 'Stubby was promoted to the rank of **Sergeant** — the only dog ever promoted through combat action. He was given a tiny custom-made uniform covered in his medals.\n\nWhen the war ended, Corporal Conroy brought him home to America. Stubby became a celebrity — he met three US Presidents (Wilson, Harding, and Coolidge) and was made a lifetime member of the Red Cross and YMCA.\n\nHe is still remembered today as the most decorated war dog in American history.',
        },
      ],
      '13-18': [
        {
          heading: 'From Yale to the Western Front',
          body: 'Stubby (his breed likely a bull terrier mix) was found as a stray near Yale University in New Haven, Connecticut, where the 102nd Infantry were training. Corporal J. Robert Conroy adopted him, teaching him basic commands and, famously, a salute. Stubby was smuggled to France aboard the SS Minnesota in 1917.\n\nHis first tour began in February 1918 in the Chemin des Dames sector. He was wounded by a grenade fragment at the Battle of Château-Thierry, received first aid, and returned to service.',
        },
        {
          heading: 'Capabilities and Actions',
          body: 'Stubby\'s service record is remarkable for a non-human combatant:\n\n**Gas detection:** Dogs have approximately 40 times the olfactory receptors of humans. Stubby could detect mustard gas at concentrations below human perception, warning troops before alarms activated — critical minutes in a gas attack.\n\n**Casualty location:** He would move through No Man\'s Land after engagements, distinguishing English-speaking voices from German ones (or movement patterns), and remaining with wounded soldiers until stretcher-bearers could reach them.\n\n**Intelligence:** He detected a German mapping the Allied trenches by biting the man\'s trouser leg and refusing to release him until American soldiers arrived.\n\n**Morale:** Perhaps his most significant contribution. The presence of a dog — normalcy, uncomplicated affection — in an environment of industrial horror was profoundly meaningful to men under extreme psychological stress.',
        },
      ],
    },
    keyFacts: [
      'Served through 17 battles with the 102nd Infantry, US Army',
      'Could detect poison gas before human alarm systems',
      'Found wounded soldiers in No Man\'s Land',
      'Caught a German spy by biting and holding him',
      'The only dog ever promoted through combat action — to Sergeant',
      'Met three US Presidents after the war',
    ],
    didYouKnow: 'When Stubby died in 1926, the New York Times ran a front-page obituary. His body was preserved and mounted, and he is today on display at the Smithsonian Institution\'s National Museum of American History in Washington D.C.',
  },

  // ── TECHNOLOGY ──────────────────────────────────────────────
  {
    slug: 'poison-gas',
    title: 'Poison Gas',
    category: 'technology',
    year: 'April 1915 onwards',
    emoji: '☁️',
    readingTime: 5,
    summary: {
      '8-13': 'Poison gas was one of the most terrifying new weapons of World War One. It couldn\'t be seen, it was silent, and it could kill or blind soldiers before they even knew it was coming.',
      '13-18': 'Chemical warfare was used on an industrial scale in WW1 for the first time. Three main agents — chlorine, phosgene, and mustard gas — caused approximately 1.3 million casualties. The development of the gas mask became a race against new chemical formulations.',
    },
    sections: {
      '8-13': [
        {
          heading: 'First Use',
          body: 'On **22 April 1915**, near Ypres in Belgium, German soldiers opened thousands of metal cylinders. A yellow-green cloud drifted towards the Allied trenches on the breeze.\n\nIt was **chlorine gas** — and soldiers had no idea what it was. Some thought it was a smoke screen. Then the smell hit them — like bleach and metal — and their lungs began to burn.\n\nAllied soldiers ran in panic. German troops followed, but even they were afraid to advance too quickly through the cloud.',
        },
        {
          heading: 'Types of Gas',
          body: 'Three main types of gas were used in the war:\n\n☁️ **Chlorine** — the first gas used. Yellow-green, you could see it coming. Smelled like bleach. Burned your lungs.\n\n☁️ **Phosgene** — much more deadly. Almost invisible. Smelled like cut grass or freshly-mown hay. Responsible for 85% of all gas deaths. The worst part: you felt fine for 24-48 hours after breathing it, then suddenly collapsed.\n\n☁️ **Mustard gas** — the most feared. Not immediately deadly, but caused terrible blisters on skin, in lungs, and on eyes. It contaminated the ground for days.',
        },
        {
          heading: 'Gas Masks',
          body: 'Soldiers quickly learned to make gas masks. Early ones were just wet cloths held over the mouth and nose (soldiers were told to urinate on them — the ammonia in urine neutralises chlorine). Later, proper respirator masks with filters were developed.\n\n**Even horses and dogs** were given gas masks. Carrier pigeons were kept in airtight boxes.\n\nGas masks became part of every soldier\'s equipment. They had to put them on within seconds of a gas alarm — fumbling in the dark, half-asleep, could be fatal.',
        },
      ],
      '13-18': [
        {
          heading: 'The Escalation of Chemical Warfare',
          body: 'Germany\'s first large-scale chlorine attack (22 April 1915, Second Battle of Ypres) released 168 tonnes from 5,730 cylinders along a 6.5km front. The attack created a 4-mile gap in the Allied line — but German commanders, not fully believing in the weapon\'s effectiveness, hadn\'t positioned enough reserves to exploit it. Canadian troops held the line by urinating on cloths and using them as improvised filters.\n\nBoth sides subsequently developed increasingly sophisticated chemical agents. **Phosgene** (introduced 1915) was responsible for 85% of chemical warfare deaths. Its delayed effects (24-48 hours) meant men continued fighting after lethal exposure. **Mustard gas** (dichlorodiethyl sulphide, introduced 1917) was a vesicant (blister agent) rather than a respiratory agent — it contaminated ground and equipment, persisted for days, and caused mass casualties through skin and eye burns.',
        },
        {
          heading: 'The Gas Mask Race',
          body: 'The development of chemical weapons and countermeasures was a technological arms race. British scientist **John Haldane** (father of J.B.S. Haldane) reverse-engineered the first German chlorine attack within days, identifying the agent and recommending alkaline-soaked pads as a temporary countermeasure.\n\nThe **Small Box Respirator** (introduced 1916) used activated charcoal filters and provided reliable protection against all known agents except mustard gas, which penetrated skin directly and required full-body protection. The logistical challenge was enormous: millions of masks had to be produced, distributed, and regularly replaced as new chemical agents emerged.',
        },
        {
          heading: 'Legacy',
          body: 'Approximately **1.3 million gas casualties** were recorded across the war (90,000–100,000 deaths). Gas caused a disproportionate number of psychological casualties — the fear was as significant as the physical effect.\n\nWilfred Owen\'s *"Dulce et Decorum Est"* is the most powerful literary treatment: *"Gas! GAS! Quick, boys! — An ecstasy of fumbling / Fitting the clumsy helmets just in time; / But someone still was yelling out and stumbling / And floundering like a man in fire or lime..."*\n\nThe **Geneva Protocol of 1925** banned the use of chemical and biological weapons in war — a direct consequence of WW1. However, it was violated repeatedly in subsequent conflicts.',
        },
      ],
    },
    keyFacts: [
      'First large-scale gas attack: 22 April 1915, by Germany, at Ypres',
      'Three main agents: chlorine, phosgene (85% of deaths), mustard gas',
      'Approximately 1.3 million gas casualties across the war',
      'Gas masks became standard issue for soldiers — and horses and dogs',
      'The Geneva Protocol (1925) banned chemical weapons — a direct result of WW1',
    ],
    didYouKnow: 'The poet Wilfred Owen was temporarily blinded by a gas attack in 1918 — the experience directly inspired his poem "Dulce et Decorum Est." He recovered and returned to the front, where he was killed a week before the armistice.',
  },
  {
    slug: 'tanks',
    title: 'The Birth of the Tank',
    category: 'technology',
    year: 'September 1916',
    emoji: '🦾',
    readingTime: 4,
    summary: {
      '8-13': 'Tanks were a brand new invention in World War One. They were kept completely secret — even their name was a trick! They changed the way war was fought forever.',
      '13-18': 'The tank was Britain\'s attempt to break the trench stalemate. Developed in total secrecy, first used at the Somme in 1916, and deployed en masse at Cambrai in 1917, the tank transformed warfare — though it took time for commanders to realise its full potential.',
    },
    sections: {
      '8-13': [
        {
          heading: 'Why Were They Called "Tanks"?',
          body: 'When the British were building their new secret weapon, they needed to transport the huge metal machines by train without anyone guessing what they were. So they told everyone they were **water storage tanks** for use in the desert.\n\nThe trick worked. Even German spies who saw the mysterious covered shapes on railway wagons thought they were just big water containers. When the weapon was used in battle, the name "tank" had already stuck.',
        },
        {
          heading: 'What Tanks Could Do',
          body: 'Before tanks, infantry soldiers trying to cross No Man\'s Land faced two massive problems: **barbed wire** and **machine guns**.\n\nTanks solved both. Their huge tracks could roll right over barbed wire, crushing it flat. Their thick metal armour protected the crew inside from machine gun bullets. And they had their own weapons to fire back.\n\nWhen German soldiers saw these huge metal monsters rolling towards them for the first time, many of them simply ran away in terror.',
        },
        {
          heading: 'Not Perfect Yet',
          body: 'The first tanks were very slow (about walking pace), incredibly hot inside (up to 50°C), broke down constantly, and got stuck in deep mud. But over time they became better and better, and by the end of the war they were helping to win major battles.\n\nToday, almost every army in the world uses tanks — all because of this invention from World War One.',
        },
      ],
      '13-18': [
        {
          heading: 'Development and Secrecy',
          body: 'The tank was developed by the British Landships Committee in 1915, driven by the desire to break the trench stalemate. Engineers Ernest Swinton and William Tritton, working with the Admiralty (not the Army — hence early naval terminology like "male" and "female" variants based on armament), produced the **Mark I** prototype.\n\nThe cover name "tank" — used when transporting prototypes by rail — referred to the shape\'s resemblance to water storage containers. Security was remarkable: over 150 machines were produced before Germany learned of their existence.',
        },
        {
          heading: 'Combat Debut and Cambrai',
          body: '**15 September 1916 (Battle of Flers-Courcelette):** 49 Mark I tanks deployed. 32 reached the start line; 14 broke down before action; 9 achieved useful results. Despite limited tactical impact, the psychological effect was significant.\n\n**Battle of Cambrai (20 November 1917):** The first true massed tank assault — **476 Mark IV tanks** advancing on a 6-mile front, supported by over 1,000 guns and no preliminary bombardment (preserving surprise). The attack achieved an advance of **8 km in one day** — more than the Somme or Passchendaele achieved in months. Church bells rang in London for the first time during the war. The gains were largely lost to a German counterattack, but the proof of concept was established.',
        },
        {
          heading: 'The 1918 Revolution',
          body: 'The **Battle of Amiens (8 August 1918)** — "Black Day of the German Army" — used 604 tanks as part of a combined-arms assault: tanks, infantry, artillery, aircraft and cavalry coordinated for the first time. The German line collapsed. Ludendorff called it the worst day of the war for Germany.\n\nThe Mark V tank had improved reliability and the ability to turn without stopping. Whippet light tanks could exploit breakthroughs at cavalry speed. By November 1918, the tank-infantry-air combination had become the template for 20th-century warfare — a template that would define *Blitzkrieg* in 1940.',
        },
      ],
    },
    keyFacts: [
      'Named "tanks" as a deliberate cover story during secret development',
      'First used in battle on 15 September 1916 at the Battle of the Somme',
      'First massed tank assault: Battle of Cambrai, November 1917 — 476 tanks',
      'Mark I tanks could travel at walking pace (~6 km/h) and reached 50°C inside',
      'The 1918 combined-arms formula of tanks + infantry + aircraft became the template for modern warfare',
    ],
    didYouKnow: 'Inside a Mark I tank, the noise was so loud that crew members communicated by tapping each other with a wrench. The carbon monoxide and fuel fumes were so bad that crews had to wear goggles and breathe through damp cloths. Temperatures inside reached 50°C (122°F). Men fainted regularly.',
  },

  // ── TURNING POINTS ──────────────────────────────────────────────
  {
    slug: 'zimmermann-telegram',
    title: 'The Zimmermann Telegram',
    category: 'turning-points',
    year: 'January 1917',
    emoji: '📨',
    isWow: true,
    readingTime: 4,
    summary: {
      '8-13': 'In 1917, Germany sent a secret message to Mexico asking it to attack the United States. But British spies intercepted and decoded it — and when Americans read what Germany had planned, they were furious.',
      '13-18': 'The Zimmermann Telegram was a secret diplomatic communication from Germany to Mexico, proposing a military alliance against the USA. Its interception and publication by British intelligence in January 1917 was a decisive factor in bringing the United States into the war.',
    },
    sections: {
      '8-13': [
        {
          heading: 'Germany\'s Secret Plan',
          body: 'In January 1917, Germany\'s Foreign Secretary **Arthur Zimmermann** sent a secret telegram to Mexico. The message contained an extraordinary proposal: **Germany would help Mexico attack the United States**.\n\nIn return, Germany promised that Mexico could take back the states of Texas, New Mexico, and Arizona — which had once belonged to Mexico before the USA took them.',
        },
        {
          heading: 'The Code-Breakers',
          body: 'There was just one problem with this plan: the telegram had to travel through cables controlled by Britain. British spies in a secret department called **Room 40** had cracked Germany\'s secret codes. They decoded the telegram and were astonished at what they read.\n\nBritain gave the decoded message to the USA, and it was published in American newspapers. Americans were outraged.',
        },
        {
          heading: 'America Joins the War',
          body: 'Until this point, America had stayed out of the war. But the Zimmermann Telegram — combined with Germany\'s submarines sinking American ships — made it impossible to stay neutral.\n\nOn **6 April 1917**, the United States declared war on Germany. Over the next year, 2 million American soldiers would arrive in France, tipping the balance in the Allies\' favour.',
        },
      ],
      '13-18': [
        {
          heading: 'Room 40 and the Interception',
          body: 'The telegram, sent on 16 January 1917, was encoded in German diplomatic cipher **0075**. It was transmitted via the transatlantic cable — which ran through British-controlled waters and had been cut at the outbreak of war, forcing Germany to use routes through neutral parties, including the American diplomatic cable (which the US had naively allowed Germany to use for peace negotiations).\n\n**Room 40** — British Naval Intelligence\'s codebreaking unit at the Admiralty — had previously broken German diplomatic ciphers. The telegram was decrypted within days. Its contents were explosive: Germany proposing a military alliance with Mexico against the USA, promising *"generous financial support"* and help recovering *"the lost territory in Texas, New Mexico, and Arizona."*',
        },
        {
          heading: 'The Diplomatic Challenge',
          body: 'British intelligence faced a dilemma: publishing the telegram would bring America into the war — desperately needed after Russia\'s collapse. But publication would reveal that Britain was reading American diplomatic cables (a serious breach) and that Britain could break German codes (compromising future intelligence).\n\nDirector of Naval Intelligence **Admiral William Hall** solved this brilliantly: British agents in Mexico obtained a *retransmitted* version of the telegram (Mexico-City to local German legation) which was encoded in an older cipher. This allowed Britain to claim the telegram was obtained in Mexico, protecting both secrets.',
        },
        {
          heading: 'Impact',
          body: 'The telegram was published in American newspapers on 1 March 1917. Public outrage was immediate. **Zimmermann compounded the damage by confirming the telegram\'s authenticity** — presumably believing denial was impossible.\n\nCombined with Germany\'s resumption of unrestricted submarine warfare (February 1917, which had already sunk American ships), public opinion shifted decisively. President Wilson asked Congress for a declaration of war on 2 April 1917; it was approved 6 April.\n\nThe telegram stands as one of the most consequential intelligence coups in history.',
        },
      ],
    },
    keyFacts: [
      'Sent January 1917 by German Foreign Secretary Arthur Zimmermann',
      'Proposed that Mexico attack the USA in exchange for Texas, New Mexico, and Arizona',
      'Intercepted and decoded by Britain\'s Room 40 codebreakers',
      'Published in US newspapers on 1 March 1917',
      'Zimmermann confirmed it was genuine — a catastrophic mistake',
      'USA declared war on Germany on 6 April 1917',
    ],
    didYouKnow: 'Zimmermann confirmed the telegram was genuine in a press conference — possibly the greatest diplomatic blunder of the war. He thought he couldn\'t deny it because Mexico already had a copy. In reality, he handed America\'s war opponents their most powerful argument for entering the conflict.',
  },

  // ── AFTERMATH ──────────────────────────────────────────────
  {
    slug: 'treaty-of-versailles',
    title: 'The Treaty of Versailles',
    category: 'aftermath',
    year: '28 June 1919',
    emoji: '🕊️',
    readingTime: 6,
    summary: {
      '8-13': 'After the war ended, the countries that won made Germany sign a peace treaty. The treaty was very harsh on Germany — and many people believe it was so unfair that it led directly to World War Two, just 20 years later.',
      '13-18': 'The Treaty of Versailles (June 1919) imposed crushing terms on Germany: the "War Guilt Clause," enormous reparations, territorial losses, and military restrictions. Many historians argue it was the most consequential peace treaty of the 20th century — not for ending WW1, but for creating the conditions for WW2.',
    },
    sections: {
      '8-13': [
        {
          heading: 'The Peace Conference',
          body: 'After the war ended in November 1918, representatives from the winning countries — Britain, France, USA, and others — gathered in Paris to write a peace treaty.\n\nThe leaders of the three most powerful countries became known as the **"Big Three"**: American President **Woodrow Wilson**, British Prime Minister **David Lloyd George**, and French leader **Georges Clemenceau**.\n\nGermany was not invited to help write the treaty. They were simply told to sign it.',
        },
        {
          heading: 'What Germany Lost',
          body: 'The treaty was signed on **28 June 1919** — exactly five years after the assassination that started the war.\n\nGermany had to:\n\n📍 Give up large areas of land (including giving France back Alsace-Lorraine)\n💰 Pay enormous amounts of money called **reparations** — they were still paying them in **2010**\n⚔️ Limit their army to just 100,000 soldiers\n🌍 Give up all their overseas colonies\n😔 Accept the **"War Guilt Clause"** — officially admitting that Germany alone was responsible for starting the war',
        },
        {
          heading: 'Seeds of the Next War',
          body: 'French leader Clemenceau said something chillingly accurate at the time: *"This is not a peace. It is an armistice for twenty years."*\n\nHe was almost exactly right. World War Two began **20 years and 65 days** after the treaty was signed.\n\nMany Germans felt humiliated and betrayed. A young man named **Adolf Hitler** was furious. He used German anger about the treaty to gain political power — and that anger helped cause the Second World War.',
        },
      ],
      '13-18': [
        {
          heading: 'The "Big Three" and Their Different Goals',
          body: 'The Paris Peace Conference brought three incompatible visions into collision:\n\n**Clemenceau (France):** Wanted Germany permanently weakened, unable to threaten France again. France had been invaded twice by Germany in 50 years (1870 and 1914). He wanted maximum reparations and maximum territorial amputation.\n\n**Lloyd George (Britain):** Publicly demanded harsh terms (under pressure from a public that had just lost 900,000 men) while privately worried that humiliating Germany would create dangerous instability or drive it toward Bolshevism.\n\n**Wilson (USA):** Arrived with his **Fourteen Points** — a liberal idealist programme including national self-determination, open diplomacy, freedom of the seas, and a League of Nations. He was largely outmanoeuvred by the Europeans.',
        },
        {
          heading: 'The Terms',
          body: 'Germany\'s losses under Versailles:\n\n**Article 231 (War Guilt Clause):** Germany accepted sole responsibility for causing the war — a clause deeply resented and historically dubious.\n\n**Reparations:** 132 billion gold marks (~£6.6 billion in 1921, approximately $442 billion today). The final payment was made on **3 October 2010**.\n\n**Territory:** Alsace-Lorraine to France; North Schleswig to Denmark; Eupen and Malmedy to Belgium; Memel to Lithuania; the Polish Corridor carved through Germany isolating East Prussia; Danzig as a "Free City." Total: 13% of Germany\'s prewar territory and 10% of its population.\n\n**Military:** Army capped at 100,000; no air force; navy severely restricted; Rhineland demilitarised.\n\n**Colonies:** All German overseas territories became League of Nations mandates (effectively British and French colonies).',
        },
        {
          heading: 'Consequences: The Road to 1939',
          body: 'Germany called it the **Diktat** — a dictated peace. The combination of war guilt, reparations, and territorial losses created a grievance that saturated German political culture through the 1920s and 30s.\n\nThe **"stab-in-the-back" myth** (Dolchstoßlegende) — the lie that Germany was undefeated in the field but betrayed by civilians, Jews, and socialists — flourished in this environment. Hitler\'s entire political programme was built on reversing Versailles.\n\nClemenceau\'s prediction proved accurate to within two months: *"This is not a peace. It is an armistice for twenty years."* WW2 began on 1 September 1939 — 20 years and 65 days after the Treaty was signed on 28 June 1919.\n\nHistorians debate whether Versailles was too harsh or not harsh enough — the real problem may have been that it was harsh enough to humiliate Germany but not harsh enough to permanently incapacitate it.',
        },
      ],
    },
    keyFacts: [
      'Signed 28 June 1919 — exactly 5 years after Franz Ferdinand\'s assassination',
      'Germany lost 13% of its territory and 10% of its population',
      'Reparations of 132 billion gold marks — the final payment was made in 2010',
      'Article 231: Germany forced to accept sole responsibility for causing the war',
      'Clemenceau predicted: "This is not a peace. It is an armistice for twenty years." WW2 began 20 years and 65 days later.',
    ],
    didYouKnow: 'Germany finished paying its World War One reparations on 3 October 2010 — 92 years after the war ended. The final payment of €70 million cleared the last of the debt imposed by the Treaty of Versailles.',
  },
];

export const getTopicsByCategory = (category: TopicCategory) =>
  topics.filter(t => t.category === category);

export const getTopicBySlug = (slug: string) =>
  topics.find(t => t.slug === slug);

export const getWowTopics = () =>
  topics.filter(t => t.isWow);

export const chronologicalTopics = () =>
  [...topics].sort((a, b) => {
    if (!a.year) return 1;
    if (!b.year) return -1;
    return a.year.localeCompare(b.year);
  });
