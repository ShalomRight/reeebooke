export interface Service {
  id?: string;
  category: "Natural Hair" | "Locs" | "Color & Chemical";
  name: string;
  description: string;
  imagePrompt: string;
  priceDisplay: string;
  priceMin: number; // in cents
  isUpgrade?: boolean;
}

export const ACCOUNTS_SERVICES: Service[] = [
  // --- NATURAL HAIR ---
  {
    category: "Natural Hair",
    name: "Wash & Treatment",
    description: "Deep cleansing shampoo and conditioning treatment for natural hair",
    imagePrompt: "A stylist washing a client's natural coily hair at a shampoo bowl, salon setting, warm lighting",
    priceDisplay: "$90–$100",
    priceMin: 9000
  },
  {
    category: "Natural Hair",
    name: "Hair Cut / Trim / Shaping",
    description: "Precision cut, trim or shape to remove split ends and define style",
    imagePrompt: "Close-up of scissors trimming natural curly hair ends, professional salon",
    priceDisplay: "$40+",
    priceMin: 4000
  },
  {
    category: "Natural Hair",
    name: "Flat Twists, Single Plaits or Twists",
    description: "Protective styling with flat twists, individual plaits or two-strand twists",
    imagePrompt: "Beautiful woman with neat flat twists or box braids, natural hair, studio portrait",
    priceDisplay: "$95–$120",
    priceMin: 9500
  },
  {
    category: "Natural Hair",
    name: "Curl Defining Service (Wash & Go / Finger Curls)",
    description: "Enhances and defines natural curl pattern after wash",
    imagePrompt: "Woman with defined, bouncy natural curls, glossy, hydrated coils, portrait",
    priceDisplay: "$95–$120",
    priceMin: 9500
  },
  {
    category: "Natural Hair",
    name: "Twist-Out (Dried & Separated in Salon)",
    description: "Two-strand twists dried and unravelled for a fluffy defined look",
    imagePrompt: "Woman with a voluminous twist-out hairstyle, elongated natural curls, studio lighting",
    priceDisplay: "$110–$150",
    priceMin: 11000
  },
  {
    category: "Natural Hair",
    name: "Rod Set (Dried & Separated in Salon)",
    description: "Perm rods used to create uniform bouncy curls, dried in salon",
    imagePrompt: "Woman with bouncy uniform rod set curls, natural hair, bright salon setting",
    priceDisplay: "$110–$150",
    priceMin: 11000
  },
  {
    category: "Natural Hair",
    name: "Ponytail or Updo (Hair Provided by Client)",
    description: "Elegant ponytail or updo style using client's own hair",
    imagePrompt: "Sleek or voluminous updo on a Black woman, elegant styling, professional photo",
    priceDisplay: "$120+",
    priceMin: 12000
  },
  {
    category: "Natural Hair",
    name: "Silk Press (Includes Trim & Treatment)",
    description: "Heat styling that straightens natural hair to a silky smooth finish",
    imagePrompt: "Black woman with silky, straight pressed natural hair, shiny and smooth, portrait",
    priceDisplay: "$150–$170",
    priceMin: 15000
  },
  {
    category: "Natural Hair",
    name: "Keratin Smoothing Treatment",
    description: "Chemical smoothing treatment to reduce frizz and add shine long-term",
    imagePrompt: "Before and after of frizzy to smooth sleek hair after keratin treatment, salon",
    priceDisplay: "$300–$350",
    priceMin: 30000
  },
  {
    category: "Natural Hair",
    name: "Wash, Treat & Style Combo",
    description: "Full service: wash, treatment and a finished style in one appointment",
    imagePrompt: "Woman leaving salon with freshly styled natural hair, glowing and polished look",
    priceDisplay: "$130–$150",
    priceMin: 13000
  },
  {
    category: "Natural Hair",
    name: "➕ Luxe Treatment Upgrade (Steam)",
    description: "Add steam to boost treatment absorption — includes Olaplex Repair, Ultra Hydration or Deep Restoration",
    imagePrompt: "Steamer machine over a client's hair in a salon, deep conditioning treatment",
    priceDisplay: "+$25",
    priceMin: 2500,
    isUpgrade: true
  },
  {
    category: "Natural Hair",
    name: "➕ Take Down & Detangling",
    description: "Removal of natural protective styles and detangling service",
    imagePrompt: "Stylist carefully detangling natural coily hair with a wide tooth comb, salon",
    priceDisplay: "$20/hr",
    priceMin: 2000,
    isUpgrade: true
  },

  // --- LOC SERVICES ---
  {
    category: "Locs",
    name: "Wash & Treat (Moisture / Protein / Hot Oil)",
    description: "Cleansing and targeted treatment for locs",
    imagePrompt: "Stylist washing a client's locs at a shampoo bowl, water and suds, salon",
    priceDisplay: "$90–$120",
    priceMin: 9000
  },
  {
    category: "Locs",
    name: "Cut / Trim",
    description: "Trimming and shaping of locs",
    imagePrompt: "Close-up of scissors trimming the ends of thick mature locs, salon",
    priceDisplay: "$40+",
    priceMin: 4000
  },
  {
    category: "Locs",
    name: "Starter Locs w/ Coils or Twists",
    description: "Creating brand new locs using coils or two-strand twists",
    imagePrompt: "Woman with fresh neat starter locs, small coils or twists at the root, portrait",
    priceDisplay: "$120–$150",
    priceMin: 12000
  },
  {
    category: "Locs",
    name: "Loc Wash, Retwist & Style",
    description: "Full loc maintenance: wash, retwist new growth and finished styling",
    imagePrompt: "Woman with freshly retwisted locs, neat roots, polished look, studio portrait",
    priceDisplay: "$120+",
    priceMin: 12000
  },
  {
    category: "Locs",
    name: "Loc Wash, Retwist & Style (w/ High Fade)",
    description: "Same as above but includes a high fade haircut for the client",
    imagePrompt: "Man with locs and a fresh high fade haircut, barbershop and salon combo",
    priceDisplay: "$100+",
    priceMin: 10000
  },
  {
    category: "Locs",
    name: "Loc Retwist & Style (No Wash)",
    description: "Retwist of new growth and style, no wash included",
    imagePrompt: "Close-up of neat freshly twisted loc roots, scalp visible between parts",
    priceDisplay: "$95",
    priceMin: 9500
  },
  {
    category: "Locs",
    name: "Loc Detox",
    description: "Deep cleansing treatment to remove buildup from locs",
    imagePrompt: "Steaming locs during a deep detox treatment, clean and refreshed look",
    priceDisplay: "$90+",
    priceMin: 9000
  },
  {
    category: "Locs",
    name: "Loc Detox, Retwist & Style",
    description: "Complete loc refresh: detox, retwist and finished style",
    imagePrompt: "Woman with clean, refreshed, retwisted locs after detox, glowing healthy locs",
    priceDisplay: "$160–$180",
    priceMin: 16000
  },
  {
    category: "Locs",
    name: "➕ Luxe Treatment Upgrade (Steam)",
    description: "Steam upgrade with Strengthening & Repair or Ultra Hydration options",
    imagePrompt: "Close-up of a steamer over locs during a deep conditioning session",
    priceDisplay: "+$25",
    priceMin: 2500,
    isUpgrade: true
  },

  // --- COLOR & CHEMICAL SERVICES ---
  {
    category: "Color & Chemical",
    name: "Single Process Colour / Grey Retouch",
    description: "One color applied all over or to cover grey roots",
    imagePrompt: "Stylist applying hair dye to a client's hair, colour bowl and brush, salon",
    priceDisplay: "$100+",
    priceMin: 10000
  },
  {
    category: "Color & Chemical",
    name: "Double Process Colour (Bleach + Color)",
    description: "Hair is lightened first then toned or colored for vibrant results",
    imagePrompt: "Woman with dramatic lightened and colored hair, bold highlights, salon portrait",
    priceDisplay: "$200+",
    priceMin: 20000
  },
  {
    category: "Color & Chemical",
    name: "Highlights",
    description: "Partial or full highlights for dimension and brightness",
    imagePrompt: "Woman with sun-kissed highlights through dark hair, foils in salon setting",
    priceDisplay: "$200+",
    priceMin: 20000
  },
  {
    category: "Color & Chemical",
    name: "Color Consultation",
    description: "Sit-down consultation to plan your color goals and process",
    imagePrompt: "Stylist and client looking at color swatches together in a bright salon",
    priceDisplay: "$40",
    priceMin: 4000
  },
  {
    category: "Color & Chemical",
    name: "Virgin Relaxer",
    description: "First-time chemical relaxer applied to naturally curly hair",
    imagePrompt: "Before and after of natural coily hair transformed to straight relaxed hair",
    priceDisplay: "$200–$250",
    priceMin: 20000
  },
  {
    category: "Color & Chemical",
    name: "Relaxer Retouch & Style",
    description: "Relaxer applied to new growth only, finished with a style",
    imagePrompt: "Woman with freshly relaxed, sleek straight hair, neat and polished, salon",
    priceDisplay: "$140–$160",
    priceMin: 14000
  },
  {
    category: "Color & Chemical",
    name: "Relaxer Retouch, Treatment & Style",
    description: "Retouch plus a conditioning treatment and finished style",
    imagePrompt: "Stylist blow-drying and styling freshly relaxed hair, smooth and shiny",
    priceDisplay: "$160–$180",
    priceMin: 16000
  },
  {
    category: "Color & Chemical",
    name: "Wash, Treat & Style (Previously Relaxed Hair)",
    description: "For already-relaxed clients needing a fresh wash, treat and style",
    imagePrompt: "Woman with relaxed hair being blow-dried and flat ironed in a salon",
    priceDisplay: "$100",
    priceMin: 10000
  },
  {
    category: "Color & Chemical",
    name: "Cut or Trim",
    description: "Precision cut or trim to complement color or chemical service",
    imagePrompt: "Stylist trimming freshly colored straight hair, scissors and comb, salon",
    priceDisplay: "$40+",
    priceMin: 4000
  },
  {
    category: "Color & Chemical",
    name: "➕ Luxe Treatment Upgrade (Steam)",
    description: "Steam enhancement with Olaplex Repair, Ultra Hydration or Deep Restoration",
    imagePrompt: "Steamer over color-treated hair during a deep conditioning treatment, salon",
    priceDisplay: "+$25",
    priceMin: 2500,
    isUpgrade: true
  }
];
