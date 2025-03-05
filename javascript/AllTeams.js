var strategyPath = "";
if (ONLY_DRAWS_ID == currentStrategy) {
    strategyPath = ONLY_DRAWS_PATH;
} else if (MARGIN_WINS_ID == currentStrategy) {
    strategyPath = MARGIN_WINS_PATH;
} else if (DRAWS_HUNTER_ID == currentStrategy) {
  strategyPath = DRAWS_HUNTER_PATH;
} else if (GOALS_FEST_ID == currentStrategy) {
  strategyPath = GOALS_FEST_PATH;
}

callGetTeams(strategyPath);

var teams;
var currStake;

setTimeout(function() {
  addBtnListeners();
}, 15000);

function addBtnListeners() {
  var allarchiveButtons = document.querySelectorAll('.archiveBtn');
  var allUpdateStakeButtons = document.querySelectorAll('.updateStakeBtn');

  console.log("length: " + allarchiveButtons.length);
  for (var i = 0; i < allarchiveButtons.length; i++) {
    allarchiveButtons[i].addEventListener('click', function() {
      if (dialogConfirmation(this)) {
        var teamId = getBtnId(this).substr(4);
        callArchiveTeam(strategyPath, teamId);
      }
    });
  }

  for (var j = 0; j < allUpdateStakeButtons.length; j++) {
    allUpdateStakeButtons[j].addEventListener('click', function() {
      var teamId = getBtnId(this);
      var newStake = document.querySelector('#stake' + teamId).value;
      if (dialogConfirmation(this)) {
        callUpdateTeamStake(strategyPath, teamId, newStake);
      }
    });
  }
}

function dialogConfirmation(Btn) {
  var retVal = confirm("Do you want to continue ?");
  return retVal;
}

function getBtnId(elt) {
  // Traverse up until root hit or DIV with ID found
  while (elt && (elt.tagName != "TR" || !elt.id))
    elt = elt.parentNode;
  if (elt) // Check we found a DIV with an ID
    return elt.id;
}


function addTeamToTable(idTeam, team, admin, firstStake) {
  if (team.strategyID != 2) {
    addTeamToTableDrawsStrat(idTeam, team, admin, firstStake);
    return;
  }
  if (team.name.includes("_")) {
    $(document).ready(function() {
      $('#archTeamsTable').append(
        '<tr id="' + idTeam + '" style="background-color: '+teamBackgroundColor(team.balance.toString().slice(0, 5))+';"><td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><a style="color: black; font-weight: bold;" href="TeamInfoPage.html?'+idTeam+'&'+team.name+'&'+team.strategyID+'"><u>' + team.name + '</u></a></td>' +
        '<td class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell" style="padding-top: 0; padding-bottom: 0; ' + checkLeftMatchesToPlayColor(team.numMatchesToPlay, team.name, team.admin) +'">' + team.numMatchesPlayed + ' / ' + team.numMatchesToPlay + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.season + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.oddAvg + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.balance.toString().slice(0, 5) + '</td>' +
        // '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.initialStake + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + calculateROI(firstStake, team.balance) + '</td></tr>'
      );
    });
  } else if (!admin) {
    $(document).ready(function() {
      $('#disableTeamsTable').append(
        '<tr id="' + idTeam + '" style="background-color: '+teamBackgroundColor(team.balance.toString().slice(0, 5))+';"><td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><a style="color: black; font-weight: bold;" href="TeamInfoPage.html?'+idTeam+'&'+team.name+'&'+team.strategyID+'"><u>' + team.name + '</u></a></td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><label class="switch"><input id="' + idTeam + '" onclick="toggleButton(this);"  type="checkbox" ' + admin + '><span class="slider round"></span></label></td>' +
        '<td class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell" style= "padding-top: 0; padding-bottom: 0; ' + checkLeftMatchesToPlayColor(team.numMatchesToPlay, team.name, team.admin) +'">' + team.numMatchesPlayed + ' / ' + team.numMatchesToPlay + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.season + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.oddAvg + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.balance.toString().slice(0, 5) + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + calculateROI(firstStake, team.balance) + '</td>' +
        // '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.initialStake + '</td>' +
        // '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> <table>  <tr><td style="padding: 0px;"><input id="stake' + idTeam + '" type="text" placeholder="goal" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white u-input-1" required="required" style="padding-top: 0; padding-bottom: 0;"></td> <td> <form><input class="updateStakeBtn" type=button value="✔️" style="width:100%"></form></td> </tr></table></td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> <form><input class="archiveBtn" type=button value="📜" style="max-width:100%; position: center;"></form> </td></tr>'
      );
    });
  } else {
    $(document).ready(function() {
      $('#teamsTable').append(
        '<tr id="' + idTeam + '" style="background-color: '+teamBackgroundColor(team.balance.toString().slice(0, 5))+';"><td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><a style="color: black; font-weight: bold;" href="TeamInfoPage.html?'+idTeam+'&'+team.name+'&'+team.strategyID+'"><u>' + team.name + '</u></a></td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><label class="switch"><input id="' + idTeam + '" onclick="toggleButton(this);"  type="checkbox" ' + admin + '><span class="slider round"></span></label></td>' +
        '<td class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell" style="padding-top: 0; padding-bottom: 0; ' + checkLeftMatchesToPlayColor(team.numMatchesToPlay, team.name, team.admin) +'">' + team.numMatchesPlayed + ' / ' + team.numMatchesToPlay + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.season + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.oddAvg + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.balance.toString().slice(0, 5) + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + calculateROI(firstStake, team.balance) + '</td>' +
        // '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.initialStake + '</td>' +
        // '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> <table>  <tr><td style="padding: 0px;"><input id="stake' + idTeam + '" type="text" placeholder="goal" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white u-input-1" required="required" style="padding-top: 0; padding-bottom: 0;"></td> <td> <form><input class="updateStakeBtn" type=button value="✔️" style="width:100%"></form></td> </tr></table></td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> <form><input class="archiveBtn" type=button value="📜" style="max-width:100%; position: center;"></form> </td></tr>'
      );
    });
  }
}

function addTeamToTableDrawsStrat(idTeam, team, admin, firstStake) {
  if (team.name.includes("_")) {
    $(document).ready(function() {
      $('#archTeamsTable').append(
        '<tr id="' + idTeam + '" style="background-color: '+teamBackgroundColor(team.balance.toString().slice(0, 5))+';"><td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><a style="color: black; font-weight: bold;" href="TeamInfoPage.html?'+idTeam+'&'+team.name+'&'+team.strategyID+'"><u>' + team.name + '</u></a></td>' +
        '<td class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell" style="padding-top: 0; padding-bottom: 0; ' + checkLeftMatchesToPlayColor(team.numMatchesToPlay, team.name, team.admin) +'">' + team.numMatchesPlayed + ' / ' + team.numMatchesToPlay + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.season + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.oddAvg + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.balance.toString().slice(0, 5) + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + calculateROI(firstStake, team.balance) + '</td></tr>'
      );
    });
  } else if (!admin) {
    $(document).ready(function() {
      $('#disableTeamsTable').append(
        '<tr id="' + idTeam + '" style="background-color: '+teamBackgroundColor(team.balance.toString().slice(0, 5))+';"><td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><a style="color: black; font-weight: bold;" href="TeamInfoPage.html?'+idTeam+'&'+team.name+'&'+team.strategyID+'"><u>' + team.name + '</u></a></td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><label class="switch"><input id="' + idTeam + '" onclick="toggleButton(this);"  type="checkbox" ' + admin + '><span class="slider round"></span></label></td>' +
        '<td class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell" style= "padding-top: 0; padding-bottom: 0; ' + checkLeftMatchesToPlayColor(team.numMatchesToPlay, team.name, team.admin) +'">' + team.numMatchesPlayed + ' / ' + team.numMatchesToPlay + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.season + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.oddAvg + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.balance.toString().slice(0, 5) + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + calculateROI(firstStake, team.balance) + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> <form><input class="archiveBtn" type=button value="📜" style="max-width:100%; position: center;"></form> </td></tr>'
      );
    });
  } else {
    $(document).ready(function() {
      $('#teamsTable').append(
        '<tr id="' + idTeam + '" style="background-color: '+teamBackgroundColor(team.balance.toString().slice(0, 5))+';"><td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><a style="color: black; font-weight: bold;" href="TeamInfoPage.html?'+idTeam+'&'+team.name+'&'+team.strategyID+'"><u>' + team.name + '</u></a></td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><label class="switch"><input id="' + idTeam + '" onclick="toggleButton(this);"  type="checkbox" ' + admin + '><span class="slider round"></span></label></td>' +
        '<td class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell" style="padding-top: 0; padding-bottom: 0; ' + checkLeftMatchesToPlayColor(team.numMatchesToPlay, team.name, team.admin) +'">' + team.numMatchesPlayed + ' / ' + team.numMatchesToPlay + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.season + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.oddAvg + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.balance.toString().slice(0, 5) + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + calculateROI(firstStake, team.balance) + '</td>' +
        '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> <form><input class="archiveBtn" type=button value="📜" style="max-width:100%; position: center;"></form> </td></tr>'
      );
    });
  }
}

function calculateROI(firstStake, actualBalance) {
  return (((actualBalance - firstStake)/firstStake)*100).toString().slice(0, 7) + '%';
}

function checkLeftMatchesToPlayColor(matchesLeft, name, admin) {
  if (admin) {
    if (matchesLeft <= 7 && !name.includes("_")) {
      return 'background-color: #e1e10c;'
    }
  }
  return ''
}

function teamBackgroundColor(balance) {
  if (balance >= 0) {
    return GREEN_COLOR
  } else {
    return RED_COLOR
  }
}

function toggleButton(tgBtn) {
  tgBtn.checked = toggleConfirmation(tgBtn);
  console.log(tgBtn.checked);
  console.log(tgBtn.id);
}


function toggleConfirmation(tgBtn) {
  var retVal = confirm("Do you want to continue ?");
  if (retVal == true) {
    // document.write ("User wants to continue!");
    callUpdateTeamAdmin(strategyPath, tgBtn.id, tgBtn.checked);
    return tgBtn.checked;
  } else {
    // document.write ("User does not want to continue!");
    return !tgBtn.checked;
  }
}

function insertTeam(strategyPath) {
    name = document.querySelector('#name-6797').value;
    teamUrl = document.querySelector('#url-6797').value;
    season = document.querySelector('#teamSeason').value;
    // stake = document.querySelector('#stake-6797').value;
    // analysisId = document.querySelector('#analid-6797').value;
    var url = null;

    // if (stake != '') {
    //   url = new URL("http://" + API_URL + "/api/betstrat/" + strategyPath + "/team?name=name&url=url&season=season&analysisID=analysisID&initialStake=initialStake");
    //   url.searchParams.set('initialStake', stake);
    //   console.log(url);
    // } else {
      url = new URL("http://" + API_URL + "/api/betstrat/" + strategyPath + "/team?name=name&url=url&season=season&analysisID=0&initialStake=0");
    // }
    url.searchParams.set('name', name);
    url.searchParams.set('url', teamUrl);
    // url.searchParams.set('analysisID', analysisId);
    url.searchParams.set('season', season);
    callInsertNewTeam(url);
}

