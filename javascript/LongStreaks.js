
streaks = [];
callGetStreaks();

function changeHeadCell (value) {
    streakType = '';
    minStreak = 0;

    switch(value) {
        case 'Wins':
            streakType = 'wins';
            minStreak = 5;
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No Wins':
            streakType = 'noWins';
            minStreak = 3;
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'Draws':
            streakType = 'draws';
            minStreak = 3;
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No Draws':
            streakType = 'noDraws';
            minStreak = 7;
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No Margin Wins':
            streakType = 'noMarginWins';
            minStreak = 3;
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'Clean Sheet':
            streakType = 'cleanSheet';
            minStreak = 3;
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No Clean Sheet':
            streakType = 'noCleanSheet';
            minStreak = 5;
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'Goals Fest':
            streakType = 'goalsFest';
            minStreak = 5;
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No Goals Fest':
            streakType = 'noGoalsFest';
            minStreak = 4;
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'BTTS':
            streakType = 'btts';
            minStreak = 5;
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No BTTS':
            streakType = 'noBtts';
            minStreak = 4;
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'Scored Both Halves':
            streakType = 'scoreBothHalves';
            minStreak = 5;
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No Scored Both Halves':
            streakType = 'noScoreBothHalves';
            minStreak = 3;
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'Concede Both Halves':
            streakType = 'concedeBothHalves';
            minStreak = 5;
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No Concede Both Halves':
            streakType = 'noConcedeBothHalves';
            minStreak = 5;
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No Win Both Halves':
            streakType = 'noWinBothHalves';
            minStreak = 5;
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No Win && +2.5 Goals':
            streakType = 'noWinAnd25Goals';
            minStreak = 5;
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No 2HT > 1HT':
            streakType = 'no2HTFunny';
            minStreak = 4;
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        default:
            break;
    }

    $("#footballTableStreaks tr>td").remove();

    Object.entries(streaks).forEach(function(teamData) {
        addTeamDiv(teamData[0], teamData[1], streakType, minStreak);
    });
}

function addTeamDiv(teamName, teamData, streakType, minStreak) {
    sessionStorage.removeItem("seasonsList")
    if (teamData[streakType + 'MainComp'] >= minStreak || teamData[streakType + 'AllComps'] >= minStreak) {
        $(document).ready(function() {
        $('#footballTableStreaks').append(
            '<tr>' +
            '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><a href="TeamHistoricMatches.html?teamId=team'+teamData['teamID']+'&team=' + teamName + '&season=2024-25" style="color: #4f72d3; text-decoration: underline; font-weight: bold">' + teamName + '</a></td>' +
            '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + teamData['position'] + ' </td>' +
            '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + teamData[streakType + 'MainComp'] + ' </td>' +
            '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + teamData[streakType + 'AllComps'] + ' </td></tr>'
        );
        });
    }
  }