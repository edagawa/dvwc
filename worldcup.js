var winner = {
  viewWidth:  900,
  viewHeight: 650,
  svg:        null,
  homeWin:    0,
  awayWin:    0,
  draw:       0,

  init: function() {
    this.loadJson();
    this.createViewArea();
  },

  //svgを描画
  createViewArea: function() {
    svg = d3.select('#view').append('svg')
          .attr('width', this.viewWidth)
          .attr('height', this.viewHeight);
    this.renderText(this.homeWin);
  },

  renderText: function(homeWin) {

    d3.select("svg").append("p")
      .style("font", "18px sans-serif")
      .text(homeWin);
  },

  //ワールドカップのJSONファイルをロード
  loadJson: function() {
    d3.json("http://worldcup.sfg.io/matches.json", function(json) {
      winner.getWinner(json);
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
          winner.homeWin++;
        //アウェイチームが勝った場合アウェイチームに１プラス
        } else if (gameWinner === awayTeam) {
          winner.awayWin++;
        //どちらも勝っていない場合drawに１プラス
        } else {
          winner.draw++;
        }
      }
    }

  }
};

window.onload = function() {
  winner.init();
}
