var numTeams;
var teams;

callGetHistoricDataTeams();


setTimeout(function() {

  console.log(numTeams);
}, 700);

function addTeamToTable(idTeam, team) {
    $(document).ready(function() {
      $('#footballTableStats').append(
        '<tr id="' + idTeam + '" >' +
        '<td style="padding-top: 0; padding-bottom: 0; position: sticky; left: 0; overflow: auto;opacity: 100%;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><b>' + team.name + '</b></td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.beginSeason + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.country + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.drawsHunterScore)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToData(team.drawsHunterScore, idTeam, team.name, 'DrawsHistoricStats.html') + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.marginWinsScore)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToData(team.marginWinsScore, idTeam, team.name, 'MarginWinsHistoricStats.html') + '</td>' +
        // '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.euroHandicapScore)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToData(team.euroHandicapScore, idTeam, team.name, 'EuroHandicapHistoricStats.html') + '</td>' +
         '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.goalsFestScore)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToData(team.goalsFestScore, idTeam, team.name, 'GoalsFestHistoricStats.html') + '</td>' + 
         '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.flipFlopScore)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToData(team.flipFlopScore, idTeam, team.name, 'FlipFlopHistoricStats.html') + '</td></tr>'
      );
    });
}

function addHockeyTeamToTable(idTeam, team) {
  $(document).ready(function() {
    $('#hockeyTableStats').append(
      '<tr id="' + idTeam + '" >' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><b>' + team.name + '</b></td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.beginSeason + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.endSeason + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.hockeyDrawsHunterScore)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToData(team.hockeyDrawsHunterScore, idTeam, team.name, 'DrawsHistoricStats.html') + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.marginWinsScore)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToData(team.marginWinsScore, idTeam, team.name, 'MarginWinsHistoricStats.html') + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.marginWinsAny2Score)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToData(team.marginWinsAny2Score, idTeam, team.name, 'MarginWinsHistoricStats.html') + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.marginWins3Score)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToData(team.marginWins3Score, idTeam, team.name, 'MarginWinsHistoricStats.html') + '</td></tr>'
    );
  });
}

function addBasketTeamToTable(idTeam, team) {
  $(document).ready(function() {
    $('#basketTableStats').append(
      '<tr id="' + idTeam + '" >' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><b>' + team.name + '</b></td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.beginSeason + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.endSeason + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.country + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.basketShortWinsScore)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToDataByStatsType(team.basketShortWinsScore, idTeam, team.name, 'MarginWinsHistoricStats.html', 'shortWins') + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.basketLongWinsScore)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToDataByStatsType(team.basketLongWinsScore, idTeam, team.name, 'MarginWinsHistoricStats.html', 'longWins') + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.basketComebackScore)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToDataByStatsType(team.basketComebackScore, idTeam, team.name, 'MarginWinsHistoricStats.html', 'comebacks') + '</td></tr>'
    );
  });
}

function addHandballTeamToTable(idTeam, team) {
  $(document).ready(function() {
    $('#handballTableStats').append(
      '<tr id="' + idTeam + '" >' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><b>' + team.name + '</b></td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.beginSeason + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.endSeason + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.country + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.handball16MarginWinsScore)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToDataByStatsType(team.handball16MarginWinsScore, idTeam, team.name, 'MarginWinsHistoricStats.html', 'margin16') + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.handball49MarginWinsScore)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToDataByStatsType(team.handball49MarginWinsScore, idTeam, team.name, 'MarginWinsHistoricStats.html', 'margin49') + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.handball712MarginWinsScore)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToDataByStatsType(team.handball712MarginWinsScore, idTeam, team.name, 'MarginWinsHistoricStats.html', 'margin712') + '</td></tr>'
    );
  });
}

function setStatsBackgroundColor(score) {
  if (score !== null) {
    if (score.includes("EXCELLENT")) {
      return '#59eb6c';
    } else if (score.includes("ACCEPTABLE")) {
      return GREEN_COLOR;
    } else if (score.includes("RISKY")) {
      return YELLOW_COLOR;
    } else if (score.includes("INAPT")) {
      return RED_COLOR;
    }
  }
}

function addHyperLinkToData(score, idTeam, name, hyperLink) {
  if (score != null) {
    return '<a style="color: #7377a8; font-weight: bold;" href="' + hyperLink + '?'+idTeam+'&'+name+'"><u>' + score + '</u></a>';
  } else {
    return null
  }
}

function addHyperLinkToDataByStatsType(score, idTeam, name, hyperLink, statsType) {
  if (score != null) {
    return '<a style="color: #7377a8; font-weight: bold;" href="' + hyperLink + '?'+idTeam+'&'+name+'&'+statsType+'"><u>' + score + '</u></a>';
  } else {
    return null
  }
}

// var visible = 1;
document.getElementById("sportSelect").addEventListener("change",function() {
  const sport = this.value;
  t1 = document.getElementById("footballTableStats");
  t2 = document.getElementById("hockeyTableStats");
  t3 = document.getElementById("basketTableStats");
  t4 = document.getElementById("handballTableStats");
  if(sport == "football") {
    t1.style.display = 'table';
    t2.style.display = 'none';
    t3.style.display = 'none';
    t4.style.display = 'none';
  } else if (sport == "basket") {
    t1.style.display = 'none';
    t3.style.display = 'table';
    t2.style.display = 'none';
    t4.style.display = 'none';
  } else if (sport == "hockey") {
    t1.style.display = 'none';
    t2.style.display = 'table';
    t3.style.display = 'none';
    t4.style.display = 'none';
  } else if (sport == "handball") {
    t1.style.display = 'none';
    t2.style.display = 'none';
    t3.style.display = 'none';
    t4.style.display = 'table';
  }
})
