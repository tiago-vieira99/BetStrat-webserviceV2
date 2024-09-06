
streaks = [];

let teamsSessionStorage;

getHistoricData();

async function getHistoricData() {
    try {
        showLoadingIndicator();
  
        readData("teams", function(result, error) {
            if (error) {
                console.log("Error: " + error);
                hideLoadingIndicator();
                return;
            }
  
            teamsSessionStorage = JSON.parse(result);
            if (teamsSessionStorage != null) {
                hideLoadingIndicator();
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


callGetStreaks();

function changeHeadCell (value) {
    streakType = '';
    minStreak = 0;

    switch(value) {
        case 'Wins':
            streakType = 'wins';
            minStreak = 5;
            localStorage.setItem("strategySelected", 'NoWins');
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No Wins':
            streakType = 'noWins';
            minStreak = 3;
            localStorage.setItem("strategySelected", 'Wins');
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'Draws':
            streakType = 'draws';
            minStreak = 3;
            localStorage.setItem("strategySelected", null);
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No Draws':
            streakType = 'noDraws';
            minStreak = 7;
            localStorage.setItem("strategySelected", 'Draw');
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No Margin Wins':
            streakType = 'noMarginWins';
            minStreak = 3;
            localStorage.setItem("strategySelected", 'WinsMargin');
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'Clean Sheet':
            streakType = 'cleanSheet';
            minStreak = 3;
            localStorage.setItem("strategySelected", null);
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No Clean Sheet':
            streakType = 'noCleanSheet';
            minStreak = 5;
            localStorage.setItem("strategySelected", 'CleanSheet');
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'Goals Fest':
            streakType = 'goalsFest';
            minStreak = 5;
            localStorage.setItem("strategySelected", 'NoGoalsFest');
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No Goals Fest':
            streakType = 'noGoalsFest';
            minStreak = 4;
            localStorage.setItem("strategySelected", 'GoalsFest');
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'BTTS':
            streakType = 'btts';
            minStreak = 5;
            localStorage.setItem("strategySelected", 'NoBtts');
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No BTTS':
            streakType = 'noBtts';
            minStreak = 4;
            localStorage.setItem("strategySelected", 'Btts');
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'Scored Both Halves':
            streakType = 'scoreBothHalves';
            minStreak = 5;
            localStorage.setItem("strategySelected", null);
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No Scored Both Halves':
            streakType = 'noScoreBothHalves';
            minStreak = 3;
            localStorage.setItem("strategySelected", 'ScoreBothHalves');
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'Concede Both Halves':
            streakType = 'concedeBothHalves';
            minStreak = 5;
            localStorage.setItem("strategySelected", null);
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No Concede Both Halves':
            streakType = 'noConcedeBothHalves';
            minStreak = 5;
            localStorage.setItem("strategySelected", 'concedeBothHalves');
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No Win Both Halves':
            streakType = 'noWinBothHalves';
            minStreak = 5;
            localStorage.setItem("strategySelected", 'WinBothHalves');
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No Win && +2.5 Goals':
            streakType = 'noWinAnd25Goals';
            minStreak = 5;
            localStorage.setItem("strategySelected", 'WinAndGoals');
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        case 'No 2HT > 1HT':
            streakType = 'no2HTFunny';
            minStreak = 4;
            localStorage.setItem("strategySelected", 'SecondHalfBigger');
            document.getElementById('longStreaksHeadCell').innerHTML = value + ' | min: ' + minStreak
            break;
        default:
            break;
    }

    $("#footballTableStreaks tr>td").remove();

    Object.entries(streaks).forEach(function(teamData) {
        let histTeamdata = teamsSessionStorage.find(o => o.name === teamData[0] && o.sport === 'Football');
        historicMaxRedRun = 99;
        historicAvgRedRun = 99;
        historicScore = '';

        switch(value) {
            case 'Wins':
                if (histTeamdata.noWinsMaxRedRun != null) {
                    historicMaxRedRun = histTeamdata.noWinsMaxRedRun;
                }
                if (histTeamdata.noWinsAvgRedRun != null) {
                    historicAvgRedRun = histTeamdata.noWinsAvgRedRun;
                }
                historicScore = histTeamdata.noWinsScore;
                break;
            case 'No Wins':
                if (histTeamdata.winsMaxRedRun != null) {
                    historicMaxRedRun = histTeamdata.winsMaxRedRun;
                }
                if (histTeamdata.winsAvgRedRun != null) {
                    historicAvgRedRun = histTeamdata.winsAvgRedRun;
                }
                historicScore = histTeamdata.winsScore;
                break;
            case 'No Draws':
                if (histTeamdata.drawsHunterMaxRedRun != null) {
                    historicMaxRedRun = histTeamdata.drawsHunterMaxRedRun;
                }
                if (histTeamdata.drawsHunterAvgRedRun != null) {
                    historicAvgRedRun = histTeamdata.drawsHunterAvgRedRun;
                }
                historicScore = histTeamdata.drawsHunterScore;
                break;
            case 'No Margin Wins':
                if (histTeamdata.marginWinsMaxRedRun != null) {
                    historicMaxRedRun = histTeamdata.marginWinsMaxRedRun;
                }
                if (histTeamdata.marginWinsAvgRedRun != null) {
                    historicAvgRedRun = histTeamdata.marginWinsAvgRedRun;
                }
                historicScore = histTeamdata.marginWinsScore;
                break;
            case 'No Clean Sheet':
                if (histTeamdata.cleanSheetMaxRedRun != null) {
                    historicMaxRedRun = histTeamdata.cleanSheetMaxRedRun;
                }
                if (histTeamdata.cleanSheetAvgRedRun != null) {
                    historicAvgRedRun = histTeamdata.cleanSheetAvgRedRun;
                }
                historicScore = histTeamdata.cleanSheetScore;
                break;
            case 'Goals Fest':
                if (histTeamdata.noGoalsFestMaxRedRun != null) {
                    historicMaxRedRun = histTeamdata.noGoalsFestMaxRedRun;
                }
                if (histTeamdata.noGoalsFestAvgRedRun != null) {
                    historicAvgRedRun = histTeamdata.noGoalsFestAvgRedRun;
                }
                historicScore = histTeamdata.noGoalsFestScore;
                break;
            case 'No Goals Fest':
                if (histTeamdata.goalsFestMaxRedRun != null) {
                    historicMaxRedRun = histTeamdata.goalsFestMaxRedRun;
                }
                if (histTeamdata.goalsFestAvgRedRun != null) {
                    historicAvgRedRun = histTeamdata.goalsFestAvgRedRun;
                }
                historicScore = histTeamdata.goalsFestScore;
                break;
            case 'BTTS':
                if (histTeamdata.noBttsMaxRedRun != null) {
                    historicMaxRedRun = histTeamdata.noBttsMaxRedRun;
                }
                if (histTeamdata.noBttsAvgRedRun != null) {
                    historicAvgRedRun = histTeamdata.noBttsAvgRedRun;
                }
                historicScore = histTeamdata.noBttsScore;
                break;
            case 'No BTTS':
                if (histTeamdata.bttsMaxRedRun != null) {
                    historicMaxRedRun = histTeamdata.bttsMaxRedRun;
                }
                if (histTeamdata.bttsAvgRedRun != null) {
                    historicAvgRedRun = histTeamdata.bttsAvgRedRun;
                }
                historicScore = histTeamdata.bttsScore;
                break;
            case 'No Scored Both Halves':
                if (histTeamdata.scoreBothHalvesMaxRedRun != null) {
                    historicMaxRedRun = histTeamdata.scoreBothHalvesMaxRedRun;
                }
                if (histTeamdata.scoreBothHalvesAvgRedRun != null) {
                    historicAvgRedRun = histTeamdata.scoreBothHalvesAvgRedRun;
                }
                historicScore = histTeamdata.scoreBothHalvesScore;
                break;
            case 'No Concede Both Halves':
                if (histTeamdata.concedeBothHalvesMaxRedRun != null) {
                    historicMaxRedRun = histTeamdata.concedeBothHalvesMaxRedRun;
                }
                if (histTeamdata.concedeBothHalvesAvgRedRun != null) {
                    historicAvgRedRun = histTeamdata.concedeBothHalvesAvgRedRun;
                }
                historicScore = histTeamdata.concedeBothHalvesScore;
                break;
            case 'No Win Both Halves':
                if (histTeamdata.winBothHalvesMaxRedRun != null) {
                    historicMaxRedRun = histTeamdata.winBothHalvesMaxRedRun;
                }
                if (histTeamdata.winBothHalvesAvgRedRun != null) {
                    historicAvgRedRun = histTeamdata.winBothHalvesAvgRedRun;
                }
                historicScore = histTeamdata.winBothHalvesScore;
                break;
            case 'No Win && +2.5 Goals':
                if (histTeamdata.winAndGoalsMaxRedRun != null) {
                    historicMaxRedRun = histTeamdata.winAndGoalsMaxRedRun;
                }
                if (histTeamdata.winAndGoalsAvgRedRun != null) {
                    historicAvgRedRun = histTeamdata.winAndGoalsAvgRedRun;
                }
                historicScore = histTeamdata.winAndGoalsScore;
                break;
            case 'No 2HT > 1HT':
                if (histTeamdata.secondHalfBiggerMaxRedRun != null) {
                    historicMaxRedRun = histTeamdata.secondHalfBiggerMaxRedRun;
                }
                if (histTeamdata.secondHalfBiggerAvgRedRun != null) {
                    historicAvgRedRun = histTeamdata.secondHalfBiggerAvgRedRun;
                }
                historicScore = histTeamdata.secondHalfBiggerScore;
                break;
            default:
                break;
        }
        addTeamDiv(teamData[0], teamData[1], streakType, minStreak, historicMaxRedRun, historicScore);
    });
}

function addTeamDiv(teamName, teamData, streakType, minStreak, historicMaxRedRun, historicScore) {
    localStorage.removeItem("seasonsList")
    if (teamData[streakType + 'MainComp'] >= minStreak || teamData[streakType + 'AllComps'] >= minStreak) {
        var backgroundStyle = '';
        if ((teamData[streakType + 'MainComp'] >= historicMaxRedRun-2 || teamData[streakType + 'AllComps'] >= historicMaxRedRun-2) && (historicScore.includes('EXCE') || historicScore.includes('ACCEP'))) {
            backgroundStyle = 'style="background-color: #f0fdca;"';
        }
        $(document).ready(function() {
        $('#footballTableStreaks').append(
            '<tr '+ backgroundStyle +'>' +
            '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><a target="_blank" rel="noopener noreferrer" href="TeamStrategiesHistoricStats.html?team'+teamData['teamID']+'&' + teamName + '" style="color: #4f72d3; text-decoration: underline; font-weight: bold">📖</a></td>' +
            '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><a target="_blank" rel="noopener noreferrer" href="TeamHistoricMatches.html?teamId=team'+teamData['teamID']+'&team=' + teamName + '&season=2024-25" style="color: #4f72d3; text-decoration: underline; font-weight: bold">' + teamName + '</a></td>' +
            '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + teamData['position'] + ' </td>' +
            '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + teamData[streakType + 'MainComp'] + ' </td>' +
            '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> ' + teamData[streakType + 'AllComps'] + ' </td></tr>'
        );
        });
    }
  }