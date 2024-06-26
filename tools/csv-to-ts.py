import pandas
import json
import shutil
import os
import re


myCSV = pandas.read_csv("res/myCSV.csv")
myJSON = json.load(open("res/myJSON.json"))

myDB = {"news": {}, "events": {}}

for index, row in myCSV.iterrows():
    postID = re.sub(
        r"\D",
        "",
        row["What time should this item be posted?"],
    )

    if row["Is this a news post or an event"] == "News":
        category = "news"
    elif row["Is this a news post or an event"] == "Event":
        category = "events"

    # if postID in myJSON[category]:
    #     myDB[category][postID] = myJSON[category][postID]
    #     continue

    myPost = {
        "postID": postID,
        "postSites": row["Which Website(s) is this post for?"].split(", "),
        "postTime": row["What time should this item be posted?"],
        "postTitleCN": row["Please give the Event Title (CN)"],
        "postTextCN": row["Please give the Post Content Text (CN)"],
        "postTitleGB": row["Please give the Event Title (GB)"],
        "postTextGB": row["Please give the Post Content Text (GB)"],
        "postTitleNL": row["Please give the Event Title (NL)"],
        "postTextNL": row["Please give the Post Content Text (NL)"],
        "newsPinned": row["Is this an important news post? (Should it be pinned)"],
        "eventLocation": row["What location will the event be held at (name)?"],
        "eventAddress": row[
            "What location will the event be held at (address; street, postal code, country)?"
        ],
        "eventTimeStart": row["What time does the event start."],
        "eventTimeEnd": row["What time does the event finish."],
        "eventSignUp": row["Add a link to the sign-up sheet."],
        "postLinkedIn": row["Add a link to a LinkedIn post, if one is available."],
        "postLink": row[
            "Add a link to any other page that you want to refer to (only 1)."
        ],
        "postLinkTitle": row[
            "Create a title for the aforementioned link in the previous question."
        ],
        "postMainImage": row["Please upload the main cover image of the event."],
        "postOtherImages": row["Please upload any other images. (Post-Chip)"].split(
            ", "
        ),
    }

    os.makedirs(
        "res/" + postID,
        exist_ok=True,
    )
    shutil.copy(
        "G:/My Drive/Website Event Template (File responses)/Please upload the main cover image of the event. (File responses)/"
        + row["Please upload the main cover image of the event."],
        "res/" + postID,
    )

    for filename in row["Please upload any other images. (Post-Chip)"].split(", "):
        os.makedirs("res/" + postID, exist_ok=True)
        shutil.copy(
            "G:/My Drive/Website Event Template (File responses)/Please upload any other images. (File responses)/"
            + filename,
            "res/" + postID,
        )

    myDB[category][postID] = myPost

with open("res/myJSON.json", "w") as outfile:
    json.dump(myDB, outfile)

with open("src/ts/myData.ts", "w") as outfile:
    outfile.write("const myData : {'news': any, 'events': any} = ")
    json.dump(myDB, outfile)
