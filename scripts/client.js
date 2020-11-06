console.log (`Vatti Rocks`);

const employeeTable=[];

const sampleEmployeeData = [
    {
        first: 'John',
        last: 'Smith',
        id: '3453',
        title: 'Operations Manager',
        annualSalary: 65000
    },
    {
        first: 'Paul',
        last: 'Jones',
        id: '2223',
        title: 'Data Entry',
        annualSalary: 35500
    },
    {
        first: 'Mary',
        last: 'Smithstone',
        id: '1244',
        title: 'VP of Production',
        annualSalary: 165000
    },
    {
        first: 'Susie',
        last: 'Hardball',
        id: '37',
        title: 'CEO Owner',
        annualSalary: 265000
    }
];

const preloadData = (() => {
    let i=0;
    for ( i = 0; i < sampleEmployeeData.length; i += 1 ) {
        employeeTable[i] = sampleEmployeeData [i]
    }
    console.log (`Employee Table`, employeeTable);
})();  // end of auto invoke IFII fn


$(document).ready (docReady);


function docReady () {
    console.log (`in docReady`);

    //generate Table HTML
    // Title</th><th>Annual Salary</th>
    html = `<tr>`
    html += `<th>First Name</th> <th>Last Name</th> <th>ID</th> <th>Title</th>`
    html += `<th>Annual Salary</th><th>(delete)</th>`
    html += `</tr>`;
    $('#tableId').append(html)

    for ( i = 0; i < employeeTable.length; i += 1 ) {
        html = `<tr class="tableRowClass">`;
        html+= `<td>${employeeTable[i].first}</td> <td>${employeeTable[i].last}</td> <td>${employeeTable[i].id}</td>`;
        html+= `<td>${employeeTable[i].title}</td> <td>${employeeTable[i].annualSalary}</td>`;
        html+=  `<td><button class="deleteButtonClass">Delete</button></td> </tr>`;
        $('#tableId').append (html);
    }

} // end docReady fn
