var urlArgs = location.search.substring(1).split('&');
var teamName = decodeURIComponent(urlArgs[1]);
var teamId = decodeURIComponent(urlArgs[0]);
$('.teamNameTitle').append("<b>" + teamName + " :: Historic Stats</b><br>");
var teams = JSON.parse(localStorage.getItem("teams"));
let teamElem = null;


async function init() {
  if (teams === null) {
    try {
      teamElem = await callGetHistoricDataTeamInfo(teamName);
    } catch (error) {
      console.error("Failed to fetch team data: ", error);
      return;  // Exit the function if there's an error
    }
  } else {
    teamElem = teams.find(team => team.name === teamName);
  }
  
  if (localStorage.getItem("strategySelected") != null) {
    document.getElementById("strategySelect").value = localStorage.getItem("strategySelected");
    displayInfo();
  }
  setScoreValuesInfo();
}

init();

function setScoreValuesInfo() {
  document.getElementById("scoreValuesInfo").innerHTML = '<span style="background-color: '+ setStatsBackgroundColor(teamElem.drawsHunterScore)+';"> Draws: '+ teamElem.drawsHunterScore +'   | </span> ' +
          '<span style="background-color: '+ setStatsBackgroundColor(teamElem.bttsScore)+';"> Btts: '+ teamElem.bttsScore +'   | </span> ' +
          '<span style="background-color: '+ setStatsBackgroundColor(teamElem.cleanSheetScore)+';"> CleanSheet: '+ teamElem.cleanSheetScore +'   | </span> ' +
          '<span style="background-color: '+ setStatsBackgroundColor(teamElem.euroHandicapScore)+';"> EuroHandicap: '+ teamElem.euroHandicapScore +'   | </span> ' +
          //'<span style="background-color: '+ setStatsBackgroundColor(teamElem.flipFlopScore)+';"> FlipFlop: '+ teamElem.flipFlopScore +'   | </span> ' +
          '<span style="background-color: '+ setStatsBackgroundColor(teamElem.goalsFestScore)+';"> GoalsFest: '+ teamElem.goalsFestScore +'   | </span> ' +
          '<span style="background-color: '+ setStatsBackgroundColor(teamElem.marginWinsScore)+';"> WinsMargin: '+ teamElem.marginWinsScore +'   | </span> ' +
          '<span style="background-color: '+ setStatsBackgroundColor(teamElem.noBttsScore)+';"> NoBtts: '+ teamElem.noBttsScore +'   | </span> ' +
          '<span style="background-color: '+ setStatsBackgroundColor(teamElem.noGoalsFestScore)+';"> NoGoalsFest: '+ teamElem.noGoalsFestScore +'   | </span> ' +
          '<span style="background-color: '+ setStatsBackgroundColor(teamElem.noWinsScore)+';"> NoWins: '+ teamElem.noWinsScore +'   | </span> ' +
          '<span style="background-color: '+ setStatsBackgroundColor(teamElem.scoreBothHalvesScore)+';"> ScoreBothHalves: '+ teamElem.scoreBothHalvesScore +'   | </span> ' +
          '<span style="background-color: '+ setStatsBackgroundColor(teamElem.concedeBothHalvesScore)+';"> ConcedeBothHalves: '+ teamElem.concedeBothHalvesScore +'   | </span> ' +
          '<span style="background-color: '+ setStatsBackgroundColor(teamElem.winsScore)+';"> Wins: '+ teamElem.winsScore +'   | </span> ' +
          '<span style="background-color: '+ setStatsBackgroundColor(teamElem.secondHalfBiggerScore)+';"> SecondHalfBigger: '+ teamElem.secondHalfBiggerScore +'   | </span> ' +
          '<span style="background-color: '+ setStatsBackgroundColor(teamElem.winAndGoalsScore)+';"> WinsAndGoals: '+ teamElem.winAndGoalsScore +'   | </span> ' +
          '<span style="background-color: '+ setStatsBackgroundColor(teamElem.winBothHalvesScore)+';"> WinBothHalves: '+ teamElem.winBothHalvesScore +'   | </span> ';
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

function displayInfo() {
  var strategy = document.getElementById("strategySelect").value;

  console.log(strategy);

  switch (strategy) {
    case 'WinsMargin':
      document.getElementById("scoreTextInfo").innerHTML = teamElem.marginWinsScore;
      break;
    case 'WinAndGoals':
      document.getElementById("scoreTextInfo").innerHTML = teamElem.winAndGoalsScore;
      break;
    case 'NoGoalsFest':
      document.getElementById("scoreTextInfo").innerHTML = teamElem.noGoalsFestScore;
      break;
    case 'Btts':
      document.getElementById("scoreTextInfo").innerHTML = teamElem.bttsScore;
      break;
    case 'Draw':
      document.getElementById("scoreTextInfo").innerHTML = teamElem.drawsHunterScore;
      break;
    case 'GoalsFest':
      document.getElementById("scoreTextInfo").innerHTML = teamElem.goalsFestScore;
      break;
    case 'CleanSheet':
      document.getElementById("scoreTextInfo").innerHTML = teamElem.cleanSheetScore;
      break;
    case 'ConcedeBothHalves':
      document.getElementById("scoreTextInfo").innerHTML = teamElem.concedeBothHalvesScore;
      break;
    case 'EuroHandicap':
      document.getElementById("scoreTextInfo").innerHTML = teamElem.euroHandicapScore;
      break;
    case 'NoBtts':
      document.getElementById("scoreTextInfo").innerHTML = teamElem.noBttsScore;
      break;
    case 'Wins':
      document.getElementById("scoreTextInfo").innerHTML = teamElem.winsScore;
      break;
    case 'NoWins':
      document.getElementById("scoreTextInfo").innerHTML = teamElem.noWinsScore;
      break;
    case 'ScoreBothHalves':
      document.getElementById("scoreTextInfo").innerHTML = teamElem.scoreBothHalvesScore;
      break;
    case 'SecondHalfBigger':
      document.getElementById("scoreTextInfo").innerHTML = teamElem.secondHalfBiggerScore;
      break;
    case 'WinBothHalves':
      document.getElementById("scoreTextInfo").innerHTML = teamElem.winBothHalvesScore;
      break;
    default:
      console.log(`Sorry, we are out of ${expr}.`);
      return;
  }

  $('#statssDataByTeamTable').empty();

  callGetTeamStatsByStrategy(teamName, strategy); 

}

function addDataToTable(statsData) {
  var strategy = document.getElementById("strategySelect").value;
  var greensRate;
  var totalGreens;

  switch (strategy) {
    case 'WinsMargin':
      greensRate = statsData.marginWinsRate;
      totalGreens = statsData.numMarginWins;
      break;
    case 'WinAndGoals':
      greensRate = statsData.winAndGoalsRate;
      totalGreens = statsData.numWinsAndGoals;
      break;
    case 'NoGoalsFest':
      greensRate = statsData.noGoalsFestRate;
      totalGreens = statsData.numNoGoalsFest;
      break;
    case 'Btts':
      greensRate = statsData.bttsRate;
      totalGreens = statsData.numBtts;
      break;
    case 'Draw':
      greensRate = statsData.drawRate;
      totalGreens = statsData.numDraws;
      break;
    case 'GoalsFest':
      greensRate = statsData.goalsFestRate;
      totalGreens = statsData.numGoalsFest;
      break;
    case 'CleanSheet':
      greensRate = statsData.cleanSheetRate;
      totalGreens = statsData.numCleanSheets;
      break;
    case 'ConcedeBothHalves':
      greensRate = statsData.concedeBothHalvesRate;
      totalGreens = statsData.numConcedeBothHalves;
      break;
    case 'EuroHandicap':
      greensRate = statsData.marginWinsRate;
      totalGreens = statsData.numMarginWins;
      break;
    case 'NoBtts':
      greensRate = statsData.noBttsRate;
      totalGreens = statsData.numNoBtts;
      break;
    case 'Wins':
      greensRate = statsData.winsRate;
      totalGreens = statsData.numWins;
      break;
    case 'NoWins':
      greensRate = statsData.noWinsRate;
      totalGreens = statsData.numNoWins;
      break;
    case 'ScoreBothHalves':
      greensRate = statsData.scoreBothHalvesRate;
      totalGreens = statsData.numScoreBothHalves;
      break;
    case 'SecondHalfBigger':
      greensRate = statsData.secondHalfBiggerRate;
      totalGreens = statsData.numSecondHalfBigger;
      break;
    case 'WinBothHalves':
      greensRate = statsData.winBothHalvesRate;
      totalGreens = statsData.numWinsBothHalves;
      break;
    default:
      console.log(`Sorry, we are out of ${expr}.`);
      return;
  }

    $(document).ready(function() {
      $('#statssDataByTeamTable').append(
        '<tr>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><a href="TeamHistoricMatches.html?teamId=' + teamId + '&team=' + teamName + '&season=' + statsData.season +' " style="color: black"><b><u>' + statsData.season + '</u></b></a></td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.competition + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + greensRate + ' %</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + totalGreens + ' / ' + statsData.numMatches + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.winsRate + ' %</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.numWins + ' / ' + statsData.numMatches + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.stdDeviation + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.coefDeviation + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.negativeSequence + '</td></tr>'
      );
    });
}

