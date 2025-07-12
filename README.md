## csv_functions
**csv_columnsort**\
Sorts data columns from Aa-Zz

**csv_interpolater**\
Fills in blank data cells through [linear interpolation](https://en.wikipedia.org/wiki/Interpolation#Linear_interpolation) using the last available data and the next available data `x + ((z - x) / y) * i`\

**csv_remdups**\
Removes duplicate data eg. `Jan 1 - 321 subs` & `Jan 2 - 321 subs` (only keeps the first instance)

**socialblade_x**\
You need to download their socialblade **monthly** analytics page as "HTML ONLY" due to socialblade being strict about web scraping. You can also use the web archive as well.
Naming of html file: `ChannelName - 2008,2013,or,2019`\
Determining the year of the file:

**2008:** Blue Graph

![2008 socialblade](https://i.imgur.com/hjQ1tXI.png)

**2013:** Red Graph

![2013 socialblade](https://i.imgur.com/6OXvyXA.png)

**2019:** Monthly Graph

![2019 socialblade](https://i.imgur.com/kjvLl1H.png)

You can add ` - anything` at the end of the file name if have more than 1 files on the same channel.
![example](https://i.imgur.com/gSnbKHr.png)

## yt_logo_downloader
Downloads youtube channel icons\
Input channel ids in `data.json`

# Requirements
Nodejs LTS version
