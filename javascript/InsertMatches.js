var strategyPath = "";
if (ONLY_DRAWS_ID == currentStrategy) {
  strategyPath = ONLY_DRAWS_PATH;
} else if (MARGIN_WINS_ID == currentStrategy) {
  strategyPath = MARGIN_WINS_PATH;
} else if (DRAWS_HUNTER_ID == currentStrategy) {
  strategyPath = DRAWS_HUNTER_PATH;
} else if (GOALS_FEST_ID == currentStrategy) {
  strategyPath = GOALS_FEST_PATH;
} else if (GOALS_FEST_KELLY_ID == currentStrategy) {
  strategyPath = GOALS_FEST_KELLY_PATH;
} else if (BTTS_ONE_HALF_KELLY_ID == currentStrategy) {
  strategyPath = BTTS_ONE_HALF_KELLY_PATH;
} else if (OVER_25_KELLY_ID == currentStrategy) {
  strategyPath = OVER_25_KELLY_PATH;
}

const map1 = new Map();
var count = 0;
callGetNextMatches(strategyPath);
var matches;


setTimeout(function () {
  addNewMatchBtnListeners();
}, 1000);


function addNewMatchBtnListeners() {
  var allButtons = document.querySelectorAll('.oddbtn');
  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('click', function () {
      var matchId = getMatchBtnId(this);
      var odd = document.querySelector('#insOdd' + matchId).value;
      var match = map1.get(matchId);
      match.odd = odd;
      callPostNewMatch(strategyPath, match);
    });
  }
}


function getMatchBtnId(elt) {
  // Traverse up until root hit or DIV with ID found
  while (elt && (elt.tagName != "DIV" || !elt.id))
    elt = elt.parentNode;
  if (elt) // Check we found a DIV with an ID
    return elt.id;
}


function addMatchDiv(idMatch, date, homeTeam, awayTeam, competition) {
  $(document).ready(function () {
    $('.nextMatchesDiv').append(
      '<div id="' + idMatch + '" style="" class="u-clearfix u-custom-color-2 u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-gutter-0 u-layout-wrap u-layout-wrap-1"><div class="u-gutter-0 u-layout"><div class="u-layout-row"><div class="u-align-left u-container-style u-layout-cell u-size-13 u-layout-cell-1"><div class="u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-container-layout-1" style="padding:unset;"><p class="u-align-center u-text u-text-grey-80 u-text-1">' + date + '</p></div></div><div class="u-align-left u-container-style u-layout-cell u-size-27 u-layout-cell-2"><div class="u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xl u-container-layout-2" style="padding:unset;"><p style="margin-bottom: unset;" class="u-align-center u-text u-text-default-lg u-text-default-md u-text-default-sm u-text-default-xl u-text-grey-75 u-text-2">' + homeTeam + ' Vs ' + awayTeam + '</p><p style="margin:unset; font-size:x-small;">' + competition + '</p></div></div><div class="u-container-style u-layout-cell u-size-20 u-layout-cell-3"><div class="u-container-layout u-valign-middle-md u-valign-top-sm u-valign-top-xs u-container-layout-3" style="padding:unset;"><div class="u-align-center-sm u-align-center-xs u-form u-form-1"><form action="#" method="POST" class="u-clearfix u-form-horizontal u-form-spacing-9 u-inner-form" source="joomla" name="form" style="padding: 10px;"><div class="u-form-group"><label for="name-f32e" class="u-form-control-hidden u-label"></label><input inputmode="numeric" placeholder="odd" id="insOdd' + idMatch + '" name="name" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white u-input-1" required="required"></div><div class="u-align-left u-form-group u-form-submit"><a class="u-border-none u-btn u-btn-round u-btn-submit u-button-style u-custom-color-3 u-radius-50 u-btn-1 oddbtn" style="background-color: #a88a73;">Insert</a></div></form></div></div></div></div></div>'
    );
  });
}

function insertMatchManually(strategyPath) {
  console.log("kvjlkvmklm");
  homeTeam = document.querySelector('#homeTeamNewMatch').value;
  awayTeam = document.querySelector('#awayTeamNewMatch').value;
  date = document.querySelector('#dateNewMatch').value;
  odd = document.querySelector('#oddNewMatch').value;
  if (!document.querySelector('#seqLevelNewMatch')) {
    seqLevel = 0;
  } else {
    seqLevel = document.querySelector('#seqLevelNewMatch').value;
  }

  if (!document.querySelector('#stakeNewMatch')) {
    stake = 0;
  } else {
    stake = document.querySelector('#stakeNewMatch').value;
  }

  const newMatch = new Map();
  newMatch.set("homeTeam", homeTeam);
  newMatch.set("awayTeam", awayTeam);
  newMatch.set("date", moment(date).format('DD/MM/YYYY'));
  newMatch.set("odd", odd);
  newMatch.set("seqLevel", seqLevel);
  newMatch.set("stake", stake);

  if (GOALS_FEST_KELLY_ID == currentStrategy) {
    newMatch.set("betType", "GOALS_FEST")
  } else if (BTTS_ONE_HALF_KELLY_ID == currentStrategy) {
    newMatch.set("betType", "BTTS_ONE_HALF")
  } else if (MARGIN_WINS_ID == currentStrategy) {
    newMatch.set("betType", "MARGIN_WINS")
  } else if (OVER_25_KELLY_ID == currentStrategy) {
    newMatch.set("betType", "OVER_25")
  }

  callPostNewMatch(strategyPath, (Object.fromEntries(newMatch)));
}