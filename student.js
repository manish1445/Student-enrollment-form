var jpdbBaseURL = "https://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var connToken = "90936861|-31948784479254024|90932362";
var dbName = "Student";
var relName = "Student-Rel";

var dataFields = ["fullName", "stuClass", "birthDate", "address", "enrollDate"];


function createPUTRequest(connToken, jsonObj, dbName, relName) {
    return "{\n"
            + "\"token\" : \"" + connToken + "\","
            + "\"dbName\": \"" + dbName + "\",\n"
            + "\"cmd\" : \"PUT\",\n"
            + "\"rel\" : \"" + relName + "\","
            + "\"jsonStr\": \n" + jsonObj + "\n"
            + "}";
}

function createGET_BY_KEYRequest(connToken, dbName, relName, jsonObjStr) {
    return "{\n"
            + "\"token\" : \"" + connToken + "\",\n"
            + "\"cmd\" : \"GET_BY_KEY\",\n"
            + "\"dbName\": \"" + dbName + "\",\n"
            + "\"rel\" : \"" + relName + "\",\n"
            + "\"jsonStr\":\n" + jsonObjStr + "\n"
            + "}";
}

function createUPDATERecordRequest(connToken, jsonObj, dbName, relName, recNo) {
    return "{\n"
            + "\"token\" : \"" + connToken + "\",\n"
            + "\"dbName\": \"" + dbName + "\",\n"
            + "\"cmd\" : \"UPDATE\",\n"
            + "\"rel\" : \"" + relName + "\",\n"
            + "\"jsonStr\":{ \"" + recNo + "\": " + jsonObj + "}\n"
            + "}";
}


function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        try {
            jsonObj = JSON.parse(result);
        } catch (e) {
            alert("Bad response from database: " + result);
        }
    }).fail(function (result) {
        try {
            jsonObj = JSON.parse(result.responseText);
        } catch (e) {
            alert("Request failed. Status: " + result.status + " " + result.statusText);
        }
    });
    return jsonObj;
}


function resetForm() {
    $("#rollNo").val("").prop("disabled", false);
    for (var i = 0; i < dataFields.length; i++) {
        $("#" + dataFields[i]).val("").prop("disabled", true);
    }
    $("#saveBtn").prop("disabled", true);
    $("#updateBtn").prop("disabled", true);
    $("#resetBtn").prop("disabled", true);
    $("#rollNo").focus();
}

function enableDataFields() {
    for (var i = 0; i < dataFields.length; i++) {
        $("#" + dataFields[i]).prop("disabled", false);
    }
}

function validateAndGetFormData() {
    var labels = {
        rollNo: "Roll No", fullName: "Full Name", stuClass: "Class",
        birthDate: "Birth Date", address: "Address", enrollDate: "Enrollment Date"
    };
    var ids = ["rollNo", "fullName", "stuClass", "birthDate", "address", "enrollDate"];
    var data = {};
    for (var i = 0; i < ids.length; i++) {
        var val = $("#" + ids[i]).val();
        if (val === "") {
            alert(labels[ids[i]] + " is Required Value");
            $("#" + ids[i]).focus();
            return "";
        }
        data[ids[i]] = val;
    }
    return JSON.stringify(data);
}

function fillData(record) {
    $("#fullName").val(record.fullName);
    $("#stuClass").val(record.stuClass);
    $("#birthDate").val(record.birthDate);
    $("#address").val(record.address);
    $("#enrollDate").val(record.enrollDate);
}


function getStudent() {
    var rollNoVar = $("#rollNo").val();
    if (rollNoVar === "") {
        return;
    }
    var rollNoJson = JSON.stringify({rollNo: rollNoVar});
    var getReq = createGET_BY_KEYRequest(connToken, dbName, relName, rollNoJson);

    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommand(getReq, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});

    if (resultObj === undefined) {
        return;   
    }

    if (resultObj.status === 400) {
        
        enableDataFields();
        $("#saveBtn").prop("disabled", false);
        $("#resetBtn").prop("disabled", false);
        $("#fullName").focus();
    } else if (resultObj.status === 200) {
        
        var parsed = JSON.parse(resultObj.data);
        localStorage.setItem("recno", parsed.rec_no);
        fillData(parsed.record);
        $("#rollNo").prop("disabled", true);
        enableDataFields();
        $("#updateBtn").prop("disabled", false);
        $("#resetBtn").prop("disabled", false);
        $("#fullName").focus();
    } else {
        alert("Unexpected response: " + JSON.stringify(resultObj));
    }
}


function saveStudent() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(connToken, jsonStr, dbName, relName);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommand(putReqStr, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    if (resultObj !== undefined && resultObj.status === 200) {
        alert("Student saved successfully.");
    } else {
        alert("Save failed: " + JSON.stringify(resultObj));
    }
    resetForm();
}


function updateStudent() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var recNo = localStorage.getItem("recno");
    var updateReqStr = createUPDATERecordRequest(connToken, jsonStr, dbName, relName, recNo);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommand(updateReqStr, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    if (resultObj !== undefined && resultObj.status === 200) {
        alert("Student updated successfully.");
    } else {
        alert("Update failed: " + JSON.stringify(resultObj));
    }
    resetForm();
}


$("#rollNo").on("change", getStudent);
$("#rollNo").on("keydown", function (e) {
    if (e.which === 13) {
        e.preventDefault();
        getStudent();
    }
});
$("#stuForm").on("submit", function (e) {
    e.preventDefault();
});

resetForm();
$("#status").text("Ready. Enter a Roll No and press Enter.");