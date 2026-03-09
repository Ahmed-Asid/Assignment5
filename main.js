const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => displayIssues(json.data))
}
loadIssues();

let currentTab = "allTab";
active(currentTab);
const issuesContainer = document.getElementById("cards-container");

function displayIssues (issues) {
    issuesContainer.innerHTML = "";

    for (let issue of issues){
        const card = document.createElement("div");


        let labelHtml = "";

        issue.labels.forEach(label => {
          console.log(label)
          if (label === "bug") {
            labelClass = "btn-error";
          }
          else if (label === "help wanted") {
            labelClass = "btn-warning";
          }
          else if (label === "enhancement") {
            labelClass = "btn-accent"
          }
          else if (label === "documentation") {
            labelClass = "btn-info";
          }
          else if (label === "good first issue") {
            labelClass = "btn-primary";
          }

          labelHtml = labelHtml + `<div class="btn btn-soft uppercase ${labelClass}">${label}</div>`
        })

        
        if (issue.priority === "high"){
          priorityClass = "btn-error"
        }
        else if (issue.priority === "medium"){
          priorityClass = "btn-warning"
        }
        else if (issue.priority === "low"){
          priorityClass = "btn-accent"
        }

            if (issue.status === "open"){
              card.classList.add("open");
            card.innerHTML = `
            <div class="p-3 flex flex-col gap-3 justify-center rounded-lg border-t-4 border-[#00A96E] w-full h-full bg-white shadow-md">
            <div class="flex justify-between items-center">
              <img src="./assets/Open-Status.png" alt="">
              <div class="priority uppercase btn btn-soft ${priorityClass}">${issue.priority}</div>
            </div>
            <p class="text-sm font-semibold">${issue.title}</p>
            <p class="text-xs text-[#64748B]">${issue.description}</p>
            <div class="flex gap-2 flex-wrap">
              ${labelHtml}
            </div>
            <div class="p-4 text-gray-500 text-xs border-t border-gray-300 space-y-2">
              <p>#${issue.id} ${issue.author}</p>
              <p>${issue.createdAt}</p>
            </div>
            </div>
            `
            }
        
            else if (issue.status === "closed"){
              card.classList.add("closed")
            card.innerHTML = `
            <div class="p-3 flex flex-col gap-3 justify-center rounded-lg border-t-4 border-[#A855F7] w-full h-full bg-white shadow-md">
            <div class="flex justify-between items-center">
              <img src="./assets/Open-Status.png" alt="">
              <div class="priority uppercase btn btn-soft ${priorityClass}">${issue.priority}</div>
            </div>
            <p class="text-sm font-semibold">${issue.title}</p>
            <p class="text-xs text-[#64748B]">${issue.description}</p>
            <div class="flex gap-2 flex-wrap">
              ${labelHtml}
            </div>
            <div class="p-4 text-gray-500 text-xs border-t border-gray-300 space-y-2">
              <p>#${issue.id} ${issue.author}</p>
              <p>${issue.createdAt}</p>
            </div>
          </div>
            `
            }
            issuesContainer.appendChild(card);
    }
}

function active(tab) {

    document.getElementById("allTab").classList.remove("btn-primary");
    document.getElementById("openTab").classList.remove("btn-primary");
    document.getElementById("closedTab").classList.remove("btn-primary");

    currentTab = tab;
    document.getElementById(tab).classList.add("btn-primary");

    const cards = document.querySelectorAll("#cards-container > div");

    cards.forEach(card => {

        if (tab === "allTab") {
            card.style.display = "block";
        }

        else if (tab === "openTab") {
            card.style.display = card.classList.contains("open") ? "block" : "none";
        }

        else if (tab === "closedTab") {
            card.style.display = card.classList.contains("closed") ? "block" : "none";
        }

    });
}
  