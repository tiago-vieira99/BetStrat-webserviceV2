var urlArgs = location.search.substring(1).split('&');
var teamId = urlArgs[0].substring(4);
var context = document.querySelector('#graphTeam').getContext('2d');
var currentStrategy = urlArgs[2];

var strategyPath = "";
if (ONLY_DRAWS_ID == currentStrategy) {
    strategyPath = ONLY_DRAWS_PATH;
} else if (MARGIN_WINS_ID == currentStrategy) {
    strategyPath = MARGIN_WINS_PATH;
} else if (DRAWS_HUNTER_ID == currentStrategy) {
  strategyPath = DRAWS_HUNTER_PATH;
} else if (GOAL_LINES_ID == currentStrategy) {
  strategyPath = GOAL_LINES_PATH;
} else if (GOALS_FEST_ID == currentStrategy) {
  strategyPath = GOALS_FEST_PATH;
}

$('.teamNameTitle').append("<b>" + decodeURIComponent(urlArgs[1]) + " :: Team Info</b><br>");

const map1 = new Map();
var count = 0;
getMatchesForTeam();
getTeamInfo();
var matches;
var matchesArray = []
// State
// Number of products
var numberOfItems = matchesArray.length
const numberPerPage = 30
const currentPage = 1
// Number of pages
var numberOfPages = 1;


setTimeout(function() {

  numberOfPages = Math.ceil(matchesArray.length / numberPerPage);

  buildPage(1);
  addBtnListeners();
  buildPagination(currentPage);

  $('.paginator').on('click', 'button', function() {
    var clickedPage = parseInt($(this).val())
    buildPagination(clickedPage)
    console.log(`Page clicked on ${clickedPage}`)
    buildPage(clickedPage)
  });
}, 2000);


function addBtnListeners() {
  var allUpdateButtons = document.querySelectorAll('.updateBtn');
  var allDeleteButtons = document.querySelectorAll('.deleteBtn');

  console.log("length: " + allUpdateButtons.length);
  console.log("length: " + allDeleteButtons.length);
  for (var i = 0; i < allUpdateButtons.length; i++) {
    allUpdateButtons[i].addEventListener('click', function() {
      var matchId = getBtnId(this);
      var result = document.querySelector('#ftresult' + matchId).value;
      var match = map1.get(matchId); //only accept on null FTresult matches
      callPutUpdateMatch(strategyPath, match.id, result);
    });
  }

  for (var i = 0; i < allDeleteButtons.length; i++) {
    allDeleteButtons[i].addEventListener('click', function() {
      if (deleteConfirmation(this)) {
        var matchId = getBtnId(this);
        var match = map1.get(matchId);
        callDeleteMatch(strategyPath, match.id);
      }
    });
  }
}

function deleteConfirmation(Btn) {
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


function chartSetup(matchesDateArray, matchesBalanceArray, barsBackgroundColorArray, barsBorderColorArray) {
  var data = {
    type: 'bar',
    data: {
      labels: matchesDateArray,
      datasets: [{
        backgroundColor: barsBackgroundColorArray,
        borderColor: barsBorderColorArray,
        borderWidth: 1,
        data: matchesBalanceArray,
        fill: true
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
          text: 'Matches History',
          font: {
            size: 20
          },
        }
      },
      scales: {
        y: {
          stacked: true,
          title: {
            display: true,
            text: 'Balance (€)'
          }
        }
      }
    },
  };
  return data;
}

function addMatchLine(idMatch, match) {
  matchesArray.push('<tr id="' + idMatch + '" style="height: 44px;"><td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> <form><input class="deleteBtn" type=button value="❌" style="max-width:80%; position: center;"></form> </td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.date + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell" style="text-align: center;"><b>' + match.homeTeam + "&nbsp &nbsp - &nbsp &nbsp" + match.awayTeam + '</b></td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.ftresult + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.odd + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.stake + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.seqLevel + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> <table>  <tr><td style="padding: 0px;"><input id="ftresult' + idMatch + '" type="text" placeholder="result" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white u-input-1" required="required" style="padding-top: 0; padding-bottom: 0; max-qidth:70%"></td> <td> <form><input class="updateBtn" type=button value="✔️" style="width:100%"></form></td> </tr></table></td> </tr>');
}

function buildPage(currPage) {
  const trimStart = (currPage - 1) * numberPerPage
  const trimEnd = trimStart + numberPerPage
  console.log(trimStart, trimEnd)
  // console.log(matchesArray.slice(trimStart, trimEnd))
  $('.all-matches-table').empty().append(matchesArray.slice(trimStart, trimEnd))
  // $('.grid-uniform').empty().append(listArray.slice(trimStart, trimEnd));
}

function accomodatePage(clickedPage) {
  if (clickedPage <= 1) {
    return clickedPage + 1
  }
  if (clickedPage >= numberOfPages) {
    return clickedPage - 1
  }
  return clickedPage
}

function buildPagination(clickedPage) {
  $('.paginator').empty().append(`<p><i>Pages: </i></p>`)
  const currPageNum = accomodatePage(clickedPage)
  if (numberOfPages >= 3) {
    for (let i = -1; i < 2; i++) {
      $('.paginator').append(`<button class="btn btn-secondary" style="margin: 5px;" value="${currPageNum+i}">${currPageNum+i}</button>`)
    }
  } else {
    for (let i = 0; i < numberOfPages; i++) {
      $('.paginator').append(`<button class="btn btn-secondary" style="margin: 5px;" value="${i+1}">${i+1}</button>`)
    }
  }
}
