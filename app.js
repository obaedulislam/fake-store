// fetch product from API 
const loadAllProducts = async() => {
    const url = `https://fakestoreapi.com/products`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

// Show catgories on menu from product
const setAllProductCategories = async() => {
    const data = await loadAllProducts();
    const categoryItem = document.getElementById('category-item');
    const uniqueCategory = [];
    for(let product of data){
        if(uniqueCategory.indexOf(product.category) === -1){
            uniqueCategory.push(product.category)
            const listItem = document.createElement('li');
            listItem.innerHTML =`
                <a onclick = "loadAllProducts(${product.category})">${product.category}</a>
            `;
            categoryItem.appendChild(listItem);
        }
    }
}
setAllProductCategories();

//Search Product by category
const searchProduct = document.getElementById('search-field');
searchProduct.addEventListener("keypress", async(event) => {
    // Add Spiner or progress bar
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');

    if(event.key === "Enter"){
        const searchValue = searchProduct.value;
        searchProduct.value = '';
        const allProducts = await loadAllProducts();
        //Spinner
        spinner.classList.add('hidden');

        const foundProducts = allProducts.filter(product => product.category.includes(searchValue));
        const productContainer = document.getElementById('product-container');
        const notFound = document.getElementById('product-not-found');

        notFound.textContent = '';
        productContainer.textContent = '';
        //No product found message
        if(foundProducts.length === 0){
           notFound.innerHTML = `
                <h2 class= "text-2xl text-orange-600 text-center font-bold">No Data Found</h2>
           `;
           return;
        }
        // Display Product Information
        foundProducts.forEach(product => {
            const{category, title, image, price, description, rating} = product;
            console.log(rating);
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card card-compact w-full bg-base-100 shadow-lg">
                <figure><img class="h-72 w-full" src="${image}" alt="Shoes" /></figure>
                <div class="card-body">
                    <h3 class="card-title font-bold">${title.length > 20 ? title.slice(0, 20)+'...' : title}</h3>
                    <p>${description.slice(0, 100)}</p>

                        <!-- The button to open modal -->
                        <div class="flex flex-row">
                            <div class="basis-1/3">
                                <span class="text-3xl font-bold">${'$'+price}<span>
                            </div>
                            <div class="basis-2/3 text-right mt-2">
                                <label onclick = "showModal('${image}', '${title}', '${description}', '${price}', '${rating.rate}')" for="my-modal-3" class="cursor-pointer bg-blue-700 hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded modal-button">Show Details</label>
                            </div>
                        </div>
                </div>
            </div>
            `;
            productContainer.appendChild(div);
        })
    }
})

// Modal Show for every product
const showModal = (image, title, description, price, rating) => {
    const modalBody = document.getElementById('modal-body');
    modalBody.textContent = '';
    modalBody.innerHTML = `
    <img src= "${image}">
    <h3 class="text-2xl font-semibold">${title}</h3>
    <p class="mt-2.5">${description}</p>
    <div class="flex flex-row">
        <div class="basis-1/2">
            <span class="font-bold text-2xl">Price: ${'$'+price}<span>
        </div>
        <div class="basis-1/2 text-right">
            <span class="font-bold text-2xl"> ${rating}</span>
        </div>
    </div>

    `;
}