map.colorModule = (function() {

  var changedcolor = function() {

    var color = "tomato";
    map.util.area
    .style("fill", color);
  };

  return {
    changedcolor: changedcolor
  }

})();
