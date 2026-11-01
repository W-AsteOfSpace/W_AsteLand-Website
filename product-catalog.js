const categoryFilter = document.getElementById("categoryFilter");
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortPrice = document.getElementById("sortPrice");

/*Categories*/
const categories = [...new Set(products.map(p => p.category))];
categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
});

/*Tags*/
const tags = [...new Set(products.flatMap(p => p.tags))];
const tagList = document.getElementById("tag-list");
tags.forEach(tag => {
  const button = document.createElement("button");
  button.textContent = tag;
  button.className = "tag-btn";
  button.addEventListener("click", () => {
      searchInput.value = tag;
      renderProducts();
  });
  tagList.appendChild(button);
});

/*Show products*/
function renderProducts() {
  /*Check searches*/
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedSort = sortPrice.value;
  let filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm) 
      || product.category.toLowerCase().includes(searchTerm) 
      || product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      || product.description.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  filteredProducts.sort((a, b) => {
    return selectedSort === "asc"
        ? a.price - b.price
        : b.price - a.price;
  });

  /*Clear*/
  productGrid.innerHTML = "";
  if (filteredProducts.length === 0) {
      productGrid.innerHTML = `
          <div class="custom-card">
              <div class="custom-card-body">
                  No products found!
              </div>
          </div>
      `;
      return;
  }

  /*Show product*/
  filteredProducts.forEach(product => {
    let tagsHtml = product.tags.map(tag => `<span class="tag-btn">${tag}</span>`).join(" ");
    productGrid.innerHTML += `                    
      <div class="custom-card">
        <div class="custom-card-body">
          <img src="${product.image}" class="custom-card-img" alt="${product.name}">
          <h4>${product.name}</h4>
          <p class="category-style"> ${product.category}</p>
          <div class="price-style">$${product.price}</div>
          <div class="description-style">${product.description}</div>
          <div>Tags: ${tagsHtml}</div>
        </div>
      </div>                    
    `;
  });
}


/*Updates*/
searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
sortPrice.addEventListener("change", renderProducts);
renderProducts();
