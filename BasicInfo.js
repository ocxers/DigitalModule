function checkReboot() {
    var valuelist = $('valueList').innerHTML.split(';');
    CreateBasicTable();
    if (checkLogin(valuelist[0], 1)) {
        var otherValues = valuelist[1].split(',');
        for (var i = 0; i < 12; i++) {
            $('B' + i.toString()).value = otherValues[i];
        }
    }
}

function CreateBasicTable() {
    //<tr><td class="span1">Module SN</td><td class="span2"><input id="B0"type="text"class="span2"/></td><td class="span1">Module No.</td><td class="span2"><input id="B1"type="text"class="span2"value="1"/></td><td class="span1"rowspan="3"><input type="button"class="btn"value="Set"onclick="SubmitForm(1);"/></td></tr>
    $('HardwareTable').innerHTML = '<table class="table table-bordered table-condensed"><thead><tr><td colspan="5"class="bgGray">Hardware Information<span class="pull-right"><span id="herror"class="pull-right"></span></span></td></tr></thead><tbody><tr><td class="span1">Module SN</td><td class="span2"><input id="B0" type="text"class="span2" onblur="this.value=CheckComma(this.value,\'herror\');" onmouseout="this.value=CheckComma(this.value,\'herror\');"/></td><td class="span1">Module No.</td><td class="span2"><input id="B1"type="text"class="span2"value="1" onblur="this.value=CheckComma(this.value,\'herror\');" onmouseout="this.value=CheckComma(this.value,\'herror\');"/></td><td class="span1"rowspan="3"><input type="button"class="btn"value="Set"onclick="SubmitForm(1);"/></td></tr><tr><td>Model No.</td><td><input id="B2"type="text"class="span2" onblur="this.value=CheckComma(this.value,\'herror\');" onmouseout="this.value=CheckComma(this.value,\'herror\');"/></td><td>Repeater SN</td><td><input id="B3"type="text"class="span2"value="3" onblur="this.value=CheckComma(this.value,\'herror\');" onmouseout="this.value=CheckComma(this.value,\'herror\');"/></td></tr><tr><td>Repeater Type</td><td><input id="B4"type="text"class="span2" onblur="this.value=CheckComma(this.value,\'herror\');" onmouseout="this.value=CheckComma(this.value,\'herror\');"/></td><td>Part No.</td><td><input id="B5"type="text"class="span2" onblur="this.value=CheckComma(this.value,\'herror\');" onmouseout="this.value=CheckComma(this.value,\'herror\');"/></td></tr></tbody></table><table class="table table-bordered table-condensed"><thead><tr><td colspan="5"class="bgGray">Basic Information<span class="pull-right"><span id="berror"class="pull-right"></span></span></td></tr></thead><tbody><tr><td class="span1">Site Name</td><td class="span2"><input id="B6"type="text"class="span2" onblur="this.value=CheckComma(this.value,\'berror\');" onmouseout="this.value=CheckComma(this.value,\'berror\');"/></td><td class="span1">Site No.</td><td class="span2"><input id="B7"type="text"class="span2"onblur="this.value=CheckComma(this.value,\'berror\');" onmouseout="this.value=CheckComma(this.value,\'berror\');"/></td><td class="span1"rowspan="3"><input type="button"class="btn"value="Set"onclick="SubmitForm(2);"/></td></tr><tr><td>Asset No.</td><td><input id="B8"type="text"class="span2"onblur="this.value=CheckComma(this.value,\'berror\');" onmouseout="this.value=CheckComma(this.value,\'berror\');"/></td><td>Establish Date</td><td><input id="B9"type="text"class="span2" onblur="this.value=CheckComma(this.value,\'berror\');" onmouseout="this.value=CheckComma(this.value,\'berror\');"/></td></tr><tr><td>Site Address</td><td colspan="3"><input id="B10"type="text"class="span4"value="10" onblur="this.value=CheckComma(this.value,\'berror\');" onmouseout="this.value=CheckComma(this.value,\'berror\');"/></td></tr><tr><td>IP Address</td><td colspan="3"><input id="B11"type="text"class="span3"onblur="this.value=CheckIsIP(this.value,\'berror\',\'IP Address\');"onmouseout="this.value=CheckIsIP(this.value,\'berror\',\'IP Address\');"/></td><td><input type="button"class="btn"value="Set"onclick="SubmitForm(3);"/></td></tr></tbody></table>';
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