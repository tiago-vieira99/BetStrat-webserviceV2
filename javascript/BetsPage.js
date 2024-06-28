var x, y;
var context = document.querySelector('#graphBk').getContext('2d');
var chart;
var urlArgs = location.search.substring(1).split('&');
var bankrollId = urlArgs[0];
var bankrollName = urlArgs[1];
var monthsMap;
var allBets;

$('.bankrollNameTitle').append(decodeURIComponent(urlArgs[1]));

callGetBankrollEvolution(bankrollId);
callGetBankrollById(bankrollId);
callGetAllBetsByBankroll(bankrollId);

setTimeout(function () {

  addBtnListeners();

}, 2000);

function addBtnListeners() {
  var allUpdateButtons = document.querySelectorAll('.updateBetBtn');
  var allDeleteButtons = document.querySelectorAll('.deleteBetBtn');

  for (var i = 0; i < allUpdateButtons.length; i++) {
    allUpdateButtons[i].addEventListener('click', function () {
      var betId = getBtnId(this);
      var status = document.querySelector('#betStatus' + betId).value;
      callPutUpdateBet(betId, bankrollId, status.toUpperCase());
      callPutRefreshBankroll(bankrollId);
    });
  }

  for (var i = 0; i < allDeleteButtons.length; i++) {
    allDeleteButtons[i].addEventListener('click', function () {
      if (deleteConfirmation(this)) {
        var betId = getBtnId(this);
        callDeleteBet(betId, bankrollId)
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

function chartSetup(days, profit) {
  var limitedDaysArray = days.slice(-250);
  var limitedProfitArray = profit.slice(-250);
  var data = {
    type: 'line',
    defaults: {
      color: "#ff0000"
    },
    data: {
      labels: limitedDaysArray,
      datasets: [{
        backgroundColor: "rgba(39, 245, 191, 0.3)",
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
          text: 'Bankroll Profit Evolution',
          font: {
            size: 26
          },
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

function insertBet() {
  odd = document.querySelector('#newBetOdd').value;
  stake = document.querySelector('#newBetStake').value;
  date = document.querySelector('#newBetDate').value;

  if (odd == '' || stake == '') {
    return;
  }

  if (date == '') {
    date = new Date();
  } else {
    date = new Date(date);
  }

  let betObj = '{  "bankrollID": ' + bankrollId + ', "odd": ' + odd + ', "stake": ' + stake + ', "date": "' + moment(date).format('DD/MM/YYYY') + '"}'

  callPostNewBet(betObj, bankrollId);
}

function addBetsToTable(bets) {

  monthsMap = new Map();

  console.log(bets);

  bets.forEach(function (bet) {
    weeksMap = new Map();

    betMonth = moment(bet.date, 'DD/MM/YYYY').format('MMMM YYYY');
    betWeek = moment(bet.date, 'DD/MM/YYYY').format('YYYY_WW');

    if (!monthsMap.has(betMonth)) {
      monthsMap.set(betMonth, new Map());
    }

    if (!monthsMap.get(betMonth).has(betWeek)) {
      monthsMap.get(betMonth).set(betWeek, []);
    }

    thisWeekArray = monthsMap.get(betMonth).get(betWeek);
    thisWeekArray.push(bet);
    monthsMap.get(betMonth).set(betWeek, thisWeekArray);
  });

  //calculate months and weeks balances
  var monthsBalanceMap = new Map();
  var weeksBalanceMap = new Map();
  monthsMap.forEach(function (week, month) {
    monthBalance = 0;

    week.forEach(function (betsArray, key) {
      //calculate week balance
      weekBalance = 0;
      for (var i = 0; i < betsArray.length; i++) {
        weekBalance = weekBalance + betsArray[i].balance;
      }
      weeksBalanceMap.set(key, weekBalance);
      monthBalance = monthBalance + weekBalance;
    });

    monthsBalanceMap.set(month, monthBalance);
  });

  //append html elements 
  monthsMap.forEach(function (week, month) {
    //add collapsible
    addButtonMonthBetsTable(month, monthsBalanceMap.get(month));
    console.log(month);
    week.forEach(function (betsArray, key) {
      //add week line
      addWeekBetsTable(month, key, weeksBalanceMap.get(key));
      //add bets to table
      console.log(key);
      for (var i = 0; i < betsArray.length; i++) {
        addBetLinesToTable(month, key, betsArray[i]);
        console.log(betsArray[i]);
      }
    });
  });

  setTimeout(function () {

    const tds = document.querySelectorAll('.collapsible-');
    tds.forEach((td) => {
      monthBalance = monthsBalanceMap.get(td.id);
      td.style.setProperty('--balance-color', setMonthBalanceColor(monthBalance));
    });


    collapsibleContentScript();
  }, 300);

}

function addButtonMonthBetsTable(month, monthBalance) {
  $(document).ready(function () {
    $('#betsList').append(
      '<button id="' + month + '" type="button"  closed="' + monthBalance.toFixed(2) + '  €      ➕" open="' + monthBalance.toFixed(2) + '  €      ➖" class="collapsible-  u-btn u-btn-round u-btn-submit u-button-style u-custom-font u-font-source-sans-pro u-palette-3-dark-2 u-radius-18 u-btn-1" style="margin-top: 50px; margin-bottom: auto; overflow: hidden; max-width: 60%; background-color: #4b6256;"><b>' + month + '</b></button> <div class="content-" style="max-width: 60%;margin-left: auto;margin-right: auto;padding: unset;"> <div id="' + month.replace(' ', '_') + 'content" class="u-table u-table-responsive u-table-1" style="margin-top: auto;margin-left: auto;margin-right: auto;overflow-x:auto;">  </div> </div> '
    )
  });

  $(document).ready(function () {
    $('#monthSelect').append(
      '<option value="' + month + '">' + month + '</option> '
    )
  });
}

function addWeekBetsTable(month, week, weekBalance) {
  month = month.replace(' ', '_');
  weekBalance = weekBalance.toFixed(2);

  $(document).ready(function () {
    $('#' + month + 'content').append(
      '<table class="u-table-entity"> <colgroup> <col width="95%"> <col width="5%"> </colgroup> <tbody class="u-align-left u-custom-font u-font-source-sans-pro u-table-alt-grey-15 u-table-body all-bets-table"> <tr> <td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><b>Week ' + week.substring(5) + '</b></td> <td style="padding-top: 0; padding-bottom: 0;text-align: right; background-color: ' + setWeekBalanceColor(weekBalance) + ';" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell u-radius-5">' + weekBalance + ' </td> </tr> </tbody> </table> <table class="u-table-entity" style="margin-bottom: 30px;"> <colgroup> <col width="10%"> <col width="15%"> <col width="15%"> <col width="15%"> <col width="15%"> <col width="30%"> </colgroup> <thead class="u-custom-font u-font-source-sans-pro u-grey-50 u-table-header u-table-header-1 u-radius-5"> <tr style="height: 20px;"> <th class="u-table-cell" style="padding-top: 0; padding-bottom: 0;">Delete</th> <th class="u-table-cell" style="padding-top: 0; padding-bottom: 0;">Date</th> <th class="u-table-cell" style="padding-top: 0; padding-bottom: 0; text-align: center;">Odd</th> <th class="u-table-cell" style="padding-top: 0; padding-bottom: 0; text-align: center;">Stake</th> <th class="u-table-cell" style="padding-top: 0; padding-bottom: 0; text-align: center;">Balance</th> <th class="u-table-cell" style="padding-top: 0; padding-bottom: 0;"></th> </tr> </thead> <tbody id="' + month + week + '" class="u-align-left u-custom-font u-font-source-sans-pro u-table-alt-grey-15 u-table-body all-bets-table"></tbody> </table>'
    )
  });
}

function addBetLinesToTable(month, week, bet) {
  month = month.replace(' ', '_');

  $(document).ready(function () {
    $('#' + month + week).append('<tr id="' + bet.id + '" style="height: 20px;"> <td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"> <form><input class="deleteBetBtn" type=button value="❌" style="max-width:80%; position: center;"></form> </td> <td style="padding-top: 0; padding-bottom: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell"><b>' + bet.date + '</b></td> <td style="padding-top: 0; padding-bottom: 0; text-align: center;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + bet.odd + ' </td> <td style="padding-top: 0; padding-bottom: 0; text-align: center;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + bet.stake + ' </td> <td style="padding-top: 0; padding-bottom: 0; text-align: center;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell">' + bet.balance + ' </td> <td style="padding-top: 0; padding-bottom: 0; padding-right: 0;" class="u-border-1 u-border-grey-40 u-border-no-left u-border-no-right u-table-cell u-radius-5"> <table> <tr style="height: 20px; background-color: ' + setBetStatusBackgroundColor(bet.status) + ';"> <td style="padding: 0px;"> <form action="#" style="text-align: center; margin-top: 4%; margin-bottom: 4%;"> <label for="lang"></label> <select id="betStatus' + bet.id + '"> ' + setStatusSelectionValue(bet.status) + ' </select> </form></td> <td> <form><input class="updateBetBtn" type=button value="✔️" style="width:100%"></form> </td> </tr> </table> </td> </tr>'
    )
  });
}

function setBetStatusBackgroundColor(status) {
  switch (status) {
    case 'WON':
      return GREEN_COLOR;
    case 'LOST':
      return RED_COLOR;
    case 'ONGOING':
      return '#e0e0e0';
    default:
      return YELLOW_COLOR;
  }
}

function setWeekBalanceColor(balance) {
  if (balance >= 0) {
    return GREEN_COLOR;
  } else {
    return RED_COLOR;
  }
}

function setMonthBalanceColor(balance) {
  if (balance >= 0) {
    return '#56ff82';
  } else {
    return '#ff8899';
  }
}

function setStatusSelectionValue(status) {
  switch (status) {
    case 'WON':
      return '<option value="ongoing">Ongoing</option> <option selected value="won">Won</option> <option value="lost">Lost</option> <option value="refunded">Refunded</option> <option value="canceled">Canceled</option>';
    case 'LOST':
      return '<option value="ongoing">Ongoing</option> <option value="won">Won</option> <option selected value="lost">Lost</option> <option value="refunded">Refunded</option> <option value="canceled">Canceled</option>';
    case 'CANCELED':
      return '<option value="ongoing">Ongoing</option> <option value="won">Won</option> <option value="lost">Lost</option> <option value="refunded">Refunded</option> <option selected value="canceled">Canceled</option>';
    case 'REFUNDED':
      return '<option value="ongoing">Ongoing</option> <option value="won">Won</option> <option value="lost">Lost</option> <option selected value="refunded">Refunded</option> <option  value="canceled">Canceled</option>';
    default:
      return '<option selected value="ongoing">Ongoing</option> <option value="won">Won</option> <option value="lost">Lost</option> <option value="refunded">Refunded</option> <option value="canceled">Canceled</option>';
  }
}


function collapsibleContentScript() {
  var coll = document.getElementsByClassName("collapsible-");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("activeCollapsible-");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}

function addBankrollStatsInfo(bankroll) {
  $(document).ready(function () {
    $('#bkroll-oddAvg').append('<p class="bkroll-u-align-center bkroll-u-text bkroll-u-text-default bkroll-u-text-1">' + bankroll.oddAvg + '<br><b>odd avg</b></p>');
    $('#bkroll-stakeAvg').append('<p class="bkroll-u-align-center bkroll-u-text bkroll-u-text-default bkroll-u-text-1">' + bankroll.stakeAvg + '<br><b>stake avg</b></p>');
    $('#bkroll-longGreen').append('<p class="bkroll-u-align-center bkroll-u-text bkroll-u-text-default bkroll-u-text-1">' + bankroll.longestGreenSeries + '<br><b>longest green seq</b></p>');
    $('#bkroll-longRed').append('<p class="bkroll-u-align-center bkroll-u-text bkroll-u-text-default bkroll-u-text-1">' + bankroll.longestRedSeries + '<br><b>longest red seq</b></p>');
    $('#bkroll-greensRate').append('<p class="bkroll-u-align-center bkroll-u-text bkroll-u-text-default bkroll-u-text-1">' + bankroll.greensRate + '<br><b>greens rate</b></p>');
    $('#bkroll-redsRate').append('<p class="bkroll-u-align-center bkroll-u-text bkroll-u-text-default bkroll-u-text-1">' + bankroll.redsRate + '<br><b>reds rate</b></p>');
    $('#bkroll-highProfit').append('<p class="bkroll-u-align-center bkroll-u-text bkroll-u-text-default bkroll-u-text-1">' + bankroll.biggestProfit + '<br><b>biggest profit</b></p>');
    $('#bkroll-highExpens').append('<p class="bkroll-u-align-center bkroll-u-text bkroll-u-text-default bkroll-u-text-1">' + bankroll.biggestExpense + '<br><b>biggest expense</b></p>');
    $('#bkroll-highOdd').append('<p class="bkroll-u-align-center bkroll-u-text bkroll-u-text-default bkroll-u-text-1">' + bankroll.biggestOdd + '<br><b>biggest odd</b></p>');
    $('#bkroll-highStake').append('<p class="bkroll-u-align-center bkroll-u-text bkroll-u-text-default bkroll-u-text-1">' + bankroll.biggestStake + '<br><b>biggest stake</b></p>');
    $('#bkroll-highGreenOdd').append('<p class="bkroll-u-align-center bkroll-u-text bkroll-u-text-default bkroll-u-text-1">' + bankroll.biggestGreenOdd + '<br><b>biggest green odd</b></p>');
    $('#bkroll-totalInvestment').append('<p class="bkroll-u-align-center bkroll-u-text bkroll-u-text-default bkroll-u-text-1">' + bankroll.totalInvested + '<br><b>total invested</b></p>');
  })
}

document.getElementById("monthSelect").addEventListener("change", function () {
  const month = this.value;
  // console.log(allBets);
  if (month === 'all') {
    callGetBankrollEvolution(bankrollId);
  } else {
    var allBetsCopy = allBets;
    var betsDaysForMonth = [];
    var betProfitEvolutionForMonth = [];
    var currentMonthBalance = 0;

    allBetsCopy.sort(function (a, b) {
      var betDateA = a.date.split('/');
      var betDateB = b.date.split('/');

      var dateA = Date.parse(betDateA[1].concat('/', betDateA[0], '/', betDateA[2])),
        dateB = Date.parse(betDateB[1].concat('/', betDateB[0], '/', betDateB[2]))
      if (dateA < dateB) { return -1; }
      if (dateA > dateB) { return 1; }
      return 0;
    });

    allBetsCopy.sort(function (a, b) {
      var idA = a.id,
        idB = b.id;
      if (idA < idB) return -1;
      if (idA > idB) return 1;
      return 0;
    });

    allBetsCopy.forEach(function (bet) {
      betMonth = moment(bet.date, 'DD/MM/YYYY').format('MMMM YYYY');

      if (month === betMonth) {
        betsDaysForMonth.push(bet.date);
        currentMonthBalance = currentMonthBalance + bet.balance;
        betProfitEvolutionForMonth.push(currentMonthBalance.toFixed(2));
      }
    });

    console.log(betsDaysForMonth);
    console.log(betProfitEvolutionForMonth);
    chart.destroy();
    chart = new Chart(context, chartSetup(betsDaysForMonth, betProfitEvolutionForMonth));
  }
})