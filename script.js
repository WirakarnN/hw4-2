let products = JSON.parse(localStorage.getItem('products')) || [];

function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function addProduct() {
    const name = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const inStock = parseInt(document.getElementById("productStock").value);
    const minStock = parseInt(document.getElementById("productMinStock").value);
    const category = document.getElementById("productCategory").value;

    if (!name || isNaN(price) || isNaN(inStock) || isNaN(minStock)) return;
    
    const product = {
        id: Date.now().toString(),
        name,
        price,
        inStock,
        minStock,
        category,
        totalSales: 0
    };
    products.push(product);
    saveToLocalStorage();
    renderProducts();
}

function renderProducts() {
    const productList = document.getElementById("productList");
    const filterCategory = document.getElementById("filterCategory").value;
    productList.innerHTML = "";
    
    products.filter(product => filterCategory === "all" || product.category === filterCategory)
        .forEach(product => {
            const li = document.createElement("li");
            li.classList.add("flex", "justify-between", "items-center", "mb-2");
            li.innerHTML = `<span>${product.name} - ราคา: ${product.price} บาท - คงเหลือ: ${product.inStock} ชิ้น</span>
                <div>
                    <button onclick="updateProduct('${product.id}')" class="bg-yellow-500 text-black px-3 py-1 rounded mr-2 hover:bg-yellow-700">อัปเดต</button> 
                    <button onclick="deleteProduct('${product.id}')" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">ลบ</button>
                </div>`;
            productList.appendChild(li);
        });
    renderBestSellingProducts();
}

function renderBestSellingProducts() {
    const bestSellingList = document.getElementById("bestSellingProducts");
    bestSellingList.innerHTML = "";
    let sortedProducts = [...products].sort((a, b) => b.totalSales - a.totalSales);
    sortedProducts.slice(0, 5).forEach(product => {
        const li = document.createElement("li");
        li.textContent = `${product.name} - ขายได้: ${product.totalSales} ชิ้น`;
        bestSellingList.appendChild(li);
    });
}

function updateProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const newStock = prompt("อัปเดตจำนวนสินค้า", product.inStock);
        if (newStock !== null && !isNaN(newStock)) {
            product.inStock = parseInt(newStock);
            saveToLocalStorage();
            renderProducts();
        }
    }
}

function deleteProduct(productId) {
    products = products.filter(p => p.id !== productId);
    saveToLocalStorage();
    renderProducts();
}

renderProducts();