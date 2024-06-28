var strategyPath = "";
if (ONLY_DRAWS_ID == currentStrategy) {
  strategyPath = ONLY_DRAWS_PATH;
} else if (MARGIN_WINS_ID == currentStrategy) {
  strategyPath = MARGIN_WINS_PATH;
} else if (DRAWS_HUNTER_ID == currentStrategy) {
  strategyPath = DRAWS_HUNTER_PATH;
  console.log(strategyPath);
} else if (GOAL_LINES_ID == currentStrategy) {
  strategyPath = GOAL_LINES_PATH;
  console.log(strategyPath);
}
var x, y;
var context = document.querySelector('#graph').getContext('2d');
var chart;

callGetSeqEvolution(GOAL_LINES_PATH);
callGetSeqInfo(GOAL_LINES_PATH);

const map1 = new Map();
var count = 0;
callGetCurrent25GoalsMatches();

function getNext25Matches() {
  date = document.querySelector('#goalLinesMatchesDate').value;

  if (date == '') {
    date = new Date();
  } else {
    date = new Date(date);
  }

  date = date.toISOString().split('T')[0];

  date = date.replaceAll('-', ',');

  console.log("calling...");
  modalBox("Loading next matches...", "");
  callGetNext25MatchesByDate(date);
}

setTimeout(function () {
  addBtnListeners();
}, 1000);


function addBtnListeners() {
  var allButtons = document.querySelectorAll('.oddbtn');

  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('click', function () {
      var matchId = getBtnId(this);
      var odd = document.querySelector('#insOdd' + matchId).value;
      var match = map1.get(matchId);
      match.odd = odd;
      console.log(match);
      callPostNewMatch(strategyPath, match);
    });
  }
}


function getBtnId(elt) {
  // Traverse up until root hit or DIV with ID found
  while (elt && (elt.tagName != "DIV" || !elt.id))
    elt = elt.parentNode;
  if (elt) // Check we found a DIV with an ID
    return elt.id;
}


function add25MatchDiv(idMatch, match) {
  $(document).ready(function () {
    $('.25nextMatchesDiv').append(
      `<div id=${idMatch} style="" class="u-clearfix u-custom-color-2 u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-gutter-0 u-layout-wrap u-layout-wrap-1"><div class="u-gutter-0 u-layout"><div class="u-layout-row"><div class="u-align-left u-container-style u-layout-cell u-size-13 u-layout-cell-1" style="    flex: 0 0 18%;  max-width: 18%;  min-width: 18%;"><div class="u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-container-layout-1" style="padding:unset;"><p class="u-align-center u-text u-text-grey-80 u-text-1"> ${match.date} </p></div></div><div class="u-align-left u-container-style u-layout-cell u-size-27 u-layout-cell-2" style="    flex: 0 0 47%;  max-width: 47%;  min-width: 47%;"><div class="u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xl u-container-layout-2" style="padding:unset;"><p class="u-align-center u-text u-text-default-lg u-text-default-md u-text-default-sm u-text-default-xl u-text-grey-75 u-text-2"> ${match.homeTeam} Vs ${match.awayTeam} </p></div></div><div class="u-align-left u-container-style u-layout-cell u-size-27 u-layout-cell-2" style="    flex: 0 0 13%;  max-width: 13%;  min-width: 13%;"><div class="u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xl u-container-layout-2" style="padding:unset;"><p class="u-align-center u-text u-text-default-lg u-text-default-md u-text-default-sm u-text-default-xl u-text-grey-75 u-text-2"> ${match.betType} </p></div></div><div class="u-container-style u-layout-cell u-size-20 u-layout-cell-3" style="    flex: 0 0 22%;      max-width: 22%; min-width: 22%;"><div class="u-container-layout u-valign-middle-md u-valign-top-sm u-valign-top-xs u-container-layout-3" style="padding:unset;margin:auto;"><div class="u-align-center-sm u-align-center-xs u-form u-form-1"><form action="#" method="POST" class="u-clearfix u-form-horizontal u-form-spacing-9 u-inner-form" source="joomla" name="form" style="padding: 10px;"><div class="u-form-group"><label for="name-f32e" class="u-form-control-hidden u-label"></label><input inputmode="numeric" placeholder="odd" id="insOdd${idMatch}" name="name" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white u-input-1" required="required"></div><div class="u-align-left u-form-group u-form-submit" style="max-width: 60%;"><a class="u-border-none u-btn u-btn-round u-btn-submit u-button-style u-custom-color-3 u-radius-50 u-btn-1 oddbtn" style="background-color: #a88a73;">Insert</a></div></form></div></div></div></div></div>`
    );
  });
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