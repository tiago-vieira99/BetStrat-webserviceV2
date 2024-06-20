var x, y;
var context = document.querySelector('#graph').getContext('2d');
var chart;

callGetSeqEvolution(GOALS_FEST_PATH);
callGetSeqInfo(GOALS_FEST_PATH);

function syncData() {
  var url = "http://" + API_URL + "/api/betstrat/sync";

  fetch(url, {
      method: 'POST'
    });
    setTimeout(() => { window.location.reload(); }, 2500);
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
    callGetSeqInfo(GOALS_FEST_PATH);
    callGetSeqEvolution(GOALS_FEST_PATH);
  } else {
    chart.destroy();
    callGetSeqEvolutionBySeason(GOALS_FEST_PATH, season);
  }
})



