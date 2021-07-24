let name = document.getElementById('name').value
let tel = document.getElementById('tel').value
let email = document.getElementById('email').value
let message = document.getElementById('message').value

const XHR = new XMLHttpRequest();

function validateForm(){
    function emailIsValid(email) {
        var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(String(email).toLowerCase()))
            return 1
        else
            return 0
    }

    function telIsValid(tel) {
        var regex = /^\+7[-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
        if (regex.test(tel.replace(/ /g,'')))
            return 1
        else
            return 0
    }

    function alertElementById(id){
        document.getElementById(id+'-mes').style.visibility = "visible"
        document.getElementById(id).style.border = "1px solid red"
    }

    function UnAlertElementById(id){
        document.getElementById(id+'-mes').style.visibility = "hidden"
        document.getElementById(id).style.border = "1px solid #c8cbd2"
    }

    document.getElementById('no-contact-mes').style.visibility = "hidden"
    document.getElementById('status').style.visibility = "hidden"
    UnAlertElementById('name')
    UnAlertElementById('email')
    UnAlertElementById('tel')
    UnAlertElementById('message')

    if (!name) {
        alertElementById('name')
        return 0
    } else {
        UnAlertElementById('name')
    }

    if (!(email==="" && tel==="")) {
        if (email) {
            if (!emailIsValid(email)) {
                alertElementById('email')
                return 0
            } else {
                UnAlertElementById('email')
            }
        }
        if (tel) {
            if (!telIsValid(tel) || !tel) {
                alertElementById('tel')
                return 0
            } else {
                UnAlertElementById('tel')
            }
        }
    } else {
        document.getElementById('no-contact-mes').style.visibility = "visible"
        alertElementById('email')
        alertElementById('tel')
        return 0
    }

    if (!message) {
        alertElementById('message')
        return 0
    } else {
        UnAlertElementById('message')
    }
    return 1
}

function ajaxSend(name, tel, email, message){
    const url = "123";
    let data = JSON.stringify({"name": name, "tel": tel, "email": email, "message": message});

    XHR.open("POST", url, true);
    XHR.setRequestHeader("Content-Type", "application/json");
    XHR.send(data);
}

document.getElementById("submit").addEventListener("click", function () {
    name = document.getElementById('name').value
    tel = document.getElementById('tel').value
    email = document.getElementById('email').value
    message = document.getElementById('message').value

    if (validateForm()) {

        ajaxSend(name, tel, email, message)

        XHR.onreadystatechange = function () {
            if (XHR.readyState === 4 && XHR.status === 200) {
                document.getElementById('status').style.visibility = "visible"
                document.getElementById('status').style.color = "green"
                document.getElementById('status').innerHTML = "Сообщение успешно отправлено"
            }
            if (XHR.readyState === 4) {
                document.getElementById('status').style.visibility = "visible"
                document.getElementById('status').style.color = "red"
                document.getElementById('status').innerHTML = "Ошибка отправки ("+XHR.status+")"
            }
        };
    }
});

