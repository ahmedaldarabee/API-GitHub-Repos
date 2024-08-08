// collection data step !

// the input
let input    = document.querySelector(".get-repos input");

// getButton
let getRepo  = document.querySelector(".get-button");

// repos data
let showData = document.querySelector(".show-data");

getRepo.onclick = fetchRepos;

input.onkeyup = function(Event){
    if(Event.key == 'Enter' || Event.keyCode == 13){
        fetchRepos();
    }
}

// get repo function
function fetchRepos(){
    if(input.value == ''){
        Swal.fire({
            title: "Text Empty",
            text: "Please added github username!",
            icon: "warning",
            customClass: {
                // popup refer to the text content where icon refer the shape like ! that show in the screen
                popup: 'text-content',
                icon: 'icon-modify'
            }
          });
    }else{
        // fetch be as request
        fetch(`https://api.github.com/users/${input.value}/repos`)
        .then((Response) => {
           return Response.json();
        }).then((data) => {
            resetDataShow();
            data.forEach(repo => {
                            
                // parent div
                let mainDiv = document.createElement('div');
                let divContent = document.createTextNode(repo.name);
                mainDiv.appendChild(divContent);


                // visit link
                let anchorElement = document.createElement('a');
                let anchorData = document.createTextNode('visit');
                anchorElement.appendChild(anchorData);

                anchorElement.href=`https://api.github.com/${input.value}/${repo.name}`;
                anchorElement.setAttribute('target','_blank');


                // stars number
                let starsElement = document.createElement('span');
                let starsContent = document.createTextNode('stars ' + (repo.stargazers_count));
                starsElement.appendChild(starsContent);
                
                let parent = document.createElement('div');
                parent.appendChild(anchorElement);
                parent.appendChild(starsElement);
                
                mainDiv.appendChild(parent);

                mainDiv.classList.add('parent-data');
                showData.appendChild(mainDiv);

            });
        }).catch((error) => {
            console.log("you have an error: " , (error))
        })
    }
}

function resetDataShow(){
    showData.innerHTML = '';
}