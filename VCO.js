function checkReboot() {
    var valuelist = $('valueList').innerHTML.split(';');
    if (checkLogin(valuelist[0], 1)) {
        CreateVCOTable();
        valuelist = valuelist[1].split(',');
        for (var i = 0; i < valuelist.length - 1; i++) {
            if (i == 0 || i == 3 || i == 4 || i == 7) {
                $('V' + i.toString()).value = myDecimal(1.0 * valuelist[i] / 100, 2);
            }
            else {
                $('V' + i.toString()).value = valuelist[i];
            }
        }
    }
}

function CreateVCOTable() {
    var tHead = '<table class="table table-condensed table-bordered"><thead><tr class="bgGray"><td colspan="6">VCO Setting<span id="error" class="pull-right"></span></td></tr></thead>';
    var tBody = '<tbody><tr><td class="span2 TAR">F1 CF</td><td class="span3"><div class="input-append"><input id="V0" type="text" class="span1" onblur="this.value=CheckFloat(this.value,\'error\');" onmouseout="this.value=CheckFloat(this.value,\'error\');" /><span class="add-on">MHz</span></div></td><td class="span1"><input type="button" class="btn" value="Set" onclick="SubmitForm(1);" /></td><td class="span2 TAR">Revise Stepper</td><td class="span3"><input id="V1" type="text" class="span1" onblur="this.value=CheckFloat(this.value,\'error\');" onmouseout="this.value=CheckFloat(this.value,\'error\');" /></td><td class="span1"><input type="button" class="btn" value="Set" onclick="SubmitForm(2);" /></td></tr>';
    tBody += '<tr><td class="TAR">F2 CF</td><td><div class="input-append"><input id="V4" type="text" class="span1" onblur="this.value=CheckFloat(this.value,\'error\');"onmouseout="this.value=CheckFloat(this.value,\'error\');" /><span class="add-on">MHz</span></div></td><td><input type="button" class="btn" value="Set" onclick="SubmitForm(4);" /></td><td class="TAR">Revise Stepper</td><td><input id="V5" type="text" class="span1" onblur="this.value=CheckFloat(this.value,\'error\');"onmouseout="this.value=CheckFloat(this.value,\'error\');" /></td><td><input type="button" class="btn" value="Set" onclick="SubmitForm(5);" /></td></tr>';
    tBody += '<tr><td class="TAR">F1 IFF</td><td colspan="4"><div class="pull-left"><select name="FrequencyType" id="V2" style="width: 150px; margin-bottom: 0px; margin-right: 5px; height: 28px;"><option value="0">Low LO</option><option value="1">High LO</option></select></div><div class="input-append pull-left marginleft10"><input id="V3" type="text" class="span1" onblur="this.value=CheckFloat(this.value,\'error\');"onmouseout="this.value=CheckFloat(this.value,\'error\');" /><span class="add-on">MHz</span></div></td><td><input type="button" class="btn" value="Set" onclick="SubmitForm(3);" /></td></tr>';
    tBody += '<tr><td class="TAR">F2 IFF</td><td colspan="4"><div class="pull-left"><select name="FrequencyType" id="V6" style="width: 150px; margin-bottom: 0px; margin-right: 5px; height: 28px;"><option value="0">Low LO</option><option value="1">High LO</option></select></div><div class="input-append pull-left marginleft10"><input id="V7" type="text" class="span1" onblur="this.value=CheckFloat(this.value,\'error\');"onmouseout="this.value=CheckFloat(this.value,\'error\');" /><span class="add-on">MHz</span></div></td><td><input type="button" class="btn" value="Set" onclick="SubmitForm(6);" /></td></tr></tbody></table>';
    $('VCOTable').innerHTML = tHead + tBody
}

function SubmitForm(formNumber) {
    var submitForm = $('VCO');
    var paramList = '';
    switch (formNumber) {
        case 1:
            //Set F1 Center frequency
            paramList = $('V0').value + ',';
            break;
        case 2:
            //Set F1 revise stepper?
            paramList = $('V1').value + ',';
            break;
        case 3:
            //Set F1 Local Oscillator
            paramList = $('V2').value;
            paramList += ',' + $('V3').value + ',';
            break;
        case 4:
            //Set F2
            paramList = $('V4').value + ',';
            break;
        case 5:
            //Set F2 Revise
            paramList = $('V5').value + ',';
            break;
        case 6:
            //Set F2 Local Oscillator
            paramList = $('V6').value;
            paramList += ',' + $('V7').value + ',';
            break;
        default:
            break;
    }
    if (confirm('Sure submit?')) {
        submitForm.action = 'VCO.html?length=' + paramList.length
                + '&orderId=' + formNumber + '&hid_1=' + paramList;
        submitForm.submit();
    }
}
checkReboot();