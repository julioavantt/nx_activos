const main = document.querySelector("main");

fetch("./data.json")
 .then((response) => response.json())
 .then((data) => {
  const sectors = [...new Set(data.map((act) => act.sector))].sort();

  sectors.forEach((s) => {
   let div = document.createElement("div");
   div.classList.add("hero");
   let h2 = document.createElement("h2");
   h2.textContent = s;
   div.appendChild(h2);
   main.appendChild(div);

   let ul = document.createElement("ul");

   const limit = 33;

   ul.innerHTML = data
    .filter((d) => d.sector === s)
    .map(
     (d) => `
         <a target="_blank" href="//${d.website}"><li>
           <h3>${d.display_full_name.length <= limit ? d.display_full_name : d.display_full_name.slice(0, limit - 3).trim() + "…"}</h3>
           <h4>${d.display_name}</h4>
         </li></a>
       `,
    )
    .join("");
   main.appendChild(ul);
  });
 });
