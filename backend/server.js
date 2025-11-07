import express from "express";
import cors from "cors";
import axios from "axios";
import xml2js from "xml2js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file in the same directory as server.js
dotenv.config({ path: join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Professional brand words for domain generation
const BRAND_WORDS = [
  "Shield",
  "Pro",
  "Plus",
  "Prime",
  "Nest",
  "Assure",
  "Care",
  "Plan",
  "Protect",
  "Safe",
  "Trust",
  "Cover",
  "Secure",
  "Total",
  "Guard",
  "Edge",
  "Smart",
  "Zen",
  "Max",
  "Elite",
  "Core",
  "Hub",
  "Base",
  "Zone",
  "Spot",
  "Box",
  "Lab",
  "Works",
  "Co",
  "Group",
  "Solutions",
  "Ace",
  "Apex",
  "Arc",
  "Axis",
  "Beam",
  "Blaze",
  "Bolt",
  "Bond",
  "Boost",
  "Bridge",
  "Bright",
  "Burst",
  "Cast",
  "Champ",
  "Charm",
  "Chase",
  "Choice",
  "Circle",
  "Clear",
  "Click",
  "Cloud",
  "Code",
  "Craft",
  "Crest",
  "Crown",
  "Cube",
  "Dash",
  "Deck",
  "Deep",
  "Dive",
  "Dock",
  "Dome",
  "Drive",
  "Drop",
  "Echo",
  "Elite",
  "Emerge",
  "Emit",
  "Era",
  "Eve",
  "Ever",
  "Exact",
  "Excel",
  "Fame",
  "Fast",
  "Firm",
  "Flash",
  "Flow",
  "Focus",
  "Force",
  "Forge",
  "Form",
  "Frame",
  "Fresh",
  "Front",
  "Frost",
  "Fuse",
  "Gain",
  "Gale",
  "Gate",
  "Gaze",
  "Gear",
  "Gift",
  "Glide",
  "Glow",
  "Gold",
  "Grace",
  "Grand",
  "Graph",
  "Grasp",
  "Grid",
  "Grip",
  "Grove",
  "Grow",
  "Guide",
  "Halo",
  "Harbor",
  "Haven",
  "Haze",
  "Hear",
  "Heart",
  "Heavy",
  "Helix",
  "Hero",
  "High",
  "Hill",
  "Hint",
  "Hive",
  "Hold",
  "Hollow",
  "Honor",
  "Hope",
  "Horn",
  "Horse",
  "Host",
  "House",
  "Hue",
  "Huge",
  "Hull",
  "Hunt",
  "Idea",
  "Idle",
  "Image",
  "Impact",
  "Index",
  "Ink",
  "Inn",
  "Input",
  "Insight",
  "Intense",
  "Intent",
  "Inter",
  "Into",
  "Ion",
  "Iron",
  "Isle",
  "Item",
  "Ivory",
  "Jade",
  "Jail",
  "Jam",
  "Jar",
  "Jaw",
  "Jazz",
  "Jet",
  "Jewel",
  "Join",
  "Joint",
  "Joke",
  "Jolt",
  "Jot",
  "Joy",
  "Judge",
  "Jug",
  "Juice",
  "Jump",
  "Jungle",
  "Junk",
  "Jury",
  "Just",
  "Keen",
  "Keep",
  "Key",
  "Kick",
  "Kid",
  "Kill",
  "Kind",
  "King",
  "Kiss",
  "Kit",
  "Kite",
  "Knee",
  "Knew",
  "Knife",
  "Knight",
  "Knit",
  "Knob",
  "Knock",
  "Knot",
  "Know",
  "Label",
  "Lack",
  "Ladder",
  "Lady",
  "Lake",
  "Lamb",
  "Lamp",
  "Land",
  "Lane",
  "Language",
  "Lap",
  "Large",
  "Laser",
  "Last",
  "Late",
  "Laugh",
  "Launch",
  "Law",
  "Lawn",
  "Lay",
  "Layer",
  "Lazy",
  "Lead",
  "Leaf",
  "League",
  "Leak",
  "Lean",
  "Leap",
  "Learn",
  "Lease",
  "Least",
  "Leather",
  "Leave",
  "Lecture",
  "Left",
  "Leg",
  "Legal",
  "Legend",
  "Lemon",
  "Lend",
  "Length",
  "Lens",
  "Lent",
  "Less",
  "Lesson",
  "Let",
  "Letter",
  "Level",
  "Lever",
  "Levy",
  "Lewis",
  "Liable",
  "Liberal",
  "Library",
  "License",
  "Lid",
  "Lie",
  "Life",
  "Lift",
  "Light",
  "Like",
  "Limb",
  "Limit",
  "Line",
  "Link",
  "Lion",
  "Lip",
  "Liquid",
  "List",
  "Listen",
  "Liter",
  "Little",
  "Live",
  "Load",
  "Loan",
  "Lobby",
  "Local",
  "Lock",
  "Lodge",
  "Log",
  "Logic",
  "Lone",
  "Long",
  "Look",
  "Loop",
  "Loose",
  "Loot",
  "Lord",
  "Lose",
  "Loss",
  "Lost",
  "Lot",
  "Loud",
  "Lounge",
  "Love",
  "Low",
  "Loyal",
  "Luck",
  "Luggage",
  "Lump",
  "Lunch",
  "Lung",
  "Lure",
  "Lurk",
  "Lush",
  "Lust",
  "Luxury",
  "Lying",
  "Machine",
  "Mad",
  "Made",
  "Magic",
  "Magnet",
  "Maid",
  "Mail",
  "Main",
  "Major",
  "Make",
  "Maker",
  "Male",
  "Mall",
  "Mammal",
  "Man",
  "Manage",
  "Mango",
  "Manifest",
  "Manner",
  "Manufacturer",
  "Many",
  "Map",
  "Marble",
  "March",
  "Margin",
  "Marine",
  "Mark",
  "Market",
  "Marriage",
  "Mask",
  "Mass",
  "Master",
  "Match",
  "Material",
  "Math",
  "Matrix",
  "Matter",
  "Maximum",
  "May",
  "Maze",
  "Meadow",
  "Mean",
  "Measure",
  "Meat",
  "Mechanic",
  "Medal",
  "Media",
  "Melody",
  "Melt",
  "Member",
  "Memory",
  "Mention",
  "Menu",
  "Mercy",
  "Merge",
  "Merit",
  "Merry",
  "Mesh",
  "Message",
  "Metal",
  "Method",
  "Middle",
  "Midnight",
  "Milk",
  "Million",
  "Mimic",
  "Mind",
  "Minimum",
  "Minor",
  "Minute",
  "Miracle",
  "Mirror",
  "Misery",
  "Miss",
  "Mistake",
  "Mix",
  "Mixed",
  "Mixture",
  "Mobile",
  "Model",
  "Modify",
  "Mom",
  "Moment",
  "Monitor",
  "Monkey",
  "Monster",
  "Month",
  "Mood",
  "Moon",
  "Moral",
  "More",
  "Morning",
  "Moss",
  "Mother",
  "Motion",
  "Motor",
  "Mountain",
  "Mouse",
  "Move",
  "Movie",
  "Mow",
  "Much",
  "Muffin",
  "Mule",
  "Multiply",
  "Muscle",
  "Museum",
  "Mushroom",
  "Music",
  "Must",
  "Mutual",
  "Myself",
  "Mystery",
  "Myth",
  "Naive",
  "Name",
  "Napkin",
  "Narrow",
  "Nasty",
  "Nation",
  "Nature",
  "Near",
  "Neck",
  "Need",
  "Negative",
  "Neglect",
  "Neither",
  "Nephew",
  "Nerve",
  "Nest",
  "Net",
  "Network",
  "Neutral",
  "Never",
  "News",
  "Next",
  "Nice",
  "Night",
  "Noble",
  "Noise",
  "Nominee",
  "Noodle",
  "Normal",
  "North",
  "Nose",
  "Notable",
  "Note",
  "Nothing",
  "Notice",
  "Novel",
  "Now",
  "Nuclear",
  "Number",
  "Nurse",
  "Nut",
  "Oak",
  "Obedient",
  "Object",
  "Oblige",
  "Obscure",
  "Observe",
  "Obtain",
  "Obvious",
  "Occur",
  "Ocean",
  "October",
  "Odor",
  "Off",
  "Offer",
  "Office",
  "Often",
  "Oil",
  "Okay",
  "Old",
  "Olive",
  "Olympic",
  "Omit",
  "Once",
  "One",
  "Onion",
  "Online",
  "Only",
  "Open",
  "Opera",
  "Opinion",
  "Oppose",
  "Option",
  "Orange",
  "Orbit",
  "Orchard",
  "Order",
  "Ordinary",
  "Organ",
  "Orient",
  "Original",
  "Orphan",
  "Oscar",
  "Other",
  "Otter",
  "Ouch",
  "Ought",
  "Ounce",
  "Our",
  "Ourself",
  "Out",
  "Outdoor",
  "Outer",
  "Output",
  "Outside",
  "Outstanding",
  "Oval",
  "Oven",
  "Over",
  "Own",
  "Owner",
  "Ox",
  "Oxygen",
  "Oyster",
  "Ozone",
  "Pact",
  "Paddle",
  "Page",
  "Paid",
  "Paint",
  "Pair",
  "Palace",
  "Palm",
  "Panda",
  "Panel",
  "Panic",
  "Panther",
  "Paper",
  "Parade",
  "Parent",
  "Park",
  "Parrot",
  "Party",
  "Pass",
  "Patch",
  "Path",
  "Patient",
  "Patrol",
  "Pattern",
  "Pause",
  "Pave",
  "Payment",
  "Peace",
  "Peach",
  "Peak",
  "Peanut",
  "Pear",
  "Peasant",
  "Pelican",
  "Pen",
  "Penalty",
  "Pencil",
  "People",
  "Pepper",
  "Perfect",
  "Permit",
  "Person",
  "Pet",
  "Phone",
  "Photo",
  "Phrase",
  "Physical",
  "Piano",
  "Picnic",
  "Picture",
  "Piece",
  "Pig",
  "Pigeon",
  "Pill",
  "Pilot",
  "Pink",
  "Pioneer",
  "Pipe",
  "Pistol",
  "Pitch",
  "Pizza",
  "Place",
  "Plan",
  "Planet",
  "Plant",
  "Plastic",
  "Plate",
  "Play",
  "Playground",
  "Pleasant",
  "Please",
  "Pledge",
  "Plenty",
  "Plot",
  "Plug",
  "Plunge",
  "Poem",
  "Poet",
  "Point",
  "Polar",
  "Pole",
  "Police",
  "Pond",
  "Pony",
  "Pool",
  "Poor",
  "Popular",
  "Portion",
  "Position",
  "Possible",
  "Post",
  "Potato",
  "Pottery",
  "Poverty",
  "Powder",
  "Power",
  "Practice",
  "Praise",
  "Predict",
  "Prefer",
  "Prepare",
  "Present",
  "Pretty",
  "Prevent",
  "Price",
  "Pride",
  "Primary",
  "Print",
  "Priority",
  "Prison",
  "Private",
  "Prize",
  "Problem",
  "Process",
  "Produce",
  "Profit",
  "Program",
  "Project",
  "Promote",
  "Proof",
  "Property",
  "Prosper",
  "Protect",
  "Proud",
  "Provide",
  "Public",
  "Pudding",
  "Pull",
  "Pulp",
  "Pulse",
  "Pumpkin",
  "Punch",
  "Pupil",
  "Puppy",
  "Purchase",
  "Purity",
  "Purpose",
  "Purse",
  "Push",
  "Put",
  "Puzzle",
  "Pyramid",
  "Quality",
  "Quantum",
  "Quarter",
  "Question",
  "Quick",
  "Quiet",
  "Quilt",
  "Quit",
  "Quiz",
  "Quote",
  "Rabbit",
  "Raccoon",
  "Race",
  "Rack",
  "Radar",
  "Radio",
  "Rail",
  "Rain",
  "Raise",
  "Rally",
  "Ramp",
  "Ranch",
  "Random",
  "Range",
  "Rapid",
  "Rare",
  "Rate",
  "Rather",
  "Raven",
  "Raw",
  "Razor",
  "Ready",
  "Real",
  "Reason",
  "Rebel",
  "Rebuild",
  "Recall",
  "Receive",
  "Recipe",
  "Record",
  "Recover",
  "Recycle",
  "Red",
  "Reduce",
  "Reef",
  "Refer",
  "Refuse",
  "Region",
  "Regret",
  "Regular",
  "Reject",
  "Relax",
  "Release",
  "Relief",
  "Relieve",
  "Relish",
  "Remain",
  "Remember",
  "Remind",
  "Remove",
  "Render",
  "Renew",
  "Rent",
  "Reopen",
  "Repair",
  "Repeat",
  "Replace",
  "Reply",
  "Report",
  "Require",
  "Rescue",
  "Resemble",
  "Resist",
  "Resource",
  "Respond",
  "Result",
  "Retire",
  "Retreat",
  "Return",
  "Reunion",
  "Reveal",
  "Review",
  "Reward",
  "Rhythm",
  "Rib",
  "Ribbon",
  "Rice",
  "Rich",
  "Ride",
  "Ridge",
  "Rifle",
  "Right",
  "Rigid",
  "Ring",
  "Riot",
  "Rip",
  "Ripe",
  "Rise",
  "Risk",
  "Rival",
  "River",
  "Road",
  "Roast",
  "Robot",
  "Robust",
  "Rocket",
  "Rocky",
  "Rod",
  "Roll",
  "Roman",
  "Romance",
  "Roof",
  "Rookie",
  "Room",
  "Root",
  "Rope",
  "Rose",
  "Rotate",
  "Rough",
  "Round",
  "Route",
  "Rover",
  "Row",
  "Royal",
  "Rub",
  "Rubber",
  "Rude",
  "Rug",
  "Rule",
  "Run",
  "Runway",
  "Rural",
  "Rush",
  "Rust",
  "Ruthless",
  "Sad",
  "Saddle",
  "Sadness",
  "Safe",
  "Sail",
  "Salad",
  "Salmon",
  "Salon",
  "Salt",
  "Salute",
  "Same",
  "Sample",
  "Sand",
  "Satisfy",
  "Satoshi",
  "Sauce",
  "Sausage",
  "Save",
  "Say",
  "Scale",
  "Scan",
  "Scare",
  "Scatter",
  "Scene",
  "Scheme",
  "School",
  "Science",
  "Scissors",
  "Scorpion",
  "Scout",
  "Scrap",
  "Screen",
  "Script",
  "Scrub",
  "Sea",
  "Search",
  "Season",
  "Seat",
  "Second",
  "Secret",
  "Section",
  "Security",
  "Seed",
  "Seek",
  "Segment",
  "Select",
  "Sell",
  "Seminar",
  "Senior",
  "Sense",
  "Sentence",
  "Series",
  "Serious",
  "Servant",
  "Serve",
  "Service",
  "Session",
  "Set",
  "Setting",
  "Setup",
  "Seven",
  "Shadow",
  "Shaft",
  "Shallow",
  "Share",
  "Shed",
  "Shell",
  "Sheriff",
  "Shield",
  "Shift",
  "Shine",
  "Ship",
  "Shiver",
  "Shock",
  "Shoe",
  "Shoot",
  "Shop",
  "Short",
  "Shoulder",
  "Shove",
  "Shovel",
  "Show",
  "Shrimp",
  "Shrug",
  "Shuffle",
  "Shy",
  "Sibling",
  "Sick",
  "Side",
  "Siege",
  "Sight",
  "Sign",
  "Silent",
  "Silk",
  "Silly",
  "Silver",
  "Similar",
  "Simple",
  "Since",
  "Sing",
  "Siren",
  "Sister",
  "Sit",
  "Situation",
  "Six",
  "Size",
  "Skate",
  "Sketch",
  "Ski",
  "Skill",
  "Skin",
  "Skirt",
  "Skull",
  "Sky",
  "Slab",
  "Slam",
  "Sleep",
  "Slice",
  "Slide",
  "Slight",
  "Slim",
  "Slogan",
  "Slot",
  "Slow",
  "Slush",
  "Small",
  "Smart",
  "Smile",
  "Smoke",
  "Smooth",
  "Snack",
  "Snake",
  "Snap",
  "Sniff",
  "Snow",
  "Soap",
  "Soccer",
  "Social",
  "Sock",
  "Soda",
  "Soft",
  "Solar",
  "Soldier",
  "Solid",
  "Solution",
  "Solve",
  "Someone",
  "Song",
  "Soon",
  "Sorry",
  "Sort",
  "Soul",
  "Sound",
  "Soup",
  "Source",
  "South",
  "Space",
  "Spare",
  "Spatial",
  "Spawn",
  "Speak",
  "Special",
  "Speed",
  "Spell",
  "Spend",
  "Sphere",
  "Spice",
  "Spider",
  "Spike",
  "Spin",
  "Spirit",
  "Split",
  "Spoil",
  "Sponsor",
  "Spoon",
  "Sport",
  "Spot",
  "Spray",
  "Spread",
  "Spring",
  "Spy",
  "Square",
  "Squeeze",
  "Squirrel",
  "Stable",
  "Stadium",
  "Staff",
  "Stage",
  "Stain",
  "Stair",
  "Stake",
  "Stale",
  "Stalk",
  "Stall",
  "Stamp",
  "Stand",
  "Start",
  "State",
  "Stay",
  "Steak",
  "Steel",
  "Stem",
  "Step",
  "Stere",
  "Stick",
  "Still",
  "Sting",
  "Stir",
  "Stock",
  "Stomach",
  "Stone",
  "Stool",
  "Story",
  "Stove",
  "Strategy",
  "Street",
  "Strike",
  "String",
  "Strip",
  "Stroke",
  "Struggle",
  "Student",
  "Stuff",
  "Stumble",
  "Style",
  "Subject",
  "Submit",
  "Subway",
  "Success",
  "Such",
  "Sudden",
  "Suffer",
  "Sugar",
  "Suggest",
  "Suit",
  "Summer",
  "Sun",
  "Sunny",
  "Sunset",
  "Super",
  "Supply",
  "Support",
  "Supreme",
  "Sure",
  "Surface",
  "Surge",
  "Surprise",
  "Surround",
  "Survey",
  "Suspect",
  "Sustain",
  "Swallow",
  "Swamp",
  "Swap",
  "Swarm",
  "Swear",
  "Sweet",
  "Swift",
  "Swim",
  "Swing",
  "Switch",
  "Sword",
  "Symbol",
  "Symptom",
  "Syrup",
  "System",
  "Table",
  "Tackle",
  "Tag",
  "Tail",
  "Talent",
  "Talk",
  "Tank",
  "Tape",
  "Target",
  "Task",
  "Taste",
  "Tattoo",
  "Taxi",
  "Teach",
  "Team",
  "Tell",
  "Ten",
  "Tenant",
  "Tennis",
  "Tent",
  "Term",
  "Test",
  "Text",
  "Thank",
  "That",
  "Theme",
  "Then",
  "Theory",
  "There",
  "These",
  "Thick",
  "Thin",
  "Thing",
  "Think",
  "Third",
  "Thirsty",
  "Thirteen",
  "Thirty",
  "This",
  "Thong",
  "Thorn",
  "Those",
  "Thought",
  "Thousand",
  "Thread",
  "Threat",
  "Three",
  "Thrive",
  "Throw",
  "Thumb",
  "Thunder",
  "Thursday",
  "Thus",
  "Tide",
  "Tiger",
  "Tight",
  "Tilt",
  "Timber",
  "Time",
  "Tiny",
  "Tip",
  "Tired",
  "Tissue",
  "Title",
  "Toast",
  "Tobacco",
  "Today",
  "Toddler",
  "Toe",
  "Together",
  "Toilet",
  "Token",
  "Tomato",
  "Tomorrow",
  "Tone",
  "Tongue",
  "Tonight",
  "Tool",
  "Tooth",
  "Top",
  "Topic",
  "Topple",
  "Torch",
  "Tornado",
  "Tortoise",
  "Toss",
  "Total",
  "Tourist",
  "Toward",
  "Tower",
  "Town",
  "Toy",
  "Track",
  "Trade",
  "Traffic",
  "Tragic",
  "Train",
  "Transfer",
  "Trap",
  "Trash",
  "Travel",
  "Tray",
  "Treat",
  "Tree",
  "Trend",
  "Trial",
  "Tribe",
  "Trick",
  "Trigger",
  "Trim",
  "Trip",
  "Trophy",
  "Trouble",
  "Truck",
  "True",
  "Truly",
  "Trumpet",
  "Trust",
  "Truth",
  "Try",
  "Tube",
  "Tuesday",
  "Tuff",
  "Tumble",
  "Tuna",
  "Tunnel",
  "Turbo",
  "Turf",
  "Turn",
  "Turtle",
  "Twelve",
  "Twenty",
  "Twice",
  "Twin",
  "Twist",
  "Two",
  "Type",
  "Typical",
  "Ugly",
  "Umbrella",
  "Unable",
  "Unaware",
  "Uncle",
  "Uncover",
  "Under",
  "Undo",
  "Unfair",
  "Unfold",
  "Unhappy",
  "Uniform",
  "Unique",
  "Unit",
  "Universe",
  "Unknown",
  "Unlock",
  "Unlucky",
  "Unmask",
  "Unnecessary",
  "Unpack",
  "Unreal",
  "Unrest",
  "Unsafe",
  "Until",
  "Unusual",
  "Unveil",
  "Unwanted",
  "Unwelcome",
  "Unwell",
  "Unwind",
  "Unwrap",
  "Up",
  "Update",
  "Upgrade",
  "Uphold",
  "Upon",
  "Upper",
  "Upset",
  "Urban",
  "Urge",
  "Urgent",
  "Usage",
  "Use",
  "Used",
  "Useful",
  "Useless",
  "User",
  "Usual",
  "Utility",
  "Vacant",
  "Vacuum",
  "Vague",
  "Valid",
  "Valley",
  "Valor",
  "Valuable",
  "Value",
  "Valve",
  "Van",
  "Vanish",
  "Vapor",
  "Variable",
  "Variety",
  "Various",
  "Vast",
  "Vault",
  "Vehicle",
  "Velocity",
  "Vendor",
  "Venture",
  "Venue",
  "Verb",
  "Verify",
  "Version",
  "Versus",
  "Vertical",
  "Very",
  "Vessel",
  "Veteran",
  "Viable",
  "Vibrant",
  "Vicious",
  "Victory",
  "Video",
  "View",
  "Village",
  "Vintage",
  "Violate",
  "Violence",
  "Violent",
  "Violet",
  "Violin",
  "Virtual",
  "Virtue",
  "Virus",
  "Visa",
  "Visit",
  "Visual",
  "Vital",
  "Vivid",
  "Vocal",
  "Voice",
  "Void",
  "Volcano",
  "Volume",
  "Volunteer",
  "Vomit",
  "Vote",
  "Voucher",
  "Vow",
  "Voyage",
  "Vulnerable",
  "Wad",
  "Wage",
  "Wagon",
  "Wait",
  "Wake",
  "Walk",
  "Wall",
  "Wallet",
  "Wander",
  "Want",
  "War",
  "Ward",
  "Warm",
  "Warn",
  "Warrant",
  "Warrior",
  "Wash",
  "Wasp",
  "Waste",
  "Water",
  "Wave",
  "Way",
  "We",
  "Weak",
  "Wealth",
  "Weapon",
  "Wear",
  "Weasel",
  "Weather",
  "Weave",
  "Web",
  "Wedding",
  "Wednesday",
  "Weed",
  "Week",
  "Weird",
  "Welcome",
  "Weld",
  "Well",
  "West",
  "Wet",
  "Whale",
  "What",
  "Wheat",
  "Wheel",
  "When",
  "Where",
  "Whip",
  "Whisper",
  "Wide",
  "Width",
  "Wife",
  "Wild",
  "Will",
  "Win",
  "Window",
  "Wine",
  "Wing",
  "Wink",
  "Winner",
  "Winter",
  "Wire",
  "Wisdom",
  "Wise",
  "Wish",
  "Witness",
  "Wizard",
  "Wobble",
  "Wolf",
  "Woman",
  "Wonder",
  "Wood",
  "Wool",
  "Word",
  "Work",
  "World",
  "Worm",
  "Worry",
  "Worth",
  "Would",
  "Wound",
  "Woven",
  "Wrap",
  "Wreck",
  "Wrestle",
  "Wrist",
  "Write",
  "Wrong",
  "Wrote",
  "Yacht",
  "Yak",
  "Yam",
  "Yard",
  "Yarn",
  "Yawn",
  "Year",
  "Yellow",
  "You",
  "Young",
  "Youth",
  "Yummy",
  "Zap",
  "Zebra",
  "Zero",
  "Zone",
  "Zoo",
  "Zoom",
];

// Action/descriptive words - Prioritized with personal/possessive words first
const ACTION_WORDS = [
  // Personal/Possessive words (highest priority)
  "My",
  "Mine",
  "Your",
  "Yours",
  "Our",
  "Ours",
  "Their",
  "Theirs",
  "His",
  "Her",
  "Hers",
  "The",
  "A",
  "An",
  "This",
  "That",
  "These",
  "Those",
  // Action verbs
  "Get",
  "Go",
  "Try",
  "Use",
  "Buy",
  "Find",
  "Search",
  "Look",
  "See",
  "View",
  "Take",
  "Make",
  "Create",
  "Build",
  "Start",
  "Begin",
  "Join",
  "Sign",
  "Register",
  "Call",
  "Contact",
  "Connect",
  "Link",
  "Share",
  "Save",
  "Store",
  "Keep",
  "Hold",
  // Quality descriptors
  "Best",
  "Top",
  "Prime",
  "Elite",
  "Super",
  "Ultra",
  "Mega",
  "Max",
  "Pro",
  "Plus",
  "Premium",
  "Gold",
  "Platinum",
  "Vip",
  "Deluxe",
  "Luxury",
  "Exclusive",
  "Select",
  "New",
  "Next",
  "Fresh",
  "Modern",
  "Smart",
  "Fast",
  "Quick",
  "Easy",
  "Simple",
  "Now",
  "Today",
  "Here",
  "Online",
  "Digital",
  "Tech",
  "Cloud",
  "AI",
  "Smart",
];

// Generate domain ideas using custom algorithm
// IMPORTANT: All generated domains MUST include ALL words from the keyword
function generateDomainIdeas(keyword, tld, maxSuggestions = 250) {
  const suggestions = new Set();
  const keywordLower = keyword.toLowerCase().trim();
  const keywordWords = keywordLower.split(/\s+/).filter((w) => w.length > 0);

  // Clean keyword for domain use (remove spaces, special chars) - this includes ALL words
  const cleanKeyword = keywordWords.join(""); // e.g., "homewarranty" from "home warranty"

  // Helper to create brand name - ensures full keyword is always included
  const createBrand = (part1, part2) => {
    const domain = `${part1}${part2}`.toLowerCase();
    if (domain.length >= 3 && domain.length <= 50) {
      return `${domain}.${tld}`;
    }
    return null;
  };

  // Helper to create three-part brand name - ensures full keyword is always included
  const createThreePart = (part1, part2, part3) => {
    const domain = `${part1}${part2}${part3}`.toLowerCase();
    if (domain.length >= 3 && domain.length <= 50) {
      return `${domain}.${tld}`;
    }
    return null;
  };

  // Get focused brand words (first 80 most professional)
  const focusedBrandWords = BRAND_WORDS.slice(0, 80);
  // Use ALL action words (prioritized with personal/possessive words first)
  const focusedActionWords = ACTION_WORDS; // Use all action words

  // Pattern 1: Action Word + Full Keyword (PRIORITIZED - e.g., "myhomewarranty", "yourhomewarranty", "gethomewarranty")
  // This ensures ALL keyword words are included and gives variety with personal/possessive words
  for (const actionWord of focusedActionWords) {
    if (suggestions.size >= maxSuggestions) break;
    const domain = createBrand(actionWord.toLowerCase(), cleanKeyword);
    if (domain) suggestions.add(domain);
  }

  // Pattern 2: Full Keyword + Action Word (e.g., "homewarrantynow", "homewarrantygo")
  // This ensures ALL keyword words are included
  for (const actionWord of focusedActionWords) {
    if (suggestions.size >= maxSuggestions) break;
    const domain = createBrand(cleanKeyword, actionWord.toLowerCase());
    if (domain) suggestions.add(domain);
  }

  // Pattern 3: Brand Word + Full Keyword (e.g., "basehomewarranty", "elitehomewarranty")
  // This ensures ALL keyword words are included
  for (const brandWord of focusedBrandWords) {
    if (suggestions.size >= maxSuggestions) break;
    const domain = createBrand(brandWord.toLowerCase(), cleanKeyword);
    if (domain) suggestions.add(domain);
  }

  // Pattern 4: Full Keyword + Brand Word (e.g., "homewarrantypro", "homewarrantyplus")
  // This ensures ALL keyword words are included
  for (const brandWord of focusedBrandWords) {
    if (suggestions.size >= maxSuggestions) break;
    const domain = createBrand(cleanKeyword, brandWord.toLowerCase());
    if (domain) suggestions.add(domain);
  }

  // Pattern 5: Brand Word + Full Keyword + Brand Word (e.g., "basehomewarrantypro")
  // This ensures ALL keyword words are included with brand words on both sides
  for (const brandWord1 of focusedBrandWords.slice(0, 40)) {
    if (suggestions.size >= maxSuggestions) break;
    for (const brandWord2 of focusedBrandWords.slice(0, 20)) {
      if (suggestions.size >= maxSuggestions) break;
      const domain = createThreePart(
        brandWord1.toLowerCase(),
        cleanKeyword,
        brandWord2.toLowerCase()
      );
      if (domain) suggestions.add(domain);
    }
  }

  // Pattern 6: Action Word + Full Keyword + Brand Word (PRIORITIZED - e.g., "myhomewarrantypro", "yourhomewarrantyplus")
  // This ensures ALL keyword words are included with personal/possessive words
  for (const actionWord of focusedActionWords.slice(0, 30)) {
    // Use more action words
    if (suggestions.size >= maxSuggestions) break;
    for (const brandWord of focusedBrandWords.slice(0, 40)) {
      if (suggestions.size >= maxSuggestions) break;
      const domain = createThreePart(
        actionWord.toLowerCase(),
        cleanKeyword,
        brandWord.toLowerCase()
      );
      if (domain) suggestions.add(domain);
    }
  }

  // Pattern 7: Brand Word + Full Keyword + Action Word (e.g., "basehomewarrantynow")
  // This ensures ALL keyword words are included
  for (const brandWord of focusedBrandWords.slice(0, 30)) {
    if (suggestions.size >= maxSuggestions) break;
    for (const actionWord of focusedActionWords.slice(0, 30)) {
      // Use more action words
      if (suggestions.size >= maxSuggestions) break;
      const domain = createThreePart(
        brandWord.toLowerCase(),
        cleanKeyword,
        actionWord.toLowerCase()
      );
      if (domain) suggestions.add(domain);
    }
  }

  // Pattern 7b: Action Word + Full Keyword + Action Word (e.g., "myhomewarrantynow", "yourhomewarrantygo")
  // This ensures ALL keyword words are included with personal/possessive words
  for (const actionWord1 of focusedActionWords.slice(0, 20)) {
    if (suggestions.size >= maxSuggestions) break;
    for (const actionWord2 of focusedActionWords.slice(0, 15)) {
      if (suggestions.size >= maxSuggestions) break;
      const domain = createThreePart(
        actionWord1.toLowerCase(),
        cleanKeyword,
        actionWord2.toLowerCase()
      );
      if (domain) suggestions.add(domain);
    }
  }

  // Pattern 8: Extended variations with FULL keyword (PRIORITIZED with personal/possessive words)
  // All variations include the complete keyword
  const variations = [
    // Personal/Possessive words first (highest priority)
    `my${cleanKeyword}`,
    `mine${cleanKeyword}`,
    `your${cleanKeyword}`,
    `yours${cleanKeyword}`,
    `our${cleanKeyword}`,
    `ours${cleanKeyword}`,
    `their${cleanKeyword}`,
    `theirs${cleanKeyword}`,
    `his${cleanKeyword}`,
    `her${cleanKeyword}`,
    `hers${cleanKeyword}`,
    `the${cleanKeyword}`,
    `this${cleanKeyword}`,
    `that${cleanKeyword}`,
    // Action verbs
    `get${cleanKeyword}`,
    `go${cleanKeyword}`,
    `try${cleanKeyword}`,
    `use${cleanKeyword}`,
    `buy${cleanKeyword}`,
    `find${cleanKeyword}`,
    `search${cleanKeyword}`,
    `look${cleanKeyword}`,
    `see${cleanKeyword}`,
    `view${cleanKeyword}`,
    `take${cleanKeyword}`,
    `make${cleanKeyword}`,
    `create${cleanKeyword}`,
    `build${cleanKeyword}`,
    `start${cleanKeyword}`,
    `join${cleanKeyword}`,
    `sign${cleanKeyword}`,
    `register${cleanKeyword}`,
    `call${cleanKeyword}`,
    `contact${cleanKeyword}`,
    // Quality descriptors
    `best${cleanKeyword}`,
    `top${cleanKeyword}`,
    `prime${cleanKeyword}`,
    `elite${cleanKeyword}`,
    `super${cleanKeyword}`,
    `ultra${cleanKeyword}`,
    `mega${cleanKeyword}`,
    `max${cleanKeyword}`,
    `premium${cleanKeyword}`,
    `gold${cleanKeyword}`,
    `platinum${cleanKeyword}`,
    `vip${cleanKeyword}`,
    `new${cleanKeyword}`,
    `next${cleanKeyword}`,
    `fresh${cleanKeyword}`,
    `modern${cleanKeyword}`,
    `smart${cleanKeyword}`,
    `fast${cleanKeyword}`,
    `quick${cleanKeyword}`,
    `easy${cleanKeyword}`,
    `simple${cleanKeyword}`,
    // Suffix variations
    `${cleanKeyword}now`,
    `${cleanKeyword}pro`,
    `${cleanKeyword}plus`,
    `${cleanKeyword}hub`,
    `${cleanKeyword}co`,
    `${cleanKeyword}app`,
    `${cleanKeyword}net`,
    `${cleanKeyword}io`,
    `${cleanKeyword}tech`,
    `${cleanKeyword}ai`,
    `${cleanKeyword}cloud`,
    `${cleanKeyword}space`,
    `${cleanKeyword}zone`,
    `${cleanKeyword}best`,
    `${cleanKeyword}top`,
    `${cleanKeyword}prime`,
    `${cleanKeyword}elite`,
    `${cleanKeyword}super`,
    `${cleanKeyword}ultra`,
    `${cleanKeyword}mega`,
    `${cleanKeyword}max`,
    `${cleanKeyword}go`,
    `${cleanKeyword}try`,
    `${cleanKeyword}use`,
    `${cleanKeyword}buy`,
    `${cleanKeyword}online`,
    `${cleanKeyword}digital`,
    `${cleanKeyword}smart`,
    `${cleanKeyword}fast`,
    `${cleanKeyword}new`,
    `${cleanKeyword}next`,
    `${cleanKeyword}premium`,
    `${cleanKeyword}gold`,
  ];

  for (const variation of variations) {
    if (suggestions.size >= maxSuggestions) break;
    const domain = `${variation}.${tld}`;
    if (variation.length >= 3 && variation.length <= 50) {
      suggestions.add(domain);
    }
  }

  // Pattern 9: Additional brand word combinations with FULL keyword
  // Generate more combinations with popular brand words
  const popularBrandWords = [
    "Pro",
    "Plus",
    "Prime",
    "Elite",
    "Max",
    "Ultra",
    "Super",
    "Mega",
    "Shield",
    "Guard",
    "Safe",
    "Secure",
    "Trust",
    "Care",
    "Plan",
    "Nest",
    "Hub",
    "Base",
    "Zone",
    "Spot",
    "Box",
    "Lab",
    "Works",
    "Co",
    "Solutions",
  ];

  for (const brandWord of popularBrandWords) {
    if (suggestions.size >= maxSuggestions) break;
    // Brand word before keyword
    const domain1 = createBrand(brandWord.toLowerCase(), cleanKeyword);
    if (domain1) suggestions.add(domain1);
    // Brand word after keyword
    if (suggestions.size < maxSuggestions) {
      const domain2 = createBrand(cleanKeyword, brandWord.toLowerCase());
      if (domain2) suggestions.add(domain2);
    }
  }

  const result = Array.from(suggestions).slice(0, maxSuggestions);
  console.log(
    `Generated ${result.length} domain suggestions (all include full keyword: "${keyword}")`
  );
  return result;
}

// Check domain availability via Namecheap API
async function checkDomains(domainList) {
  const apiUser = process.env.NC_API_USER;
  const apiKey = process.env.NC_API_KEY;
  const username = process.env.NC_USERNAME;
  const clientIp = process.env.CLIENT_IP;

  if (!apiUser || !apiKey || !username || !clientIp) {
    throw new Error(
      "Missing Namecheap API credentials in environment variables"
    );
  }

  // Namecheap API allows checking up to 50 domains per request
  const batchSize = 50;
  const batches = [];

  for (let i = 0; i < domainList.length; i += batchSize) {
    batches.push(domainList.slice(i, i + batchSize));
  }

  const allResults = [];

  for (const batch of batches) {
    const domainListStr = batch.join(",");
    const url = `https://api.namecheap.com/xml.response?ApiUser=${encodeURIComponent(
      apiUser
    )}&ApiKey=${encodeURIComponent(apiKey)}&UserName=${encodeURIComponent(
      username
    )}&Command=namecheap.domains.check&ClientIp=${encodeURIComponent(
      clientIp
    )}&DomainList=${encodeURIComponent(domainListStr)}`;

    try {
      console.log(`Checking batch of ${batch.length} domains...`);
      const response = await axios.get(url, {
        timeout: 30000,
        headers: {
          Accept: "application/xml",
        },
      });

      // Log raw response for debugging (first 500 chars only)
      if (batches.indexOf(batch) === 0) {
        const responseStr =
          typeof response.data === "string"
            ? response.data
            : String(response.data);
        console.log(
          "API Response (first 500 chars):",
          responseStr.substring(0, Math.min(500, responseStr.length))
        );
      }

      // Parse XML response
      const parser = new xml2js.Parser();
      const xmlData =
        typeof response.data === "string"
          ? response.data
          : String(response.data);

      // Validate XML before parsing
      if (!xmlData || xmlData.trim().length === 0) {
        throw new Error("Empty response from Namecheap API");
      }

      let result;
      try {
        result = await parser.parseStringPromise(xmlData);
      } catch (parseError) {
        console.error("XML Parse Error:", parseError.message);
        console.error(
          "Response data (first 1000 chars):",
          xmlData.substring(0, Math.min(1000, xmlData.length))
        );
        throw new Error(
          `Failed to parse XML response: ${parseError.message}`
        );
      }

      // Check for API errors first
      if (result.ApiResponse && result.ApiResponse.Errors) {
        const errors = result.ApiResponse.Errors[0];
        if (errors && errors.Error) {
          const errorMessages = Array.isArray(errors.Error)
            ? errors.Error.map((e) =>
              typeof e === "string" ? e : e._ || e
            )
            : [
              typeof errors.Error === "string"
                ? errors.Error
                : errors.Error._ || errors.Error,
            ];
          throw new Error(
            `Namecheap API Error: ${errorMessages.join(", ")}`
          );
        }
      }

      // Extract domain check results
      if (result.ApiResponse && result.ApiResponse.CommandResponse) {
        const commandResponse = result.ApiResponse.CommandResponse[0];
        if (commandResponse.DomainCheckResult) {
          const checkResults = commandResponse.DomainCheckResult;
          for (const domainResult of checkResults) {
            const domain = domainResult.$.Domain;
            const available = domainResult.$.Available === "true";
            if (available) {
              allResults.push(domain);
            }
          }
        } else {
          console.warn("No DomainCheckResult found in API response");
        }
      } else {
        console.warn(
          "Unexpected API response structure:",
          JSON.stringify(result, null, 2)
        );
        throw new Error("Unexpected API response structure");
      }

      // Add a small delay between batches to avoid rate limiting
      if (batches.length > 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error(`Error checking batch: ${error.message}`);
      if (error.response) {
        const errorData =
          typeof error.response.data === "string"
            ? error.response.data.substring(0, 500)
            : JSON.stringify(error.response.data);
        console.error("Error response data:", errorData);
      } else {
        console.error("Error stack:", error.stack);
      }
      // If it's a credential or API error, throw it up
      if (
        error.message.includes("Namecheap API Error") ||
        error.message.includes("Missing Namecheap API credentials") ||
        error.message.includes("Unexpected API response") ||
        error.message.includes("timeout")
      ) {
        throw error;
      }
      // Continue with next batch for other errors
    }
  }

  return allResults;
}
// Endpoint to find your current IP
app.get("/api/server-ip", async (req, res) => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    res.json({
      ip: response.data.ip,
      message: "Add this IP to Namecheap whitelist",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// API endpoint
app.get("/api/domains", async (req, res) => {
  try {
    console.log("Received request:", {
      keyword: req.query.keyword,
      tld: req.query.tld,
    });

    const { keyword, tld } = req.query;

    if (!keyword || !tld) {
      return res.status(400).json({
        error: "Missing required parameters: keyword and tld",
      });
    }

    const ipResponse = await axios.get("https://api.ipify.org?format=json");
    const clientServerIp = ipResponse.data.ip;

    // Check Namecheap credentials
    const apiUser = process.env.NC_API_USER;
    const apiKey = process.env.NC_API_KEY;
    const username = process.env.NC_USERNAME;
    const clientIp = clientServerIp;

    if (!apiUser || !apiKey || !username || !clientIp) {
      console.error("Missing credentials:", {
        hasApiUser: !!apiUser,
        hasApiKey: !!apiKey,
        hasUsername: !!username,
        hasClientIp: !!clientIp,
      });
      return res.status(500).json({
        error: "Failed to check domains",
        message:
          "Please configure your Namecheap API credentials in the .env file. Required: NC_API_USER, NC_API_KEY, NC_USERNAME, CLIENT_IP",
      });
    }

    // Validate credentials are not placeholders
    if (
      apiUser === "your_user" ||
      apiKey === "your_key" ||
      username === "your_name" ||
      clientIp === "your_ip"
    ) {
      return res.status(500).json({
        error: "Failed to check domains",
        message:
          "Please update your .env file with actual Namecheap API credentials (not placeholder values)",
      });
    }

    // Step 1: Generate domain ideas (250+ to ensure we get 200+ available)
    console.log("Generating domain ideas...");
    const domainIdeas = generateDomainIdeas(keyword, tld, 250);
    console.log(`Generated ${domainIdeas.length} domain suggestions`);

    if (domainIdeas.length === 0) {
      return res.status(500).json({
        error: "Failed to generate domains",
        message: "No domain suggestions generated. Please try again.",
      });
    }

    // Step 2: Check availability with Namecheap
    console.log("Checking domain availability with Namecheap...");
    const availableDomains = await checkDomains(domainIdeas);
    console.log(
      `Found ${availableDomains.length} available domains out of ${domainIdeas.length} checked`
    );

    res.json({
      keyword,
      tld,
      totalGenerated: domainIdeas.length,
      available: availableDomains.length,
      domains: availableDomains,
    });
  } catch (error) {
    console.error("Error in /api/domains:", error);
    console.error("Error stack:", error.stack);
    const errorMessage = error.message || "Unknown error occurred";

    // Provide more helpful error messages
    let userMessage = errorMessage;
    if (errorMessage.includes("Missing Namecheap API credentials")) {
      userMessage =
        "Please configure your Namecheap API credentials in the .env file";
    } else if (errorMessage.includes("Namecheap API Error")) {
      userMessage = errorMessage;
    } else if (errorMessage.includes("timeout")) {
      userMessage = "Request timed out. Please try again.";
    } else if (
      errorMessage.includes("ECONNREFUSED") ||
      errorMessage.includes("ENOTFOUND")
    ) {
      userMessage =
        "Unable to connect to Namecheap API. Please check your internet connection.";
    } else if (errorMessage.includes("Failed to parse XML")) {
      userMessage =
        "Error parsing response from Namecheap API. Please check your API credentials and try again.";
    } else if (errorMessage.includes("Empty response")) {
      userMessage =
        "Received empty response from Namecheap API. Please check your API credentials.";
    }

    res.status(500).json({
      error: "Failed to check domains",
      message: userMessage,
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  const hasCredentials = !!(
    process.env.NC_API_USER &&
    process.env.NC_API_KEY &&
    process.env.NC_USERNAME &&
    process.env.CLIENT_IP
  );
  res.json({
    status: "ok",
    hasCredentials,
    port: PORT,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // console.log(`Environment check:`);
  // console.log(`  NC_API_USER: ${process.env.NC_API_USER ? 'Set' : 'NOT SET'}`);
  // console.log(`  NC_API_KEY: ${process.env.NC_API_KEY ? 'Set' : 'NOT SET'}`);
  // console.log(`  NC_USERNAME: ${process.env.NC_USERNAME ? 'Set' : 'NOT SET'}`);
  // console.log(`  CLIENT_IP: ${process.env.CLIENT_IP ? 'Set' : 'NOT SET'}`);
});