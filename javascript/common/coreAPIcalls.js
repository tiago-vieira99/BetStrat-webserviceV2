//-------------------------------------------------------------------------------------------
//------------------------       STRATEGIES MAIN PAGE CALLS     -----------------------------
//-------------------------------------------------------------------------------------------
function callGetSeqInfo(stratPath) {
  fetch("http://" + API_URL + "/api/betstrat/" + stratPath)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      var balance = myJson.balance.toString();
      $("#balance-stat").text(balance.slice(0, 5) + "€");
      $("#success-stat").text(myJson.successRate + "%");
      $("#numteams-stat").text(myJson.numTeams);
      $("#nummatches-stat").text(myJson.numMatchesPlayed);
      $("#numoversunders-stat").text(myJson.numOvers + "/" + myJson.numUnders);
      $("#stratdescription").text(myJson.description)

      if (stratPath == GOALS_FEST_KELLY_PATH || stratPath == BTTS_ONE_HALF_KELLY_PATH || stratPath == OVER_25_KELLY_PATH) {
        callGetNumMatchesBySeason(stratPath, "all");
      }
    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetSeqEvolution(stratPath) {
  fetch("http://" + API_URL + "/api/betstrat/" + stratPath + "/evolution")
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      x = myJson.x;
      y = myJson.y;
      chart = new Chart(context, chartSetup(x, y));
    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetSeqEvolutionBySeason(stratPath, season) {
  fetch("http://" + API_URL + "/api/betstrat/" + stratPath + "/evolution/" + season)
    .then(function(response) {
      callGetStatsInfoBySeason(stratPath, season);
      return response.json();
    })
    .then(function(myJson) {
      x = myJson.x;
      y = myJson.y;
      chart = new Chart(context, chartSetup(x, y));
    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetStatsInfoBySeason(stratPath, season) {
  fetch("http://" + API_URL + "/api/betstrat/" + stratPath + "/teams/")
    .then(function(response) {
      return response.json();
    })
    .then(function(resp){
      var allTeams = resp.teams;
      var filteredTeams = [];
      var greenTeams = 0;
      var totalBalance = 0;

      allTeams.forEach(function(team) {
        if (team.season == season) {
          filteredTeams.push(team);
          totalBalance = totalBalance + team.balance;

          if (team.balance > 0) {
            greenTeams++;
          }
        }
      });

    }) 
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetNumMatchesBySeason(stratPath, season) {
  fetch("http://" + API_URL + "/api/betstrat/" + stratPath + "/matches/")
    .then(function(response) {
      return response.json();
    })
    .then(function(resp){
      var allMatches = resp;
      var filteredMatches = [];

      allMatches.forEach(function(match) {
        if (match.season == season) {
          filteredMatches.push(match);
        }
      });
      $("#nummatches-stat").text(filteredMatches.length);

      if (stratPath == GOALS_FEST_KELLY_PATH || stratPath == BTTS_ONE_HALF_KELLY_PATH || stratPath == OVER_25_KELLY_PATH) {
        var filteredMatches = [];
        var greenTeams = 0;
        var totalBalance = 0;
        var totalInvested = 0;
        if (season != "all") {
          var monthYear = season.split('-')[1] + '/' + season.split('-')[0]
          console.log(monthYear);
          
          allMatches.forEach(function(match) {          
            if (match.date.includes(monthYear)) {
              filteredMatches.push(match);
              totalInvested = totalInvested + match.stake;
              totalBalance = totalBalance + match.balance;

              if (match.balance > 0) {
                greenTeams++;
              }
            }
          });
          var successRate = (greenTeams / filteredMatches.length)*100;
          var roi = 100*totalBalance/totalInvested;
          $("#roi-stat").text(roi.toString().slice(0, 5) + "%");
          $("#balance-stat").text(totalBalance.toString().slice(0, 5) + "€");
          $("#success-stat").text(successRate.toString().slice(0, 5) + "%");
          $("#nummatches-stat").text(filteredMatches.length);
        } else {
          var totalInvested = 0;
          var totalBalance = 0;
          allMatches.forEach(function(match) {
            totalInvested = totalInvested + match.stake;
            totalBalance = totalBalance + match.balance;
          });
          var roi = 100*totalBalance/totalInvested;
          $("#roi-stat").text(roi.toString().slice(0, 5) + "%");
          $("#nummatches-stat").text(allMatches.length);
        }
      }
    }) 
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

//-------------------------------------------------------------------------------------------
//---------------------------       ALL MATCHES PAGE CALLS     ------------------------------
//-------------------------------------------------------------------------------------------

async function callGetAllMatchesInfo(stratPath) {
  try {
    const response = await fetch("http://" + API_URL + "/api/betstrat/" + stratPath + "/matches");
    const resp = await response.json();

    matches = resp;

    matches.sort(function(a, b) {
      var matchDateA = a.date.split('/');
      var matchDateB = b.date.split('/');

      var dateA = Date.parse(matchDateA[1].concat('/',matchDateA[0],'/',matchDateA[2])),
        dateB = Date.parse(matchDateB[1].concat('/',matchDateB[0],'/',matchDateB[2]))
      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
      return 0;
    });
    matches.forEach(function(match) {
      var idMatch = "idmatch" + count++;
      map1.set(idMatch, match);
    });
    storeData("allMatches"+stratPath, map1);
    init();
    hideLoadingIndicator();
  } catch (error) {
      console.log("Error fetching data from API: " + error);
      hideLoadingIndicator();
  }
  // await fetch("http://" + API_URL + "/api/betstrat/" + stratPath + "/matches")
  //   .then(async function(response) {
  //     return await response.json();
  //   })
  //   .then(async function(resp) {
  //     matches = resp;

  //     matches.sort(function(a, b) {
  //       var matchDateA = a.date.split('/');
  //       var matchDateB = b.date.split('/');

  //       var dateA = Date.parse(matchDateA[1].concat('/',matchDateA[0],'/',matchDateA[2])),
  //         dateB = Date.parse(matchDateB[1].concat('/',matchDateB[0],'/',matchDateB[2]))
  //       if (dateA > dateB) return -1;
  //       if (dateA < dateB) return 1;
  //       return 0;
  //     });
  //     await matches.forEach(function(match) {
  //       var idMatch = "idmatch" + count++;
  //       map1.set(idMatch, match);
  //       if (match.betType != null) {
  //         add25MatchLine(idMatch, match);  
  //       } else {
  //         addMatchLine(idMatch, match);
  //       }
  //     });

  //   })
  //   .catch(function(error) {
  //     console.log("Error: " + error);
  //   });
}

function callPutUpdateMatch(stratPath, matchId, ftResult) {
  if (ftResult.includes('+')) {
    ftResult = ftResult.replace('+', '%2B');
  }
  var url = "http://" + API_URL + "/api/betstrat/" + stratPath + "/match/" + matchId + "?ftResult=" + ftResult;

  fetch(url, {
      method: 'PUT', // or 'PUT'
    })
    .then(response => response.json())
    .then(data => {
      console.log(url);
      if (data.status) {
        modalBox("Error", "<p>" + data.error + "</p><p>" + data.message + "</p>");
      } else {
        modalBox("Match Updated!", "balance: " + data.balance);
        console.log(data);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function callDeleteMatch(stratPath, matchId) {
  var url = "http://" + API_URL + "/api/betstrat/" + stratPath + "/match/" + matchId;

  fetch(url, {
      method: 'DELETE', // or 'PUT'
    })
    .then(response => response.json())
    .then(data => {
      if (data.status) {
        modalBox("Error", "<p>" + data.error + "</p><p>" + data.message + "</p>");
      } else {
        console.log(data);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

//-------------------------------------------------------------------------------------------
//-----------------------------       ALL TEAMS PAGE CALLS     ------------------------------
//-------------------------------------------------------------------------------------------

function callGetTeams(stratPath) {
  fetch("http://"+API_URL+"/api/betstrat/" + stratPath + "/teams")
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {
      teams = resp.teams;

      teams.sort(function(a, b) {
        var nameA = a.name,
          nameB = b.name;
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      teams.forEach(function(team) {
        var admin;
        if (team.admin) {
          admin = "checked";
        } else {
          admin = "";
        }
        
        getFirstMatchForTeam(team, admin);          
        
      });

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetTeamsNamesList(stratPath) {
  fetch("http://"+API_URL+"/api/betstrat/" + stratPath + "/teams")
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {
      teams = resp.teams;

      var array = [];

      teams.forEach(function(team) {
        var teamObj = new Map();
        teamObj.set("name", team.name);
        teamObj.set("admin", team.admin);
        array.push(teamObj);
      });

      teamsArray = array;

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callUpdateTeamAdmin(stratPath, teamId, admin) {
  var url = "http://" + API_URL + "/api/betstrat/" + stratPath + "/" + teamId + "?admin=" + admin;

  fetch(url, {
      method: 'PUT', // or 'PUT'
    })
    .then(response => response.json())
    .then(data => {
      if (data.status) {
        modalBox("Error", "<p>" + data.error + "</p><p>" + data.message + "</p>");
      } else {
        console.log(data);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function callUpdateTeamStake(stratPath, teamId, stake) {
  var url = "http://" + API_URL + "/api/betstrat/" + stratPath + "/" + teamId + "?initial_stake=" + stake;

  fetch(url, {
      method: 'PUT', // or 'PUT'
    })
    .then(response => response.json())
    .then(data => {
      if (data.status) {
        modalBox("Error", "<p>" + data.error + "</p><p>" + data.message + "</p>");
      } else {
        console.log(data);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function callArchiveTeam(stratPath, teamId) {
  var url = "http://" + API_URL + "/api/betstrat/" + stratPath + "/team/archive" + teamId;

  console.log(url);

  fetch(url, {
      method: 'PUT', // or 'PUT'
    })
    .then(response => response.json())
    .then(data => {
      if (data.status) {
        modalBox("Error", "<p>" + data.error + "</p><p>" + data.message + "</p>");
      } else {
        console.log(data);
        modalBox("Archived Team", "<p>OK!</p>");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function callInsertNewTeam(url) {
  console.log(url);
  fetch(url, {
    method: 'POST', // or 'PUT'
  })
  .then(response => response.json())
  .then(data => {
    if (data.status) {
      modalBox("Error", "<p>" + data.error + "</p><p>" + data.message + "</p>");
    } else {
      modalBox("New Team", data.name + " inserted!");
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

//-------------------------------------------------------------------------------------------
//--------------------------       INSERT MATCHES PAGE CALLS     ----------------------------
//-------------------------------------------------------------------------------------------

function callGetNextMatches(stratPath) {
  fetch("http://" + API_URL + "/api/betstrat/" + stratPath + "/nextmatches")
    .then(function(response) {      
      return response.json();
    })
    .then(function(resp) {
      matches = resp;

      matches.sort(function(a, b) {
        var dateA = a.date,
          dateB = b.date;
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0;
      });
      matches.forEach(function(match) {
        var idMatch = "idmatch" + count++;
        map1.set(idMatch, match);
        addMatchDiv(idMatch, match.date, match.homeTeam, match.awayTeam, match.competition);
      });

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callPostNewMatch(stratPath, match) {
  console.log(match);
  console.log(JSON.stringify(match));
  var url = "http://" + API_URL + "/api/betstrat/" + stratPath + "/match"

  fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(match),
    })
    .then(response => response.json())
    .then(data => {
      if (data.status) {
        modalBox("Error", "<p>" + data.error + "</p><p>" + data.message + "</p>");
      } else {
        if (data.betType == 'GOALS_FEST' || data.betType == 'BTTS_ONE_HALF' || data.betType == 'OVER_25') {
          modalBox("New Match", "<p><b>Stake:</b> " + data.stake + "</p><p><b>Bankroll %:</b> " + data.bankrollPercentage + "</p>");
        } else {
          modalBox("New Match", "<p><b>Stake:</b> " + data.stake + "</p><p><b>SeqLevel:</b> " + data.seqLevel + "</p>");
        }
        console.log(data);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


//-------------------------------------------------------------------------------------------
//------------------------       MATCHES BY TEAM PAGE CALLS     -----------------------------
//-------------------------------------------------------------------------------------------

//these paths are always 'onlydraws' because the core API returns the correct info only based on id, whatever is the path,
function getTeamInfo() {
  fetch("http://" + API_URL + "/api/betstrat/onlydraws/team/" + teamId)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {
      team = resp;

      var b = document.querySelector(".teamDataSheet");

      if (team.strategyID == ONLY_DRAWS_ID) {
        b.setAttribute("src", OD_DATA_SHEET_URL + "?gid=" + team.analysisID + "&single=true&range=B5:N14&widget=true&headers=false");
      } else if (team.strategyID == MARGIN_WINS_ID) {
        b.setAttribute("src", EH_DATA_SHEET_URL + "?gid=" + team.analysisID + "&single=true&range=B5:N14&widget=true&headers=false");
      } else if (team.strategyID == DRAWS_HUNTER_ID) {
        b.setAttribute("src", DH_DATA_SHEET_URL + "?gid=" + team.analysisID + "&single=true&range=B5:N14&widget=true&headers=false");
      }
    
    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function getMatchesForTeam() {
  fetch("http://" + API_URL + "/api/betstrat/onlydraws/teammatches/" + teamId)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {
      matches = resp;

      matches.sort(function(a, b) {
        var matchDateA = a.date.split('/');
        var matchDateB = b.date.split('/');

        var dateA = Date.parse(matchDateA[1].concat('/',matchDateA[0],'/',matchDateA[2])),
          dateB = Date.parse(matchDateB[1].concat('/',matchDateB[0],'/',matchDateB[2]))
        if (dateA > dateB) { return -1; }
        if (dateA < dateB) { return 1; }
        return 0;
      });

      matches.forEach(function(match) {
        var idMatch = "idmatch" + count++;
        map1.set(idMatch, match);
        addMatchLine(idMatch, match);
      });

      matches.reverse();

      var matchesBalanceArray = [];
      var matchesDateArray = [];
      var barsBackgroundColorArray = [];
      var barsBorderColorArray = [];
      
      matches.forEach(function(match) {
        matchesBalanceArray.push(match.balance);
        matchesDateArray.push(match.date);
        if (match.balance > 0) {
          barsBackgroundColorArray.push("#afdfbd");
          barsBorderColorArray.push("#58F031");
        } else {
          barsBackgroundColorArray.push("#e3c0c1");
          barsBorderColorArray.push("#E46F73");
        }
      });

      var chart = new Chart(context, chartSetup(matchesDateArray, matchesBalanceArray, barsBackgroundColorArray, barsBorderColorArray));

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function getFirstMatchForTeam(team, admin) {
  fetch("http://" + API_URL + "/api/betstrat/onlydraws/teammatches/" + team.id)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {
      var matches;
      matches = resp;

      matches.sort(function(a, b) {
        var matchDateA = a.date.split('/');
        var matchDateB = b.date.split('/');

        var dateA = Date.parse(matchDateA[1].concat('/',matchDateA[0],'/',matchDateA[2])),
          dateB = Date.parse(matchDateB[1].concat('/',matchDateB[0],'/',matchDateB[2]))
        if (dateA > dateB) { return -1; }
        if (dateA < dateB) { return 1; }
        return 0;
      });

      matches.reverse();

      if (matches[0] == null) {
        addTeamToTable("team" + team.id, team, admin, 0);
      } else {
        addTeamToTable("team" + team.id, team, admin, matches[0].stake);
      }

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}


//-------------------------------------------------------------------------------------------
//-----------------------------       ALL LEAGUES PAGE CALLS     ------------------------------
//-------------------------------------------------------------------------------------------

function callGetLeagues() {
  fetch("http://"+API_URL+"/api/league/")
    .then(function(response) {
      return response.json();
    })
    .then(function(leagues) {
      // league = resp.leagues;

      console.log(leagues);

      leagues.sort(function(a, b) {
        var nameA = a.country,
          nameB = b.country;
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      leagues.forEach(function(league) {
        var admin;
        if (league.admin) {
          admin = "checked";
        } else {
          admin = "";
        }     

        addLeagueToTable("league" + league.id, league, admin);
        
      });

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetCandidateTeams() {
  fetch("http://"+API_URL+"/api/league/teamsInfo")
    .then(function(response) {
      return response.json();
    })
    .then(function(teams) {

      teams.sort(function(a, b) {
        var nameA = a.teamLeague.country,
          nameB = b.teamLeague.country;
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      
      teams.forEach(function(team) {
        
        addCandidateTeamToTable(team);
        
      });

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callInsertNewLeague(url) {
  fetch(url, {
    method: 'POST', // or 'PUT'
  })
  .then(response => response.json())
  .then(data => {
    if (data.status) {
      modalBox("Error", "<p>" + data.error + "</p><p>" + data.message + "</p>");
    } else {
      modalBox("New League", data.name + " inserted!");
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function callUpdateLeagueAdmin(leagueId, admin) {
  var url = "http://" + API_URL + "/api/league/" + leagueId + "?admin=" + admin;

  fetch(url, {
      method: 'PUT', // or 'PUT'
    })
    .then(response => response.json())
    .then(data => {
      if (data.status) {
        modalBox("Error", "<p>" + data.error + "</p><p>" + data.message + "</p>");
      } else {
        console.log(data);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


//-------------------------------------------------------------------------------------------
//------------------------------       BANKROLLS CALLS     ----------------------------------
//-------------------------------------------------------------------------------------------

function callPostNewBankroll(bankroll) {
  var url = "http://" + API_URL + "/api/bankroll/new"

  console.log(bankroll);

  fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: bankroll,
    })
    .then(response => response.json())
    .then(data => {
      if (data.status) {
        modalBox("Error", "<p>" + data.error + "</p><p>" + data.message + "</p>");
      } else {
        modalBox("New Bankroll", data.name + " inserted!");
        console.log(data);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


function callGetAllBankrolls() {
  fetch("http://"+API_URL+"/api/bankroll/")
    .then(function(response) {
      return response.json();
    })
    .then(function(bankrolls) {

      bankrolls.sort(function(a, b) {
        var nameA = a.name,
          nameB = b.name;
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      
      bankrolls.forEach(function(bankroll) {
        
        addBankrollButtonToPage(bankroll);
        
      });

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetBankrollById(bankrollId) {
  fetch("http://"+API_URL+"/api/bankroll/"+bankrollId)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {

      var balance = myJson.balance.toString();
      $("#balance-stat").text(balance.slice(0, 5) + "€");
      $("#numbets-stat").text(myJson.numBets);
      $("#roi-stat").text(myJson.roi);
      $("#progress-stat").text(myJson.progression);

      addBankrollStatsInfo(myJson);

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}


function callGetBankrollEvolution(bankrollId) {
  fetch("http://" + API_URL + "/api/bankroll/" + bankrollId + "/evolution")
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      x = myJson.x;
      y = myJson.y;
      chart = new Chart(context, chartSetup(x, y));
    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callPutRefreshBankroll(bankrollId) {
  var url = "http://" + API_URL + "/api/bankroll/refresh-stats/" + bankrollId ;

  console.log("call refresh");

  fetch(url, {
      method: 'PUT', // or 'PUT'
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        modalBox("Error refreshing bankroll stats: ", "<p>" + data.error + "</p><p>" + data.message + "</p>");
      } 
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

//-------------------------------------------------------------------------------------------
//--------------------------------       BETS CALLS     -------------------------------------
//-------------------------------------------------------------------------------------------

function callGetAllBetsByBankroll(bankrollId) {
  fetch("http://"+API_URL+"/api/notebets/" + bankrollId)
    .then(function(response) {
      return response.json();
    })
    .then(function(bets) {

      allBets = bets;

      bets.sort(function(a, b) {
        var betDateA = a.date.split('/');
        var betDateB = b.date.split('/');

        var dateA = Date.parse(betDateA[1].concat('/',betDateA[0],'/',betDateA[2])),
          dateB = Date.parse(betDateB[1].concat('/',betDateB[0],'/',betDateB[2]))
        if (dateA > dateB) { return -1; }
        if (dateA < dateB) { return 1; }
        return 0;
      });

      bets.sort(function(a, b) {
        var idA = a.id,
          idB = b.id;
        if (idA > idB) return -1;
        if (idA < idB) return 1;
        return 0;
      });
      
      addBetsToTable(bets);

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callPostNewBet(bet, bankrollId) {
  var url = "http://" + API_URL + "/api/notebets/" + bankrollId + "/new"

  fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: bet,
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        modalBox("Error", "<p>" + data.error + "</p><p>" + data.message + "</p>");
      } else {
        modalBox("New Bet inserted!","");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function callPutUpdateBet(betId, bankrollId, newStatus) {
  var url = "http://" + API_URL + "/api/notebets/" + bankrollId + "/update/" + betId + "?status=" + newStatus;

  fetch(url, {
      method: 'PUT', // or 'PUT'
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        modalBox("Error", "<p>" + data.error + "</p><p>" + data.message + "</p>");
      } else {
        modalBox("Bet updated!","");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function callDeleteBet(betId, bankrollId) {
  var url = "http://" + API_URL + "/api/notebets/" + bankrollId + "/delete/" + betId;

  fetch(url, {
      method: 'DELETE', // or 'PUT'
    })
    .then(response => response.json())
    .then(data => {
      if (data.status) {
        modalBox("Error", "<p>" + data.error + "</p><p>" + data.message + "</p>");
      } else {
        console.log(data);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


//-------------------------------------------------------------------------------------------
//-------------------------       HISTORIC DATA PAGE CALLS     ------------------------------
//-------------------------------------------------------------------------------------------

// function callGetHistoricDataTeams() {
//   teamsSessionStorage = JSON.parse(localStorage.getItem("teams"));
//   if (teamsSessionStorage != null) {
//     return;
//   }
//   fetch("http://"+DATA_STATS_API_URL+"/api/bhd/teams")
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(resp) {
//       teams = resp;

//       numTeams = teams.length;

//       teams.sort(function(a, b) {
//         var nameA = a.name,
//           nameB = b.name;
//         if (nameA < nameB) return -1;
//         if (nameA > nameB) return 1;
//         return 0;
//       });

//       localStorage.setItem("teams", JSON.stringify(teams));

//       // teams.forEach(function(team) {    
//       //   if (team.sport === "Football") {
//       //     addTeamToTable("team" + team.id, team, '');
//       //   // } else if (team.sport === "Basketball") {
//       //   //   addBasketTeamToTable("team" + team.id, team);
//       //   // } else if (team.sport === "Handball") {
//       //   //   addHandballTeamToTable("team" + team.id, team);
//       //   // } else {
//       //   //   addHockeyTeamToTable("team" + team.id, team);
//       //   }
        
//       // });

//     })
//     .catch(function(error) {
//       console.log("Error: " + error);
//     });
// }

function callGetHistoricDataTeamInfo(teamName) {
  return fetch("http://"+DATA_STATS_API_URL+"/api/bhd/team/" + teamName)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {
      console.log("check2 " + JSON.stringify(resp));
      return resp;  // Return the response data to be used in `await`
    })
    .catch(function(error) {
      console.log("Error: " + error);
      throw error;  // Re-throw the error to be caught in `init`
    });
}


function callGetHistoricMatchesByTeam(teamId, season) {
  fetch("http://"+DATA_STATS_API_URL+"/api/bhd/historic-matches?season=" + season + "&teamId=" + teamId)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {
      matches = resp;

      matches.forEach(function(match) {    
        allMatches.push(match)
        addCompetitionToMap(match.competition)
        addDataToTable(match)        
      });

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetTeamStatsByStrategy(teamName, strategy) {
  fetch("http://"+DATA_STATS_API_URL+"/api/bhd/stats/" + strategy + "/" + teamName)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {
      var availableSeasons = []

      resp.forEach(function(statsData) {   
        availableSeasons.push(statsData.season) 
        addDataToTable(statsData);
      });
      availableSeasons.push(CURRENT_SEASON);
      localStorage.setItem("seasonsList", JSON.stringify(availableSeasons));

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetDrawsHistoricDataByTeam(teamName) {
  fetch("http://"+DATA_STATS_API_URL+"/api/bhd/stats/Draw/" + teamName)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {

      var availableSeasons = []

      resp.forEach(function(statsData) {    
        availableSeasons.push(statsData.season)
        addDataToTable(statsData);
      });
      availableSeasons.push(CURRENT_SEASON);
      localStorage.setItem("seasonsList", JSON.stringify(availableSeasons));

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetHockeyDrawsHistoricDataByTeam(teamName) {
  fetch("http://"+DATA_STATS_API_URL+"/api/hockey/team-hockey-draw-stats/" + teamName)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {

      var availableSeasons = []

      resp.forEach(function(statsData) {   
        availableSeasons.push(statsData.season) 
        addDataToTable(statsData);
      });
      availableSeasons.push(CURRENT_SEASON);
      localStorage.setItem("seasonsList", JSON.stringify(availableSeasons));

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetMarginWinsHistoricDataByTeam(teamName) {
  fetch("http://"+DATA_STATS_API_URL+"/api/bhd/stats/WinsMargin/" + teamName)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {

      var availableSeasons = []

      resp.forEach(function(statsData) {   
        availableSeasons.push(statsData.season) 
        addDataToTable(statsData);
      });
      availableSeasons.push(CURRENT_SEASON);
      localStorage.setItem("seasonsList", JSON.stringify(availableSeasons));

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetMargin16WinsHistoricDataByTeam(teamName) {
  fetch("http://"+DATA_STATS_API_URL+"/api/bhd/handball/team-margin16wins-stats/" + teamName)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {

      var availableSeasons = []

      resp.forEach(function(statsData) {   
        availableSeasons.push(statsData.season) 
        addDataToTable(statsData);
      });
      availableSeasons.push(CURRENT_SEASON);
      localStorage.setItem("seasonsList", JSON.stringify(availableSeasons));

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetMargin49WinsHistoricDataByTeam(teamName) {
  fetch("http://"+DATA_STATS_API_URL+"/api/bhd/handball/team-margin49wins-stats/" + teamName)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {

      var availableSeasons = []

      resp.forEach(function(statsData) {   
        availableSeasons.push(statsData.season) 
        addDataToTable(statsData);
      });
      availableSeasons.push(CURRENT_SEASON);
      localStorage.setItem("seasonsList", JSON.stringify(availableSeasons));

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetMargin712WinsHistoricDataByTeam(teamName) {
  fetch("http://"+DATA_STATS_API_URL+"/api/bhd/handball/team-margin712wins-stats/" + teamName)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {

      var availableSeasons = []

      resp.forEach(function(statsData) {   
        availableSeasons.push(statsData.season) 
        addDataToTable(statsData);
      });
      availableSeasons.push(CURRENT_SEASON);
      localStorage.setItem("seasonsList", JSON.stringify(availableSeasons));

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetGoalsFestHistoricDataByTeam(teamName) {
  fetch("http://"+DATA_STATS_API_URL+"/api/bhd/stats/GoalsFest/" + teamName)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {

      var availableSeasons = []

      resp.forEach(function(statsData) {    
        availableSeasons.push(statsData.season)
        addDataToTable(statsData);
      });
      availableSeasons.push(CURRENT_SEASON);
      localStorage.setItem("seasonsList", JSON.stringify(availableSeasons));

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetEuroHandicapHistoricDataByTeam(teamName) {
  fetch("http://"+DATA_STATS_API_URL+"/api/bhd/stats/EuroHandicap/" + teamName)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {

      var availableSeasons = []

      resp.forEach(function(statsData) {  
        availableSeasons.push(statsData.season)  
        addDataToTable(statsData);
      });
      availableSeasons.push(CURRENT_SEASON);
      localStorage.setItem("seasonsList", JSON.stringify(availableSeasons));

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetFlipFlopHistoricDataByTeam(teamName) {
  fetch("http://"+DATA_STATS_API_URL+"/api/bhd/team-flip-flop-stats/" + teamName)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {

      var availableSeasons = []

      resp.forEach(function(statsData) {   
        availableSeasons.push(statsData.season) 
        addFlipFlopDataToTable(statsData);
      });
      availableSeasons.push(CURRENT_SEASON);
      localStorage.setItem("seasonsList", JSON.stringify(availableSeasons));

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetShortWinsHistoricDataByTeam(teamName) {
  fetch("http://"+DATA_STATS_API_URL+"/api/bhd/basket/team-shortwins-stats/" + teamName)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {

      var availableSeasons = []

      resp.forEach(function(statsData) {   
        availableSeasons.push(statsData.season) 
        addDataToTable(statsData);
      });
      availableSeasons.push(CURRENT_SEASON);
      localStorage.setItem("seasonsList", JSON.stringify(availableSeasons));

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetLongWinsHistoricDataByTeam(teamName) {
  fetch("http://"+DATA_STATS_API_URL+"/api/bhd/basket/team-longwins-stats/" + teamName)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {

      var availableSeasons = []

      resp.forEach(function(statsData) {   
        availableSeasons.push(statsData.season) 
        addDataToTable(statsData);
      });
      availableSeasons.push(CURRENT_SEASON);
      localStorage.setItem("seasonsList", JSON.stringify(availableSeasons));

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetComebackWinsHistoricDataByTeam(teamName) {
  fetch("http://"+DATA_STATS_API_URL+"/api/bhd/basket/team-comebackwins-stats/" + teamName)
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {

      var availableSeasons = []

      resp.forEach(function(statsData) {   
        availableSeasons.push(statsData.season) 
        addDataToTable(statsData);
      });
      availableSeasons.push(CURRENT_SEASON);
      localStorage.setItem("seasonsList", JSON.stringify(availableSeasons));

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callSimulationReportBySeason(season, strategy) {
  fetch("http://"+DATA_STATS_API_URL+"/api/bhd/report/?strategy="+ strategy + "&season=" + season, {
      method: 'GET', // or 'PUT'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {

      let myMap = new Map(Object.entries(resp));

      myMap.forEach((values, keys) => {
        buildDataToPage(values);
      });

      // resp.forEach(function(statsData) {   
      //   availableSeasons.push(statsData.season) 
      //   addDataToTable(statsData);
      // });

      // localStorage.setItem("seasonsList", JSON.stringify(availableSeasons));

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}


//-------------------------------------------------------------------------------------------
//----------------------------       2,5 GOAL LINES CALLS      ------------------------------
//-------------------------------------------------------------------------------------------


async function callGetNext25MatchesByDate(date) {
  fetch("http://"+API_URL+"/api/betstrat/25goal-lines/nextMatches/" + date)
    .then(function(response) {
      console.log("finish callGetNext25MatchesByDate()");
      modalBox("GetNext25Matches Completed!", "");
      return response;
    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

function callGetCurrent25GoalsMatches() {
  fetch("http://"+API_URL+"/api/betstrat/25goal-lines/currentMatches")
    .then(function(response) {
      return response.json();
    })
    .then(function(resp) {
      
      resp.forEach(function(match) {   
        var idMatch = "idmatch" + count++;
        map1.set(idMatch, match); 
        add25MatchDiv(idMatch, match);
      });

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

async function callGetStreaks() {
  await fetch("http://"+API_URL+"/api/betstrat/sync/streaks")
    .then(async function(response) {
      return await response.json();
    })
    .then(async function(resp) {
      
      streaks = resp;

    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}