console.log (`Vatti Rocks`);

const employeeTable=[];
const monthlySalaryCap = 20000;

const sampleEmployeeData = [
    {
        first: 'John',
        last: 'Smith',
        id: '3453',
        title: 'WareHouse Employee',
        annualSalary: 25000.00
    },
    {
        first: 'Paul',
        last: 'Jones',
        id: '2223',
        title: 'Short Order Cook',
        annualSalary: 15500.25
    },
    {
        first: 'Mary',
        last: 'Smithstone',
        id: '1244',
        title: 'Production Manager',
        annualSalary: 55000.00
    },
    {
        first: 'Susie',
        last: 'Hardball',
        id: '3751',
        title: 'Director',
        annualSalary: 135000.00
    }
];

const preloadData = (() => {
    
    for ( let i = 0; i < sampleEmployeeData.length; i += 1 ) {
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

    displayRecords();
    $('#submitButtonId').on ('click', submitEntry)
    $('#clearButtonId').on ('click', clearEntry)
    $('.deleteButtonClass').on ('click', deleteRecord)


} // --------------------> end docReady fn <--------------------

function displayRecords() {
    let annualSalaryDollared = '';
    $('#tableId').empty();
    for ( let i = 0; i < employeeTable.length; i += 1 ) {
        annualSalaryDollared = convertNumToMoneyString(employeeTable[i].annualSalary);
        html = `<tr class="tableRowClass">`;
        html+= `<td>${employeeTable[i].first}</td> <td>${employeeTable[i].last}</td> <td>${employeeTable[i].id}</td>`;
        html+= `<td>${employeeTable[i].title}</td> <td>$${annualSalaryDollared}</td>`;
        html+=  `<td><button class="deleteButtonClass">Delete</button></td> </tr>`;
        $('#tableId').append (html);
    }
    $('#totalMonthlyId').empty()
    $('#totalMonthlyId').append(calculateMonthly())
    flagMonthlyIfHigh (monthlySalaryCap)
    
}

function calculateMonthly () {

    let totalAnnual = 0;
    for (let i = 0; i < employeeTable.length; i += 1 ) {
        totalAnnual += employeeTable[i].annualSalary
    }
    // math exersize is to round at the 100th place (cents).
    totalMonthly = (Math.round((totalAnnual / 12) * 100)) / 100
    totalMonthly = totalMonthly.toFixed(2);
    return  convertNumToMoneyString(totalMonthly);
}

function flagMonthlyIfHigh(flagPoint) {
    if ( totalMonthly > flagPoint ) {
        $('#totalMonthlyId').css ('backgroundColor', 'red')
    } else {$('#totalMonthlyId').css ('backgroundColor', '')}
}

function convertNumToMoneyString (number) {
    // convert to money format
    let charNumberNew = '';
    let charNumberOld = '';
    let cents= null;
    charNumberOld = number.toString();
    if ( charNumberOld.indexOf('.') > 0 ) {
        cents = charNumberOld.slice(charNumberOld.indexOf('.'));
        charNumberOld = charNumberOld.slice( 0, charNumberOld.indexOf('.'));
    }
    // reverses string and adds ',' every third location
    charNumberOld = reverseString(charNumberOld);
    for ( c = 0; c < charNumberOld.length; c += 1 ) {
        if (  (c != 0) && (c % 3) === 0 ) {
        charNumberNew += (',')
        }
        charNumberNew += charNumberOld[c]
    };
    charNumberNew = reverseString(charNumberNew);
    if ( cents === null ) cents = '.00'
    charNumberNew += cents
    return charNumberNew;

    function reverseString(str) {
        return str.split("").reverse().join("");
    }
}

function isValidString(str) {  
    if ( typeof str != "string" ) return false  
    if ( str.trim().length < 3 ) return false
    return true
};
    
  // check for specific criteria 
  function isValidNumber(str) {
    if (typeof str != "string") return false //Process as string  
    if ( str.length < 3 ) return false
    return !isNaN(str) && !isNaN(parseFloat(str)) 
  };

function submitEntry () {
    const employeeStaging = [];
    let first = $('#firstInputId').val()
    let last = $('#lastInputId').val()
    let id = $('#idInputId').val()
    let title = $('#titleInputId').val()
    let salary = $('#salaryInputId').val()
    let allValid = true

    if ( isValidString(first) ) {
        employeeStaging.first = first;
        $('#firstInputId').css ( 'border' , '' );
    } else {
        $('#firstInputId').css ( 'border' , '2px solid red' );
        allValid = false
    };
    if ( isValidString(last) ) {
        employeeStaging.last = last;
        $('#lastInputId').css ( 'border' , '' );
    } else {
        $('#lastInputId').css ( 'border' , '2px solid red' );
        allValid = false
    };
    if ( isValidString(id) ) {
        employeeStaging.id = id;
        $('#idInputId').css ( 'border' , '' );
    } else {
        $('#idInputId').css ( 'border' , '2px solid red' );
        allValid = false
    };
    if ( isValidString(title) ) {
        employeeStaging.title = title;
        $('#titleInputId').css ( 'border' , '' );
    } else {
        $('#titleInputId').css ( 'border' , '2px solid red' );
        allValid = false
    };
    if ( isValidNumber(salary) ) {
        salary = parseFloat(salary)
        employeeStaging.annualSalary = salary;
        $('#salaryInputId').css ( 'border' , '' );
    } else {
        $('#salaryInputId').css ( 'border' , '2px solid red' );
        allValid = false
    };

    if ( allValid ) {
        //console.log (`stage`, employeeStaging);
        employeeTable.push(employeeStaging);
        clearEntry();
        displayRecords();
    } else {
        alert ('Please correct Entries');
    }
    return;
} // end of submitEntry fn

function deleteRecord() {
    let indexOfRecord = $(this).index()
    console.log (`index of record`, indexOfRecord);

} // end of deleteRecord fn

function clearEntry () {
    $('#firstInputId').val('');
    $('#lastInputId').val('');
    $('#idInputId').val('');
    $('#titleInputId').val('');
    $('#salaryInputId').val('');
    $('#firstInputId').css ( 'border' , '' );
    $('#lastInputId').css ( 'border' , '' );
    $('#idInputId').css ( 'border' , '' );
    $('#titleInputId').css ( 'border' , '' );
    $('#salaryInputId').css ( 'border' , '' );
    
}
