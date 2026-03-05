const itemHolder = document.getElementById('gallery');
let itemType = "all";
let allItemTypes = ['artifacts', 'books', 'potions', 'spells'];

const defaultButton = document.getElementById("productSelectedDefaultButton");

window.addEventListener("load", (event) => {
    if(localStorage.getItem("itemType")){
        itemType = localStorage.getItem("itemType");
    }
    updateDefaultButton();
    updateActiveButton();
    fetchItems();
});
async function fetchItems(){
    const res = await fetch('/js/items.json');
    const data = await res.json();
    if(res.ok && itemType == 'all'){
        updateAllItems(data);
    }else if(res.ok){
        updateItems(data);
    }
}
function updateItems(data){
    let galleryHTML = [];
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
        galleryHTML.push(`<div class="gallery-item"><img src="${item.src}"><p class="img-label">${item.title}</p><p class="price">$${item.price}</p><a href="#" class="button">Add to Cart</a><a href="#" class="button inverted hidden hover-show">Details</a></div>`);
    });
    itemHolder.innerHTML = galleryHTML.join("");
}
function updateAllItems(data){
    let galleryHTML = [];
    allItemTypes.forEach(category=>{
        data[category].forEach(item=>{
            galleryHTML.push(`<div class="gallery-item"><img src="${item.src}"><p class="img-label">${item.title}</p><p class="price">$${item.price}</p><a href="#" class="button">Add to Cart</a><a href="#" class="button inverted hidden hover-show">Details</a></div>`);
        });
    });
    itemHolder.innerHTML = galleryHTML.join("");
}
const productSelectionButton = document.querySelectorAll('.productSelectCategory');
function toggleButtons(){
    productSelectionButton.forEach(button=>{
        button.classList.toggle('show');
    })
}
function hideButtons(){
    productSelectionButton.forEach(button=>{
        button.classList.remove('show');
    })
}
function productSelected(category){
    hideButtons();
    itemType = category;
    fetchItems();
    localStorage.setItem("itemType", itemType);
    updateDefaultButton();
    updateActiveButton();
}
function updateDefaultButton(){
    defaultButton.textContent = itemType;
}
function updateActiveButton(){
    productSelectionButton.forEach(button=>{
        if (button.dataset.category == itemType){
            button.classList.add('active');
        }else{
            button.classList.remove('active');
        }
    })
}