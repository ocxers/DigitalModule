function checkReboot() {
    var valuelist = $('valueList').innerHTML.split(';');
    CreateRSTable();
    if (checkLogin(valuelist[0], 1)) {
        var otherValues = valuelist[1].split(',');
        $('Technology').value = otherValues[0];
        $('FrequencyType').value = otherValues[1];
        var otherValues = valuelist[2].split(',');
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

        for (var i = 11; i < 17; i++) {
            if (otherValues[11][i - 11] == 0) {
                $('R' + i.toString()).className = 'label label-success';
                $('R' + i.toString()).title = 'Normal';
            }
            else {
                $('R' + i.toString()).className = 'label label-important';
                $('R' + i.toString()).title = 'Alarm';
            }
        }
    }
}

function CreateRSTable() {
    $('RFStatusTable').innerHTML = '<table class="table table-bordered table-condensed"><thead><tr class="bgGray"><td colspan="6">Module Type:<select name="Technology"id="Technology"style="width: 90px; height: 25px;"><option value="0"selected="selected">DCS</option><option value="1">WCDMA</option><option value="2">GSM</option><option value="3">CDMA</option></select><select name="FrequencyType"id="FrequencyType"style="width: 220px; margin-bottom: 0px; margin-left: 10px; height: 25px;"><option value="0">Digital Channel Selecting</option><option value="1">Band Tunable</option><option value="2">Frequency Shift Donor</option><option value="3">Frequency Shift Remote</option></select><input type="button"value="Get"class="btn"onclick="SubmitForm(0);"/></td></tr></thead><tbody><tr><td class="span2">Traffic</td><td id="R0"class="span1"></td><td class="span2">UL LNA Control Depth</td><td id="R1"class="span1"></td><td class="span2">DL LNA Control Depth</td><td id="R2"class="span1"></td></tr><tr><td>FPGA Firmware Version</td><td id="R3"></td><td>UL Isolation</td><td id="R4"></td><td>DL Isolation</td><td id="R5"></td></tr><tr><td>Repeater Temperature</td><td id="R6"></td><td>UL Input Power</td><td id="R7"></td><td>DL Input Power</td><td id="R8"></td></tr><tr><td></td><td></td><td>UL Output Power</td><td id="R9"></td><td>DL Output Power</td><td id="R10"></td></tr><tr class="bgGray"><td colspan="6">Alarm Status</td></tr><tr><td colspan="6"style="padding: 15px;"><span id="R11"class="label label-success"style="padding: 5px 10px; margin: 0 5px 0 0;"title="Normal">62005 unlock</span><span id="R12"class="label label-success"style="padding: 5px 10px; margin: 0 5px 0 0;"title="Normal">vco1 unlock</span><span id="R13"class="label label-success"style="padding: 5px 10px; margin: 0 5px 0 0;"title="Normal">vco2 unlock</span><span id="R14"class="label label-success"style="padding: 5px 10px; margin: 0 5px 0 0;"title="Normal">Temperature Over</span><span id="R15"class="label label-success"style="padding: 5px 10px; margin: 0 5px 0 0;"title="Normal">UL Input O/P</span><span id="R16"class="label label-success"style="padding: 5px 10px; margin: 0 5px 0 0;"title="Normal">DL Input O/P</span></td></tr></tbody></table>';
}

function SubmitForm(formNumber) {
    var submitForm = $('RFStatus');
    var paramList = $('Technology').value + ',' + $('FrequencyType').value + ',';
    if (confirm('Sure submit?')) {
        //        alert(formNumber + '-=:=-' + paramList);
        //        return;
        submitForm.action = 'RFStatus.html?length=' + paramList.length
                + '&orderId=' + formNumber + '&hid_1=' + paramList;
        submitForm.submit();
    }
}
checkReboot();