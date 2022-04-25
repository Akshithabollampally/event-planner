var messageRef = firebase.database().ref('message');

firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        location.replace("index.html")
    } else {
        document.getElementById("user").innerHTML = "We're proud that you chose us " + user.email;
    }
});
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function logout() {
    firebase.auth().signOut()
}

document.getElementById('create').addEventListener('submit', submitform);

function submitform(e) {
    e.preventDefault();

    var eventname = getInputVal('eventname');
    var number = getInputVal('number');
    var place = getInputVal('place');
    var date = getInputVal('date');
    var time = getInputVal('time');
    var groupid = getInputVal('groupid');
    var password = getInputVal('password');
    savemessage(eventname, number, place, date, time ,groupid, password);
}

function getInputVal(id) {
    return document.getElementById(id).value;

}

function savemessage(eventname, number, place, date, time , groupid, password ) {
    var newmessageRef = messageRef.push();
    newmessageRef.set({
       eventname: eventname,
        number: number,
        place: place,
        date: date,
        time: time,
        groupid: groupid,
        password: password
    })
}

function listitem(eventname, number, place, date, time ,groupid , password) {
    var ul = document.getElementById('list');

    var eventname = document.createElement('li');
    var number = document.createElement('li');
    var place = document.createElement('li');
    var date = document.createElement('li');
    var time = document.createElement('li');
    var groupid = document.createElement('li');
    var password = document.createElement('li');


    eventname.innerHTML = 'eventname: ' + eventname;
    number.innerHTML = 'number: ' + number;
    place.innerHTML = 'place: ' + place;
    date.innerHTML = 'date: ' + date;
    time.innerHTML = 'time: ' + time;
    groupid.innerHTML = 'groupid: ' + groupid; 
    password.innerHTML = 'password: ' + password;

    ul.appendChild(eventname);
    ul.appendChild(number);
    ul.appendChild(place);
    ul.appendChild(date);
    ul.appendChild(time);
    ul.appendChild(groupid);
    ul.appendChild(password);
}

function lisa() {
    messageRef.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let eventname = childSnapshot.val().eventname;
            let number = childSnapshot.val().number;
            let place = childSnapshot.val().place;
            let date = childSnapshot.val().date;
            let time = childSnapshot.val().time;
            let groupid = childSnapshot.val().groupid;
            let password = childSnapshot.val().password;
            listitem(eventname, number, place, date, time ,groupid ,password);
        });
    });
}