const studentItems = $('.student-item');
const names = $('h3');
// variable to store max number of students per page
let maxPerPage = 10;

// 
// Hide or Display list of students
// 
// @param {number} pageNumber
// @param {array} studentList
// 
const showPage = (pageNumber, studentList) => {
    // calculate the number of students
    let numberOfStudent = studentList.length;
    // calculate the min and max students to show
    let min = pageNumber * maxPerPage - maxPerPage;
    let max  = pageNumber * maxPerPage - 1;

    // hide all students
    $('.student-item').css('display','none');

    // if max is more than array max is set to lenght of array 
    if(max > studentList.length) {
        max = studentList.length - 1;
    }

    $(studentList).each(function (index, value){
       if(index >= min && index <= max)
        {
            $(this).css('display','block');
        }
        else{
            $(this).css('display','none');
        }
    });
};

// 
// appends pagination link at the bottom of page
// @param {array} studentList
// 
const appendPageLinks = (studentList) => {
    let numberOfStudents = studentList.length;
    // calculate the number of pages needed
    let numberOfPages = Math.ceil(numberOfStudents / maxPerPage);

    // if pagination already exist remove it
    if($('.pagination')) {
        $('.pagination').remove();
    }

    // create new pagination
    let pagination = $("<div>", {"class":"pagination"});
    let paginationUl = $('<ul>');
    pagination.append(paginationUl);
    $('.page').append(pagination);

    // create links on pagination
    for (let index = 1; index <= numberOfPages; index++) {
        let paginationLiItem = $('<li>');
        let paginationAnchorItem = $('<a>');

        paginationAnchorItem.text(index);
        paginationLiItem.append(paginationAnchorItem);
        paginationUl.append(paginationLiItem);

        // add event listner to a element 
        paginationAnchorItem.on('click', function(){
            // alert($(this).text());
            showPage($(this).text(),studentList);
            // remove all the active classes
            $('.pagination a').removeClass('active');
            // make current link active
            $(this).toggleClass('active');
        });

        if(index == 1)
        {
            paginationAnchorItem.toggleClass('active');
        }
    }   
};

//
// Create search box at the top of the page
//
const searchBox = () => {
    const searchDiv = $('<div class="student-search">' +
                        '<input placeholder="Search for students...">' +
                        '<button>Search</button>' +
                        '</div>');
    $('.page-header').append(searchDiv);

    // add event listner to searh button
    $('.student-search button').on('click', function(){
        searchList($('.student-search input').val());
    });
}

//
// searches studnet list in email and name given a search term
// @param {string} value
//
const searchList = (searchVal) => {
    let searchResult = [];

    $(studentItems).each(function (index, value) {
        let name = $(this).find('h3').text();
        let email = $(this).find('.email').text();

        if(name.includes(searchVal) || email.includes(searchVal)) {
            searchResult.push($(this));
        }
     });

    // create pagination for results
    appendPageLinks(searchResult);
    // show results
    showPage(1,searchResult);

    // if no reuslts found display error with optipn to show all studnets again
    if(searchResult.length <= 0) {    
        let errorH3 = $('<h3>');
        errorH3.text("NO RESULTS FOUND");
        $('.page').append(errorH3);

        let button = $('<button>');
        button.text("Show All");
        $('.page').append(button);
        
        button.on('click', function() {
            errorH3.remove();
            button.remove();
            appendPageLinks(studentItems);
            showPage(1,studentItems);
        });
    }
};


searchBox();
showPage(1,studentItems);
appendPageLinks(studentItems);