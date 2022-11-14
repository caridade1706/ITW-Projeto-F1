//--- Internal functions
function ajaxHelper(uri, method, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Call[" + uri + "] Fail...");
            hideLoading();
        }
    });
}

function showLoading() {
    $("#myModal").modal('show', {
        keyboard: false
    });
}
function hideLoading() {
    $('#myModal').on('shown.bs.modal', function (e) {
        $("#myModal").modal('hide');
    });
}

function sleep(milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds);
}


function removeFav(DriverId) {
    console.log("remove fav")
    $("#fav-" + DriverId).remove();

    let fav = JSON.parse(localStorage.fav || '[]');

    const index = fav.indexOf(DriverId);

    if (index != -1)
        fav.splice(index, 1);

    localStorage.setItem("fav", JSON.stringify(fav));
}


function removeFav2(ConstructorId) {
    console.log("remove fav2")
    $("#fav2-" + ConstructorId).remove();

    let fav2 = JSON.parse(localStorage.fav2 || '[]');

    const index = fav2.indexOf(ConstructorId);

    if (index != -1)
        fav2.splice(index, 1);

    localStorage.setItem("fav2", JSON.stringify(fav2));
}


function removeFav3(CircuitId) {
    console.log("remove fav3")
    $("#fav3-" + CircuitId).remove();

    let fav3 = JSON.parse(localStorage.fav3 || '[]');

    const index = fav3.indexOf(CircuitId);

    if (index != -1)
        fav3.splice(index, 1);

    localStorage.setItem("fav3", JSON.stringify(fav3));
}


$(document).ready(function () {
    showLoading();

    let fav = JSON.parse(localStorage.fav || '[]');

    console.log(fav);


    for (const i of fav) {
        console.log(i);

        ajaxHelper('http://192.168.160.58/Formula1/api/Drivers/Driver?id=' + i, 'GET').done(function (data) {
            console.log(data)
            if (localStorage.fav.length != 0) {
                $("#table-favourites").show();
                $('#noadd').hide();
                $('#nofav').hide();
                $("#table-favourites").append(
                    `<tr id="fav-${i}">
                        <td class="align-middle">${i}</td>
                        <td class="align-middle">${data.Name}</td>
                        <td class="align-middle">${data.Nationality}</td>
                        <td class="text-end">
                            <a class="btn btn-default btn-outline-danger btn-sm btn-favourite" onclick="removeFav(${i})"><i class="fa fa-heart" title="Selecione para remover dos favoritos"></i></a>
                        </td>
                    </tr>`
                )
            
            }
        });
        sleep(50);
    }
    let fav2 = JSON.parse(localStorage.fav2 || '[]');

    console.log(fav2);


    for (const i of fav2) {
        console.log(i);

        ajaxHelper('http://192.168.160.58/Formula1/api/Constructors/Constructor?id=' + i, 'GET').done(function (data) {
            console.log(data)
            if (localStorage.fav2.length != 0) {
                $("#table-favourites2").show();
                $('#noadd').hide();
                $('#nofav').hide();
                $("#table-favourites2").append(
                    `<tr id="fav2-${i}">
                        <td class="align-middle">${i}</td>
                        <td class="align-middle">${data.Name}</td>
                        <td class="align-middle">${data.Nationality}</td>
                        <td class="text-end">
                            <a class="btn btn-default btn-outline-danger btn-sm btn-favourite" onclick="removeFav2(${i})"><i class="fa fa-heart" title="Selecione para remover dos favoritos"></i></a>
                        </td>
                    </tr>`
                )
            
            }
        });
        sleep(50);
    }
    let fav3 = JSON.parse(localStorage.fav3 || '[]');

    console.log(fav3);


    for (const i of fav3) {
        console.log(i);

        ajaxHelper('http://192.168.160.58/Formula1/api/Circuits/Circuit?id=' + i, 'GET').done(function (data) {
            console.log(data)
            if (localStorage.fav3.length != 0) {
                $("#table-favourites3").show();
                $('#noadd').hide();
                $('#nofav').hide();
                $("#table-favourites3").append(
                    `<tr id="fav3-${i}">
                        <td class="align-middle">${i}</td>
                        <td class="align-middle">${data.Name}</td>
                        <td class="align-middle">${data.Country}</td>
                        <td class="text-end">
                            <a class="btn btn-default btn-outline-danger btn-sm btn-favourite" onclick="removeFav3(${i})"><i class="fa fa-heart" title="Selecione para remover dos favoritos"></i></a>
                        </td>
                    </tr>`
                )
            
            }
        });
        sleep(50);
    }

    hideLoading();
})