
streaks = [];
callGetStreaks();

function changeHeadCell (value) {
    document.getElementById('longStreaksHeadCell').innerHTML = value

    streakType = '';

    switch(value) {
        case 'Wins':
            streakType = 'wins';
            break;
        case 'No Wins':
            streakType = 'noWins';
            break;
        case 'Draws':
            streakType = 'draws';
            break;
        case 'No Draws':
            streakType = 'noDraws';
            break;
        case 'No Margin Wins':
            streakType = 'noMarginWins';
            break;
        case 'Clean Sheet':
            streakType = 'cleanSheet';
            break;
        case 'No Clean Sheet':
            streakType = 'noCleanSheet';
            break;
        case 'Goals Fest':
            streakType = 'goalsFest';
            break;
        case 'No Goals Fest':
            streakType = 'noGoalsFest';
            break;
        case 'BTTS':
            streakType = 'btts';
            break;
        case 'No BTTS':
            streakType = 'noBtts';
            break;
        case 'Scored Both Halves':
            streakType = 'scoreBothHalves';
            break;
        case 'No Scored Both Halves':
            streakType = 'noScoreBothHalves';
            break;
        case 'Concede Both Halves':
            streakType = 'concedeBothHalves';
            break;
        case 'No Concede Both Halves':
            streakType = 'noConcedeBothHalves';
            break;
        case 'No Win Both Halves':
            streakType = 'noWinBothHalves';
            break;
        case 'No Win && +2.5 Goals':
            streakType = 'noWinAnd25Goals';
            break;
        default:
            break;
    }

    $("#footballTableStreaks tr>td").remove();

    Object.entries(streaks).forEach(function(teamData) {
        addTeamDiv(teamData[0], teamData[1], streakType);
    });
}

function addTeamDiv(teamName, teamData, streakType) {
    $(document).ready(function() {
      $('#footballTableStreaks').append(
        '<tr>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><a href="TeamHistoricMatches.html?teamId=team'+teamData['teamID']+'&team=' + teamName + '&season=2023-24" style="color: black; text-decoration: underline">' + teamName + '</a></td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + teamData['position'] + ' </td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + teamData[streakType + 'MainComp'] + ' </td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + teamData[streakType + 'AllComps'] + ' </td></tr>'
      );
    });
  }