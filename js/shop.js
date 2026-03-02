const itemHolder = document.getElementById('gallery');
let itemType = "potions";

window.addEventListener("load", (event) => {
    fetchItems();
    productSelection();
});
async function fetchItems(){
    const res = await fetch('/js/items.json');
    const data = await res.json();
    if(res.ok){
        updateItems(data);
    }
}
function updateItems(data){
    let galleryHTML = []
    // galleryHTML.push(`<div id="productSelection">
    //                         <a href="#" class="active">Potions</a>
    //                         <a href="#">Artifacts</a>
    //                         <a href="#">Books</a>
    //                         <a href="#">Spells</a>
    //                     </div>`);
    // galleryHTML.push(`
    //         <select id="productType">
    //             <option>Potions</option>
    //             <option>Artifacts</option>
    //             <option>Books</option>
    //             <option>Spells</option>
    //         </select>`);
    data[itemType].forEach(item => {
        galleryHTML.push(`<div class="gallery-item"><img src="${item.src}"><p class="img-label">${item.title}</p><p class="price">$${item.price}</p><a href="#" class="button">Add to Cart</a><a href="#" class="button inverted hidden hover-show">Details</a></div>`)
    });
    itemHolder.innerHTML = galleryHTML.join("");
}

function productSelection (){
    const productTypeSelection = document.getElementById('productType');
    productTypeSelection.addEventListener("change", (event) =>{
        itemType = productTypeSelection.value;
        fetchItems();
    });
}