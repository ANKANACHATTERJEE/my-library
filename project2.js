let add=document.getElementById('addBook');
let search=document.getElementById('searchText');
showBooks();
add.addEventListener('click',addBook);
class Book{
    constructor(name,author,type){
        this.name=name;
        this.author=author;
        this.type=type;
    }
}
function addBook(){
    console.log('hello');
    let books=localStorage.getItem('books');
    if(books==null){
        books=[];
    }
    else{
        books=JSON.parse(books);
    }
    let naam=document.getElementById('naam');
    let author=document.getElementById('author');
    let type=document.querySelector('input[type=radio][name=type]:checked');
    //let message=document.getElementById('message');
    //let msg=localStorage.getItem('msg');
    let msg=``;
    if(naam.value.length<2||author.value.length<2||type.value==null){
        msg=`<div class="alert alert-danger" role="alert">
        There was an error in adding your book!
        </div>`;
    }
    else{
        console.log(naam.value,author.value,type.value);
        let anotherBook=new Book(naam.value,author.value,type.value);
        books.push(anotherBook);
        localStorage.setItem('books',JSON.stringify(books));
        msg=`
        <div class="alert alert-success" role="alert">
        Your book has been added successfully!
        </div>
        `;
    }
    localStorage.setItem('msg',msg);
    showBooks();
}

function showBooks(){
    let message=document.getElementById('message');
    let msg=localStorage.getItem('msg');
    if(msg==null){
        msg=``;
        localStorage.setItem('msg',msg);
    }
    message.innerHTML=msg;
    setTimeout(function(){
        message.innerHTML=``;
        msg=``;
        localStorage.setItem('msg',msg);
    },5000);
    let html=`<thead>
      <tr>
        <th scope="col" width="33.33%">Name</th>
        <th scope="col" width="33.33%">Author</th>
        <th scope="col" width="33.33%">Type</th>
      </tr>
    </thead>`;
    let books=localStorage.getItem('books');
    if(books!=null){
        books=JSON.parse(books);
        books.forEach(book => {
            html+=`
            <tbody>
            <tr class="tableElement">
              <td>${book.name}</td>
              <td>${book.author}</td>
              <td>${book.type}</td>
            </tr>
          </tbody>
            `;
        });
        let table=document.getElementById('table');
        table.innerHTML=html;
    }
}
search.addEventListener('input',function(){
    let text=search.value;
    let books=document.getElementsByClassName('tableElement');
    if(text!=''){
    Array.from(books).forEach(function(book){
        let naam=(book.getElementsByTagName('td')[0].innerText);
        let author=book.getElementsByTagName('td')[1].innerText;
        let type=book.getElementsByTagName('td')[2].innerText;
        if(naam.includes(text)||(author).includes(text)||(type).includes(text)){
            console.log('hello');
        }
        else{
            console.log('bye');
            book.style.display="none";
        }
       
    })
    }
})