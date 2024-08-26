var urlArgs = location.search.substring(1).split('&');
var teamId = decodeURIComponent(urlArgs[0]);
var teamName = decodeURIComponent(urlArgs[1]);
var season = decodeURIComponent(urlArgs[2]);
$('.teamNameTitle').append("<b>" + season.slice(7) + " || " + teamName.slice(5) + " || Historic Results </b><br>");

callGetHistoricMatchesByTeam(teamId.slice(11), season.slice(7));

var allMatches = []
var competitionsMap = new Map([])
var mainCompetition = ""

function navigateSeason(diretion) {
  var seasonsList = JSON.parse(localStorage.getItem("seasonsList"))
  if (seasonsList[seasonsList.indexOf(season.slice(7))+diretion] == undefined) {
    return;
  }
  var seasonStringSize = seasonsList[seasonsList.indexOf(season.slice(7))+diretion].length
  console.log(window.location.replace(window.location.href.slice(0,-seasonStringSize)+seasonsList[seasonsList.indexOf(season.slice(7))+diretion]));
}

function addDataToTable(match) {
  $(document).ready(function() {
    $('#historicMatchesByTeamTable').append(
      '<tr>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.matchDate + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + boldTeam(match.homeTeam) + ' </td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + boldTeam(match.awayTeam) + ' </td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + match.htResult + ' </td>' +
      '<td ' + boldWinResult(match) + ' </td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + match.competition + ' </td></tr>'
    );
  });
}

function addCompetitionToMap(competition) {
  if (competitionsMap.get(competition) == null) {
    competitionsMap.set(competition, 1)
  } else {
    competitionsMap.set(competition, competitionsMap.get(competition) + 1)
  }
}

function getKeyByValue(map, searchValue) {
  for (const [key, value] of map.entries()) {
    if (value === searchValue) {
      return key;
    }
  }
  return undefined; 
}

function boldWinResult (match) {
  if (teamName.slice(5) == match.homeTeam && match.ftResult.split(':')[0] > match.ftResult.split(':')[1]) {
    return 'style="padding-top: 0; padding-bottom: 0;background-color: #afdfbd;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> <b>' + match.ftResult.split(':')[0] + '</b>:' + match.ftResult.split(':')[1]
  } else if (teamName.slice(5) == match.awayTeam && match.ftResult.split(':')[0] < match.ftResult.split(':')[1]) {
    return 'style="padding-top: 0; padding-bottom: 0;background-color: #afdfbd;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.ftResult.split(':')[0] + ':<b>' + match.ftResult.split(':')[1] + '</b>'
  } else if (match.ftResult.split(':')[0] == match.ftResult.split(':')[1]) {
    return 'style="padding-top: 0; padding-bottom: 0;background-color: #e0ffd4;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.ftResult
  } else {
    return 'style="padding-top: 0; padding-bottom: 0;background-color: #e3c0c1;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + match.ftResult
  }
}

function boldTeam (team) {
  if (teamName.slice(5) == team) {
    return '<u>' + team + '</u>'
  } else {
    return team
  }
}

function toggleTableMatches(btn) {

  biggestCompOccur = Math.max(...competitionsMap.values());
  mainCompetition = getKeyByValue(competitionsMap, biggestCompOccur);
  
  if (btn.checked) {
    $(document).ready(function() {
      $('#historicMatchesByTeamTable').empty()});
    allMatches.forEach((match) => {
      if (match.competition === mainCompetition) {
        $(document).ready(function() {
          $('#historicMatchesByTeamTable').append(
            '<tr>' +
            '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.matchDate + '</td>' +
          '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + boldTeam(match.homeTeam) + ' </td>' +
          '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + boldTeam(match.awayTeam) + ' </td>' +
          '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + match.htResult + ' </td>' +
          '<td ' + boldWinResult(match) + ' </td>' +
          '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + match.competition + ' </td></tr>'
          );
        }); 
      }
    });
  } else {
    $(document).ready(function() {
      $('#historicMatchesByTeamTable').empty()});
    allMatches.forEach((match) => {
    $(document).ready(function() {
      $('#historicMatchesByTeamTable').append(
        '<tr>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.matchDate + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + boldTeam(match.homeTeam) + ' </td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + boldTeam(match.awayTeam) + ' </td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + match.htResult + ' </td>' +
      '<td ' + boldWinResult(match) + ' </td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + match.competition + ' </td></tr>'
      );
    }); });
  }
}

