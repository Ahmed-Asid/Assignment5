const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => displayIssues(json.data))
}

const displayIssues = (issues) => {
    const issuesContainer = document.getElementById("cards-container");
    issuesContainer.innerHTML = "";

    for (let issue of issues){
        const card = document.createElement("div")
        
        document.getElementById("openTab").addEventListener("click", function(){
            if (issue.status === "open"){
            card.innerHTML = `
            <div class="p-3 flex flex-col gap-3 justify-center rounded-lg border-t-4 border-[#00A96E] w-full h-full bg-white shadow-md">
            <div class="flex justify-between items-center">
              <img src="./assets/Open-Status.png" alt="">
              <div class="priority uppercase btn btn-soft">${issue.priority}</div>
            </div>
            <p class="text-sm font-semibold">${issue.title}</p>
            <p class="text-xs text-[#64748B]">${issue.description}</p>
            <div>
              <div class="btn btn-soft btn-error"><i class="fa-solid fa-bug"></i> BUG</div>
              <div class="btn btn-soft btn-warning"><i class="fa-solid fa-handshake-angle"></i> HELP WANTED</div>
            </div>
            <div class="p-4 text-gray-500 text-xs border-t border-gray-300 space-y-2">
              <p>#${issue.id} ${issue.author}</p>
              <p>${issue.createdAt}</p>
            </div>
            </div>
            `
             issuesContainer.appendChild(card)
            }
        })
        
        document.getElementById("closeTab").addEventListener("click", function(){
            if (issue.status === "closed"){
            card.innerHTML = `
            <div class="p-3 flex flex-col gap-3 justify-center rounded-lg border-t-4 border-[#A855F7] w-full h-full bg-white shadow-md">
            <div class="flex justify-between items-center">
              <img src="./assets/Open-Status.png" alt="">
              <div class="priority uppercase btn btn-soft">${issue.priority}</div>
            </div>
            <p class="text-sm font-semibold">${issue.title}</p>
            <p class="text-xs text-[#64748B]">${issue.description}</p>
            <div>
              <div class="btn btn-soft btn-error"><i class="fa-solid fa-bug"></i> BUG</div>
              <div class="btn btn-soft btn-warning"><i class="fa-solid fa-handshake-angle"></i> HELP WANTED</div>
            </div>
            <div class="p-4 text-gray-500 text-xs border-t border-gray-300 space-y-2">
              <p>#${issue.id} ${issue.author}</p>
              <p>${issue.createdAt}</p>
            </div>
          </div>
            `
            issuesContainer.appendChild(card)
            }     
        })
            

        document.getElementById("allTab").addEventListener("click", function(){
                issuesContainer.appendChild(card)
        })
    }
}

loadIssues()