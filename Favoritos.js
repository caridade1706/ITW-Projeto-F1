// ViewModel KnockOut
var vm = function () {

    self.updateLocalStorage = (key, data) => {
            localStorage.setItem(key, JSON.stringify(data))
        }

        self.favorites = ko.observableArray([])
        self.favButton = (id,event) => {
        
            if (!event.target.classList.contains('btn-default-active')) {
                if (self.favorites.indexOf(id) === -1)
                    self.favorites.push(id)
                self.updateLocalStorage("driverFavorites", self.favorites())
                event.target.classList.add('btn-danger');

            } else {
                self.favorites.splice(self.favorites.indexOf(id), 1)
                self.updateLocalStorage("driverFavorites", self.favorites())
                event.target.classList.remove('btn-danger');

            }
        }

    
    
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});



