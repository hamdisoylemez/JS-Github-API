// Element seçme

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers =document.getElementById("last-users");
const github = new Github();
const ui = new UI();
eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);

}

function getData(e){
        let username = nameInput.value.trim();//Gereksiz Boşluk silme

        if(username=== ""){
            alert("Lütfen Geçerli Bİr Kullanıcı Adı Giriniz !")
        }
        else{


            github.getGithubData(username)
            .then(response => {
                    if(response.user.message === "Not Found"){
                        ui.showError("Kullanıcı Bulunamadı");
                    }
                    else{
                        ui.addSearchedUserToUI(username);
                        Storage.addSearchedUserToStorage(username)
                        ui.showUserInfo(response.user);
                        ui.showRepoInfo(response.repo);
                    }
                })
            .catch(err => ui.showError(err));
        }




    ui.clearInput();
    e.preventDefault();
}





function clearAllSearched(){

    if(confirm("Emin Misiniz ?")){

       Storage.clearAllSerachedUsersFromStorage();
       ui.clearAllSearchedFromUI();
    }

}

function getAllSearched(){
let users = Storage.getSearchedUsersFromStorage();
let result="";
users.forEach(user => {
    //<li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
    result += `<li class="list-group-item">${user}</li>`

});

lastUsers.innerHTML=result;
}