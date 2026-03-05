const itemHolder = document.getElementById('gallery');
let itemType = "all";
let allItemTypes = ['artifacts', 'books', 'potions', 'spells'];
let items;

const defaultButton = document.getElementById("productSelectedDefaultButton");

window.addEventListener("load", (event) => {
    if(localStorage.getItem("itemType")){
        itemType = localStorage.getItem("itemType");
    }
    if(localStorage.getItem("searchResult")){
        itemHolder.innerHTML = localStorage.getItem("searchResult");
    }
    else{
        updateDefaultButton();
        updateActiveButton();
        fetchItems();
    }
});

async function fetchItems(){
    const res = await fetch('/js/items.json');
    const data = await res.json();
    // if(res.ok && itemType == 'all'){
    //     updateAllItems(data);
    // }else if(res.ok){
    //     updateItems(data);
    // }
    if(res.ok) items = data;
    if(itemType == 'all'){
        updateAllItems();
    }else{
        updateItems();
    }
}
function updateItems(){
    localStorage.removeItem("searchResult");
    data = items;
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
function updateAllItems(){
    localStorage.removeItem("searchResult");
    data = items;
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

const searchBar = document.getElementById("search");

// function filterItems(arr, query) {
//   return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
// }

searchBar.addEventListener('submit', (event)=>{
    event.preventDefault();
    searchItems();
})
function searchItems(){
    let search = searchBar.value;
    // let dataFiltered = filterItems(data, search);
    // console.log(dataFiltered);
    // let dataFiltered = filterItems(items, search);
    let dataFiltered = [];
    let galleryHTML = [];

    allItemTypes.forEach(itemType=>{
        if (items[itemType]){
            dataFiltered.push(items[itemType].find(({title})=> title.toLowerCase() === search.toLowerCase()));
        };
    });
    // let testArray = ['hey', 'hi', 'wat'];
    // let testSearch = 'hi';
    // console.log(filterItems(testArray, testSearch));
    // console.log(items);
    // console.log("Search " + search);
    // console.log(dataFiltered);

    dataFiltered.forEach(item => {
        if (item) galleryHTML.push(`<div class="gallery-item"><img src="${item.src}"><p class="img-label">${item.title}</p><p class="price">$${item.price}</p><a href="#" class="button">Add to Cart</a><a href="#" class="button inverted hidden hover-show">Details</a></div>`);
    });
    if (galleryHTML.length > 0){
        itemHolder.innerHTML = galleryHTML.join("");
        localStorage.setItem('searchResult',galleryHTML);
    }
}