﻿function checkReboot() {
    var valuelist = $('valueList').innerHTML.split(';');
    CreateDebugTable();
    CreateD2Table();
    if (checkLogin(valuelist[0], 1)) {
        var otherValues = valuelist[1].split(',');
        for (var i = 0; i < otherValues.length - 1; i++) {
            if (i < 6 || i == 30 || (i >= 16 && i <= 21)) {
                $('D' + i.toString()).value = myDecimal(GetSignedNumber(1.0 * otherValues[i] / (1.0 * 16)), 1);
            }
            else if ((i > 7 && i < 12) || i == 14 || i == 15 || i == 31) {
                $('D' + i.toString()).value = myDecimal(GetSignedNumber(1.0 * otherValues[i]), 1);
            }
            else {
                $('D' + i.toString()).value = otherValues[i];
            }
        }
    }
}

function CreateDebugTable() {
    var tHead = '<table class="table table-condensed table-bordered"><thead><tr class="bgGray"><td class="span1"></td><td class="span2">UL</td><td class="span2">DL</td><td class="span1">Set</td></tr></thead>';
    var tBody = '<tbody><tr><td>AGC THR</td><td><input id="D0"type="text"class="span1"onblur="this.value=CheckFloat(this.value,\'derror\',\'AGC THR UL\');"onmouseout="this.value=CheckFloat(this.value,\'derror\',\'AGC THR UL\');"/></td><td><input id="D1"type="text"class="span1"onblur="this.value=CheckFloat(this.value,\'derror\',\'AGC THR DL\');"onmouseout="this.value=CheckFloat(this.value,\'derror\',\'AGC THR DL\');"/></td><td rowspan="6"><input type="button"class="btn"value="Set"onclick="SubmitForm(1);"/></td></tr><tr><td>Input Over THR</td><td><input id="D2"type="text"class="span1"onblur="this.value=CheckFloat(this.value,\'derror\',\'Input Over THR UL\');"onmouseout="this.value=CheckFloat(this.value,\'derror\',\'Input Over THR UL\');"/></td><td><input id="D3"type="text"class="span1"onblur="this.value=CheckFloat(this.value,\'derror\',\'Input Over THR DL\');"onmouseout="this.value=CheckFloat(this.value,\'derror\',\'Input Over THR DL\');"/></td></tr><tr><td>ATT</td><td><input id="D4"type="text"class="span1"onblur="this.value=CheckFloat(this.value,\'derror\',\'ATT UL\');"onmouseout="this.value=CheckFloat(this.value,\'derror\',\'ATT UL\');"/></td><td><input id="D5"type="text"class="span1"onblur="this.value=CheckFloat(this.value,\'derror\',\'ATT UL\');"onmouseout="this.value=CheckFloat(this.value,\'derror\',\'ATT UL\');"/></td></tr><tr><td>ICS Switch</td><td><select name="D6"id="D6"style="width: 70px; margin-bottom: 0px; height: 25px;"><option value="0">OFF</option><option value="1">ON</option></select></td><td><select name="D7"id="D7"style="width: 70px; margin-bottom: 0px; height: 25px;"><option value="0">OFF</option><option value="1">ON</option></select></td></tr><tr><td>Muting THR</td><td><div class="input-prepend pull-left"><span class="add-on">ON</span><input id="D8"class="span1"size="16"type="text"onblur="this.value=CheckFloat(this.value,\'derror\',\'Muting THR UL ON\');"onmouseout="this.value=CheckFloat(this.value,\'derror\',\'Muting THR UL ON\');"></div><div class="input-prepend pull-left marginleft10"><span class="add-on">OFF</span><input id="D9"class="span1"size="16"type="text"onblur="this.value=CheckFloat(this.value,\'derror\',\'Muting THR UL OFF\');"onmouseout="this.value=CheckFloat(this.value,\'derror\',\'Muting THR UL OFF\');"></div></td><td><div class="input-prepend pull-left"><span class="add-on">ON</span><input id="D10"class="span1"size="16"type="text"onblur="this.value=CheckFloat(this.value,\'derror\',\'Muting THR DL ON\');"onmouseout="this.value=CheckFloat(this.value,\'derror\',\'Muting THR DL ON\');"></div><div class="input-prepend pull-left marginleft10"><span class="add-on">OFF</span><input id="D11"class="span1"size="16"type="text"onblur="this.value=CheckFloat(this.value,\'derror\',\'Muting THR DL OFF\');"onmouseout="this.value=CheckFloat(this.value,\'derror\',\'Muting THR DL OFF\');"></div></td></tr><tr><td>Muting Switch</td><td><select name="D12"id="D12"style="width: 70px; margin-bottom: 0px; height: 25px;"><option value="0">OFF</option><option value="1">ON</option></select></td><td><select name="D13"id="D13"style="width: 70px; margin-bottom: 0px; height: 25px;"><option value="0">OFF</option><option value="1">ON</option></select></td></tr><tr><td>Muting RS</td><td><input id="D14"type="text"class="span1"onblur="this.value=CheckFloat(this.value,\'derror\',\'Muting RS UL\');"onmouseout="this.value=CheckFloat(this.value,\'derror\',\'Muting RS UL\');"/></td><td><input id="D15"type="text"class="span1"onblur="this.value=CheckFloat(this.value,\'derror\',\'Mutnig RS DL\');"onmouseout="this.value=CheckFloat(this.value,\'derror\',\'Muting RS DL\');"/></td><td rowspan="4"><input type="button"class="btn"value="Set"onclick="SubmitForm(2);"/></td></tr><tr><td>Input Power RS</td><td><input id="D16"type="text"class="span1"onblur="this.value=CheckFloat(this.value,\'derror\',\'Input Power RS UL\');"onmouseout="this.value=CheckFloat(this.value,\'derror\',\'Input Power RS UL\');"/></td><td><input id="D17"type="text"class="span1"onblur="this.value=CheckFloat(this.value,\'derror\',\'Input Power RS DL\');"onmouseout="this.value=CheckFloat(this.value,\'derror\',\'Input Power RS DL\');"/></td></tr><tr><td>Output Power RS</td><td><input id="D18"type="text"class="span1"onblur="this.value=CheckFloat(this.value,\'derror\',\'Output Power RS UL\');"onmouseout="this.value=CheckFloat(this.value,\'derror\',\'Output Power RS UL\');"/></td><td><input id="D19"type="text"class="span1"onblur="this.value=CheckFloat(this.value,\'derror\',\'Output Power RS DL\');"onmouseout="this.value=CheckFloat(this.value,\'derror\',\'Output Power RS DL\');"/></td></tr><tr><td>Gain RS</td><td><input id="D20"type="text"class="span1"onblur="this.value=CheckFloat(this.value,\'derror\',\'Gain RS UL\');"onmouseout="this.value=CheckFloat(this.value,\'derror\',\'Gain RS UL\');"/></td><td><input id="D21"type="text"class="span1"onblur="this.value=CheckFloat(this.value,\'derror\',\'Gain RS DL\');"onmouseout="this.value=CheckFloat(this.value,\'derror\',\'Gain RS DL\');"/></td></tr></tbody></table><span id="derror" class="pull-right"></span>';
    $('DebugTable').innerHTML = tHead + tBody;
}

function CreateD2Table() {
    $('D2Table').innerHTML = '<table class="table table-condensed table-bordered"><thead><tr class="bgGray"><td colspan="3">Setting<span id="d2error" class="pull-right"></span></td></tr></thead><tbody><tr><td style="width: 115px;">Module Type</td><td style="width: 475px;"><select name="D22"id="D22"style="width: 80px; margin-bottom: 0px; height: 25px;"><option value="0">DCS</option><option value="1">WCDMA</option><option value="2">GSM</option><option value="3">CDMA</option></select><select name="D23"id="D23"style="width: 220px; margin-bottom: 0px; height: 25px;"><option value="0">Digital Channel Selecting</option><option value="1">Band Tunable</option><option value="2">Frequency Shift Donor</option><option value="3">Frequency Shift Remote</option></select></td><td style="width: 96px;"><input type="button"class="btn"value="Set"onclick="SubmitForm(3);"/></td></tr><tr><td>Clock Schemes</td><td><select name="D24"id="D24"style="width: 80px; margin-bottom: 0px; height: 25px;"><option value="0">10.0M</option><option value="1">12.8M</option><option value="2">26M</option><option value="3">30.72M</option></select><select name="D25"id="D25"style="width: 80px; margin-bottom: 0px; height: 25px;"><option value="0">61.44M</option><option value="1">122.88M</option><option value="2">140M</option><option value="3">199.68M</option></select></td><td><input type="button"class="btn"value="Set"onclick="SubmitForm(4);"/></td></tr><tr><td>Test Module</td><td><select name="D26"id="D26"style="width: 164px; margin-bottom: 0px; height: 25px;"><option value="0">Normal</option><option value="1">Straight-through</option><option value="2">DAC</option></select></td><td><input type="button"class="btn"value="Set"onclick="SubmitForm(5);"/></td></tr><tr><td>LNA ATT</td><td><input id="D27"type="text"class="span2"value=""onblur="this.value=CheckFloat(this.value,\'d2error\',\'LNA ATT\');"onmouseout="this.value=CheckFloat(this.value,\'d2error\',\'LNA ATT\');"/></td><td rowspan="3"><input type="button"class="btn"value="Set"onclick="SubmitForm(6);"/></td></tr><tr><td>DVGA ATT</td><td><input id="D28"type="text"class="span2"value=""onblur="this.value=CheckFloat(this.value,\'d2error\',\'DVGA ATT\');"onmouseout="this.value=CheckFloat(this.value,\'d2error\',\'DVGA ATT\');"/></td></tr><tr><td>DAC ATT</td><td><input id="D29"type="text"class="span2"value=""onblur="this.value=CheckFloat(this.value,\'d2error\',\'DAC ATT\');"onmouseout="this.value=CheckFloat(this.value,\'d2error\',\'DAC ATT\');"/></td></tr><tr><td>UL Traffic THR</td><td><input id="D30"type="text"class="span2"value=""onblur="this.value=CheckFloat(this.value,\'d2error\',\'UL Traffic THR\');"onmouseout="this.value=CheckFloat(this.value,\'d2error\',\'UL Traffic THR\');"/></td><td><input type="button"class="btn"value="Set"onclick="SubmitForm(7);"/></td></tr><tr><td>Temperature RS</td><td><input id="D31"type="text"class="span2"value=""onblur="this.value=CheckFloat(this.value,\'d2error\',\'Temperature RS\');"onmouseout="this.value=CheckFloat(this.value,\'d2error\',\'Temperature RS\');"/></td><td><input type="button"class="btn"value="Set"onclick="SubmitForm(8);"/></td></tr></tbody></table>';
}

function SubmitForm(formNumber) {
    var submitForm = $('Debug');
    var paramList = '';
    var p1 = '', p2 = '';
    switch (formNumber) {
        case 1:
            //Set AGC-Muting Switch
            for (var i = 0; i < 14; i++) {
                if ($('D' + i.toString()).value == '') {
                    alert('Invalid Value');
                    return;
                }
                if ((i % 2 == 0 || i == 9) && i != 10) {
                    if (i <= 4) {
                        p1 += ($('D' + i.toString()).value * 16) + ',';
                    }
                    else {
                        p1 += $('D' + i.toString()).value + ',';
                    }
                }
                else {
                    if (i <= 5) {
                        p2 += ($('D' + i.toString()).value * 16) + ',';
                    }
                    else {
                        p2 += $('D' + i.toString()).value + ',';
                    }
                }
            }
            paramList += p1 + p2;
            break;
        case 2:
            //Set Muting RS-Gain RS
            for (var i = 14; i < 22; i++) {
                if ($('D' + i.toString()).value == '') {
                    alert('Invalid Value');
                    return;
                }
                if (i % 2 == 0) {
                    if (i > 15) {
                        p1 += ($('D' + i.toString()).value * 16) + ',';
                    }
                    else {
                        p1 += $('D' + i.toString()).value + ',';
                    }
                }
                else {
                    if (i > 15) {
                        p2 += ($('D' + i.toString()).value * 16) + ',';
                    }
                    else {
                        p2 += $('D' + i.toString()).value + ',';
                    }
                }
                //paramList += $('D' + i.toString()).value + ',';
            }
            paramList += p1 + p2;
            break;
        case 3:
            //Set Module Type
            paramList += $('D22').value + ',' + $('D23').value + ',';
            break;
        case 4:
            //Set Clock Schemes
            paramList += $('D24').value + ',' + $('D25').value + ',';
            break;
        case 5:
            //Set Test Module
            paramList += $('D26').value + ',';
            break;
        case 6:
            //Set ATT
            for (var i = 27; i < 30; i++) {
                if ($('D' + i.toString()).value == '') {
                    alert('Invalid Value');
                    return;
                }
                paramList += $('D' + i.toString()).value + ',';
            }
            break;
        case 7:
            //Set UL Traffic THR
            if ($('D30').value == '') {
                alert('Invalid Value');
                return;
            }
            paramList = ($('D30').value * 16) + ',';
            break;
        case 8:
            //Set Temperature RS
            if ($('D31').value == '') {
                alert('Invalid Value');
                return;
            }
            paramList = $('D31').value + ',';
            break;
        default:
            break;
    }

    if (confirm('Sure submit?')) {
//        alert(formNumber + '-=:=-' + paramList);
//        return;
        submitForm.action = 'Debug.html?length=' + paramList.length
                + '&orderId=' + formNumber + '&hid_1=' + paramList;
        submitForm.submit();
    }
}

checkReboot();