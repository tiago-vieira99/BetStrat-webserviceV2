var urlArgs = location.search.substring(1).split('&');
var teamName = decodeURIComponent(urlArgs[1]);
var teamId = decodeURIComponent(urlArgs[0]);
$('.teamNameTitle').append("<b>" + teamName + " :: Historic Margin Wins Stats</b><br>");

if (urlArgs.length == 2) {
  callGetMarginWinsHistoricDataByTeam(teamName);
} else {
  var statsType = decodeURIComponent(urlArgs[2]);
  if (statsType == 'margin16') {
    callGetMargin16WinsHistoricDataByTeam(teamName);
  } else if (statsType == 'margin49') {
    callGetMargin49WinsHistoricDataByTeam(teamName);
  } else if (statsType == 'margin712') {
    callGetMargin712WinsHistoricDataByTeam(teamName);
  } else if (statsType == 'shortWins') {
    callGetShortWinsHistoricDataByTeam(teamName);
  } else if (statsType == 'comebacks') {
    callGetComebackWinsHistoricDataByTeam(teamName);
  } else if (statsType == 'longWins') {
    callGetLongWinsHistoricDataByTeam(teamName);
  }
}

var teams;


function addDataToTable(statsData) {
    $(document).ready(function() {
      $('#marginWinsDataByTeamTable').append(
        '<tr>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><a href="TeamHistoricMatches.html?teamId=' + teamId + '&team=' + teamName + '&season=' + statsData.season +' " style="color: black"><b><u>' + statsData.season + '</u></b></a></td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.competition + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.winsRate + ' %</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.numWins + ' / ' + statsData.numMatches + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.marginWinsRate + ' %</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.numMarginWins + ' / ' + statsData.numWins + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.stdDeviation + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.coefDeviation + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.noMarginWinsSequence + '</td></tr>'
      );
    });
}

function addShortWinsDataToTable(statsData) {
  $(document).ready(function() {
    $('#marginWinsDataByTeamTable').append(
      '<tr>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><a href="TeamHistoricMatches.html?teamId=' + teamId + '&team=' + teamName + '&season=' + statsData.season +' " style="color: black"><b><u>' + statsData.season + '</u></b></a></td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.competition + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.winsRate + ' %</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.numWins + ' / ' + statsData.numMatches + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.shortWinsRate + ' %</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.numShortWins + ' / ' + statsData.numWins + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.stdDeviation + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.coefDeviation + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.noShortWinsSequence + '</td></tr>'
    );
  });
}

function addLongWinsDataToTable(statsData) {
  $(document).ready(function() {
    $('#marginWinsDataByTeamTable').append(
      '<tr>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><a href="TeamHistoricMatches.html?teamId=' + teamId + '&team=' + teamName + '&season=' + statsData.season +' " style="color: black"><b><u>' + statsData.season + '</u></b></a></td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.competition + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.winsRate + ' %</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.numWins + ' / ' + statsData.numMatches + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.longWinsRate + ' %</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.numLongWins + ' / ' + statsData.numWins + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.stdDeviation + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.coefDeviation + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.noLongWinsSequence + '</td></tr>'
    );
  });
}

function addComebacksDataToTable(statsData) {
  $(document).ready(function() {
    $('#marginWinsDataByTeamTable').append(
      '<tr>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><a href="TeamHistoricMatches.html?teamId=' + teamId + '&team=' + teamName + '&season=' + statsData.season +' " style="color: black"><b><u>' + statsData.season + '</u></b></a></td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.competition + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.winsRate + ' %</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.numWins + ' / ' + statsData.numMatches + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.comebacksRate + ' %</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.numComebacks + ' / ' + statsData.numWins + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.stdDeviation + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.coefDeviation + '</td>' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + statsData.noComebacksSequence + '</td></tr>'
    );
  });
}


