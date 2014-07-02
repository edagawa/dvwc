var worldCup = {
  viewWidth:   400,
  viewHeight:  400,
  outerRadius: 200,
  innerRadius: 0,
  svg:         null,
  arcs:        null,
  arc:         null,
  pie:         d3.layout.pie(),
  color:       d3.scale.category10(),
  homeWin:     0,
  awayWin:     0,
  draw:        0,
  gameData:    [],

  init: function() {
    this.loadJson();
    this.createSvg();
    this.createArc();
  },

  //svgを作成
  createSvg: function() {
    worldCup.svg = d3.select('#view').append('svg')
          .attr('width', this.viewWidth)
          .attr('height', this.viewHeight);
  },

  //arcを作成
  createArc: function() {
    worldCup.arc = d3.svg.arc()
         .innerRadius(worldCup.innerRadius)
         .outerRadius(worldCup.outerRadius);
  },

  //ワールドカップのJSONファイルをロード
  loadJson: function() {
    d3.json("http://worldcup.sfg.io/matches.json", function(json) {
      worldCup.getWinner(json);
    });
  },

  //ホームとアウェイのどちらが勝利しているか判定
  getWinner: function(json) {
    var games = json.length,
        homeTeam,
        awayTeam;

    //試合数だけ勝利チームがどちらか確認する
    for(i = 0, max = games; i < max; i++) {
      var homeTeam    = json[i].home_team.country,
          awayTeam    = json[i].away_team.country,
          gameWinner  = json[i].winner,
          gameStatus  = json[i].status;

      //終わった試合のみデータを取得する
      if(gameStatus === 'completed') {
        //ホームチームが勝った場合ホームチームに１プラス
        if(gameWinner === homeTeam) {
          worldCup.homeWin++;
        //アウェイチームが勝った場合アウェイチームに１プラス
        } else if (gameWinner === awayTeam) {
          worldCup.awayWin++;
        //どちらも勝っていない場合drawに１プラス
        } else {
          worldCup.draw++;
        }
      }
    }
    worldCup.setGameData();
  },

  //試合結果のデータを設定
  setGameData: function() {
    worldCup.gameData.push(worldCup.homeWin, worldCup.awayWin, worldCup.draw);
    worldCup.setArcs();
  },

  //arcをセット
  setArcs: function() {
    worldCup.arcs = worldCup.svg.selectAll("g.arc")
           .data(worldCup.pie(worldCup.gameData))
           .enter()
           .append("g")
           .attr("class", "arc")
           .attr("transform", "translate(" + worldCup.outerRadius + "," + worldCup.outerRadius + ")");
    worldCup.drawArcs();
    worldCup.viewLabels();
  },

  //arcを描画
  drawArcs: function() {
    worldCup.arcs.append("path")
        .attr("fill", function(d, i) {
          return worldCup.color(i);
        })
        .attr("d", worldCup.arc)
        .on('mouseover', function(d){
          worldCup.zoomIn();
        });
  },

  //arcをセット
  viewLabels: function() {
    worldCup.arcs.append("text")
        .attr("transform", function(d) {
          return "translate(" + worldCup.arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function(d) {
          return d.value;
        });
  },

  //arcをセット
  zoomIn: function(p) {
    if (p.depth > 1) p = p.parent;
    if (!p.children) return;
    zoom(p, p);
  }
};

window.onload = function() {
  worldCup.init();
}
