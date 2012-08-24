﻿function checkReboot() {
    var valuelist = $('valueList').innerHTML.split(';');
    if (checkLogin(valuelist[0], 1)) {
        valuelist = valuelist[1].split(',');
        switch (valuelist[0]) {
            case 0:
                break;
            case 1:
                alert('Failed to change password.');
                break;
            case 2:
                alert('Success to change the password.');
                break;
            case 3:
                alert('Success to backup factory settings.');
                break;
            default:

        }
        if (valuelist[0] == 0) {
            return;
        }
        else if (valuelist[0] == 1) {
            alert('Failed to change password.');
        }
        else {
            alert('Success to change the password.');
        }

        var power = getCookie("power");
        if (power == "super") {
            $('backup').style.display = '';
            $('restore').style.display = '';
            $('initpwd').style.display = '';
        }
    }
}
function SubmitForm(formNumber) {
    var submitForm = $('Tools');
    var paramList = '';
    switch (formNumber) {
        case 1:
            paramList = '1,';
            break;
        case 2:
            paramList = '2,';
            break;
        case 3:
            paramList = '3,';
            break;
        case 5:
            paramList = '5,';
            break;
        case 6:
            paramList = '6,';
            break;
        case 7:
            paramList = '7,';
            break;
        default:
            //Set IP Address
            if ($('P1').value == '') {
                alert('Please input Current PWD.');
                return;
            }
            if ($('P2').value == '') {
                alert('Please input New PWD.');
                return;
            }
            if ($('P2').value != $('P3').value) {
                alert('New PWD and Confirm PWD not matched.');
                return;
            }
            if ($('P1').value == $('P2').value) {
                alert('Current PWD equals to New PWD.');
                return;
            }
            paramList = $('P1').value + ',' + $('P2').value + ',';
            break;
    }

    if (confirm('Sure submit?')) {
        //        alert(formNumber + '-=:=-' + paramList);
        //        return;
        submitForm.action = 'Tools.html?length=' + paramList.length
                + '&orderId=' + formNumber + '&hid_1=' + paramList;
        submitForm.submit();
    }
}

checkReboot();