from datetime import date
import json

title = input("What is this post's title?\n")
today = str(date.today())
image = input("Enter image filename (you will still have to move it to /blog/public/):\n")
fileName = input("What is this post's filename? (you will still have to move it to /blog/public/posts)\n")
alt = input("Enter alt text:\n")
author = input("Who is the author?\n")

id = 1
path = "public/posts/postlist.json"

with open(path) as file:
  postFileJson = json.load(file)
  for post in postFileJson["posts"]:
    id += 1

with open(path, "w") as file:
  post = {
  "title": title,
  "date": today,
  "fileName": title + ".md",
  "image": image,
  "alt": alt,
  "author": author,
  "id": id
  }

  postFileJson["posts"].append(post)
  print(postFileJson)
  json.dump(postFileJson, file)