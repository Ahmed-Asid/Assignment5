const loadIssues = () => {
  manageSpinner(true);
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => displayIssues(json.data))
}
loadIssues();

let currentTab = "allTab";
active(currentTab);
const issuesContainer = document.getElementById("cards-container");

function manageSpinner (status) {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("cards-container").classList.add("hidden")
  }
  else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("cards-container").classList.remove("hidden")
  }
}

const statusDesign = (obj) => {
  let statusHtml = "";
  let statusClass = "";
  if (obj.status === "open") {
    statusString = "Opened";
    statusClass = "bg-[#00A96E]";
  }
  else if (obj.status === "closed") {
    statusString = "closed";
    statusClass = "bg-[#A855F7]"
  }
  statusHtml = `<div class="btn text-white rounded-full ${statusClass}">${statusString}</div>`;
  return statusHtml;
}

const labelDesign = (obj) => {
  let labelHtml = "";
  let labelClass = "";
        obj.labels.forEach(label => {
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

          labelHtml = labelHtml + `<div class="btn btn-soft text-xs uppercase rounded-full ${labelClass}">${label}</div>`
        })
        return labelHtml;
}

const priorityDesign = (obj) => {
    let priorityHtml = "";
    let priorityClass ="";
  if (obj.priority === "high"){
          priorityClass = "btn-error"
        }
  else if (obj.priority === "medium"){
          priorityClass = "btn-warning"
        }
  else if (obj.priority === "low"){
          priorityClass = "btn-accent"
        }
      priorityHtml = `<div class="priority uppercase btn btn-soft rounded-full ${priorityClass}">${obj.priority}</div>`;
      return priorityHtml;
}

function displayIssues (issues) {
    issuesContainer.innerHTML = "";
    
    for (let issue of issues){
        const card = document.createElement("div");
        card.classList.add("card")

        const labelHtml = labelDesign(issue);

        const priorityHtml = priorityDesign(issue); 

        const borderColor = issue.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]";

            if (issue.status === "open"){
              card.classList.add("open");
            }
        
            else if (issue.status === "closed"){
              card.classList.add("closed")
            }

            card.innerHTML = `
            <div onclick="loadDetails(${issue.id})" class="p-3 rounded-lg border-t-4 ${borderColor} w-full h-full bg-white shadow-md">
            <div class="h-57 flex flex-col gap-3 justify-start">
              <div class="flex justify-between items-center">
              <img src="./assets/Open-Status.png" alt="">
              ${priorityHtml}
              </div>
              <p class="text-sm font-semibold">${issue.title}</p>
              <p class="text-xs text-[#64748B] truncate">${issue.description}</p>
              <div class="flex gap-2 flex-wrap">
              ${labelHtml}
              </div>
            </div>
            <div class="p-4 text-gray-500 text-xs border-t border-gray-300 space-y-2">
              <p>#${issue.id} ${issue.author}</p>
              <p>${issue.createdAt}</p>
            </div>
            </div>
            `

            issuesContainer.appendChild(card);
            manageSpinner(false);
    }
}

const loadDetails = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  const res = await fetch(url);
  const details = await res.json();
  displayDetails(details.data);
}

const displayDetails = (card) => {
  console.log(card);
    const modal = document.getElementById("details-container");
    const labelHtml = labelDesign(card);
    const priorityHtml = priorityDesign(card);
    const statusHtml = statusDesign(card);

    modal.innerHTML = "";
    modal.innerHTML = `
      <div>
        <p class="font-bold text-2xl">${card.title}</p>
        <div class="flex gap-2 items-center">
          ${statusHtml}
          <div class="w-1 h-1 bg-slate-400 rounded-full"></div>
          <p class="text-xs text-gray-400">${card.assignee ? card.assignee : "Not assigned yet"}</p>
          <div class="w-1 h-1 bg-slate-400 rounded-full"></div>
          <p class="text-xs text-gray-400">${card.updatedAt}</p>
        </div>
      </div>
      ${labelHtml}
      <p class="text-[#64748B]">${card.description}</p>
      <div class="bg-[#F8FAFC] p-4 flex gap-2.5">
        <div class="w-[50%] space-y-1">
          <p class="text-gray-400">Assignee:</p>
          <p class="font-semibold">${card.assignee ? card.assignee : "Not assigned yet"}</p>
        </div>
        <div class="w-[50%] space-y-1">
          <p class="text-gray-400">Priority:</p>
          ${priorityHtml}
        </div>
      </div>
    `;
    document.getElementById("issue_modal").showModal();
  }


function active(tab) {
    manageSpinner(true);
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
  