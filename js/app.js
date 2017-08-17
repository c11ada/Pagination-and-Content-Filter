const studentItems = document.querySelectorAll('.student-item');
const names = document.querySelectorAll('h3');
const maxPerPage = 10;
const debugMode = 1;

if(debugMode){
    for (var index = 0; index < names.length; index++) {
        var element = names[index];
        let listNumber = index + 1;
        element.textContent = listNumber + "-" + element.textContent;
    }
}

const showPage = (pageNumber, studentList) => {
    let numberOfStudents = studentList.length;
    let min = pageNumber * maxPerPage - maxPerPage;
    console.log(min);
    let max  = pageNumber * maxPerPage - 1;

    if(max > studentList.length) {
        max = studentList.length - 1;
    }
    
    console.log("min is " + min + " max is " + max );
    //hide all students on Page
    for (var index = 0; index < studentList.length; index++) {
        var element = studentList[index];
        element.style.display = 'none';
    }

    for (var index = min; index <= max; index++) {
        var element = studentList[index];
        element.style.display = 'block';
    }

};

const appendPageLinks = (studentList) =>{ 
    let numberOfStudents = studentList.length;
    let numberOfPages = Math.ceil(numberOfStudents / 10);

    let pageDiv = document.querySelector('.page');
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
        });
    }
};

appendPageLinks(studentItems);
showPage(1,studentItems);

