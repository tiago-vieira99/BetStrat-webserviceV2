var strategy;
var season;


function buildDataToPage(stratTeams) {
  $('.sim-matches-strategies').empty();

  $(document).ready(function() {
    $('.sim-matches-strategies').append('<div class="'+ strategy +'"><h3><i>' + strategy + '</i></h3></div>');
  });
  let teamsMap = new Map(Object.entries(stratTeams.reportMap));

  teamsMap.forEach((values, keys) => {
    if (values['matchesBetted'] != undefined && values['matchesBetted'].length > 0) {
      let id = 'simMatchesTable'+strategy+keys.replaceAll(" ","").replaceAll("&","").replaceAll(".","");
      
      $(document).ready(function() {
        $('.'+strategy).append('<h3>' + keys + '</h3><h11>scoreBySeason: ' + values['scoreBySeason'] + ' | avgNegativeSeq: <b>' + values['avgNegativeSeq'] + '</b> | maxNegativeSeq: <b>' + values['maxNegativeSeq'] + '</b> </h11>' +
          '<div class="u-table u-table-responsive u-table-1" style="margin-top: 30px;"> <table class="u-table-entity" id="'+id+'"> <colgroup> <col width="4.6%"> <col width="9.4%"> <col width="31.1%"> <col width="9%"> <col width="9%"> <col width="25.3%"> <col width="7.3%"> </colgroup> <thead class="u-custom-font u-font-source-sans-pro u-grey-50 u-table-header u-table-header-1"> <tr style="height: 30px;"> <th onclick="sortTableNumbers(1,"'+id+'")" class="u-table-cell" style="padding-top: 0; padding-bottom: 0;">#num</th> <th onclick="sortTable(2,"'+id+'")" class="u-table-cell" style="padding-top: 0; padding-bottom: 0;">Date</th> <th onclick="sortTable(3,"'+id+'")" class="u-table-cell" style="padding-top: 0; padding-bottom: 0;">Match</th> <th onclick="sortTable(4,"'+id+'")" class="u-table-cell" style="padding-top: 0; padding-bottom: 0;">HT Result</th> <th onclick="sortTable(5,"'+id+'")" class="u-table-cell" style="padding-top: 0; padding-bottom: 0;">FT Result</th> <th onclick="sortTable(6,"'+id+'")" class="u-table-cell" style="padding-top: 0; padding-bottom: 0;">Competition</th> <th onclick="sortTable(7,"'+id+'")" class="u-table-cell" style="padding-top: 0; padding-bottom: 0;">Is Green</th> </tr> </thead> <tbody class="u-align-left u-custom-font u-font-source-sans-pro u-table-alt-grey-15 u-table-body '+id+'"> </tbody> </table> </div>');
      });

      appendTableBody(id, values['matchesBetted']);

    } else {
      console.log(strategy, keys);
    }

  });
}

function appendTableBody(teamTableId, teamData) {
  let matchesMap = new Map(Object.entries(teamData));
  matchesMap.forEach(function(match) {
    $(document).ready(function() { 
      $('.'+teamTableId).append('<tr style=" "><td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> '+match.matchNumber+' </td> ' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.matchDate + '</td> ' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell" style="text-align: center;"><b>' + match.homeTeam + "&nbsp &nbsp - &nbsp &nbsp" + match.awayTeam + '</b></td> ' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.htResult + '</td> ' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.ftResult + '</td> ' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.competition + '</td> ' +
      '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + isGreen(match.isGreen) + '</td></tr>');
    });
  });
}

function isGreen(flag) {
  if (flag) {
    return '🟢';
  } else {
    return '🔴';
  }
}

function displayInfo() {
  strategy = document.getElementById("strategySelect").value;
  season = document.getElementById("seasonSelect").value;
  callSimulationReportBySeason(season, strategy);
}
