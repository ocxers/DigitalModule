var currActive = "105";
function MC(m) {
    var obj = document.getElementById("MI" + m.toString());
    var cN = obj.className;
    cN = cN == "collapse" ? "shown" : "collapse";
    obj.className = cN;
    for (var i = 1; i <= 3; i++) {
        if (m == i) {
            continue;
        }
        else {
            document.getElementById("MI" + i.toString()).className = "collapse";
        }
    }
}
function MCA(ca) {
    var obj;
    var cN;
    if (ca == currActive) {
        return;
    }
    else {
        currActive = ca;
        for (var i = 101; i <= 106; i++) {
            obj = document.getElementById("MIU" + i.toString());
            if (i == ca) {
                obj.className = "active";
            }
            else {
                obj.className = "";
            }
        }
    }
}

function SetTechnology() {
    var paramList = $('Technology').value + ',';
    FTechnology.action = 'Index.html?length=' + paramList.length
                + '&orderId=1&hid_1=' + paramList;
    FTechnology.submit();
}

function SignOut() {
    if (confirm("Sign Out?")) { parent.window.location = "Signin.html"; }
}

function SetFrameHeight() {
    var iframeid = document.getElementById('mainFrame');
    var ibodyid = document.getElementById('ibody');
    if (document.getElementById) {
        if (iframeid && !window.opera) {
            if (iframeid.contentDocument && iframeid.contentDocument.body.offsetHeight) {
                iframeid.height = iframeid.contentDocument.body.offsetHeight + 50;
                ibodyid.height = iframeid.height + 50;
            } else if (iframeid.Document && iframeid.Document.body.scrollHeight) {
                iframeid.height = iframeid.Document.body.scrollHeight + 50;
                ibodyid.height = iframeid.height + 50;
            }
        }
    }
}
function onload() {
    var valuelist = $('valueList').innerHTML.split(';');
    if (checkLogin(valuelist[0], 1)) {
        $('Technology').value = valuelist[1].split(',')[0];
    }
}

onload();