const loadAllProducts = async() => {
    const url = `https://fakestoreapi.com/products`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
const setAllProductCategories = async() => {
    const data = await loadAllProducts();
    const categoryItem = document.getElementById('category-item');
    const uniqueCategory = [];
    for(let product of data){
        const array = uniqueCategory.indexOf(product.category);
        if(uniqueCategory.indexOf(product.category) === -1){
            uniqueCategory.push(product.category)
            const listItem = document.createElement('li');
            listItem.innerHTML =`
                <a>${product.category}</a>
            `;
            categoryItem.appendChild(listItem);
        }
    }
}
setAllProductCategories();

//Search Product
const searchProduct = document.getElementById('search-field');
searchProduct.addEventListener("keypress", async(event) => {
    if(event.key === "Enter"){
        const searchValue = searchProduct.value;
        searchProduct.value = '';
        const allProducts = await loadAllProducts();
        const foundProducts = allProducts.filter(product => product.category.includes(searchValue));
        if(foundProducts === 0){
            
        }
        const productContainer = document.getElementById('product-container');
        productContainer.textContent = '';
        foundProducts.forEach(product => {

            const{category, title, image, price, description} = product;
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card card-compact w-full bg-base-100 shadow-xl">
                <figure><img class="h-72 w-full" src="${image}" alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 class="card-title">${title.length > 20 ? title.slice(0, 20)+'...' : title}</h2>
                    <p>${description.slice(0, 100)}</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Show Details</button>
                    </div>
                </div>
            </div>
            `;
            productContainer.appendChild(div);
        })
    }
})