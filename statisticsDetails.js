var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Statistics/Driver?id=');
    self.displayName = 'Estatísticas do Piloto';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.DriverId = ko.observable('');
    self.Name = ko.observable('');
    self.Nationality = ko.observable('');
    self.Url = ko.observable('');
    self.ImageUrl = ko.observable('');
    self.Wins = ko.observable('');
    self.Races = ko.observable('');
    self.Career = ko.observableArray('');
    self.DriverId = ko.observable('');
    self.Name = ko.observable('');
    self.Points = ko.observable('');
    self.Position = ko.observable('');
    self.Year = ko.observable('');
    self.test = function (data) {
        self.DriverId(data.DriverId);
        self.Name(data.Name);
        self.Points(data.Points);
        self.Position(data.Position);
        self.Year(data.Year);
    }
    self.activate = function (id) {
        console.log('CALL: getStatisticsDriverDetails...');
        var composedUri = self.baseUri() + id;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            self.DriverId(data.DriverId);
            self.Name(data.Name);
            self.Nationality(data.Nationality);
            self.Url(data.Url);
            self.ImageUrl(data.ImageUrl);
            self.Wins(data.Wins);
            self.Races(data.Races);
            self.Career(data.Career);
            self.DriverId(data.DriverId);
            self.Name(data.Name);
            self.Points(data.Points);
            self.Position(data.Position);
            self.Year(data.Year);
            hideLoading();
        });
    };
    //--- Internal functions

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