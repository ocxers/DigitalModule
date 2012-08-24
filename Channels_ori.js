function checkReboot() {
    var valuelist = $('valueList').innerHTML.split(';');
    if (checkLogin(valuelist[0], 1)) {
        var chcount = valuelist[1].split(',');
        $('CHC').value = chcount[1];
        $('chcounts').value = chcount[1];
        $('FrequencyType').innerHTML = GetTypes(chcount[0]);

        CreateChannelTable(chcount[1], valuelist[2], chcount[0]);
        CreateOtherTable();

        var otherValues = valuelist[3].split(',');
        for (var i = 0; i < otherValues.length - 1; i++) {
            if (i < 6) {
                $('O' + i.toString()).value = myDecimal(GetSignedNumber(1.0 * otherValues[i] / (1.0 * 16)), 1);
            }
            else if (i == 9 || i == 10 || i == 12 || i == 13) {
                $('O' + i.toString()).value = GetSignedNumber(otherValues[i]);
            }
            else {
                $('O' + i.toString()).value = otherValues[i];
            }
        }
    }
}

////包含start和end
//function CreateChannelTable(cc, vl) {
//    var tHead = '<table class="table table-condensed table-bordered"><thead><tr class="bgGray"><td class="span1">CH #</td><td class="span1">DL</td><td class="span1">CH SW</td><td class="span1">Start</td><td class="span1">End</td><td class="span1">UL PI</td><td class="span1">UL PO</td><td class="span1">DL PI</td><td class="span1">DL PO</td></tr></thead>';
//    var tFoot = '<tfoot><tr id="CHButton"><td colspan="2" class="span1"><input type="button" class="btn pull-right" style="margin-right: 23px;" value="Set" onclick="SubmitForm(2);" /></td><td class="span1"><input type="button" class="btn" value="Set" onclick="SubmitForm(3);"/></td><td class="span1"><input type="button" class="btn" value="Set" onclick="SubmitForm(4);"/></td><td colspan="5" class="span1"><input type="button" class="btn" value="Set" onclick="SubmitForm(5);"/></td></tr></tfoot></table>';
//    var tBody = '';
//    var vld;
//    vl = vl.split('|');
//    for (var i = 0; i < cc; i++) {
//        vld = vl[i].split(',');
//        tBody += '<tr><td>CH' + vld[0] + '</td>';
//        //tBody += '<td>' + myDecimal(1.0 * vld[1] / 100, 2) + '</td>';
//        tBody += '<td><input id="DL' + i.toString() + '" type="text" class="span1" value="' + myDecimal(1.0 * vld[1] / 100, 2) + '" onblur="this.value=CheckFloat(this.value,\'cherror\');" onmouseout="this.value=CheckFloat(this.value,\'cherror\');" /></td>';
//        tBody += '<td><select name="CHSW" id="CHSW' + i.toString() + '" style="width: 60px; margin-bottom: 0px; height: 25px;"><option value="0" '
//                    + (vld[2] == 0 ? 'selected="selected"' : '') + '>OFF</option><option value="1" ' + (vld[2] == 1 ? 'selected="selected"' : '') + '>ON</option></select></td>';
//        tBody += '<td><input id="ULFS' + i.toString() + '" type="text" class="span1" value="' + myDecimal(1.0 * vld[3] / 100, 2) + '" onblur="this.value=CheckFloat(this.value,\'cherror\');" onmouseout="this.value=CheckFloat(this.value,\'cherror\');" /></td>';
//        tBody += '<td><input id="DLFS' + i.toString() + '" type="text" class="span1" value="' + myDecimal(1.0 * vld[4] / 100, 2) + '" onblur="this.value=CheckFloat(this.value,\'cherror\');" onmouseout="this.value=CheckFloat(this.value,\'cherror\');" /></td>';
//        tBody += '<td>' + myDecimal(GetSignedNumber(1.0 * vld[5] / (1.0 * 16)), 1) + '</td>';
//        tBody += '<td>' + myDecimal(GetSignedNumber(1.0 * vld[6] / (1.0 * 16)), 1) + '</td>';
//        tBody += '<td>' + myDecimal(GetSignedNumber(1.0 * vld[7] / (1.0 * 16)), 1) + '</td>';
//        tBody += '<td>' + myDecimal(GetSignedNumber(1.0 * vld[8] / (1.0 * 16)), 1) + '</td></tr>';
//    }
//    $('cTable').innerHTML = tHead + tBody + tFoot;
//}
function CreateChannelTable(cc, vl, tType) {
    var tHead = '<table class="table table-condensed table-bordered"><thead><tr class="bgGray"><td class="span1">CH #</td><td class="span1">DL</td><td class="span1">CH SW</td><td class="span1">UL PI</td><td class="span1">UL PO</td><td class="span1">DL PI</td><td class="span1">DL PO</td></tr></thead>';
    var tFoot = '<tfoot><tr id="CHButton"><td colspan="2" class="span1"><input type="button" class="btn pull-right" style="margin-right: 23px;" value="Set" onclick="SubmitForm(2);" /></td><td colspan="5" class="span1"><input type="button" class="btn" value="Set" onclick="SubmitForm(3);"/></td></tr></tfoot></table>';
    var tBody = '';
    var vld;
    vl = vl.split('|');
    if (tType == 1) {
        //Band Tunable
        for (var i = 0; i < cc; i++) {
            vld = vl[i].split(',');
            if (i % 2 == 0) {
                //odd number
                tBody += '<tr><td>CH' + (myDecimal(vld[0] / 2, 0)) + ' Start</td>';
                tBody += '<td><input id="DL' + i.toString() + '" type="text" class="span1" value="' + myDecimal(1.0 * vld[1] / 100, 2) + '" onblur="this.value=CheckFloat(this.value,\'cherror\');" onmouseout="this.value=CheckFloat(this.value,\'cherror\');" /></td>';
                tBody += '<td><input id="CHSW' + i.toString() + '" value="--" disabled="disabled" type="hidden" class="span1"/>--</td>';
                tBody += '<td>--</td>';
                tBody += '<td>--</td>';
                tBody += '<td>--</td>';
                tBody += '<td>--</td></tr>';
            }
            else {
                vld = vl[i].split(',');
                tBody += '<tr><td>CH' + (myDecimal(vld[0] / 2, 0)) + ' End</td>';
                tBody += '<td><input id="DL' + i.toString() + '" type="text" class="span1" value="' + myDecimal(1.0 * vld[1] / 100, 2) + '" onblur="this.value=CheckFloat(this.value,\'cherror\');" onmouseout="this.value=CheckFloat(this.value,\'cherror\');" /></td>';
                tBody += '<td><select name="CHSW" id="CHSW' + i.toString() + '" style="width: 60px; margin-bottom: 0px; height: 25px;"><option value="0" '
                    + (vld[2] == 0 ? 'selected="selected"' : '') + '>OFF</option><option value="1" ' + (vld[2] == 1 ? 'selected="selected"' : '') + '>ON</option></select></td>';
                vld = vl[myDecimal(i / 2, 0) - 1].split(',');
                tBody += '<td>' + myDecimal(GetSignedNumber(1.0 * vld[5] / (1.0 * 16)), 1) + '</td>';
                tBody += '<td>' + myDecimal(GetSignedNumber(1.0 * vld[6] / (1.0 * 16)), 1) + '</td>';
                tBody += '<td>' + myDecimal(GetSignedNumber(1.0 * vld[7] / (1.0 * 16)), 1) + '</td>';
                tBody += '<td>' + myDecimal(GetSignedNumber(1.0 * vld[8] / (1.0 * 16)), 1) + '</td></tr>';
            }
        }
    }
    else {
        for (var i = 0; i < cc; i++) {
            vld = vl[i].split(',');
            tBody += '<tr><td>CH' + vld[0] + '</td>';
            tBody += '<td><input id="DL' + i.toString() + '" type="text" class="span1" value="' + myDecimal(1.0 * vld[1] / 100, 2) + '" onblur="this.value=CheckFloat(this.value,\'cherror\');" onmouseout="this.value=CheckFloat(this.value,\'cherror\');" /></td>';
            tBody += '<td><select name="CHSW" id="CHSW' + i.toString() + '" style="width: 60px; margin-bottom: 0px; height: 25px;"><option value="0" '
                    + (vld[2] == 0 ? 'selected="selected"' : '') + '>OFF</option><option value="1" ' + (vld[2] == 1 ? 'selected="selected"' : '') + '>ON</option></select></td>';
            tBody += '<td>' + myDecimal(GetSignedNumber(1.0 * vld[5] / (1.0 * 16)), 1) + '</td>';
            tBody += '<td>' + myDecimal(GetSignedNumber(1.0 * vld[6] / (1.0 * 16)), 1) + '</td>';
            tBody += '<td>' + myDecimal(GetSignedNumber(1.0 * vld[7] / (1.0 * 16)), 1) + '</td>';
            tBody += '<td>' + myDecimal(GetSignedNumber(1.0 * vld[8] / (1.0 * 16)), 1) + '</td></tr>';
        }
    }
    $('cTable').innerHTML = tHead + tBody + tFoot;
}

function CreateOtherTable() {
    var tHead = '<table class="table table-condensed table-bordered"><thead><tr class="bgGray"><td class="span1"></td><td class="span1">UL</td><td class="span1">DL</td><td class="span1">Set</td><td class="span1"></td><td class="span1">UL</td><td class="span1">DL</td><td class="span1">Set</td></tr></thead>';
    var tBody = '<tbody><tr><td>AGC THR</td><td><input id="O0" type="text" class="span1" onblur="this.value=CheckFloat(this.value,\'oerror\');"onmouseout="this.value=CheckFloat(this.value,\'oerror\');" /></td><td><input id="O1" type="text" class="span1" onblur="this.value=CheckFloat(this.value,\'oerror\');"onmouseout="this.value=CheckFloat(this.value,\'oerror\');" /></td><td><input type="button" class="btn" value="Set" onclick="SubmitForm(6);" /></td><td>ATT</td><td><input id="O2" type="text" class="span1" onblur="this.value=CheckFloat(this.value,\'oerror\');"onmouseout="this.value=CheckFloat(this.value,\'oerror\');" /></td><td><input id="O3" type="text" class="span1" onblur="this.value=CheckFloat(this.value,\'oerror\');"onmouseout="this.value=CheckFloat(this.value,\'oerror\');" /></td><td><input type="button" class="btn" value="Set" onclick="SubmitForm(7);" /></td></tr>';
    tBody += '<tr><td>Input P/O</td><td><input id="O4" type="text" class="span1" onblur="this.value=CheckFloat(this.value,\'oerror\');"onmouseout="this.value=CheckFloat(this.value,\'oerror\');" /></td><td><input id="O5" type="text" class="span1" onblur="this.value=CheckFloat(this.value,\'oerror\');"onmouseout="this.value=CheckFloat(this.value,\'oerror\');" /></td><td><input type="button" class="btn" value="Set" onclick="SubmitForm(8);" /></td><td>ICS SW</td><td><select name="FrequencyType" id="O6" class="span1" style="margin-bottom: 0px; height: 25px; width: 60px;"><option value="0">OFF</option><option value="1">ON</option></select></td><td><select name="FrequencyType" id="O7" style="width: 60px; margin-bottom: 0px; height: 25px; width: 60px;"><option value="0">OFF</option><option value="1">ON</option></select></td><td><input type="button" class="btn" value="Set" onclick="SubmitForm(9);" /></td></tr>';
    tBody += '<tr class="bgGray"><td>Muting</td><td>Switch</td><td>ON THR</td><td>OFF THR</td><td>Set</td><td></td><td></td><td></td></tr>';
    tBody += '<tr><td>UL</td><td><select name="FrequencyType" id="O8" class="span1" style="margin-bottom: 0px; height: 25px; width: 60px;"><option value="0">OFF</option><option value="1">ON</option></select></td><td><input id="O9" type="text" class="span1" onblur="this.value=CheckFloat(this.value,\'oerror\');"onmouseout="this.value=CheckFloat(this.value,\'oerror\');" /></td><td><input id="O10" type="text" class="span1" onblur="this.value=CheckFloat(this.value,\'oerror\');"onmouseout="this.value=CheckFloat(this.value,\'oerror\');" /></td><td colspan="4"><input type="button" class="btn" value="Set" onclick="SubmitForm(10);" /></td></tr>';
    tBody += '<tr><td>DL</td><td><select name="FrequencyType" id="O11" class="span1" style="margin-bottom: 0px; height: 25px; width: 60px;"><option value="0">OFF</option><option value="1">ON</option></select></td><td><input id="O12" type="text" class="span1" onblur="this.value=CheckFloat(this.value,\'oerror\');" onmouseout="this.value=CheckFloat(this.value,\'oerror\');" /></td><td><input id="O13" type="text" class="span1" onblur="this.value=CheckFloat(this.value,\'oerror\');" onmouseout="this.value=CheckFloat(this.value,\'oerror\');" /></td><td colspan="4"><input type="button" class="btn" value="Set" onclick="SubmitForm(11);" /></td></tr></tbody></table>';
    $('oTable').innerHTML = tHead + tBody
}

function SubmitForm(formNumber) {
    var submitForm = $('CHSET');
    var paramList = '';
    var chcs = $('chcounts').value;
    switch (formNumber) {
        case 1:
            //Set Frequency Type
            if ($('CHC').value == '') {
                alert('Invalid Value');
                return;
            }
            paramList = $('FrequencyType').value; // ($('FrequencyType').value == 'ON' ? '1' : '0');
            paramList += ',' + $('CHC').value + ',';
            break;
        case 2:
            //Set DL
            for (var i = 0; i < chcs; i++) {
                if ($('DL' + i.toString()).value == '') {
                    alert('Invalid Value');
                    return;
                }
                paramList += $('DL' + i.toString()).value + ',';
            }
            //paramList += $('DL' + (chcs - 1)).value
            break;
        case 3:
            //Set CH Switch
            for (var i = 0; i < chcs; i++) {
                if ($('CHSW' + i.toString()).value == '') {
                    return;
                }
                paramList += $('CHSW' + i.toString()).value + ',';
            }
            //paramList += $('CHSW' + (chcs - 1)).value
            break;
        case 4:
            //Set UL FS
            for (var i = 0; i < chcs; i++) {
                if ($('ULFS' + i.toString()).value == '') {
                    alert('Invalid Value');
                    return;
                }
                paramList += $('ULFS' + i.toString()).value + ',';
            }
            //paramList += $('ULFS' + (chcs - 1)).value
            break;
        case 5:
            //Set DL FS
            for (var i = 0; i < chcs; i++) {
                if ($('DLFS' + i.toString()).value == '') {
                    alert('Invalid Value');
                    return;
                }
                paramList += $('DLFS' + i.toString()).value + ',';
            }
            //paramList += $('DLFS' + (chcs - 1)).value
            break;
        case 6:
            //Set AGC
            if ($('O0').value == '' || $('O1').value == '') {
                alert('Invalid Value');
                return;
            }
            paramList = myDecimal($('O0').value * 16, 0) + ',' + myDecimal($('O1').value * 16, 0) + ',';
            break;
        case 7:
            //Set ATT
            if ($('O2').value == '' || $('O3').value == '') {
                alert('Invalid Value');
                return;
            }
            paramList = myDecimal($('O2').value * 16, 0) + ',' + myDecimal($('O3').value * 16, 0) + ',';
            break;
        case 8:
            //Set Input Power Over
            if ($('O4').value == '' || $('O5').value == '') {
                alert('Invalid Value');
                return;
            }
            paramList = myDecimal($('O4').value * 16, 0) + ',' + myDecimal($('O5').value * 16, 0) + ',';
            break;
        case 9:
            //Set ICS Switch
            paramList = $('O6').value + ',' + $('O7').value + ',';
            break;
        case 10:
            //Set Muting UL
            if ($('O9').value == '' || $('O10').value == '') {
                alert('Invalid Value');
                return;
            }
            paramList = $('O8').value + ',' + $('O9').value + ',' + $('O10').value + ',';
            break;
        case 11:
            //Set Muting DL
            if ($('O12').value == '' || $('O13').value == '') {
                alert('Invalid Value');
                return;
            }
            paramList = $('O11').value + ',' + $('O12').value + ',' + $('O13').value + ',';
            break;
        default:
            break;
    }


    if (confirm('Sure submit?')) {
        //alert(formNumber + '-=:=-' + paramList);
        //return;
        submitForm.action = 'Channels.html?length=' + paramList.length
                + '&orderId=' + formNumber + '&hid_1=' + paramList;
        submitForm.submit();
    }
}

checkReboot();
//1;1,5;1,1,2,1,4,5,6,7,8,9|2,9,8,0,7,6,5,4,3,2|3,1,2,1,4,5,6,7,8,9|4,9,8,0,7,6,5,4,3,2|5,1,2,1,4,5,6,7,8,9;UAGC11,DAGC12,UOP13,DOP14,UATT1,DATT2,UICSSW1,DICSSW2,ULMutingSW,DLMutingSW,ULMutingOn,ULMutingOff,DLMutingOn,DLMutingOff