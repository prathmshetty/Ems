document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('employee-form');
    const employeeList = document.getElementById('employee-list');
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-btn');
    const notFoundMessage = document.getElementById('not-found');

    // Arrays to store employee details
    let names = [];
    let departments = [];
    let employeeNumbers = [];
    let addresses = [];
    let salaries = [];

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const nameInput = document.getElementById('name');
        const departmentInput = document.getElementById('department');
        const employeeNumberInput = document.getElementById('employee-number');
        const addressInput = document.getElementById('address');
        const salaryInput = document.getElementById('salary');

        const name = nameInput.value;
        const department = departmentInput.value;
        const employeeNumber = employeeNumberInput.value;
        const address = addressInput.value;
        const salary = parseFloat(salaryInput.value);

        if (name.trim() === '' || department.trim() === '' || employeeNumber.trim() === '' || address.trim() === '' || isNaN(salary)) {
            alert('Please fill in all fields with valid data');
            return;
        }

        // Add employee details to arrays
        names.push(name);
        departments.push(department);
        employeeNumbers.push(employeeNumber);
        addresses.push(address);
        salaries.push(salary);

        // Display the added employee
        displayEmployee(name, department, employeeNumber, address, salary);

        // Clear input fields after adding employee
        clearInputFields();
    });

    function displayEmployee(name, department, employeeNumber, address, salary) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <strong>Name:</strong> <span class="name">${name}</span><br>
            <strong>Department:</strong> <span class="department">${departments[names.indexOf(name)]}</span><br>
            <strong>Employee Number:</strong> <span class="employee-number">${employeeNumber}</span><br>
            <strong>Address:</strong> <span class="address">${address}</span><br>
            <strong>Salary:</strong> <span class="salary">$${salary.toFixed(2)}</span><br>
            <div style="margin-top: 10px;">
                <button type="button" class="btn btn-info btn-sm update">Update</button>
                <div class="btn-group">
                    <button type="button" class="btn btn-danger btn-sm delete">Delete</button>
                    <!-- Save button is added dynamically using JavaScript -->
                </div>
            </div>
        `;
        employeeList.appendChild(li);

        // Add event listener for delete button
        li.querySelector('.delete').addEventListener('click', function() {
            const index = names.indexOf(name);
            if (index !== -1) {
                // Remove employee details from arrays
                names.splice(index, 1);
                departments.splice(index, 1);
                employeeNumbers.splice(index, 1);
                addresses.splice(index, 1);
                salaries.splice(index, 1);
            }
            li.remove();
        });

        // Add event listener for update button
        li.querySelector('.update').addEventListener('click', function() {
            // Replace text content with input fields for editing
            li.querySelector('.name').innerHTML = `<input type="text" value="${name}" class="form-control">`;
            li.querySelector('.department').innerHTML = `<input type="text" value="${department}" class="form-control">`;
            li.querySelector('.employee-number').innerHTML = `<input type="text" value="${employeeNumber}" class="form-control">`;
            li.querySelector('.address').innerHTML = `<input type="text" value="${address}" class="form-control">`;
            li.querySelector('.salary').innerHTML = `<input type="number" value="${salary}" class="form-control">`;

            // Check if save button already exists
            if (!li.querySelector('.save')) {
                // Add save button only if it doesn't exist
                const saveButton = document.createElement('button');
                saveButton.type = 'button';
                saveButton.className = 'btn btn-success btn-sm save';
                saveButton.innerText = 'Save';
                li.querySelector('.btn-group').appendChild(saveButton);

                // Add event listener for save button
                saveButton.addEventListener('click', function() {
                    const newName = li.querySelector('.name input').value.trim();
                    const newDepartment = li.querySelector('.department input').value.trim();
                    const newEmployeeNumber = li.querySelector('.employee-number input').value.trim();
                    const newAddress = li.querySelector('.address input').value.trim();
                    const newSalary = parseFloat(li.querySelector('.salary input').value);

                    // Update employee details in arrays
                    const index = names.indexOf(name);
                    if (index !== -1) {
                        names[index] = newName;
                        departments[index] = newDepartment;
                        employeeNumbers[index] = newEmployeeNumber;
                        addresses[index] = newAddress;
                        salaries[index] = newSalary;
                    }

                    // Update displayed details
                    li.querySelector('.name').innerHTML = newName;
                    li.querySelector('.department').innerHTML = newDepartment;
                    li.querySelector('.employee-number').innerHTML = newEmployeeNumber;
                    li.querySelector('.address').innerHTML = newAddress;
                    li.querySelector('.salary').innerHTML = `$${newSalary.toFixed(2)}`;

                    // Remove the save button after saving changes
                    saveButton.remove();
                });
            }
        });
    }

    searchButton.addEventListener('click', function() {
        const query = searchInput.value.toLowerCase();
        const filteredNames = names.filter(name => name.toLowerCase().includes(query));
        const filteredDepartments = departments.filter(department => department.toLowerCase().includes(query));

        // Clear existing list
        employeeList.innerHTML = '';

        if (filteredNames.length === 0 && filteredDepartments.length === 0 && query !== '') {
            // Display "Employee not found" message if query is not empty and no results are found
            notFoundMessage.style.display = 'block';
        } else {
            // Hide the message if previously shown
            notFoundMessage.style.display = 'none';

            // Display filtered results
            filteredNames.forEach((name, index) => {
                const department = departments[names.indexOf(name)];
                const employeeNumber = employeeNumbers[names.indexOf(name)];
                const address = addresses[names.indexOf(name)];
                const salary = salaries[names.indexOf(name)];
                displayEmployee(name, department, employeeNumber, address, salary);
            });
        }
    });

    function clearInputFields() {
        document.getElementById('name').value = '';
        document.getElementById('department').value = '';
        document.getElementById('employee-number').value = '';
        document.getElementById('address').value = '';
        document.getElementById('salary').value = '';
    }
});
