function $(id) {
    return document.getElementById(id);
}
function GetSignedNumber(v) {
    if (v > 127) {
        return v - 256;
    }
    else {
        return v;
    }
}
function myDecimal(num, v) {
    var vv = Math.pow(10, v);
    return Math.round(num * vv) / vv;
}
function CheckFloat(v, errorid, errMsg) {
    var r = /^(-)?[0-9]+(.[0-9]{1,2})?$/;
    if (errMsg == null) {
        errMsg = '';
    }
    else {
        errMsg += ': ';
    }
    if (r.test(v)) {
        $(errorid).innerHTML = '';
        return v;
    }
    else {
        $(errorid).innerHTML = '<span class="label label-important">' + errMsg + 'Invalid Value</span>';
        return '';
    }
}
function CheckComma(v, errorid) {
    var vs = v.split(',').length;
    var vss = v.split(';').length;
    if (vs > 1 || vss > 1) {
        $(errorid).innerHTML = '<span class="label label-important">Invalid Value ("," and ";" were invalid char)</span>';
        return '';
    }
    else {
        $(errorid).innerHTML = '';
        return v;
    }
}
function CheckNumber(v, errorid) {
    var r = /^[1-9]+$/;
    if (r.test(v)) {
        $(errorid).innerHTML = '';
        return v;
    }
    else {
        $(errorid).innerHTML = '<span class="label label-important">Invalid Value</span>';
        return '';
    }
}
function CheckIsIP(strIP, errorid, errMsg) {
    if (errMsg == null) {
        errMsg = '';
    }
    else {
        errMsg += ': ';
    }
    if (strIP == null) {
        $(errorid).innerHTML = '<span class="label label-important">' + errMsg + 'Invalid Value</span>';
        return '';
    }
    var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式
    if (re.test(strIP)) {
        if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256)
            $(errorid).innerHTML = '';
        return strIP;
    }
    else {
        $(errorid).innerHTML = '<span class="label label-important">' + errMsg + 'Invalid Value</span>';
        return '';
    }
}
function checkLogin(reboot, noindex) {
    return true;
    if (noindex != null) {
        var power = getCookie("power");
        if (power != "admin" && power != "super" && power != "user") {
            alert("Permission denied or user online information lost, please login again!");
            parent.window.location.href = "Signin.html";
            return false;
        }
    }

    if (reboot == null || reboot == "1") {
        var logon = getCookie("login");
        if (logon == "") {
            alert("User online information lost, please login again!");
            parent.window.location.href = "Signin.html";
            return false;
        } else {
            var SelEquipment = parent.document.getElementById("valueList");
            if (SelEquipment == null) {
                alert("illegal operation or monitoring board already restart, please login!");
                parent.window.location.href = "Signin.html";
                return false;
            } else {
                getCookie("type");
                return true;
            }
        }
    } else {
        alert("illegal operation or monitoring board already restart, please login!");
        parent.window.location.href = "Signin.html";
        return false;
    }
}

function getCookie(name) {
    var c = document.cookie;
    if (c.length > 0) {
        var list = c.split(name);
        if (list.length == 2) {
            var list1 = list[1].split(';');
            var list2 = list1[0].split('=');
            var result = decodeURI(list2[1]);
            setCookie(name, result);
            return result;
        }
    }
    return "";
}

function setCookie(name, value) {
    var date = new Date();
    date.setTime(date.getTime() + 1800 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + date.toGMTString(); ;
}