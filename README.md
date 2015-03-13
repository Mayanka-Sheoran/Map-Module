# Map-Module
Creates a d3 map if the user provides the requisite json for the country he/she wants. 
Also, <script src="http://d3js.org/queue.v1.min.js"></script> , include that in your html file.
More details up soon.. cheers!

Here is how it works:
1) bower install d3-map-module

2) Once you have the rendermap.js file available, go to line #24, and add the name of the file (for whichever country you want)
   Ex. If you want Australia's map, you add "AUS_adm2.json"

3) Administrative areas have 3-4 levels of depth:
    For instance, level 0 (adm0) has the border of the country
    level 1 (adm1) has the states
    level 2 (adm2) has the cities
    level 3 (adm3) has the towns
    level 4 (adm4) has the counties

    Ofcourse, you won't get all these levels for each country.... but you will always get at least 1 level, provided the country you're looking for is on Planet Earth.

    So, in line #24, you add "countryCode_levelCode.json"

4) You need to do something similar in line #26

    Ex. d3.json('AUS_adm2.json', function(data) {

                var places = topojson.feature(data, data.objects.AUS_adm2);

    The key that you put in before the countryCode (data.objects) will vary depending on the level of the map you require. More on that later.

5) You need to add "<script src="http://d3js.org/queue.v1.min.js"></script>" to the html page where you will be placing this map.

6) Finally, to add the map container to your html page, you need to add "<div id="map"></div>" to wherever you want it placed on your page.

    If you follow these steps, you should have a basic map showing up on your screen.

