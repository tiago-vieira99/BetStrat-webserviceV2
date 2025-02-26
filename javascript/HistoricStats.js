var numTeams;
let teamsSessionStorage;

getHistoricData();

async function getHistoricData() {
  try {
      showLoadingIndicator();

      readData("teams", null, function(result, error) {
          if (error) {
              console.log("Error: " + error);
              hideLoadingIndicator();
              return;
          }

          teamsSessionStorage = JSON.parse(result);
          if (teamsSessionStorage != null) {
              hideLoadingIndicator();
              setUpTableData();
              return;
          }

          // If no data is found in the database, fetch it from the API
          fetchTeamsFromAPI();
      });

  } catch (error) {
      console.log("Error: " + error);
      hideLoadingIndicator();
  }
}

async function fetchTeamsFromAPI() {
  try {
      const response = await fetch("http://" + DATA_STATS_API_URL + "/api/bhd/teams");
      const teams = await response.json();
      teams.sort((a, b) => (a.name < b.name ? -1 : 1));
      storeData("teams", JSON.stringify(teams));

      teamsSessionStorage = teams;
      hideLoadingIndicator();

      setUpTableData();
  } catch (error) {
      console.log("Error fetching data from API: " + error);
      hideLoadingIndicator();
  }
}

function showLoadingIndicator() {
  document.getElementById("loading").classList.remove("hidden");
}

function hideLoadingIndicator() {
  document.getElementById("loading").classList.add("hidden");
}

function setUpTableData() {
  if (teamsSessionStorage && teamsSessionStorage.length > 0) {
    teamsSessionStorage.forEach(function (team) {
        if (team.sport === "Football") {
            addTeamToTable("team" + team.id, team, '');
            // } else if (team.sport === "Basketball") {
            //   addBasketTeamToTable("team" + team.id, team);
            // } else if (team.sport === "Handball") {
            //   addHandballTeamToTable("team" + team.id, team);
            // } else {
            //   addHockeyTeamToTable("team" + team.id, team);
        }
    });
  } else {
      console.log("No teams found in session storage.");
  }
}

function filterTeams() {
  var strategy = document.getElementById("strategySelect").value;
  var score = document.getElementById("scoreFilter").value;
  var filteredTeams;

  localStorage.setItem("strategySelected", strategy);
  // Clear the table before entering the loop
  $('#histStatsTeamsTable').empty();
  switch (strategy) {
    case 'WinsMargin':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.marginWinsScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.marginWinsScore);
      });
      break;
    case 'WinsMarginHome':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.marginWinsHomeScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.marginWinsHomeScore);
      });
      break;
    case 'WinAndGoals':
      let filteredTeams1 = teamsSessionStorage.filter(team => team.sport === 'Football' && team.winAndGoalsScore.includes(score));
      console.log(filteredTeams1);
      filteredTeams1.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.winAndGoalsScore);
      });
      break;
    case 'NoGoalsFest':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.noGoalsFestScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.noGoalsFestScore);
      });
      break;
    case 'Btts':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.bttsScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.bttsScore);
      });
      break;
    case 'BttsOneHalf':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.bttsOneHalfScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.bttsOneHalfScore);
      });
      break;
    case 'Draw':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.drawsHunterScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.drawsHunterScore);
      });
      break;
    case 'GoalsFest':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.goalsFestScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.goalsFestScore);
      });
      break;
    case 'CleanSheet':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.cleanSheetScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.cleanSheetScore);
      });
      break;
    case 'ConcedeBothHalves':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.concedeBothHalvesScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.concedeBothHalvesScore);
      });
      break;
    case 'EuroHandicap':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.euroHandicapScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.euroHandicapScore);
      });
      break;
    case 'NoBtts':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.noBttsScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.noBttsScore);
      });
      break;
    case 'Wins':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.winsScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.winsScore);
      });
      break;
    case 'NoWins':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.noWinsScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.noWinsScore);
      });
      break;
    case 'ScoreBothHalves':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.scoreBothHalvesScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.scoreBothHalvesScore);
      });
      break;
    case 'SecondHalfBigger':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.secondHalfBiggerScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.secondHalfBiggerScore);
      });
      break;
    case 'FirstHalfBigger':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.firstHalfBiggerScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.firstHalfBiggerScore);
      });
      break;
    case 'WinBothHalves':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.winBothHalvesScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.winBothHalvesScore);
      });
      break;
    case 'WinFirstHalf':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.winFirstHalfScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.winFirstHalfScore);
      });
      break;
    case 'NoWinFirstHalf':
      filteredTeams = teamsSessionStorage.filter(team => team.sport === 'Football' && team.noWinFirstHalfScore.includes(score));
      filteredTeams.forEach(function(team) {    
        addTeamToTable("team" + team.id, team, team.noWinFirstHalfScore);
      });
      break;
    default:
      teamsSessionStorage.forEach(function(team) {    
        if (team.sport === "Football") {
          addTeamToTable("team" + team.id, team, '');
        }      
      });
      return;
  }

}


setTimeout(function() {

  //console.log(numTeams);
}, 700);

function addTeamToTable(idTeam, team, score) {
    $(document).ready(function() {
      $('#histStatsTeamsTable').append(
        '<tr id="' + idTeam + '" >' +
        '<td style="padding-top: 0; padding-bottom: 0; position: sticky; left: 0; overflow: auto;opacity: 100%;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><a target="_blank" rel="noopener noreferrer" style="color: #7377a8; font-weight: bold;" href="TeamStrategiesHistoricStats.html?'+idTeam+'&'+team.name+'"><u>' + team.name + '</u></a></td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.beginSeason + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.country + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(score)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + score + '</td></tr>'
        // '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.marginWinsScore)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToData(team.marginWinsScore, idTeam, team.name, 'MarginWinsHistoricStats.html') + '</td>' +
        // // '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.euroHandicapScore)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToData(team.euroHandicapScore, idTeam, team.name, 'EuroHandicapHistoricStats.html') + '</td>' +
        //  '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.goalsFestScore)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToData(team.goalsFestScore, idTeam, team.name, 'GoalsFestHistoricStats.html') + '</td>' + 
        //  '<td style="padding-top: 0; padding-bottom: 0; background-color: '+setStatsBackgroundColor(team.flipFlopScore)+';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + addHyperLinkToData(team.flipFlopScore, idTeam, team.name, 'FlipFlopHistoricStats.html') + '</td></tr>'
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
