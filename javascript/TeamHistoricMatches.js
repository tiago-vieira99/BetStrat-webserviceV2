var urlArgs = location.search.substring(1).split('&');
var teamId = decodeURIComponent(urlArgs[0]);
var teamName = decodeURIComponent(urlArgs[1]);
var season = decodeURIComponent(urlArgs[2]);
$('.teamNameTitle').append("<b>" + season.slice(7) + " || " + teamName.slice(5) + " || Historic Results </b><br>");

callGetHistoricMatchesByTeam(teamId.slice(11), season.slice(7));

var allMatches = []
var competitionsMap = new Map([])
var mainCompetition = ""

function addDataToTable(match) {
  $(document).ready(function() {
    $('#historicMatchesByTeamTable').append(
      '<tr>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.matchDate + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + match.homeTeam + ' </td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + match.awayTeam + ' </td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + match.ftResult + ' </td>' +
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
          '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + match.homeTeam + ' </td>' +
          '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + match.awayTeam + ' </td>' +
          '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + match.ftResult + ' </td>' +
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
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + match.homeTeam + ' </td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + match.awayTeam + ' </td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + match.ftResult + ' </td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + match.competition + ' </td></tr>'
      );
    }); });
  }
}

