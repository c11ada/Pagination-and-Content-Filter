const studentItems = document.querySelectorAll('.student-item');
const pageElement = document.querySelector('.page');
const names = document.querySelectorAll('h3');
const maxPerPage = 10;
const debugMode = 0;
let searchResult = [];

if(debugMode){
    for (var index = 0; index < names.length; index++) {
        var element = names[index];
        let listNumber = index + 1;
        element.textContent = listNumber + "-" + element.textContent;
    }
}

const showPage = (pageNumber, studentList) => {
    let numberOfStudents = studentList.length;
    let displayedResults = document.querySelectorAll('.student-item');
    let ulElement = document.querySelector('.page .student-list');
    let min = pageNumber * maxPerPage - maxPerPage;
    let max  = pageNumber * maxPerPage - 1;

    if(max > studentList.length) {
        max = studentList.length - 1;
    }
    
    //hide all students on Page
    for (var index = 0; index < displayedResults.length; index++) {
        var element = displayedResults[index];
        element.remove();
    }

    for (var index = min; index <= max; index++) {
        var element = studentList[index];
        ulElement.appendChild(element);
    }
};

const appendPageLinks = (studentList) =>{ 
    let numberOfStudents = studentList.length;
    let numberOfPages = Math.ceil(numberOfStudents / 10);
    let pageDiv = document.querySelector('.page');

    if(pageDiv.querySelector('.pagination'))
    {
        pageDiv.querySelector('.pagination').remove();
    }

    let paginationDiv = document.createElement('div');
    let ulElement = document.createElement('ul');

    paginationDiv.className = 'pagination';
    pageDiv.appendChild(paginationDiv);
    paginationDiv.appendChild(ulElement);

    for (var index = 1; index <= numberOfPages; index++) {
        let liElement = document.createElement('li');
        let aElement = document.createElement('a');
        aElement.textContent = index;
        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);

        aElement.addEventListener('click', (event) => {
            showPage(event.target.textContent,studentList);
            for (var index = 0; index < ulElement.querySelectorAll('a').length; index++) {
                var element = ulElement.querySelectorAll('a')[index];
                element.className = "";
            }
            event.target.className = "active";
        });

        if(index == 1)
        {
            aElement.className = "active"; 
        }
    }
};


const searchBox = () => {
    let searchDiv = '<h2>Students</h2>' +
                    '<div class="student-search">' +
                        '<input placeholder="Search for students...">' +
                        '<button>Search</button>' +
                    '</div>';
    document.querySelector('.page-header').innerHTML = searchDiv;

    let searchButton = document.querySelector('.student-search button');
    let searchInput = document.querySelector('.student-search input');

    searchButton.addEventListener('click', (event) => {
       searchList(searchInput.value);
    });

}

const searchList = (value) => {
    searchResult = [];
    for (var index = 0; index < studentItems.length; index++) {
        var element = studentItems[index];
        let name = element.querySelector('h3').textContent;
        let email = element.querySelector('.email').textContent;

        if(name.includes(value) || email.includes(value))
        {
            searchResult.push(element);
        }
    }
    appendPageLinks(searchResult);
    showPage(1,searchResult);

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

