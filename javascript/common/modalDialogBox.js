function modalBox(header, body) {

    if ($('#myModal.modal').length > 0) {
        $('#myModal.modal').replaceWith(setModalBoxInfo(header, body));
    } 

    $('body').append(setModalBoxInfo(header, body));

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("closeModal")[0];

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }

}

function setModalBoxInfo(header, body) {
    return "<div id='myModal' class='modal'>" +
    "<!-- Modal content -->" +
    "<div class='modal-content' style='max-width: 30%;'>" +
    "<div class='modal-header'>" +
    "<span class='closeModal'>&times;</span>" +
    "<h2 style='font-size: 99%; margin: 15px 0px; width: 80%'><b>" + header + "</b></h2>" +
    "</div>" +
    "<div class='modal-body'>" +
    "<p>" + body + "</p>" +
    "</div>" +
    "</div>" +
    "</div>";
}

function newTeamModalBox(strategyPath) {
    console.log(strategyPath);
    modalBox("Insert New Team", "<div class=\"u-border-2 u-border-black u-border-no-left u-border-no-right u-expanded-width-sm u-expanded-width-xs u-form u-form-1\" style=\"max-width: 60%; margin-left: auto; margin-right: auto;\"> <form class=\"u-clearfix u-form-spacing-8 u-form-vertical u-inner-form\" source=\"custom\" name=\"form\" style=\"padding: 9px;\"> <div class=\"u-form-group u-form-name u-form-group-1\"> <label for=\"name-6797\" class=\"u-custom-font u-font-source-sans-pro u-label\">Name</label> <input type=\"text\" placeholder=\"Name\" id=\"name-6797\" name=\"name\" class=\"u-border-1 u-border-grey-30 u-custom-font u-font-source-sans-pro u-input u-input-rectangle u-radius-29 u-white u-input-1\" required=\"\"> </div> <div class=\"u-form-url u-form-group u-form-group-2\"> <label for=\"url-6797\" class=\"u-custom-font u-font-source-sans-pro u-label\">URL</label> <input type=\"text\" placeholder=\"URL\" id=\"url-6797\" name=\"statsUrl\" class=\"u-border-1 u-border-grey-30 u-custom-font u-font-source-sans-pro u-input u-input-rectangle u-radius-29 u-white u-input-1\" required=\"\"> </div> <div class=\"u-form-url u-form-group u-form-group-4\"> <label for=\"cars\">Season:</label> <select id=\"teamSeason\"> <option value=\"--\">--</option> <option value=\"2022\">2022</option> <option value=\"2022-23\">2022-23</option> <option value=\"2023\">2023</option> <option value=\"2023-24\">2023-24</option> </select> </div> <div class=\"u-form-group u-form-submit u-form-group-3\" style=\"margin-left: auto; margin-right: auto; text-align: center;\"> <a onclick=\"insertTeam('" + strategyPath + "')\" class=\"u-btn u-btn-round u-btn-submit u-button-style u-radius-50\" style=\"background-color: #a88a73;\">Submit</a> <input type=\"submit\" value=\"submit\" class=\"u-form-control-hidden\"> </div> </form> </div>");    
  }

  function newMatchManuallyModalBox(strategyPath) {
    console.log(strategyPath);
    modalBox("Insert New Match", "<div class=\"u-border-2 u-border-black u-border-no-left u-border-no-right u-expanded-width-sm u-expanded-width-xs u-form  u-form-1\" style=\"max-width: 60%; margin-left: auto; margin-right: auto;\">  <form class=\"u-clearfix u-form-spacing-8 u-form-vertical u-inner-form\" source=\"custom\" name=\"form\"    style=\"padding: 9px;\">    <div class=\"u-form-group u-form-name u-form-group-1\"> <label for=\"homeTeamNewMatch\" class=\"u-custom-font        u-font-source-sans-pro u-label\">Home Team</label> <input type=\"text\" placeholder=\"Home Team\"        id=\"homeTeamNewMatch\" name=\"homeTeam\" class=\"u-border-1 u-border-grey-30 u-custom-font        u-font-source-sans-pro u-input u-input-rectangle u-radius-29 u-white u-input-1\" required=true> </div>    <div class=\"u-form-url u-form-group u-form-group-2\"> <label for=\"awayTeamNewMatch\" class=\"u-custom-font        u-font-source-sans-pro u-label\">Away Team</label> <input type=\"text\" placeholder=\"Away Team\"        id=\"awayTeamNewMatch\" name=\"awayTeam\" class=\"u-border-1 u-border-grey-30 u-custom-font        u-font-source-sans-pro u-input u-input-rectangle u-radius-29 u-white u-input-1\" required=true> </div>    <div class=\"u-form-url u-form-group u-form-group-2\"> <label for=\"dateNewMatch\" class=\"u-custom-font        u-font-source-sans-pro u-label\">Date</label> <input type=\"date\" placeholder=\"Date\" id=\"dateNewMatch\"        name=\"date\" class=\"u-border-1 u-border-grey-30 u-custom-font u-font-source-sans-pro u-input u-input-rectangle        u-radius-29 u-white u-input-1\" required=true> </div>    <div class=\"u-form-url u-form-group u-form-group-2\"> <label for=\"oddNewMatch\" class=\"u-custom-font        u-font-source-sans-pro u-label\">Odd</label> <input type=\"text\" placeholder=\"Odd\" id=\"oddNewMatch\"        name=\"oddNewMatch\" class=\"u-border-1 u-border-grey-30 u-custom-font u-font-source-sans-pro u-input        u-input-rectangle u-radius-29 u-white u-input-1\" required=true> </div>    <div class=\"u-form-url u-form-group u-form-group-2\"> <label for=\"seqLevelNewMatch\" class=\"u-custom-font        u-font-source-sans-pro u-label\">Sequence Level</label> <input type=\"text\" placeholder=\"Sequence Level\"        id=\"seqLevelNewMatch\" name=\"seqLevel\" class=\"u-border-1 u-border-grey-30 u-custom-font        u-font-source-sans-pro u-input u-input-rectangle u-radius-29 u-white u-input-1\" required=true> </div>    <div class=\"u-form-group u-form-submit u-form-group-3\" style=\"margin-left: auto; margin-right: auto; text-align: center;\"> <a onclick=\"insertMatchManually('" + strategyPath + "')\" class=\"u-btn u-btn-round u-btn-submit        u-button-style u-radius-50\" style=\"background-color: #a88a73;\">Submit</a> <input type=\"submit\"        value=\"submit\" class=\"u-form-control-hidden\"> </div>  </form></div>");    
  }
