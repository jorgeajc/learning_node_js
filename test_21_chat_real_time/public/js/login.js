const socket = io()
var roomsElem = document.querySelector('#rooms')

var templateListRoom = document.querySelector('#list-room-template').innerHTML

socket.on('rooms', (rooms) => {

    var selectList = document.createElement("select");
    selectList.id = "rooms";

    var option = document.createElement("option");
    option.value = option.text = 'Rooms Active';
    selectList.appendChild(option);

    for (var i = 0; i < rooms.length; i++) {
        var option = document.createElement("option");
        option.value = rooms[i].name;
        option.text = rooms[i].name;
        selectList.appendChild(option);
    } 
    selectList.addEventListener('change', (e) => {
        document.querySelector('#inputroom').value = selectList.value 
    })
    roomsElem.innerHTML = ''
    roomsElem.appendChild(selectList);
})






