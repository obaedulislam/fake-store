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
        console.log(array);
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
setAllCategories();
