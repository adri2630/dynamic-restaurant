



function init() {
    fetch("https://kea-alt-del.dk/t5/api/categories").then(r => r.json()).then(
        function (data) {
            categorieReceived(data)
        }
    )
}

init();

function categorieReceived(cats) {

    createNavigation(cats);
    createSections(cats);
    fetchProducts();
}

function createSections(categories) {
    categories.forEach(category => {
        const h1 = document.createElement("h1")
        h1.textContent = category;
        const section = document.createElement("section");
        section.setAttribute("id", category)



// ok

//ok
   //section.appendChild(h1)
        document.querySelector("main").appendChild(h1)

        document.querySelector("main").appendChild(section)


    })
}

function createNavigation(categories) {

    categories.forEach(cat => {
        const a = document.createElement("a")
        a.textContent = cat
        a.setAttribute("href", `#${cat}`)
        document.querySelector("nav").appendChild(a)
    })
}


function fetchProducts() {

    // fetch somw data
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {

            return response.json();
        })
        .then(function (data) {

            iVeGotDataFunction(data);

        })

}

function iVeGotDataFunction(products) {
    //loops through products

    products.forEach(showProducts)
}
//executed once forech products
function showProducts(oneProduct) {
    // ta funkcja robi 5 początkowych stepów


    const templateLol = document.querySelector("#myTemplate").content;
    const copy = templateLol.cloneNode(true)

const img = copy.querySelector(".image_product");
img.setAttribute("src",`https://kea-alt-del.dk/t5/site/imgs/medium/${oneProduct.image}-md.jpg`)



    if (oneProduct.discount) {
console.log("dis")

      copy.querySelector(".discount").textContent  ="Discount price: " +  (oneProduct.price - ( oneProduct.price * oneProduct.discount / 100))  + " dkk"



 copy.querySelector(".discount").classList.remove("visibility")
        copy.querySelector(".price").classList.add("visibility")

    }

    if (oneProduct.vegetarian) {


        copy.querySelector(".vegetarian").classList.remove("hidden")
    }

    if (oneProduct.soldout) {
        const p = document.createElement("p")
        p.textContent = "SOLD OUT"
        p.classList.add("gone")
        copy.querySelector(".one").appendChild(p)
    }
    ///set up clsses for filters
    //1finf the elemnt one .maybe
    const article = copy.querySelector("article")
    //add classes search or vege
    if (oneProduct.vegetarian) {
        article.classList.add("vegetarian")
    }
    //filing in
    copy.querySelector("h2").textContent = oneProduct.name
copy.querySelector("p.price").textContent = oneProduct.price + " dkk"







copy.querySelector(".seedetails").addEventListener("click", () => {


    fetch(`https://kea-alt-del.dk/t5/api/product?id=${oneProduct.id}`)
      .then(res => res.json())
      .then(showDetails);
  });




    //why does the short verson doesnt work?
    if (oneProduct.category == "main") {
        const whoIsYourDaddy = document.querySelector("section#main")
        whoIsYourDaddy.appendChild(copy);
    }
    if (oneProduct.category == "starter") {
        const whoIsYourDaddy = document.querySelector("section#starter")
        whoIsYourDaddy.appendChild(copy);
    }
    if (oneProduct.category == "dessert") {
        const whoIsYourDaddy = document.querySelector("section#dessert")
        whoIsYourDaddy.appendChild(copy);
    }
    if (oneProduct.category == "drinks") {
        const whoIsYourDaddy = document.querySelector("section#drinks")
        whoIsYourDaddy.appendChild(copy);
    }
    if (oneProduct.category == "drinks") {
        const whoIsYourDaddy = document.querySelector("section#drinks")
        whoIsYourDaddy.appendChild(copy);
    }
    if (oneProduct.category == "sideorders") {
        const whoIsYourDaddy = document.querySelector("section#sideorders")
        whoIsYourDaddy.appendChild(copy);
    }




    //append

}


const modal = document.querySelector(".modal-background");
function showDetails(data) {
  modal.querySelector(".modal-name").textContent = data.name;
  modal.querySelector(".modal-description").textContent = data.longdescription;






  //...
  modal.classList.remove("hide");
}



const vegefilter = document.querySelector("#vegefilter");
vegefilter.addEventListener("click", vegeFilterClicked);

function vegeFilterClicked() {
    // selecting  not vege
    const articles = document.querySelectorAll("article:not(.vegetarian)");
    console.log(articles)

    //hidding not vege ones
    articles.forEach(elem => {
        elem.classList.add("hidden")
    })

}









//modal
//close the modal when clicked

modal.addEventListener("click", () => {
    modal.classList.add("hide");
});
