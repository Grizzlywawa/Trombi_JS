
const api_students = [];
const students = ["bell4my",
    "seynipeyre",
    "Gstarmix",
    "grizzlywawa",
    "josic490",
    "errudo",
    "anthony35540",
    "sumnifer",
    "Davyde35",
    "cattchoo",
    "faaay80",
    "jdasou",
    "Maelissb",
    "lukasatan",
    "KantaMizonu"];

async function find_students() {
    students.sort(() => Math.random() - 0.2);
    const env = await fetch("../.env")
        .then(res => res.text())
    const split = env.split('=');
    const slice = split.slice(1)
    const api_key = slice.toString()
    const options = {
        headers: {
            'Authorization': 'Bearer ' + api_key
        }
    }


    for (student of students) {
        const api_stud = await fetch("https://api.github.com/users/" + student, options)
        .then(res => res.json())
        .catch(function error(){
            const newSpan = document.createElement('span');
            newSpan.classList.add('error');
            newSpan.innerText = "La requête fetch n'a pas pu se faire !"
            document.querySelector('#loading').appendChild(newSpan)
            const img = document.createElement('img');
            img.setAttribute('src', 'asset/gif/Godno.gif');
            document.querySelector('#loading').appendChild(img);
        });

        api_students.push(api_stud);
        const newDiv = document.createElement('div');
        newDiv.classList.add('student');
        newDiv.setAttribute('data-student', student.toLowerCase());
        newDiv.setAttribute('data-aos', 'fade-up');
        document.querySelector('#grid').appendChild(newDiv);
        const img = document.createElement('img');
        newDiv.appendChild(img);
        img.src = api_stud.avatar_url;
        img.classList = "avatar";
        const pseudo = document.createElement('h2');
        newDiv.appendChild(pseudo);
        pseudo.innerText = api_stud.login.toUpperCase();
        pseudo.classList = "pseudo";
        const email = document.createElement('p');
        newDiv.appendChild(email);
        email.innerText = "Mail : " + api_stud.email;
        email.classList = "email";
        if (api_stud.email == null) {
            email.classList.add("none");
        }
        const bio = document.createElement('p');
        newDiv.appendChild(bio);
        bio.innerText = "Bio : " + api_stud.bio;
        bio.classList = "bio";
        if (api_stud.bio == null) {
            bio.classList.add("none");
        }
        const location = document.createElement('p');
        newDiv.appendChild(location);
        location.innerText = "Location : " + api_stud.location;
        location.classList = "bio";
        if (api_stud.location == null) {
            location.classList.add("none");
        }
        const repository = document.createElement('p');
        newDiv.appendChild(repository);
        repository.innerText = "Nombre de répertoires : " + api_stud.public_repos;
        repository.classList = "repository";
        const followers = document.createElement('p');
        newDiv.appendChild(followers);
        followers.innerText = "Nombre de followers : " + api_stud.followers;
        followers.classList = "followers";
        const button = document.createElement('a');
        newDiv.appendChild(button);
        button.setAttribute("target", "blank")
        button.innerText = "En savoir plus";
        button.href = api_stud.html_url;
        button.classList = "button";

    }

    document.querySelector("#grid").style.display="grid"
    document.querySelector("#loading").style.display="none"
    document.querySelector(".title").style.display="inline"


}


// "which php" dans le terminal pour trouver d'où viennent les instructions php
find_students()

const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let current = 0;
const audio = document.querySelector("#konami_sound");

const keyHandler = function(event){
    // si la touche n'est pas dans le pattern ou ce n'est pas dans le bon ordre, reset
    if(pattern.indexOf(event.key)<0 || event.key!==pattern[current]){
        current = 0;
        return;
    }
    //avance dans le pattern
    current++;

    if(pattern.length===current && audio.paused){
        current = 0;
        audio.loop=true;
        audio.play();
    }else if(pattern.length ===current && audio.played){
        current = 0;
        audio.pause();
    }
}
document.addEventListener('keydown', keyHandler, false);

AOS.init();




