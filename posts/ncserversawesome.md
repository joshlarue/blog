I bought:
- 4 terabytes of storage run in a RAID mirror for a capacity of 2TB
- a Raspberry Pi 4, and 
- an external hard drive dock 
- all for around $230 CAD. 


For reference, $230 is only $30 more than two years' worth of storage on [Google Drive](https://one.google.com/about/plans?g1_landing_page=0), or about one and a half years of [iCloud+ storage](https://support.apple.com/en-us/HT201238) at the time of this writing. While these storage solutions are extremely easy to use if you are in either ecosystem, self-hosting takes a bit of effort to get set up -- but it's totally worth it.

### What does self-hosting have over Google or Apple storage services?
Right off the bat, my personal favorite: self-hosting allows you to free yourself a little more from either ecosystem. For too long, Google and Apple had too much control over my uploaded files and personal data. I opted to create my own cloud storage server with [NextcloudPi](https://github.com/nextcloud/nextcloudpi), an open-source cloud solution. All of my files live there, as well as my contacts and calendar events. Everything syncs between my Windows laptop, my Linux Mint machine (dual-booted on my laptop), and my Android phone.

It's basically everything I used Google's services for.

### Are there any drawbacks?
The biggest hurdle will be the time taken to set up your system. While in theory installation should go smoothly, there seems to always be something else to fix or take care of in the first week or two. However, the more you troubleshoot, the more you will learn about networking, storage systems, and home servers. I can confidently say that I am much more knowledgeable about all of the above after struggling through the initial setup and consequent troubleshooting.

Truthfully, during the writing of this post, my setup had intermittent issues for a few days. It was repeatedly resetting itself into maintenance mode, and it turned out it was a problem with the Redis DB system service not running properly. However, after an update and a little bit of troubleshooting (an hour or two), it's running smoothly again.