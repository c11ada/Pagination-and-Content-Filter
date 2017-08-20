const studentItems = $('.student-item');
const names = $('h3');
let maxPerPage = 10;

const showPage = (pageNumber, studentList) => {
    // hide all students

    $('.student-item').css('display','none');

    let numberOfStudent = studentList.length;
    let min = pageNumber * maxPerPage - maxPerPage;
    console.log(min);
    let max  = pageNumber * maxPerPage - 1;

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

const appendPageLinks = (studentList) => {
    let numberOfStudents = studentList.length;
    // calculate the number of pages needed
    let numberOfPages = Math.ceil(numberOfStudents / maxPerPage);

    if($('.pagination')) {
        $('.pagination').remove();
    }

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

        paginationAnchorItem.on('click', function(){
            // alert($(this).text());
            showPage($(this).text(),studentList);
            $('.pagination a').removeClass('active');
            $(this).toggleClass('active');
        });

        if(index == 1)
        {
            paginationAnchorItem.toggleClass('active');
        }
    }   
};

const searchBox = () => {
    const searchDiv = $('<div class="student-search">' +
                        '<input placeholder="Search for students...">' +
                        '<button>Search</button>' +
                        '</div>');
    $('.page-header').append(searchDiv);

    $('.student-search button').on('click', function(){
        searchList($('.student-search input').val());
    });
}

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