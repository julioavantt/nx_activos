const main = document.querySelector("main");

const action = () =>
 fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
   let dataFiltered;

   if (!localStorage.type || localStorage.type === "one")
    dataFiltered = data.filter((d) => d.status === "one");
   else if (localStorage.type === "all") dataFiltered = data;

   let sectors = [...new Set(dataFiltered.map((act) => act.sector))].sort();

   main.innerHTML = "";

   sectors.forEach((s) => {
    let div = document.createElement("div");
    div.classList.add("hero");
    let h2 = document.createElement("h2");
    h2.textContent = s;
    div.appendChild(h2);
    main.appendChild(div);

    let ul = document.createElement("ul");

    const limit = 33;

    ul.innerHTML = dataFiltered
     .filter((d) => d.sector === s)
     .map(
      (d) => `
         <a target="_blank" href="stock.html"><!--a target="_blank" href="//${d.website}"--><li class="${d.status}">
           <h3>${d.display_full_name.length <= limit ? d.display_full_name : d.display_full_name.slice(0, limit - 3).trim() + "…"}</h3>
           <h4>${d.display_name}</h4>
         </li></a>
       `,
     )
     .join("");
    main.appendChild(ul);
   });
  });

action();

document.querySelector("#one").onclick = () => {
 localStorage.setItem("type", "one");
 action();
};

document.querySelector("#all").onclick = () => {
 localStorage.setItem("type", "all");
 action();
};
