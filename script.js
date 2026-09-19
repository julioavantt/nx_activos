const list = document.getElementById("hardware-grid");

fetch("./data.json")
 .then((response) => response.json())
 .then((data) => {
  list.innerHTML = data
   ?.map(
    (d) => `
         <a target="_blank" href="//${d.website}"><li>
           <h3>${d.display_full_name}</h3>
           <h4>${d.display_name}</h4>
         </li></a>
       `,
   )
   .join("");
 })
 .catch((err) => console.error("Error cargando los componentes:", err));
