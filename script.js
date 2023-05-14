

async function getData(show) {
    var url = `https://api.tvmaze.com/search/shows?q=${show}`;
    try {
        var request = await fetch(url);
        var text = await request.json();
        
        let length = text.length
        if(length>0){
            console.log(text)
        
            var container = document.createElement("div");
            container.className = "container"
            container.style.marginTop ="20px"

            var row = document.createElement("div")
            row.className = "row";
            container.append(row)
            text.forEach((data)=>{
                var rating = data['show']['rating']['average'];
                if(rating==null){
                    rating = "Not Available";
                }
                var endDt = data['show']['ended'];
                if(endDt==null){
                    endDt = "Still running"
                }
             
                row.innerHTML += ` <div class="col-md-4">
                <div class="card border-primary mb-3" style="max-width: 20rem;background-color:blue">
                <img src="${data['show']['image']['medium']}" class="card-img-top" alt="..." style="text-align:center;max-width:20rem;height:12rem">
                <div class="card-header">${data['show']['name']}</div>
                <div class="card-body">
                    <p class="card-text"><b>Language :</b>${data['show']['language']}</p>
                    <p class="card-text"><b>Status :</b>${data['show']['status']}</p>
                    <p class="card-text"><b>Start Date :</b>${data['show']['premiered']}</p>
                    <p class="card-text"><b>End Date :</b>${endDt}</p>
                    <p class="card-text"><b>Rating :</b>${rating}</p>
                   
                </div>
                </div>
                </div>`
                document.getElementById("showapi").append(container)
            })

            

        }

        else {
            console.log("not found")
            var p = document.createElement("p");
            p.textContent = "No show found";
            p.className ="data"
            document.getElementById("showapi").append(p)
        }

    }
    catch(error){
        console.log(error)
    }

}

function tvshow() {
    var div = document.createElement("div");
    div.id = "showapi"
    div.style = `width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;`;
    var h1 = document.createElement("h1");
    h1.textContent = "TV show Data";

    var input = document.createElement("input");

    input.placeholder = "Enter name of tv Show"

    input.type = "text";
    input.id = "tvshow"

    var button = document.createElement("button");
    button.className = "btn btn-primary"
    button.textContent = "Search";


    button.addEventListener("click", () => {
        let table = document.querySelectorAll("table,p,.container");
        if(table.length>0){
            table.forEach((element)=>{
                element.remove()
            })
        }
        // let p = document.querySelector(p)

        let show = document.getElementById("tvshow").value;
        // console.log(no.length)
        // console.log(typeof no.slice(0,2))
        // console.log(typeof no)
        if (show.length ==0) {
            alert("please enter show name")
        }

        else {
            getData(show);
        }

    })

    div.append(h1, input, button);
    document.body.append(div)
}

tvshow()