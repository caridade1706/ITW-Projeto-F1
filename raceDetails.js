var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Races/Race?id=');
    self.displayName = 'Informações das Corridas';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.RaceId = ko.observable('');
    self.ImageUrl = ko.observable('');
    self.Name = ko.observable('');
    self.DriverName = ko.observable('');
    self.Year = ko.observable('');
    self.Date = ko.observable('');
    self.Round = ko.observable('');
    self.Time = ko.observable('');
    self.Url = ko.observable('');
    self.Circuit = ko.observable('');
    self.Results = ko.observableArray('');
    self.ResultId = ko.observable('');
    self.RaceName = ko.observable('');
    self.ConstructorName = ko.observable(''); //
    self.ConstructorId = ko.observable(''); //
    self.Grid = ko.observable(''); //
    self.Position = ko.observable(''); //
    self.Rank = ko.observable(''); //
    self.DynamicDrivername = ko.observable(''); //
    self.DriverId = ko.observable(''); //
    self.Status = ko.observable(''); // 
    self.test = function (data) {
        self.ConstructorName(data.ConstructorName)
        self.ConstructorId(data.ConstructorId)
        self.Grid(data.Grid)
        self.Position(data.Position)
        self.Rank(data.Rank)
        self.DynamicDrivername(data.DriverName)
        self.DriverId(data.DriverId)
        self.Status(data.Status)
    }

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getRaceDetails...');
        var composedUri = self.baseUri() + id;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            self.RaceId(data.RaceId);
            self.Name(data.Name);
            self.DriverName(data.DriverName);
            self.Year(data.Year);
            self.Date(data.Date.split("T")[0]);
            self.Round(data.Round);
            self.ImageUrl(data.ImageUrl);
            self.Time(data.Time);
            self.Url(data.Url);
            self.Circuit(data.Circuit);
            self.Status(data.Status);
            self.Results(data.Results);
            self.ResultId(data.ResultId);
            self.RaceName(data.RaceName);
            self.ConstructorName(data.ConstructorName);
            self.Grid(data.Grid);
            self.Position(data.Position);
            self.Rank(data.Rank);
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