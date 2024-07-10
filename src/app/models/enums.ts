// models/enums.js

export type FriendshipStatus = 'pending' | 'accepted' | 'blocked';
export type Interest = 'sports' | 'music' | 'films' | 'literature' | 'food' | 'travel' | 'games' | 'fashion' | 'art' | 'technology' | 'politics' | 'science' | 'history' | 'nature' | 'health' | 'fitness' | 'education' | 'business' | 'finance' | 'religion' | 'philosophy' | 'psychology' | 'sociology' | 'languages' | 'other';
export type Language = "Mandarin Chinese" | "Spanish" | "English" | "Hindi" | "Arabic" | "Bengali" | "Portuguese" | "Russian" | "Japanese" | "Western Punjabi" | "Marathi" | "Telugu" | "Wu Chinese" | "Turkish" | "Korean" | "French" | "German" | "Vietnamese" | "Tamil" | "Yue Chinese (Cantonese)" | "Urdu" | "Javanese" | "Italian" | "Egyptian Arabic" | "Gujarati" | "Iranian Persian" | "Bhojpuri" | "Southern Min" | "Hakka Chinese" | "Jin Chinese" | "Hausa" | "Kannada" | "Indonesian" | "Polish" | "Yoruba" | "Xiang Chinese" | "Malayalam" | "Odia" | "Maithili" | "Burmese" | "Eastern Punjabi" | "Sunda" | "Sudanese Arabic" | "Algerian Arabic" | "Moroccan Arabic" | "Ukrainian" | "Igbo" | "Northern Uzbek" | "Sindhi" | "North Levantine Arabic" | "Romanian" | "Tagalog" | "Dutch" | "Saʽidi Arabic" | "Gan Chinese" | "Amharic" | "Northern Pashto" | "Magahi" | "Thai" | "Saraiki" | "Khmer" | "Chhattisgarhi" | "Somali" | "Malay" | "Cebuano" | "Nepali" | "Mesopotamian Arabic" | "Assamese" | "Sinhala" | "Northern Kurdish" | "Hejazi Arabic" | "Nigerian Fulfulde" | "Bavarian" | "South Azerbaijani" | "Greek" | "Chittagonian" | "Kazakh" | "Deccan" | "Hungarian" | "Kinyarwanda" | "Zulu" | "Czech" | "Dhundhari" | "Haitian Creole" | "Eastern Min" | "Ilocano" | "Quechua" | "Kirundi" | "Swedish" | "Hmong" | "Shona" | "Uyghur" | "Hiligaynon" | "Mossi" | "Central Kurdish" | "Akan" | "Ojibwe" | "Belarusian" | "Tatar" | "Tswana" | "Sotho" | "Balochi";
export type Icebreaker = string;

export const friendshipStatuses: FriendshipStatus[] = ['pending', 'accepted', 'blocked'];
export const interests: Interest[]  =['sports', 'music', 'films', 'literature', 'food', 'travel', 'games', 'fashion', 'art', 'technology', 'politics', 'science', 'history', 'nature', 'health', 'fitness', 'education', 'business', 'finance', 'religion', 'philosophy', 'psychology', 'sociology', 'languages', 'other']
export const languages: Language[] = [
    "Mandarin Chinese",
    "Spanish",
    "English",
    "Hindi",
    "Arabic",
    "Bengali",
    "Portuguese",
    "Russian",
    "Japanese",
    "Western Punjabi",
    "Marathi",
    "Telugu",
    "Wu Chinese",
    "Turkish",
    "Korean",
    "French",
    "German",
    "Vietnamese",
    "Tamil",
    "Yue Chinese (Cantonese)",
    "Urdu",
    "Javanese",
    "Italian",
    "Egyptian Arabic",
    "Gujarati",
    "Iranian Persian",
    "Bhojpuri",
    "Southern Min",
    "Hakka Chinese",
    "Jin Chinese",
    "Hausa",
    "Kannada",
    "Indonesian",
    "Polish",
    "Yoruba",
    "Xiang Chinese",
    "Malayalam",
    "Odia",
    "Maithili",
    "Burmese",
    "Eastern Punjabi",
    "Sunda",
    "Sudanese Arabic",
    "Algerian Arabic",
    "Moroccan Arabic",
    "Ukrainian",
    "Igbo",
    "Northern Uzbek",
    "Sindhi",
    "North Levantine Arabic",
    "Romanian",
    "Tagalog",
    "Dutch",
    "Saʽidi Arabic",
    "Gan Chinese",
    "Amharic",
    "Northern Pashto",
    "Magahi",
    "Thai",
    "Saraiki",
    "Khmer",
    "Chhattisgarhi",
    "Somali",
    "Malay",
    "Cebuano",
    "Nepali",
    "Mesopotamian Arabic",
    "Assamese",
    "Sinhala",
    "Northern Kurdish",
    "Hejazi Arabic",
    "Nigerian Fulfulde",
    "Bavarian",
    "South Azerbaijani",
    "Greek",
    "Chittagonian",
    "Kazakh",
    "Deccan",
    "Hungarian",
    "Kinyarwanda",
    "Zulu",
    "Czech",
    "Kinyarwanda",
    "Dhundhari",
    "Haitian Creole",
    "Eastern Min",
    "Ilocano",
    "Quechua",
    "Kirundi",
    "Swedish",
    "Hmong",
    "Shona",
    "Uyghur",
    "Hiligaynon",
    "Mossi",
    "Central Kurdish",
    "Zulu",
    "Akan",
    "Ojibwe",
    "Dutch",
    "Belarusian",
    "Tatar",
    "Tswana",
    "Sotho",
    "Balochi"
];


export const icebreakersv: Icebreaker[] = [
    "What's the best book you've read recently?",
    "If you could travel anywhere in the world, where would you go?",
    "What's your favorite movie of all time?",
    "What kind of music do you like to listen to?",
    "Do you have any pets? Tell me about them.",
    "What's your favorite hobby or pastime?",
    "What's the best meal you've ever had?",
    "Do you prefer coffee or tea?",
    "What's your dream job?",
    "What's the most interesting place you've ever visited?",
    "What's your favorite way to spend a weekend?",
    "Do you enjoy any sports? Which ones?",
    "What's your favorite TV show?",
    "If you could meet any historical figure, who would it be?",
    "What's your favorite type of cuisine?",
    "Do you have a favorite quote or saying?",
    "What's something you've always wanted to learn?",
    "Do you play any musical instruments?",
    "What's the best piece of advice you've ever received?",
    "What's your favorite season of the year?",
    "Do you have any hidden talents?",
    "What's your favorite book genre?",
    "Do you prefer the beach or the mountains?",
    "What's your favorite holiday?",
    "Do you enjoy cooking or baking?",
    "What's the last movie you watched?",
    "What's the most memorable concert you've ever been to?",
    "Do you have a favorite artist or band?",
    "What's your favorite board game or card game?",
    "What's your favorite type of dessert?",
    "What's your favorite app on your phone?",
    "Do you prefer watching movies or TV shows?",
    "What's a skill you wish you had?",
    "Do you enjoy any outdoor activities?",
    "What's your favorite way to relax?",
    "What's your favorite childhood memory?",
    "Do you have a favorite podcast?",
    "What's your favorite way to stay active?",
    "Do you have any favorite travel destinations?",
    "What's your favorite type of art?",
    "Do you have any favorite comedians?",
    "What's your favorite type of exercise?",
    "What's a fun fact about you?",
    "What's your favorite ice cream flavor?",
    "Do you have a favorite superhero or comic book character?",
    "What's your favorite way to spend a rainy day?",
    "What's your favorite kind of weather?",
    "What's your favorite restaurant?",
    "Do you enjoy any DIY projects?",
    "What's the best gift you've ever received?",
    "What's your favorite thing to do with friends?",
    "What's your favorite type of movie genre?",
    "Do you have a favorite author?",
    "What's your favorite type of flower?",
    "What's your favorite way to celebrate your birthday?",
    "What's your favorite type of animal?",
    "Do you have a favorite video game?",
    "What's your favorite type of clothing?",
    "What's the most interesting thing you've learned recently?",
    "What's your favorite kind of sandwich?",
    "Do you have a favorite sports team?",
    "What's your favorite thing to do in your free time?",
    "Do you have any favorite traditions?",
    "What's your favorite type of snack?",
    "What's your favorite type of drink?",
    "What's the best trip you've ever taken?",
    "Do you have any favorite museums or galleries?",
    "What's your favorite type of fruit?",
    "What's your favorite type of vegetable?",
    "Do you have any favorite family recipes?",
    "What's your favorite outdoor activity?",
    "Do you have a favorite playground game from childhood?",
    "What's your favorite type of puzzle or brain teaser?",
    "What's your favorite type of dance?",
    "Do you have a favorite poet or poem?",
    "What's your favorite way to stay organized?",
    "Do you have any favorite family traditions?",
    "What's your favorite way to unwind after a long day?",
    "What's your favorite type of landscape?",
    "Do you have any favorite wildlife or nature experiences?",
    "What's your favorite type of celebration?",
    "What's your favorite place to go for a walk?",
    "What's your favorite type of cheese?",
    "What's your favorite type of pasta?",
    "Do you have any favorite amusement park rides?",
    "What's your favorite type of tea?",
    "What's your favorite way to stay motivated?",
    "Do you have any favorite childhood games?",
    "What's your favorite way to spend time with family?",
    "Do you have any favorite local spots or hangouts?",
    "What's your favorite way to give back to the community?",
    "What's your favorite type of volunteer work?",
    "What's your favorite type of tree?",
    "What's your favorite type of water activity?",
    "What's your favorite way to celebrate achievements?",
    "What's your favorite type of bread?",
    "What's your favorite way to start the day?",
    "Do you have any favorite morning rituals?",
    "What's your favorite way to learn new things?",
    "Do you have any favorite relaxation techniques?"
];

