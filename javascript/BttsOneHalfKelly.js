var x, y;
var context = document.querySelector('#graph').getContext('2d');
var chart;

var monthsMap;

callGetSeqEvolution(BTTS_ONE_HALF_KELLY_PATH);
callGetSeqInfo(BTTS_ONE_HALF_KELLY_PATH);

function checkX() {
  if (x !== undefined) {
    init();
  } else {
    setTimeout(checkX, 100); // Check again after 100 milliseconds
  }
}

checkX(); // Start checking if x is not null

function init() {
    monthsMap = new Map();

    x.forEach(day => {
      const date = new Date(day); // Assuming 'day' is a valid date string or timestamp
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // getMonth() returns 0-11, so we add 1 for 1-12

      // Create a key for the month in the format "YYYY-MM"
      const monthKey = `${year}-${month.toString().padStart(2, '0')}`;

      // Store the month in the map (you can also store profit or any other data if needed)
      if (!monthsMap.has(monthKey)) {
        monthsMap.set(monthKey, {
          month: month,
          year: year,
          profits: [] // Initialize an array to store profits for this month if needed
        });
      }
    });

    // Populate the month select dropdown
    $(document).ready(function () {
      $('#monthSelect').empty()
      $('#monthSelect').append(
        '<option value="all">all</option>'
      );
      monthsMap.forEach((value, key) => {
        // `key` is the "YYYY-MM" format, `value` contains the month and year
        const monthName = `${value.year}-${value.month.toString().padStart(2, '0')}`; // Format as "YYYY-MM"
        $('#monthSelect').append(
          '<option value="' + key + '">' + monthName + '</option>'
        );
      });
    });
}

function syncData() {
  var url = "http://" + API_URL + "/api/betstrat/sync";

  fetch(url, {
      method: 'POST'
    });
    setTimeout(() => { window.location.reload(); }, 2500);
}

function chartSetup(days, profit) {
  x = days
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

document.getElementById("monthSelect").addEventListener("change",function() {
  const season = this.value;
  if (season == "all") {
    chart.destroy();
    callGetSeqInfo(BTTS_ONE_HALF_KELLY_PATH);
    callGetSeqEvolution(BTTS_ONE_HALF_KELLY_PATH);
  } else {
    chart.destroy();
    callGetSeqEvolutionBySeason(BTTS_ONE_HALF_KELLY_PATH, season);
    callGetNumMatchesBySeason(BTTS_ONE_HALF_KELLY_PATH, season);
  }
})



