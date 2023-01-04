

callGetAllBankrolls();

function newBankroll() {
    bName = document.querySelector('#bankrollName').value;
    description = document.querySelector('#bankrollDescription').value;
    initBudget = document.querySelector('#bankrollInitBudget').value;

    let bankrollObj = '{  "description": "' + description + '", "initialValue": ' + initBudget + ', "name": "' + bName + '"}'

    callPostNewBankroll(bankrollObj);
}

function addBankrollButtonToPage(bankroll) {
    $(document).ready(function() {
        $('#bankrollsBtns').append(
          '<div class="u-container-style u-list-item u-repeater-item">' +
          '<div class="u-container-layout u-similar-container u-container-layout-1">' +
          '<div class="u-align-center u-container-style u-group u-palette-5-dark-1 u-radius-15 u-shape-round u-group-1">' +
          '<div class="u-container-layout u-container-layout-111" data-href="Bets-Page.html?'+bankroll.id+'&'+bankroll.name+'">' +
          '<h6 class="u-align-center u-custom-font u-font-source-sans-pro u-text u-text-1">' + bankroll.name + '</h6>' +
          '<p class="u-align-center u-custom-font u-font-source-sans-pro u-text u-text-2">'+ bankroll.roi + '%<br>' +
          '<span style="font-size: 0.625rem;">ROI</span>' +
          '<p class="u-align-center u-custom-font u-font-source-sans-pro u-text u-text-3">' + bankroll.progression + '%<br>' +
          '<span style="font-size: 0.625rem;">PROGRESSION</span></p>' +
          '</div></div></div></div>'
        );
      });
}

