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
} else if (GOALS_FEST_KELLY_ID == currentStrategy) {
  strategyPath = GOALS_FEST_KELLY_PATH;
} else if (BTTS_ONE_HALF_KELLY_ID == currentStrategy) {
  strategyPath = BTTS_ONE_HALF_KELLY_PATH;
} else if (OVER_25_KELLY_ID == currentStrategy) {
  strategyPath = OVER_25_KELLY_PATH;
}

let matchesSessionStorage;
const map1 = new Map();
var count = 0;
var selectedSeason = document.querySelectorAll('#seasonSelect')[0].value;
document.querySelectorAll('#seasonSelect')[0].addEventListener('change', function() {
  selectedSeason = document.querySelectorAll('#seasonSelect')[0].value;
  $('.all-matches-table').empty();
  matchesArray = [];
  init();
});

getAllMatches();
var matches;
var matchesArray = []
// State
// Number of products
var numberOfItems = matchesArray.length
const numberPerPage = 50
const currentPage = 1
// Number of pages
var numberOfPages = 1;

function init() {
  for (let [key, value] of matchesSessionStorage) {
    if (value.season === selectedSeason || selectedSeason === 'all') {
      console.log(value);
      if (value.betType === 'BTTS_ONE_HALF' || value.betType === 'OVER_25') {
        addKellyMatchLine(key, value);
      } else if (value.betType === 'MARGIN_WINS' || value.betType === 'GOALS_FEST') {
        addMatchLine(key, value);  
      } else {  
        add25MatchLine(key, value);
      }
    }
  }
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
  }, 500);
}

async function getAllMatches() {
  try {
      showLoadingIndicator();

      dateLimit = 1;//24 * 60 * 60 * 1000; // 1 days in milliseconds
      readData("allMatches"+strategyPath, dateLimit, function(result, error) {
          if (error) {
              alert("Error: " + error);
              hideLoadingIndicator();
              return;
          }

          matchesSessionStorage = result;
          if (matchesSessionStorage != null && matchesSessionStorage.entries().toArray().length != 0) {
              hideLoadingIndicator();
              init();
              return;
          }

          // If no data is found in the database, fetch it from the API
          callGetAllMatchesInfo(strategyPath);
          matchesSessionStorage = map1;
      });

  } catch (error) {
      console.log("Error: " + error);
      hideLoadingIndicator();
  }
}

function showLoadingIndicator() {
  document.getElementById("loading").classList.remove("hidden");
}

function hideLoadingIndicator() {
  document.getElementById("loading").classList.add("hidden");
}

function addBtnListeners() {
  var allUpdateButtons = document.querySelectorAll('.updateBtn');
  var allDeleteButtons = document.querySelectorAll('.deleteBtn');

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


function addMatchLine(idMatch, match) {
  matchesArray.push('<tr id="' + idMatch + '" style=" background-color: '+matchBackgroundColor(match)+';"><td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> <form><input class="deleteBtn" type=button value="❌" style="max-width:80%; position: center;"></form> </td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.date + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell" style="text-align: center;"><b>' + match.homeTeam + "&nbsp &nbsp - &nbsp &nbsp" + match.awayTeam + '</b></td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.ftresult + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.odd + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.stake + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.seqLevel + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> <table>  <tr><td style="padding: 0px;"><input id="ftresult' + idMatch + '" type="text" placeholder="result" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white u-input-1" required="required" style="padding-top: 0; padding-bottom: 0; max-width: 70%;"></td> <td> <form><input class="updateBtn" type=button value="✔️" style="width:100%"></form></td> </tr></table></td> </tr>');
}

function addKellyMatchLine(idMatch, match) {
  matchesArray.push('<tr id="' + idMatch + '" style=" background-color: '+matchBackgroundColor(match)+';"><td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> <form><input class="deleteBtn" type=button value="❌" style="max-width:80%; position: center;"></form> </td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.date + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell" style="text-align: center;"><b>' + match.homeTeam + "&nbsp &nbsp - &nbsp &nbsp" + match.awayTeam + '</b></td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.ftresult + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.odd + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.stake + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.bankrollPercentage + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> <table>  <tr><td style="padding: 0px;"><input id="ftresult' + idMatch + '" type="text" placeholder="result" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white u-input-1" required="required" style="padding-top: 0; padding-bottom: 0; max-width: 70%;"></td> <td> <form><input class="updateBtn" type=button value="✔️" style="width:100%"></form></td> </tr></table></td> </tr>');
}

function add25MatchLine(idMatch, match) {
  matchesArray.push('<tr id="' + idMatch + '" style=" background-color: '+match25BackgroundColor(match)+';"><td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> <form><input class="deleteBtn" type=button value="❌" style="max-width:80%; position: center;"></form> </td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.date + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell" style="text-align: center;"><b>' + match.homeTeam + "&nbsp &nbsp - &nbsp &nbsp" + match.awayTeam + '</b></td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.betType + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.ftresult + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + match.odd + '</td> ' +
    '<td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> <table>  <tr><td style="padding: 0px;"><input id="ftresult' + idMatch + '" type="text" placeholder="result" class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white u-input-1" required="required" style="padding-top: 0; padding-bottom: 0;"></td> <td> <form><input class="updateBtn" type=button value="✔️" style="width:100%"></form></td> </tr></table></td> </tr>');
}

function matchBackgroundColor(match) {
  if (match.ftresult != null) {
    // if (match.ftresult.length > 2) {
    //   if ((match.ftresult.substring(0,1) > 0) && (match.ftresult.substring(2) > 0) && (parseInt(match.ftresult.substring(0,1)) + parseInt(match.ftresult.substring(2)) > 2)) {
    //     console.log(match.ftresult);
    //     return GREEN_COLOR
    //   } else {
    //     return RED_COLOR
    //   }
    // }
    if (match.balance > 0) {
      return GREEN_COLOR
    } else {
      return RED_COLOR
    }
  } else {
    return '#e5f6f0'
  }
}

function match25BackgroundColor(match) {
  if (match.ftresult != null) {
    if ((match.betType.includes('OVER') && match.ftresult > 2) || (match.betType.includes('UNDER') && match.ftresult <= 2)) {
      return GREEN_COLOR
    } else {
      return RED_COLOR
    }
  } else {
    return '#e5f6f0'
  }
}

function buildPage(currPage) {
  const trimStart = (currPage - 1) * numberPerPage
  const trimEnd = trimStart + numberPerPage
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
