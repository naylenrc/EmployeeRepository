window.onload = function () {

    var myId;
    var selectedRowId = null;

    $.ajax({
        url: "/api/employee", success: function (jsonlist) {

            for (var i = 0; i < jsonlist.length; i++) {

                var firstname = jsonlist[i].FirstName;
                var lName = jsonlist[i].LastName;
                var init = jsonlist[i].Initials;
                var office = jsonlist[i].OfficeId;
                myId = jsonlist[i].Id;

                newRow(myId, firstname, lName, init, office);

            }
        }
    });


    function newRow(empId, firstNameColumn, lastNameColumn, initialColumn, officeColumn) {

        var addRow = document.createElement('tr');
      //  addRow.id = "row" + empId;

        addRow.appendChild(createCell(empId, true));
        addRow.appendChild(createCell(firstNameColumn));
        addRow.appendChild(createCell(lastNameColumn));
        addRow.appendChild(createCell(initialColumn));
        addRow.appendChild(createCell(officeColumn));
        addRow.appendChild(createCell(createLink()));

        document.querySelector('#target tbody').appendChild(addRow);

    }


    function editRow(firstNameColumn, lastNameColumn, initialColumn, officeColumn) {
        var replaceRow = $("#" + selectedRowId);

        replaceRow.children("td:nth-child(1)")[0].innerText = firstNameColumn;
        replaceRow.children("td:nth-child(2)")[0].innerText = lastNameColumn;
        replaceRow.children("td:nth-child(3)")[0].innerText = initialColumn;
        replaceRow.children("td:nth-child(4)")[0].innerText = officeColumn;
    }


    function createCell(text, isId) {
        var newColumn = document.createElement('td');
        if (text) {
            if (typeof text == "object") {
                newColumn.appendChild(text)
            } else
                newColumn.innerText = text;
        }
        if (isId) {
            newColumn.className = "this-is-id";
        }
        return newColumn;
    }

    function createLink() {
        var editLink = document.createElement('a');
        editLink.innerHTML = "Edit";

        editLink.id = "edit" + myId;
        editLink.className = "editClass";
        editLink.addEventListener('click', clickEdit, false);

        return editLink;
    }

    function clickEdit() {
        var clickedBtnID = $(this).parent().parent().find('.this-is-id');
        selectedRowId = clickedBtnID[0].innerText *1; //.replace("edit", "row");        

        $("#myModal").modal('show');
        $(".page-title").html('Edit Employee');
        $("#deleteBtn").css("display", "block");
        $("#saveUpdate").html('Save Employee');
        
        editEmployee(selectedRowId);
    }

    
    function editEmployee(rowid) {
        var id = rowid;
        $.ajax({
            type: "GET",
            url: "/api/Employee/" + id,
            success: function (jsonlist) {
                
                document.getElementById('employeeId').value = jsonlist.Id;
                document.getElementById('firstNameId').value = jsonlist.FirstName;
                document.getElementById('lastNameId').value = jsonlist.LastName;
                document.getElementById('initialsId').value = jsonlist.Initials;
                document.getElementById('officeId').value = jsonlist.OfficeId;                   

                }            
        });
    }


    document.getElementById("saveUpdate").addEventListener("click", function () {

        var saveUpdate = document.getElementById('saveUpdate').innerHTML
        var selectedEmployeeId = document.getElementById('employeeId').value * 1
        var firstNameEdited = document.getElementById('firstNameId').value
        var lastNameEdited = document.getElementById('lastNameId').value
        var initialsEdited = document.getElementById('initialsId').value
        var offEdit = document.getElementById('officeId').value
        // var selectedEmployeeId = saveUpdate == "Add Employee" ? 0 : selectedRowId.replace("row", "") * 1;

        var objEmployee = { Id: selectedEmployeeId, FirstName: firstNameEdited, LastName: lastNameEdited, Initials: initialsEdited, OfficeId: offEdit }

        if (saveUpdate == "Add Employee") {
            $.ajax({
                type: "POST",
                data: JSON.stringify(objEmployee),
                url: "api/Employee",
                contentType: "application/json"
            });
            newRow(selectedEmployeeId, firstNameEdited, lastNameEdited, initialsEdited, offEdit);

        } else if (saveUpdate == "Save Employee") {

            $.ajax({
                type: "PUT",
                url: "api/Employee/" + selectedEmployeeId,
                data: JSON.stringify(objEmployee),
                contentType: "application/json"
            });
            editRow(firstNameEdited, lastNameEdited, initialsEdited, offEdit);
        }

        $("#myModal").modal('hide');

        $('.modal').on('hidden.bs.modal', function () {
            $(this).find('form')[0].reset();
        });
    });


    document.getElementById("deleteBtn").addEventListener("click", function () {
        var deletedEmployee = document.getElementById('employeeId').value * 1
               
        $.ajax({
            type: "DELETE",
            url: "api/Employee/" + deletedEmployee,
            data: deletedEmployee
        });

        $('#target tr td.this-is-id').filter(function () { if ($(this).html() == deletedEmployee) { return true; } }).parent().remove();

       $("#myModal").modal('hide');

        $('.modal').on('hidden.bs.modal', function () {
            $(this).find('form')[0].reset();
        });

    });
       


    document.getElementById("newEmployee").addEventListener("click", function () {
        $(".page-title").html('New Employee');
        $("#deleteBtn").css("display", "none");
        $("#saveUpdate").html('Add Employee');
    });

    $('#myModal').on('shown.bs.modal', function () {
        $('#firstNameId').focus();                      // focus en el primer input
    })

};

