const menuData = [
    {
        category: "Biryanis",
        items: [
            {
                name: "Chicken Biryani",
                price: 250,
                img: "images/chiken biryani.jpg"
            },
            {
                name: "Mutton Biryani",
                price: 350,
                img: "images/mutton biryani.jpg"
            }
        ]
    },
    {
        category: "Starters",
        items: [
            {
                name: "Chicken 65",
                price: 180,
                img: "images/chiken 65.jpg"
            },
            {
                name: "Paneer Tikka",
                price: 200,
                img: "images/paneer tikka.jpg"
            }
        ]
    },
    {
        category: "Baverages",
        items: [
            {
                name: "coke",
                price: 50,
                img: "images/coke.jpg"
            },
            {
                name: "thums up",
                price: 50,
                img: "images/thumps up.jpg"
            },
            {
                name: "sprite",
                price: 50,
                img: "images/sprite.jpg"
            }
        ]
    },
    {
        category: "Ice creams",
        items: [
            {
                name: "venilla",
                price: 70,
                img: "images/vennila.jpg"
            },
            {
                name: "strawberry",
                price: 80,
                img: "images/strawberry.jpg"
            },
            {
                name: "American dry Fruit",
                price: 120,
                img: "images/american.jpg"
            },
            {
                name:"Black current",
                price: 80,
                img: "images/black curret.jpg"
            }
        ]
    }
];

const menuContainer = document.getElementById("menu");
const searchInput = document.getElementById("search");

// Render Menu
function displayMenu(data) {
    menuContainer.innerHTML = "";

    data.forEach(section => {
        const categoryTitle = document.createElement("h2");
        categoryTitle.textContent = section.category;
        menuContainer.appendChild(categoryTitle);

        section.items.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("menu-item");

            div.innerHTML = `
                <strong>${item.name}</strong> - ₹${item.price} <br>
                <img src="${item.img}">
            `;

            menuContainer.appendChild(div);
        });
    });
}

// Search Function
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = menuData.map(section => {
        return {
            category: section.category,
            items: section.items.filter(item =>
                item.name.toLowerCase().includes(value)
            )
        };
    });

    displayMenu(filtered);
});

// Initial Load
displayMenu(menuData);