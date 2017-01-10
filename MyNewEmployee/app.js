window.onload = function () {

    var myId = 0;
    var selectedRowId = null;

    $.ajax({
        url: "/api/employee", success: function (jsonlist) {

            for (var i = 0; i < jsonlist.length; i++) {

                var firstname = jsonlist[i].FirstName;
                var lName = jsonlist[i].LastName;
                var init = jsonlist[i].Initials;
                var office = jsonlist[i].OfficeId;

                newRow(firstname, lName, init, office);
            

           /* for (var i = 0; i < jsonlist.employees.length; i++) {

                var firstname = jsonlist.employees[i].firstName;
                var lName = jsonlist.employees[i].lastName;
                var init = jsonlist.employees[i].initials;
                var office = jsonlist.employees[i].officeId;

                newRow(firstname, lName, init, office);*/
            }
        }
    });




    function newRow(firstNameColumn, lastNameColumn, initialColumn, officeColumn) {

        var addRow = document.createElement('tr');
        addRow.id = "row" + myId;

        addRow.appendChild(createCell(firstNameColumn));
        addRow.appendChild(createCell(lastNameColumn));
        addRow.appendChild(createCell(initialColumn));
        addRow.appendChild(createCell(officeColumn));
        addRow.appendChild(createCell(createLink()));

        document.querySelector('#target tbody').appendChild(addRow);

    }


    /* $.ajax({ 
         url: "/api/employee/id", type: "PUT", success: function () {*/
    function editRow(firstNameColumn, lastNameColumn, initialColumn, officeColumn) {
        var replaceRow = $("#" + selectedRowId);
        replaceRow.children("td:nth-child(1)")[0].innerText = firstNameColumn;
        replaceRow.children("td:nth-child(2)")[0].innerText = lastNameColumn;
        replaceRow.children("td:nth-child(3)")[0].innerText = initialColumn;
        replaceRow.children("td:nth-child(4)")[0].innerText = officeColumn;
    }
    /* }
 });*/
    function createCell(text) {
        var newColumn = document.createElement('td');
        if (text) {
            if (typeof text == "object") {
                newColumn.appendChild(text)
            } else
                newColumn.innerText = text;
        }
        return newColumn;
    }

    function createLink() {
        var editLink = document.createElement('a');
        editLink.innerHTML = "Edit";

        editLink.id = "edit" + myId;
        editLink.className = "editClass";
        editLink.addEventListener('click', clickEdit, false);
        myId++;

        return editLink;
    }

    function clickEdit() {
        var clickedBtnID = $(this).attr('id');
        selectedRowId = clickedBtnID.replace("edit", "row");

        $("#myModal").modal('show');
        $(".page-title").html('Edit Employee');
        $("#deleteBtn").css("display", "block");
        $("#saveUpdate").html('Save Employee');

        editEmployee(selectedRowId);
    }

    /*  $.ajax({
          url: "/api/employee/id", type: "GET", success: function () {*/
    function editEmployee(rowid) {

        var clickedRow = $("#" + rowid); //tr
        var editFirstName = clickedRow.children("td:nth-child(1)")[0].innerText;
        var editLastName = clickedRow.children("td:nth-child(2)")[0].innerText;
        var editInitial = clickedRow.children("td:nth-child(3)")[0].innerText;
        var editOffice = clickedRow.children("td:nth-child(4)")[0].innerText;

        document.getElementById('firstNameId').value = editFirstName;
        document.getElementById('lastNameId').value = editLastName;
        document.getElementById('initialsId').value = editInitial;
        document.getElementById('officeId').value = editOffice;
    }
    /*  }
  }); */

    document.getElementById("saveUpdate").addEventListener("click", function () {
        
        var saveUpdate =  document.getElementById('saveUpdate').innerHTML

        var firstNameEdited = document.getElementById('firstNameId').value
        var lastNameEdited = document.getElementById('lastNameId').value
        var initialsEdited = document.getElementById('initialsId').value
        var offEdit = document.getElementById('officeId').value
        var selectedEmployeeId = saveUpdate == "Add Employee"? 0: selectedRowId.replace("row", "") * 1;

        var objEmployee = { employeeId: selectedEmployeeId, firstName: firstNameEdited, lastName: lastNameEdited, initials: initialsEdited, officeId: offEdit }
       
        

        if (saveUpdate == "Add Employee") {
            $.ajax({
                type: "POST",
                data: JSON.stringify(objEmployee),
                url: "api/Employee",
                contentType: "application/json"
            });
            newRow(firstNameEdited, lastNameEdited, initialsEdited, offEdit);

        } else if (saveUpdate == "Save Employee") {
            
           // var jsonObjEmployee = JSON.stringify(objEmployee);

            $.ajax({
                type: "PUT",
                url: "api/Employee/5", /*+ selectedEmployeeId,*/
                contentType: "application/json",
                data: JSON.stringify(objEmployee),
                success: function (data) {//pasa el id pero no el objeto
                    editRow(firstNameEdited, lastNameEdited, initialsEdited, offEdit);
                }
            });            
        }

        $("#myModal").modal('hide');

        $('.modal').on('hidden.bs.modal', function () {
            $(this).find('form')[0].reset();
        });
    });

    /*
    document.getElementById("deleteBtn").addEventListener("click", function () {
        $("#" + selectedRowId).remove();
    });
    */

    document.getElementById("deleteBtn").addEventListener("click", function () {

        var deletedEmployeeId = selectedRowId.replace("row", "");
        
        $.ajax({
            type: "DELETE",            
            url: "api/Employee/" + deletedEmployeeId,
            success: function (deletedEmployeeId) {
                $("#" + selectedRowId).remove();

                +$("#myModal").modal('hide');

                $('.modal').on('hidden.bs.modal', function () {
                    $(this).find('form')[0].reset();
                });
            }
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

