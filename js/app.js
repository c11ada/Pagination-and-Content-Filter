// query selectors
const studentItems = document.querySelectorAll('.student-item');
const pageElement = document.querySelector('.page');
const names = document.querySelectorAll('h3');

// variable to store max number of students per page
const maxPerPage = 10;
// debug mode to check number of results on page
const debugMode = 0;
// array to store results found 
let searchResult = [];


if(debugMode){
    for (let index = 0; index < names.length; index++) {
        let element = names[index];
        let listNumber = index + 1;
        element.textContent = listNumber + "-" + element.textContent;
    }
}

// 
// Displays a list of students on the page
// uses array index to remove then add students to the page 
// @param {number} pageNumber
// @param {array} studentList
// 
const showPage = (pageNumber, studentList) => {
    // calculate the number of students
    let numberOfStudents = studentList.length;
    // query selectors
    let displayedResults = document.querySelectorAll('.student-item');
    let ulElement = document.querySelector('.page .student-list');
    // calculate the min and max students to show
    let min = pageNumber * maxPerPage - maxPerPage;
    let max  = pageNumber * maxPerPage - 1;

    // if max is more than array max is set to lenght of array 
    if(max > studentList.length) {
        max = studentList.length - 1;
    }
    
    //remove all students on Page
    for (let index = 0; index < displayedResults.length; index++) {
        let element = displayedResults[index];
        element.remove();
    }
    // add student to page 
    for (let index = min; index <= max; index++) {
        let element = studentList[index];
        ulElement.appendChild(element);
    }
};

// 
// appends pagination link at the bottom of page
// @param {array} studentList
// 
const appendPageLinks = (studentList) =>{ 
    let numberOfStudents = studentList.length;
    // calculate the number of pages needed
    let numberOfPages = Math.ceil(numberOfStudents / maxPerPage);

    // if pagination already exist remove it
    if(pageElement.querySelector('.pagination'))
    {
        pageElement.querySelector('.pagination').remove();
    }

    // create new pagination
    let paginationDiv = document.createElement('div');
    let ulElement = document.createElement('ul');

    paginationDiv.className = 'pagination';
    pageElement.appendChild(paginationDiv);
    paginationDiv.appendChild(ulElement);

    // create links on pagination
    for (let index = 1; index <= numberOfPages; index++) {
        let liElement = document.createElement('li');
        let aElement = document.createElement('a');
        aElement.textContent = index;
        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);

        // add event listner to a element 
        aElement.addEventListener('click', (event) => {
            // call showpage function passing number pressed 
            showPage(event.target.textContent,studentList);
            // loop through each link in pagination and remove active class
            for (let index = 0; index < ulElement.querySelectorAll('a').length; index++) {
                let element = ulElement.querySelectorAll('a')[index];
                element.className = "";
            }
            // set current page as active
            event.target.className = "active";
        });

        if(index == 1)
        {
            aElement.className = "active"; 
        }
    }
};

//
// Create search box at the top of the page
//
const searchBox = () => {
    let searchDiv = '<h2>Students</h2>' +
                    '<div class="student-search">' +
                        '<input placeholder="Search for students...">' +
                        '<button>Search</button>' +
                    '</div>';
    document.querySelector('.page-header').innerHTML = searchDiv;

    let searchButton = document.querySelector('.student-search button');
    let searchInput = document.querySelector('.student-search input');

    // add event listner to searh button
    searchButton.addEventListener('click', (event) => {
       searchList(searchInput.value);
    });

}

//
// searches studnet list in email and name given a search term
// @param {string} value
//
const searchList = (value) => {
    // clear results array
    searchResult = [];

    // loop thorugh each student
    for (let index = 0; index < studentItems.length; index++) {
        let element = studentItems[index];
        // get name and email
        let name = element.querySelector('h3').textContent;
        let email = element.querySelector('.email').textContent;

        // check to see if name or email include search term
        if(name.includes(value) || email.includes(value))
        {
            // push matching in array
            searchResult.push(element);
        }
    }
    // create pagination for results
    appendPageLinks(searchResult);
    // show results
    showPage(1,searchResult);

    // if no reuslts found display error with optipn to show all studnets again
    if(searchResult.length <= 0) {    
        let errorH3 = document.createElement('H3');
        errorH3.textContent = "NO RESULTS FOUND";
        pageElement.appendChild(errorH3);

        let button = document.createElement('button');
        button.textContent = "Show All";
        pageElement.appendChild(button);
        
        button.addEventListener('click', (event) => {
            errorH3.remove();
            button.remove();
            appendPageLinks(studentItems);
            showPage(1,studentItems);
        });
    }

}

searchBox();
appendPageLinks(studentItems);
showPage(1,studentItems);

