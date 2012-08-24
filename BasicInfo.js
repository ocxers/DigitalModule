function checkReboot() {
    var valuelist = $('valueList').innerHTML.split(';');
    CreateBasicTable();
    CreateRSTable();
    if (checkLogin(valuelist[0], 1)) {
        var otherValues = valuelist[3].split(',');
        for (var i = 0; i < 12; i++) {
            $('B' + i.toString()).value = otherValues[i];
        }

        otherValues = valuelist[2].split(',');
        for (var i = 0; i < 11; i++) {
            if (i == 4 || i == 5) {
                var isoV = GetSignedNumber(otherValues[i]);
                $('R' + i.toString()).innerHTML = isoV == 127 ? '--' : isoV;
            }
            else if (i >= 7 && i <= 10) {
                $('R' + i.toString()).innerHTML = myDecimal(GetSignedNumber(1.0 * otherValues[i] / (1.0 * 16)), 1);
            }
            else {
                $('R' + i.toString()).innerHTML = otherValues[i];
            }
        }
        otherValues = valuelist[1];
        for (var i = 11; i < 17; i++) {
            if (otherValues[i - 11] == 0) {
                $('R' + i.toString()).className = 'label label-success';
                $('R' + i.toString()).title = 'Normal';
            }
            else {
                $('R' + i.toString()).className = 'label label-important';
                $('R' + i.toString()).title = 'Alarm';
            }
        }
        $('FrequencyType').innerHTML = GetTypes(valuelist[4].split(',')[0]);
    }
}

function CreateBasicTable() {
    //<tr><td class="span1">Module SN</td><td class="span2"><input id="B0"type="text"class="span2"/></td><td class="span1">Module No.</td><td class="span2"><input id="B1"type="text"class="span2"value="1"/></td><td class="span1"rowspan="3"><input type="button"class="btn"value="Set"onclick="SubmitForm(1);"/></td></tr>
    $('HardwareTable').innerHTML = '<table class="table table-bordered table-condensed"><thead><tr><td colspan="5"class="bgGray">Hardware Information<span class="pull-right"><span id="herror"class="pull-right"></span></span></td></tr></thead><tbody><tr><td class="span1">Module SN</td><td class="span2"><input id="B0" type="text"class="span2" onblur="this.value=CheckComma(this.value,\'herror\');" onmouseout="this.value=CheckComma(this.value,\'herror\');"/></td><td class="span1">Module No.</td><td class="span2"><input id="B1"type="text"class="span2"value="1" onblur="this.value=CheckComma(this.value,\'herror\');" onmouseout="this.value=CheckComma(this.value,\'herror\');"/></td><td class="span1"rowspan="3"><input type="button"class="btn"value="Set"onclick="SubmitForm(1);"/></td></tr><tr><td>Model No.</td><td><input id="B2"type="text"class="span2" onblur="this.value=CheckComma(this.value,\'herror\');" onmouseout="this.value=CheckComma(this.value,\'herror\');"/></td><td>Repeater SN</td><td><input id="B3"type="text"class="span2"value="3" onblur="this.value=CheckComma(this.value,\'herror\');" onmouseout="this.value=CheckComma(this.value,\'herror\');"/></td></tr><tr><td>Repeater Type</td><td><input id="B4"type="text"class="span2" onblur="this.value=CheckComma(this.value,\'herror\');" onmouseout="this.value=CheckComma(this.value,\'herror\');"/></td><td>Part No.</td><td><input id="B5"type="text"class="span2" onblur="this.value=CheckComma(this.value,\'herror\');" onmouseout="this.value=CheckComma(this.value,\'herror\');"/></td></tr></tbody></table><table class="table table-bordered table-condensed"><thead><tr><td colspan="5"class="bgGray">Basic Information<span class="pull-right"><span id="berror"class="pull-right"></span></span></td></tr></thead><tbody><tr><td class="span1">Site Name</td><td class="span2"><input id="B6"type="text"class="span2" onblur="this.value=CheckComma(this.value,\'berror\');" onmouseout="this.value=CheckComma(this.value,\'berror\');"/></td><td class="span1">Site No.</td><td class="span2"><input id="B7"type="text"class="span2"onblur="this.value=CheckComma(this.value,\'berror\');" onmouseout="this.value=CheckComma(this.value,\'berror\');"/></td><td class="span1"rowspan="3"><input type="button"class="btn"value="Set"onclick="SubmitForm(2);"/></td></tr><tr><td>Asset No.</td><td><input id="B8"type="text"class="span2"onblur="this.value=CheckComma(this.value,\'berror\');" onmouseout="this.value=CheckComma(this.value,\'berror\');"/></td><td>Establish Date</td><td><input id="B9"type="text"class="span2" onblur="this.value=CheckComma(this.value,\'berror\');" onmouseout="this.value=CheckComma(this.value,\'berror\');"/></td></tr><tr><td>Site Address</td><td colspan="3"><input id="B10"type="text"class="span4"value="10" onblur="this.value=CheckComma(this.value,\'berror\');" onmouseout="this.value=CheckComma(this.value,\'berror\');"/></td></tr><tr><td>IP Address</td><td colspan="3"><input id="B11"type="text"class="span3"onblur="this.value=CheckIsIP(this.value,\'berror\',\'IP Address\');"onmouseout="this.value=CheckIsIP(this.value,\'berror\',\'IP Address\');"/></td><td><input type="button"class="btn"value="Set"onclick="SubmitForm(3);"/></td></tr></tbody></table>';
}

function CreateRSTable() {
    $('RFStatusTable').innerHTML = '<table class="table table-bordered table-condensed"><thead><tr class="bgGray"><td colspan="6">Alarm Status</td></tr></thead><tbody><tr><td colspan="6"style="padding: 15px;"><span id="R11"class="label label-success"style="padding: 5px 10px; margin: 0 5px 0 0;"title="Normal">62005 unlock</span><span id="R12"class="label label-success"style="padding: 5px 10px; margin: 0 5px 0 0;"title="Normal">vco1 unlock</span><span id="R13"class="label label-success"style="padding: 5px 10px; margin: 0 5px 0 0;"title="Normal">vco2 unlock</span><span id="R14"class="label label-success"style="padding: 5px 10px; margin: 0 5px 0 0;"title="Normal">Temperature Over</span><span id="R15"class="label label-success"style="padding: 5px 10px; margin: 0 5px 0 0;"title="Normal">UL Input O/P</span><span id="R16"class="label label-success"style="padding: 5px 10px; margin: 0 5px 0 0;"title="Normal">DL Input O/P</span></td></tr></tbody></table><table class="table table-bordered table-condensed"><thead><tr class="bgGray"><td colspan="6">Basic Status<span id="FrequencyType" class="label label-success pull-right" style="padding: 1px 10px; margin: 0 5px 0 0;" title="Normal"></span></td></tr></thead><tbody><tr><td class="span2">Traffic</td><td id="R0"class="span1"></td><td class="span2">UL LNA Control Depth</td><td id="R1"class="span1"></td><td class="span2">DL LNA Control Depth</td><td id="R2"class="span1"></td></tr><tr><td>FPGA Firmware Version</td><td id="R3"></td><td>UL Isolation</td><td id="R4"></td><td>DL Isolation</td><td id="R5"></td></tr><tr><td>Repeater Temperature</td><td id="R6"></td><td>UL Input Power</td><td id="R7"></td><td>DL Input Power</td><td id="R8"></td></tr><tr><td></td><td></td><td>UL Output Power</td><td id="R9"></td><td>DL Output Power</td><td id="R10"></td></tr></tbody></table>';
}

function SubmitForm(formNumber) {
    var submitForm = $('BasicInfo');
    var paramList = '';
    switch (formNumber) {
        case 1:
            //Set Hardware Information
            for (var i = 0; i < 6; i++) {
                if ($('B' + i.toString()).value == '') {
                    alert('Invalid Value');
                    return;
                }
                paramList += $('B' + i.toString()).value + ',';
            }
            break;
        case 2:
            //Set Basic Information
            for (var i = 6; i < 11; i++) {
                if ($('B' + i.toString()).value == '') {
                    alert('Invalid Value');
                    return;
                }
                paramList += $('B' + i.toString()).value + ',';
            }
            break;
        default:
            //Set IP Address
            if ($('B11').value == '') {
                alert('Invalid Value');
                return;
            }
            if (CheckIsIP($('B11').value, 'berror', 'IP Address') == '')
                return;
            paramList += $('B11').value + ',';
            break;
    }

    if (confirm('Sure submit?')) {
        //        alert(formNumber + '-=:=-' + paramList);
        //        return;
        submitForm.action = 'BasicInfo.html?length=' + paramList.length
                + '&orderId=' + formNumber + '&hid_1=' + paramList;
        submitForm.submit();
    }
}

checkReboot();