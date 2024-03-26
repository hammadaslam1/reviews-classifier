
import geminiModel



text = "God help you if you should have to deal with customer service on a laptop. I purchased one of these and within 3 months was having lots of power supply/charging issues. Asus' response was to update the drivers, which were already up to date. So within 3 months of that, the computer literally fried and went up in smoke. Yes, it is under warranty, and the long warranty they offer is great. Unless you actually have to use it. It has been a full 28 days right now since Asus has been working on my laptop. I have spent hours on the phone with them trying to get a status. The concept of a supervisor doesn't exist there. They are more than happy to set the phone down for a half hour and come back later to see if you are still there. So my nearly new computer is still sitting in their repair facility almost a month later. So consider yourself warned. Take these reviews that mention the reliability and customer support to heart and save yourself the trouble and look elsewhere.\n\nThe screen is big and looks great. I will give it that much. But it means nothing when the entire machine goes up in smoke and the manufacturer doesn't even seem to know how to fix it. And no, they won't just ship a replacement"

output = geminiModel.gemini(text)

print(output)