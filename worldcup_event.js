var worldCup14 = {
  n: 3,
  m: 90,
  minutes: 10,
  stackLength: 3,  //goal, yellow card, red card
  layers: [],  //goal, yellow card, red card
  viewWidth: 960,
  viewHeight: 500,
  stack: d3.layout.stack(),
  eventData: [],
  dataSet: [],
  dataGoals: [
    goal10 = 0,
    goal20 = 0,
    goal30 = 0,
    goal40 = 0,
    goal50 = 0,
    goal60 = 0,
    goal70 = 0,
    goal80 = 0,
    goal90 = 0,
    goal90over = 0,
  ],
  dataYcards: [
    ycard10 = 0,
    ycard20 = 0,
    ycard30 = 0,
    ycard40 = 0,
    ycard50 = 0,
    ycard60 = 0,
    ycard70 = 0,
    ycard80 = 0,
    ycard90 = 0,
    ycard90over = 0,
  ],
  dataRcards: [
    rcard10 = 0,
    rcard20 = 0,
    rcard30 = 0,
    rcard40 = 0,
    rcard50 = 0,
    rcard60 = 0,
    rcard70 = 0,
    rcard80 = 0,
    rcard90 = 0,
    rcard90over = 0,
  ],
  // eventTime,
  // awayTeamEvents,

  init: function() {
    this.setData();
    this.loadJson();
    this.createSvg();
  },

  setData: function() {
    for(var i = 0, iMax = worldCup14.stackLength; i < iMax; i++) {
      worldCup14.dataSet.push([]);
      for(var j = 0, jMax = worldCup14.minutes; j < jMax; j++) {
        var addData = {x:j}
        worldCup14.dataSet[i].push(addData);
      }
    }
  },

  //JSONデータのロード
  loadJson: function() {
    d3.json("http://worldcup.sfg.io/matches.json", function(json) {
      worldCup14.getData(json);
    });
  },

  //イベントデータの取得
  getData: function(json) {
    var games = json.length;
    for(var i = 0, max = games; i < max; i++) {
      worldCup14.addData(json[i].home_team_events);
      worldCup14.addData(json[i].away_team_events);
    }
    //worldCup14.sortData();
  },

  //イベントデータを配列に追加
  addData: function(data) {
    for(var i = 0, max = data.length; i < max; i++) {
      var addData = data[i],
          setTypeEvent = addData.type_of_event,
          sortDataTime = addData.time;
      if((setTypeEvent === 'goal') || (setTypeEvent === 'goal-penalty') || (setTypeEvent === 'goal-own') || (setTypeEvent === 'yellow-card') || (setTypeEvent === 'red-card')) {
        //worldCup14.eventData.push(addData);
        switch (setTypeEvent) {
          case 'goal':
          case 'goal-penalty':
          case 'goal-own':
            worldCup14.sortData(sortDataTime, 'goal');
            break;
          case 'yellow-card':
            worldCup14.sortData(sortDataTime, 'ycard');
            break;
          case 'red-card':
            worldCup14.sortData(sortDataTime, 'rcard');
            break;
        }
      }
    }
    worldCup14.addSort();
  },

  //配列に追加したデータを時間ごとに分類
  sortData: function(sortDataTime, sortType) {
    if(sortDataTime < 10) {
      switch(sortType) {
          case 'goal':
            worldCup14.dataGoals[0]++;
            break;
          case 'ycard':
            worldCup14.dataYcards[0]++;
            break;
          case 'rcard':
            worldCup14.dataRcards[0]++;
            break;
      }
    } else if(sortDataTime < 20) {
      switch(sortType) {
          case 'goal':
            worldCup14.dataGoals[1]++;
            break;
          case 'ycard':
            worldCup14.dataYcards[1]++;
            break;
          case 'rcard':
            worldCup14.dataRcards[1]++;
            break;
      }
    } else if(sortDataTime < 30) {
      switch(sortType) {
          case 'goal':
            worldCup14.dataGoals[2]++;
            break;
          case 'ycard':
            worldCup14.dataYcards[2]++;
            break;
          case 'rcard':
            worldCup14.dataRcards[2]++;
            break;
      }
    } else if(sortDataTime < 40) {
      switch(sortType) {
          case 'goal':
            worldCup14.dataGoals[3]++;
            break;
          case 'ycard':
            worldCup14.dataYcards[3]++;
            break;
          case 'rcard':
            worldCup14.dataRcards[3]++;
            break;
      }
    } else if(sortDataTime < 50) {
      switch(sortType) {
          case 'goal':
            worldCup14.dataGoals[4]++;
            break;
          case 'ycard':
            worldCup14.dataYcards[4]++;
            break;
          case 'rcard':
            worldCup14.dataRcards[4]++;
            break;
      }
    } else if(sortDataTime < 60) {
      switch(sortType) {
          case 'goal':
            worldCup14.dataGoals[5]++;
            break;
          case 'ycard':
            worldCup14.dataYcards[5]++;
            break;
          case 'rcard':
            worldCup14.dataRcards[5]++;
            break;
      }
    } else if(sortDataTime < 70) {
      switch(sortType) {
          case 'goal':
            worldCup14.dataGoals[6]++;
            break;
          case 'ycard':
            worldCup14.dataYcards[6]++;
            break;
          case 'rcard':
            worldCup14.dataRcards[6]++;
            break;
      }
    } else if(sortDataTime < 80) {
      switch(sortType) {
          case 'goal':
            worldCup14.dataGoals[7]++;
            break;
          case 'ycard':
            worldCup14.dataYcards[7]++;
            break;
          case 'rcard':
            worldCup14.dataRcards[7]++;
            break;
      }
    } else if(sortDataTime < 90) {
      switch(sortType) {
          case 'goal':
            worldCup14.dataGoals[8]++;
            break;
          case 'ycard':
            worldCup14.dataYcards[8]++;
            break;
          case 'rcard':
            worldCup14.dataRcards[8]++;
            break;
      }
    } else if(90 < sortDataTime) {
      switch(sortType) {
          case 'goal':
            worldCup14.dataGoals[9]++;
            break;
          case 'ycard':
            worldCup14.dataYcards[9]++;
            break;
          case 'rcard':
            worldCup14.dataRcards[9]++;
            break;
      }
    }
  },

  addSort: function() {
    for(var i = 0, iMax = worldCup14.dataSet.length; i < iMax; i++) {

      switch(i) {
        case 0:
          for(var j = 0, jMax = worldCup14.dataGoals.length; j < jMax; j++) {
            worldCup14.dataSet[0][j].y = worldCup14.dataGoals[j];
          }
          break;
        case 1:
          for(var j = 0, jMax = worldCup14.dataGoals.length; j < jMax; j++) {
            worldCup14.dataSet[1][j].y = worldCup14.dataGoals[j];
          }
          break;
        case 2:
          for(var j = 0, jMax = worldCup14.dataGoals.length; j < jMax; j++) {
            worldCup14.dataSet[2][j].y = worldCup14.dataGoals[j];
          }
          break;
      }
    }

  },


  //svgを作成
  createSvg: function() {
    worldCup14.svg = d3.select('#view').append('svg')
          .attr('width', this.viewWidth)
          .attr('height', this.viewHeight)
          .append("g");
          //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    worldCup14.layers = worldCup14.stack(worldCup14.dataSet);
  }
}



window.onload = function() {
  worldCup14.init();
}

// var n = 3, // number of layers
//     m = 90, // number of samples per layer
//     stack = d3.layout.stack(),
//     layers = stack(d3.range(n).map(function() { return bumpLayer(m, .1); })),
//     yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
//     yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

// var margin = {top: 40, right: 10, bottom: 20, left: 10},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

// var x = d3.scale.ordinal()
//     .domain(d3.range(m))
//     .rangeRoundBands([0, width], .08);

// var y = d3.scale.linear()
//     .domain([0, yStackMax])
//     .range([height, 0]);

// var color = d3.scale.linear()
//     .domain([0, n - 1])
//     .range(["#aad", "#556"]);

// var xAxis = d3.svg.axis()
//     .scale(x)
//     .tickSize(0)
//     .tickPadding(6)
//     .orient("bottom");

// var svg = d3.select("body").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var layer = svg.selectAll(".layer")
//     .data(layers)
//   .enter().append("g")
//     .attr("class", "layer")
//     .style("fill", function(d, i) { return color(i); });

// var rect = layer.selectAll("rect")
//     .data(function(d) { return d; })
//   .enter().append("rect")
//     .attr("x", function(d) { return x(d.x); })
//     .attr("y", height)
//     .attr("width", x.rangeBand())
//     .attr("height", 0);

// rect.transition()
//     .delay(function(d, i) { return i * 10; })
//     .attr("y", function(d) { return y(d.y0 + d.y); })
//     .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

// svg.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(xAxis);

// d3.selectAll("input").on("change", change);

// var timeout = setTimeout(function() {
//   d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
// }, 2000);

// function change() {
//   clearTimeout(timeout);
//   if (this.value === "grouped") transitionGrouped();
//   else transitionStacked();
// }

// function transitionGrouped() {
//   y.domain([0, yGroupMax]);

//   rect.transition()
//       .duration(500)
//       .delay(function(d, i) { return i * 10; })
//       .attr("x", function(d, i, j) { return x(d.x) + x.rangeBand() / n * j; })
//       .attr("width", x.rangeBand() / n)
//     .transition()
//       .attr("y", function(d) { return y(d.y); })
//       .attr("height", function(d) { return height - y(d.y); });
// }

// function transitionStacked() {
//   y.domain([0, yStackMax]);

//   rect.transition()
//       .duration(500)
//       .delay(function(d, i) { return i * 10; })
//       .attr("y", function(d) { return y(d.y0 + d.y); })
//       .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
//     .transition()
//       .attr("x", function(d) { return x(d.x); })
//       .attr("width", x.rangeBand());
// }

// // Inspired by Lee Byron's test data generator.
// function bumpLayer(n, o) {

//   function bump(a) {
//     var x = 1 / (.1 + Math.random()),
//         y = 2 * Math.random() - .5,
//         z = 10 / (.1 + Math.random());
//     for (var i = 0; i < n; i++) {
//       var w = (i / n - y) * z;
//       a[i] += x * Math.exp(-w * w);
//     }
//   }

//   var a = [], i;
//   for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
//   for (i = 0; i < 5; ++i) bump(a);
//   return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
// }