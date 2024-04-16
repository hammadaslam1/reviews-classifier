"""
At the command line, only need to run once to install the package via pip:

$ pip install google-generativeai
"""

import google.generativeai as genai

genai.configure(api_key="AIzaSyD4-jd-yLe6w9OlcPFtwZUqfPeM685X7qQ")

# Set up the model
generation_config = {
  "temperature": 0.9,
  "top_p": 1,
  "top_k": 1,
  "max_output_tokens": 2048,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

prompt_parts = [
  "always give the output in 1 sentence",
  "review_body: I bought the A1500 based on the Compaq name and the excellent results I`ve had with their other products, however I started having problems immediatly, it just would not work. When I called Tech support, I was informed that it was not campatible with my operating system. When I pointed out I was using Win 98se on a Compaq comupter they tried to help. I was able to finally get it installed after being on the phone with Tech Support for almost 2 hours. It worked for one day then quit printing. When I again called Tech Support and spent another hour on the phone the printer finally started working but the Scanner quit. As I was buying a second computer with Win XP I asked if it would be compatible and was assured that it was.\\nWhen I was ready to install the A1500 on the new computer, I called Tech Support and they taslked me through the whole process. Not only would it not install it crashed my system and I had to do a full restore.\\nAs I waited to long to return it, it is now seating on a shelf collecting dust until I can find someone who will take it off my hands. In the mean time I`m still looking for a good multifunction that will work as advertised.\\nI would not recommend the A1500 to anyone who does not have money and time to waste.",
  "topics: Compaq A1500,excellent,multifunctioning",
  "product_title: Compaq A1500 All In One",
  "context: The reviewer had a negative experience with the Compaq A1500 All In One due to compatibility issues, technical problems, and poor customer support, leading them to not recommend the product.",
  "review_body: The A1500 was the first multifunctional I've used. I purchase one in 2001 for about $100. Overall, it was a decent machine before it began to die.\\n\\nIt takes two ink cartridges, Lexmark black-12A1970 ($25-$32) and Lexmark color-12A1985 ($29-$39). The ink seemed to last for a good while. However, if you don't use the cartridges in a while, the ink will dry up (this is what happened to my color cartridge a few times).\\n\\nWhen I first purchased it, I thought the design was great, but as I needed copies and scans of different items, I changed my mind. The copier/scanner is operated via a feeder instead of being a flatbed. I couldn't scan a page from a book or magazine (unless I wanted to rip out the page and feed it to the machine). It was also somewhat difficult to make copies of smaller items such as cards, IDs or pictures, even with the protective sleeve that is included with this model.\\n\\nBefore Compaq was bought out by HP, there was Compaq Customer Communities where consumers could post questions and give answers to one another (I had an alignment problem with this unit that was easily solved by a visit to Customer Communities). Unfortunately, HP removed the community. I guess it's a good thing I got the 3 year warranty from Circuit City. After about a year and a half, the scanner and copier started to act up. I would no longer get clean scans/copies, and it would use two 8.5\\\" x 11\\\"\\\" pages to copy a single document with the same dimensions. Customer Service couldn't help with the problem",
  "topics: inexpensive,colorful,flatbed machine,community support,HP",
  "product_title: Compaq A1500 All In One",
  "context: The reviewer found the A1500 to be a decent but flawed multifunction machine that eventually stopped working properly, with the lack of a flatbed scanner and the loss of community support being major drawbacks.",
  "review_body: I picked this old Compaq A1500 up at a yard sale. It was so filthy and plugged with old ink I figured it was shot. But after disassembling it and cleaning the innards good, it went to working after I installed two new cartridges. I use Windows XP and havent had any problems with this printer, unlike my old Lexmark X83. I wont even go there. Overall a decent printer.",
  "topics: Compaq A1500,Windows XP",
  "product_title: Compaq A1500 All In One",
  "context: The reviewer was able to revive a Compaq A1500 printer found at a yard sale and found it to be a decent printer with Windows XP after cleaning it and installing new ink cartridges.",
  "review_body: We've only had the computer for a week or so, but I've been very impressed. The case really does feel wonderful, and the screen is quite bright (and the weight is terrific for travelling!). I was worried that the 10.1\\\" screen would be a bit small for my wife (the main user of the machine",
  "topics: bright screen, travelling",
  "product_title: ASUS U6V V2 Bamboo 12.1 Inch Laptop",
  "context: The reviewer was impressed with the ASUS U6V V2 Bamboo 12.1 Inch Laptop, particularly its wonderful case, bright screen, and light weight, making it ideal for travel.",
  "review_body: A powerful, well constructed notebook that provides some useful new features. So far it has performed well and runs my most demanding applications with no problems. I particularly like the compactness of the 14.1 inch display and the keyboard has an excellent feel to it. Things I don't like are the poor speaker sound quality and positioning, the highly reflective display, the Vista user interface, and the lack of a true display mechanical latch. It would have been nice to have had a CF memory card reader. This product comes from Amazon with a free upgrade to Windows 7, a nice carry case and a useable optical mouse.",
  "topics: 14.1 inch display,Windows 7,carry case,optical mouse,reflective display,vista user interface, no CF memory card reader",
  "product_title: Asus F80Q X2AM 14.1 Inch Laptop",
  "context: The Asus F80Q X2AM 14.1 Inch Laptop is a powerful and well-constructed notebook with a compact display, excellent keyboard feel, and a free upgrade to Windows 7, but it suffers from poor speaker sound quality, a reflective display, the Vista user interface, and a lack of a CF memory card reader",
  "review_body: This review is for Peerless P2635LF-BN Parkwood Two Handle Lavatory Faucet Centerset, Brushed Nickel\\n\\nThe installation was easy. The supply lines are included which helped the installation process a lot, the only struggle was to remove the old one.\\n\\nThe nobs operate very smoothly don\\u2019t require any effort to open or close and it is easy to set up the temperature. It looks really nice. I like the height not too tall or short. The water flow feels low at first but I think it is the best volume to conserve water instead of running it at full speed and wasting a lot of water.\\n\\nThe only issue is that if somehow you drop water on top of the faucet once it dries it is going to show horrible watermarks. It is cleanable and disappears easily when wiped but the look is annoying. Other than that it is a great faucet.",
  "topics: watermarks,brus Nickel,brushed nickel,cleanable,low water flow,struggle, volume,water conservation",
  "product_title: Peerless P2635LF BL Parkwood Lavatory Faucet Matte Black",
  "context: The Peerless P2635LF-BN Parkwood Two Handle Lavatory Faucet Centerset, Brushed Nickel is easy to install, operates smoothly, and conserves water, but it is prone to unsightly watermarks.",
  "review_body: The product is satisfactory. The burner has the exact same configuration and markings as the broken one it replaced except where the model number was etched into the 'y' frame of the original burner there is a gind-off mark on the new one as if the model number was erased. It seems as if this Camco brand is just the Chromalox brand repackaged with the trade marks removed. I was a bit disappointed because Camco's web page explained that their burners had more coil turns than some other brands, and that is what made it 'deluxe'. When the new burner arrived it had the same number of turns (5) as the original. The picture is not accurate for this item because it clearly depicts 6 turns. Maybe the picture corresponds to the large size 8-inch burners. In any case, the quality is equal to the original and it is functional. I do not perceive anything about it that merits the 'deluxe' adjective.",
  "topics: Camco brand, Chromalox brand, coil turns, deluxe, 5 turns, 6 turns",
  "product_title: Camco 00243 6 Universal Deluxe Plug-In",
  "context: The reviewer found the Camco 00243 6\" Universal Deluxe Plug-In burner to be a satisfactory replacement for their broken one, but they were disappointed that it did not live up to the \"deluxe\" description and appeared to be a rebranded Chromalox burner with the same number of coil turns.",
  "review_body: I bought this Samyang lens for Nikon under the Vivitar brand. Also available as Rokinon, Bower, and others -- buy the one going for the lowest price.\\n\\nAt F1.4 the lens is sharp in the center, but soft at the corners and edges. Noticeable vignetting that is correctable in post-processing. CA is negligible. By F2.8 the lens is sharp corner to corner and vignetting is not visible on my D810. Focusing is spot-on without camera fine-tuning. Focus ring has long rotation (nearly half a turn) and is well damped so focusing is a joy. There is a small amount of barrel distortion that can be seen if you shoot fences or buildings, but it should be easy to correct. Like other Samyang lenses, there is no lock for the aperture ring. If want to control aperture by the ring, it is difficult to reach and hard to turn, I guess that makes it better if you want it to stay at F22!\\n\\nCompared with my other Samyang manufactured lenses, this Vivitar branded lens came with a padded nylon bag rather than cloth, and a lens cleaning cloth, as well as a nicer instruction manual that was Nikon specific. I don't know if these improvements apply to any other rebranding or the Samyang original.",
  "topics: Samyang lens for Nikon, Vivitar brand, Rokinon, Bower, sharp center, soft edges, vignetting, chromatic aberration, barrel distortion, aperture ring",
  "product_title: Samyang SY35MAE-N 35mm F/1.4 Lens for Nikon AE",
  "context: The Vivitar branded Samyang SY35MAE-N 35mm F/1.4 Lens for Nikon AE is a sharp and affordable lens with some minor drawbacks like softness at the corners at F1.4 and a difficult-to-reach aperture ring.",
  "review_body: This is a very good laptop at this price. The laptop is loaded with a lot of features some of which are only found in high-end machines. I would particularly like to point out the i5 processor and the solid-state hard drive. Add that to the 8GB RAM and it makes this a lightning-fast machine for any work. It has a high-resolution screen and a pretty decent battery life. The laptop comes with Windows 10 Pro pre-installed. It is very light in weight and you don't even feel the weight in the backpack. It also has a touchscreen and fingerprint scanner. Although for me they are not of much use and seem like a marketing gimmick. But some people may like to have these features. The only regret I have is that the 8GB DDR4 RAM is soldered to the board and hence there is no possibility of upgrading the RAM even if you want to. Other than this, it is a great laptop and comes at a low price. I would recommend it.",
  "topics: Lightning-fast computing, ample features, high-resolution screen, decent battery life, Windows 10 Pro, fingerprint scanner, touchscreen, low weight Regrettably",
  "product_title: Acer TravelMate X5 TMX514-51T-72KH 14 inch Full HD IPS Touch 8th Gen Intel Core i7 8565U 16GB DDR4 512GB SSD Bio-Protection Fingerprint Reader TPM 2.0 Windows 10 Professional",
  "context: The Acer TravelMate X5 TMX514-51T-72KH is a great value laptop with a powerful i5 processor, solid-state hard drive, 8GB RAM, high-resolution screen, decent battery life, and Windows 10 Pro, but the 8GB DDR4 RAM is soldered to the board and cannot be upgraded.",
  "review_body: quality is really good, we needed to get this in order to past the inspection for out outdoor porch, not stylish at all",
  "topics: outdoor porch",
  "product_title: Hubbell Bell MX3050S Flip Weatherproof 125 in 1 Universal Metal Device Cover 3 Gang Gray",
  "context: The Hubbell Bell MX3050S Flip Weatherproof cover is a good quality product that is necessary for passing outdoor porch inspections, but it is not stylish.",
  "review_body: The whole thing is plastic including the treads for the hose. If there is metal, it is a foil over the plastic to make it look metal. If I wanted a plastic wand I would have purchased somewhere for 1/2 the cost. Look around a reviews for this series of wand in a different finish. They will confirm this review.\\n\\nUpdate: For some reason a 5 star review was given on this item without any headline or write-up. Didn't know you could do that. Could it be because they are trying to lift the ratings?",
  "topics: thing plastic, different finish, item headline",
  "product_title: KOHLER 22166 G 2MB Purist Four Function Handshower Handheld Showerhead with 3 Spray Settings 1.75 GPM Vibrant Brushed Moderne Brass",
  "context: The KOHLER 22166-G-2MB Purist Four Function Handshower is made entirely of plastic and appears to be overpriced for its quality, with a suspicious 5-star review lacking any details.",
  "review_body: Jacket took a month for delivery but that was and should be expected, worth the wait jacket is true to size I'm 180lbs 5'7\" and wear medium in most things and this was perfect size plus jacket has some stretch, sizing in description seems off they have it listed way too long but it looks and fits as pictured falls right at the hip. Also is waterproof ran sleeve of jacket under sink and when I touched the jacket after it wasn't even wet on the surface. Can't speak to durability yet but zippers could be an issue in future but only time will tell and I will update after some uses",
  "topics: jacket, sizing, waterproof, durability, zippers",
  "product_title: Hereyeth Men's Winter Jacket Fleece Tactical Military Jacket Fall Waterproof Coat with Pocket",
  "context: The Hereyeth Men's Winter Jacket Fleece Tactical Military Jacket is true to size, waterproof, and worth the wait, though the durability of the zippers is yet to be determined.",
  "review_body: I'm 52 and I ran my 1st Half-Marathon (Oakland Running Festival 2011) last year in these. This is hands down the best \\\"overall\\\" gym/running shoe I've ever owned. I wouldn't run the Tough Mudder in them (which I did in ASICS) but for treadmill/pavement/gym work...this is my shoe of choice. I've had my Runtones for almost 2 years now and I work/lift/run/play hard in them. I'll be buying another pair soon, but this pair is still goin' strong.",
  "topics: Half-Marathon, treadmill/pavement/gym",
  "product_title: Reebok Men's Runtone",
  "context: The reviewer highly recommends the Reebok Men's Runtone as the best overall gym/running shoe they have ever owned, praising its durability and versatility for various activities.",
  "review_body: All caps because you need to know this! TO USE ALEXA YOU DOWNLOAD THE GUESS APP TO YOUR PHONE AND ENABLE ALEXA. EASY. CHARGE THE PHONE, IT WAS DEAD WHEN I GOT MINE, TAKES 2 HOURS. YOU PUSH THE BOTTOM BUTTON FOR 2 SECONDS TO POWER ON THE WATCH. PAIR IT WITH YOUR PHONE( Bluetooth on ok). EASY. NOW THE PART NOT IN THE INSTRUCTIONS ANYWHERE. PLEASE READ: QUICK PRESS OF TOP BUTTON ON RH SIDE OF THE WATCH AND YOU GET GOOGLE ASSISTANT NOT ALEXA. I LOOKED EVERYWHERE AND COULD NOT GET ALEXA TO ANSWER. HERES THE TRICK, HOLD THE TOP BUTTON DOWN! BOOM ALEXA IS THERE. WOW THAT NEEDS ADDED TO THE MANUAL. WATCH IS GREAT, MANUAL SUCKS. Its great. It has a lot of cool features without looking like a TV strapped to your wrist. Looks like a large watch, a nice large watch that is a little heavy but not too bad. I would recommend this product. Cons: can't play music from Amazon. Seems limited a bit. It would be nice if I could get it to talk to my Dot and Fire TV. I'm still looking to see if that's possible. I just got the watch so if I figure that out I will add it to this review later. I want a real help section, the basics are there but my God you don't even show us how to talk to Alexa, the reason we bought this model of smart watch. That's kinda stupid. This watch does a lot more than it says so poke around and try things. It's a quality piece. I can't understand why people build all these features into smart phones and watches and never tell anyone. Why would ya do that? Anyway yep buy this if you want an Alexa watch. The speaker is tiny so she sounds a little muffled but you can hear her just fine. We finally have a real Dick Tracy watch! Enjoy. Edit: I found the real owners manual. Go to the Guess app on your phone. Settings-Help and Support-Owners Manual. There is the real manual. There should have been a printed copy of that included in the box, thats too hard to find. There is a lot of good info there though.",
  "topics: Guess watch, Alexa, Google Assistant, Bluetooth, owners manual",
  "product_title: GUESS Men's Stainless Steel Connect Smart Watch Amazon Alexa iOS and Android Compatible iOS and Android Compatible",
  "context: The GUESS Men's Stainless Steel Connect Smart Watch is a great looking watch with many features, including Alexa, but the instructions are lacking, and it would be nice to have a more comprehensive help section.",
  "review_body: I purchased this watch from an authorized Baume & Mercier dealer. I did so because they added one year to the warranty and do all of the repairs and maintenance (if needed) on site. In addition, they did give me a nice reduction in price, which I have found is not unusual for upscale watches. Okay, it isn't as good a price as I could get on line, but this is not a gray market watch and comes with a full U.S. warranty. Often, the discounted watches are gray market and do not come with an American warranty. I looked at other watches, including one by Tag Heuer and also Mont Blanc. But when I saw them in person, I found that they looked like very expensive sports watches. To be sure, they were very fine looking. But for me I find that the Baume & Mercier looks more elegant. This is a watch that I will not wear daily (I am very active in the high Rockies ... wearing a Baume & Mercier while backcountry skiing at 12,000 ft altitude is sort of over the top). I have recently purchased a watch winder so that the watch will not loose time while it sits in its case. This has been a great purchase, looks wonderful, and is a great anniversary gift for me!",
  "topics: Baume & Mercier watch, U.S. warranty, Mont Blanc, gray market, watch winder",
  "product_title: Baume Mercier Men's 8851 Classima Executives Chronograph White Dial Watch",
  "context: The reviewer purchased a Baume & Mercier watch from an authorized dealer due to the extended warranty, on-site repairs, price reduction, and full U.S. warranty, finding it to be a more elegant and suitable anniversary gift compared to other upscale sports watches.",
  "review_body: I got this mesh router in order to connect the WiFi cameras I have around the house.\\nI like set of router for these reasons:\\nThe design looks good, when all 3 are registered the coverage range is very wide, each router can connect hundreds of devices so it is very appropriate for smart devices.\\n\\nI would prefer:\\nA web interface instead of just an app to set them up, and a cheaper price to save some money. It took me a few times to set the right type of internet connection (DHCP, PPPoE, static Ip) but I eventually got it right.",
  "topics: mesh router, wifi cameras, coverage range,  devices, web interface, app, cheaper price, DHCP, PPPoE, static Ip",
  "product_title: TaoTronics Mesh WiFi System Up to 6000 Sq ft for Whole Home Coverage Tri Band AC3000 with 3Gbps Speed WiFi Router Extender Replacement Gigabit Ports Robust Parental Control 3-Pack",
  "context: The TaoTronics Mesh WiFi System provides wide coverage and supports numerous devices, making it ideal for smart homes, but its app-only setup and price point may be drawbacks for some users.",
  "review_body: This is an absolutely terrific netbook. Everything is working fine. The computer geek who started it all up for me noted that it's great that the recharger is outside of the computer and not built in; if it fails I can just replace it. But the recharger is working fine. Everything works like a charm, and the seashell-pink-with-white look is gorgeous.\n\nAnd here's one thing that really makes it grand: it has a matte (non-reflective) screen, which is so much easier on the eyes.\n\nIt's small enough that I can slip it into my shoulder bag. Lightweight. Wireless works like a charm. I really have no negative comments! Perfect little netbook to add portability to my editorial duties.",
  "topics: nice looking, recharger, non-reflective, shoulder bag, lightweight",
  "product_title: ASUS Eee PC 1005HA MU17 WT 10.1 Inch Intel Atom Netbook Computer Pearl White",
  "context: ",
]

response = model.generate_content(prompt_parts)
print(response.text)