var vm = function () {
    console.log('ViewModel initiated...');
        
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Statistics/Season?year=2021');
    self.displayName = 'Informação da Temporada';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.Year = ko.observable('');
    self.Races = ko.observable('');
    self.Countries = ko.observable('');
    self.Constructors = ko.observable('');
    self.Drivers = ko.observable('');
    self.DriverStandings = ko.observableArray('');
    self.ConstructorStandings = ko.observableArray('');

    self.activate = function (year) {
        console.log('CALL: getStatisticsYear...');
        var composedUri = self.baseUri() + year;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            self.Year(data.Year);
            self.Races(data.Races);
            self.Countries(data.Countries);
            self.Constructors(data.Constructors);
            self.Drivers(data.Drivers);
            self.DriverStandings(data.DriverStandings);
            self.ConstructorStandings(data.ConstructorStandings);
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
    var pg = getUrlParameter('year');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }


    self.searchUri = ko.observable('http://192.168.160.58/Formula1/api/Search/All');
    self.query = ko.observable('');
    self.matchingResults = ko.observableArray('');
    self.Searcherror = ko.observable('');

    self.search = function (value) {
        console.log('CALL: Search...');
        self.matchingResults.removeAll();
        if (value != "") {
            var composedUri = self.searchUri() + '?q=' + value
            SearchAjax(composedUri, 'GET').done(function (data) {
                for (i in data) {
                    if (data[i].Text.includes(value)) {
                        self.matchingResults.push(data[i].Text);
                    }
                }
            })
            $("#searchbar").autocomplete({
                source: self.matchingResults()
            })
        }

    }
    self.query.subscribe(self.search)
    //--- Internal functions

    function SearchAjax(uri, method, data) {
        self.Searcherror(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.Searcherror(errorThrown);
            }
        });

    }
}

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});
