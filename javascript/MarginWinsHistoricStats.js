var urlArgs = location.search.substring(1).split('&');
var teamName = decodeURIComponent(urlArgs[1]);
var teamId = decodeURIComponent(urlArgs[0]);
$('.teamNameTitle').append("<b>" + teamName + " :: Historic Margin Wins Stats</b><br>");

callGetMarginWinsHistoricDataByTeam(teamName);

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


