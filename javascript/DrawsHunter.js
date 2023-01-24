var x, y;
var context = document.querySelector('#graph').getContext('2d');
var chart;
var teamsArray;

callGetTeamsNamesList(DRAWS_HUNTER_PATH);
waitForElement();
callGetSeqEvolution(DRAWS_HUNTER_PATH);
callGetSeqInfo(DRAWS_HUNTER_PATH);


function waitForElement(){
  if(typeof teams !== "undefined"){
      //variable exists, do what you want
      callGetCandidateTeams();
  }
  else{
    setTimeout(waitForElement, 250);
  }
}

function syncData() {
  var url = "http://" + API_URL + "/api/betstrat/sync";

  fetch(url, {
      method: 'POST'
    });
    setTimeout(() => { window.location.reload(); }, 2000);
}

function chartSetup(days, profit) {
  var limitedDaysArray = days.slice(-250);
  var limitedProfitArray = profit.slice(-250);
  var data = {
    type: 'line',
    data: {
      labels: limitedDaysArray,
      datasets: [{
        backgroundColor: "rgba(39, 245, 191, 0.2)",
        strokeColor: "red",
        pointColor: "red",
        pointStrokeColor: "red",
        pointHighlightFill: "red",
        pointHighlightStroke: "red",
        data: limitedProfitArray,
        fill: true,
        tension: 0.3,
      borderColor: 'rgba(52,155,69, 1)',
      borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        filler: {
          propagate: false,
        },
        legend: {
          position: 'top',
          display: false
        },
        title: {
          display: true,
          text: 'Strategy Profit Evolution',
          font: {
            size: 26
          }
        }
      },
      scales: {
        y: {
          stacked: true,
          title: {
            display: true,
            text: 'Profit (€)',
            font: {
              size: 16
            }
          }
        }
      }
    },
  };
  return data;
}

// ---------------------------------------------------------------------------------------------------------

document.getElementById("seasonSelect").addEventListener("change",function() {
  const season = this.value;
  if (season == "all") {
    chart.destroy();
    callGetSeqInfo(DRAWS_HUNTER_PATH);
    callGetSeqEvolution(DRAWS_HUNTER_PATH);
  } else {
    chart.destroy();
    callGetSeqEvolutionBySeason(DRAWS_HUNTER_PATH, season);
  }
})


function addCandidateTeamToTable(team) {
  $(document).ready(function() {
    $('#all-candidate-teams-table').append(
      '<tr style="height: 32px; background-color: '+teamBackgroundColor(team.name)+';">' +
      '<td class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><b>' + team.teamLeague.country + '</b></td>' +
      '<td class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + team.teamLeague.name + '</td>' +
      '<td class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><b><a href="' + team.url + '" style="color: #4f7ed3;"<u>' + team.name + '</u></a></b></td>' +
      '<td class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><b>' + team.noDrawsCurrentSequence + '</b></td></tr>'
    );
  });
}

function teamBackgroundColor(name) {
  var color;
  teamsArray.forEach(function(team) {
    // console.log("ttt: " + team.get("name"));
    if (team.get('name') === name && team.get('admin') === true) {
      color = '#9fd5ef';
      return
    } else if (team.get('name') === name) {
      color = '#dadcb9';
      return
    }
  });
  return color;  
}


