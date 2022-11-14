var vm = function () { 
    console.log('ViewModel initiated...'); 
    //---Variáveis locais 
    var self = this; 
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Countries/Country?id='); 
    self.displayName = 'Informações sobre: '; 
    self.error = ko.observable(''); 
    self.passingMessage = ko.observable(''); 
    //--- Data Record 
    self.Circuits = ko.observableArray(''); 
    self.CountryName = ko.observable(''); 
    //--- Page Events 
    self.activate = function (id) { 
        console.log('CALL: getCountryDetails...'); 
        var composedUri = self.baseUri() + id; 
        ajaxHelper(composedUri, 'GET').done(function (data) { 
            console.log(data); 
            self.Circuits(data.Circuits); 
            console.log(self.Circuits()[0]);
            self.CountryName(data.Circuits[0].Country);
            hideLoading(); 
        }); 
    }; 
    //--- Internal functions function 
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        }); 
    } 
    function showLoading() { 
        $('#myModal').modal('show', { 
            backdrop: 'static', 
            keyboard: false 
        }); 
    } 
    function hideLoading() { 
        $('#myModal').on('shown.bs.modal', function (e) { 
            $("#myModal").modal('hide'); 
        }) 
    } 
    function getUrlParameter(sParam) { 
        var sPageURL = window.location.search.substring(1), 
        sURLVariables = sPageURL.split('&'), 
        sParameterName, 
        i; 
        for (i = 0; i < sURLVariables.length; i++) { 
            sParameterName = sURLVariables[i].split('='); 
            if (sParameterName[0] === sParam) { 
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]); 
            } 
        } 
    };  
    //--- start ....
    showLoading();
    var pg = getUrlParameter('id');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});
var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')