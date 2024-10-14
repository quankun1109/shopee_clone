document.addEventListener("DOMContentLoaded", function () {
  const dangKiBtn = document.getElementById("dangKiBtn");
  if (dangKiBtn) {
      dangKiBtn.addEventListener("click", function () {
          document.getElementById("modal").style.display = "flex";
          document.getElementById("auth-form__res").style.display = "block";
          document.getElementById("auth-form__login").style.display = "none";

          // Thay đổi URL mà không tải lại trang
          window.history.pushState({}, "", "/register");
      });
  } else {
      console.error("Element with ID 'dangKiBtn' not found.");
  }
});

// Đóng modal khi nhấn nút "TRỞ LẠI"
document
  .getElementsByClassName("auth-form__control-back")[0]
  .addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";

    // Quay lại URL trước đó
    window.history.back();
  });

document
  .getElementsByClassName("auth-form__control-back")[1]
  .addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";

    // Quay lại URL trước đó
    window.history.back();
  });

// Đóng modal khi nhấn vào phần overlay
document
  .getElementById("modal__overlay")
  .addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";

    // Quay lại URL trước đó
    window.history.back();
  });

document
  .getElementById("auth-form__switch-btn--login")
  .addEventListener("click", function () {
    document.getElementById("auth-form__login").style.display = "block";
    document.getElementById("auth-form__res").style.display = "none";

    // Thay đổi URL mà không tải lại trang
    window.history.pushState({}, "", "/login");
  });

document.getElementById("dangNhapBtn").addEventListener("click", function () {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("auth-form__login").style.display = "block";
  document.getElementById("auth-form__res").style.display = "none";

  // Thay đổi URL mà không tải lại trang
  window.history.pushState({}, "", "/login");
});

document
  .getElementById("auth-form__switch-btn--res")
  .addEventListener("click", function () {
    document.getElementById("auth-form__res").style.display = "block";
    document.getElementById("auth-form__login").style.display = "none";

    // Thay đổi URL mà không tải lại trang
    window.history.pushState({}, "", "/register");
  });

//Đăng kí
document
  .getElementById("auth_res")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector(
      'input[name="confirmPassword"]'
    ).value;

    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    fetch("http://localhost:4567/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(
        password
      )}`,
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data); // Hiển thị phản hồi từ server
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

// Đăng nhập
document
  .getElementById("auth_login")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Gửi yêu cầu đăng nhập tới server
    fetch("http://localhost:4567/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(
        password
      )}`,
    })
      .then((response) => response.json()) // Chuyển phản hồi thành JSON
      .then((data) => {
        if (data.success) {
          // Đăng nhập thành công, lưu thông tin đăng nhập vào localStorage
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("avatar", data.avatarUrl); // Lưu URL avatar

          console.log(
            "Thông tin đăng nhập đã được lưu:",
            localStorage.getItem("loggedIn"),
            localStorage.getItem("avatar")
          );
          // Cập nhật giao diện sau khi đăng nhập thành công
          alert(`Đăng nhập thành công! Avatar: ${data.avatarUrl}`);
          updateUI(true, data.avatarUrl);

          // Ẩn modal đăng nhập
          document.getElementById("modal").style.display = "none";

          // Quay lại URL gốc (bỏ /login) sau khi đăng nhập thành công
          window.history.back();
        } else {
          alert("Email hoặc mật khẩu không chính xác!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

function updateUI(isLoggedIn, avatarUrl = "") {
  if (isLoggedIn) {
    // Ẩn nút đăng ký và đăng nhập
    document.getElementById("dangKiBtn").style.display = "none";
    document.getElementById("dangNhapBtn").style.display = "none";
    document.getElementById("modal").style.display = "none";

    // Hiển thị phần người dùng đã đăng nhập
    document.getElementById("header__navbar-user").style.display = "flex";
    document.getElementById("user-avatar").style.display = "block";

    // Đặt URL cho ảnh avatar
    document.getElementById("avatar-img").src = avatarUrl;
  } else {
    // Hiển thị lại nút đăng ký và đăng nhập
    document.getElementById("dangKiBtn").style.display = "block";
    document.getElementById("dangNhapBtn").style.display = "block";

    // Ẩn phần người dùng đã đăng nhập
    document.getElementById("header__navbar-user").style.display = "none";
    document.getElementById("user-avatar").style.display = "none";
  }
}
document.addEventListener("DOMContentLoaded", function () {
  console.log("Trang đã tải lại.");
  const isLoggedIn = localStorage.getItem("loggedIn");
  const avatarUrl = localStorage.getItem("avatar");
  console.log(
    "Trang vừa tải lại, kiểm tra trạng thái đăng nhập:",
    isLoggedIn,
    avatarUrl
  );

  // Nếu người dùng đã đăng nhập, cập nhật giao diện
  if (isLoggedIn === "true") {
    updateUI(true, avatarUrl);
  } else {
    updateUI(false);
  }
});
function logout() {
  // Xóa thông tin đăng nhập khỏi localStorage
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("avatar");

  // Cập nhật lại giao diện
  updateUI(false);

  alert("Bạn đã đăng xuất thành công!");
}

//Tìm kiếm
// Hàm lưu lịch sử tìm kiếm vào localStorage
function saveSearchHistory(searchTerm) {
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

  // Nếu từ khóa đã tồn tại trong lịch sử, không thêm lại
  if (!searchHistory.includes(searchTerm)) {
    searchHistory.unshift(searchTerm);

    // Giới hạn chỉ lưu 5 lịch sử tìm kiếm
    if (searchHistory.length > 5) {
      searchHistory.pop();
    }

    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }
}

// Hàm hiển thị lịch sử tìm kiếm
function displaySearchHistory() {
  const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  const historyList = document.querySelector(".header__search-history-list");
  historyList.innerHTML = ""; // Xóa nội dung cũ

  searchHistory.forEach((term) => {
    const listItem = document.createElement("li");
    listItem.classList.add("header__search-history-item");
    listItem.innerHTML = `<a href="#">${term}</a>`;

    // Thêm sự kiện click vào item lịch sử để điền vào ô input
    listItem.addEventListener("click", function (e) {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
      document.querySelector(".header__search-input").value = term; // Điền từ khóa vào ô tìm kiếm
    });

    historyList.appendChild(listItem);
  });
}

// Hàm thực hiện tìm kiếm
function performSearch() {
  const searchInput = document.querySelector(".header__search-input");
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== "") {
    saveSearchHistory(searchTerm); // Lưu từ khóa tìm kiếm vào lịch sử
    displaySearchHistory(); // Hiển thị lại lịch sử tìm kiếm
  }

  // Xóa nội dung của ô tìm kiếm sau khi tìm kiếm
  searchInput.value = "";
}

// Lắng nghe sự kiện click vào nút tìm kiếm
document
  .querySelector(".header__search-btn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn chặn hành vi submit mặc định
    performSearch(); // Gọi hàm tìm kiếm
  });

// Lắng nghe sự kiện nhấn phím Enter trong ô tìm kiếm
document
  .querySelector(".header__search-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Ngăn chặn hành vi submit mặc định khi nhấn Enter
      performSearch(); // Gọi hàm tìm kiếm
    }
  });

// Hiển thị lịch sử tìm kiếm khi trang được tải
window.onload = function () {
  displaySearchHistory(); // Hiển thị lịch sử tìm kiếm khi trang load
};

// Sự kiện khi focus vào ô input tìm kiếm thì hiển thị lịch sử
document
  .querySelector(".header__search-input")
  .addEventListener("focus", function () {
    document.querySelector(".header__search-history").style.display = "block";
  });

// Sự kiện khi blur (mất focus) khỏi ô input thì ẩn lịch sử tìm kiếm
document
  .querySelector(".header__search-input")
  .addEventListener("blur", function () {
    // Thêm timeout để người dùng có thời gian nhấn vào mục lịch sử trước khi ẩn
    setTimeout(() => {
      document.querySelector(".header__search-history").style.display = "none";
    }, 100);
  });

  let products = []; // Khai báo biến toàn cục để lưu danh sách sản phẩm

  // Gửi yêu cầu tới API để lấy danh sách sản phẩm
  fetch('http://localhost:4567/products')
    .then(response => response.json())
    .then(data => {
      products = data; // Gán dữ liệu sản phẩm vào biến toàn cục
      renderProducts(products); // Hiển thị sản phẩm lên giao diện
      
      // Lọc và hiển thị danh mục các hãng
      const brands = getUniqueBrands(products);
      renderBrands(brands); // Hiển thị danh mục các hãng
    })
    .catch(error => {
      console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
    });
  
  // Hàm lọc danh sách các hãng duy nhất từ danh sách sản phẩm
  function getUniqueBrands(products) {
    return [...new Set(products.map(product => product.brand))];
  }
  
  // Hàm hiển thị danh mục các hãng lên giao diện
  function renderBrands(brands) {
    const brandList = document.getElementById('brand-list');
    brandList.innerHTML = ''; // Xóa danh mục cũ
  
    brands.forEach(brand => {
      const brandItem = `
        <li class="category-item">
          <a href="#" class="category-item__link" data-brand="${brand}">${brand}</a>
        </li>
      `;
      brandList.innerHTML += brandItem;
    });
  
    // Thêm sự kiện click cho từng liên kết hãng
    const brandLinks = document.querySelectorAll('.category-item__link');
    brandLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ a
        const brandName = e.target.getAttribute('data-brand');
        filterProductsByBrand(brandName); // Lọc sản phẩm theo hãng
      });
    });
  }
  
  // Hàm lọc sản phẩm theo hãng
  function filterProductsByBrand(brand) {
    const filteredProducts = products.filter(product => product.brand === brand);
    renderProducts(filteredProducts); // Hiển thị sản phẩm của hãng đã chọn
  }
  
  // Hàm hiển thị sản phẩm
  function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Xóa danh sách sản phẩm cũ
  
    products.forEach(product => {
      const productItem = `
        <div class="grid__column-2-5">
          <a class="home-product-item" href="#">
            <div class="home-product-item__img" style="background-image: url(${product.imageUrl});"></div>
            <h4 class="home-product-item__name">${product.name}</h4>
            <div class="home-product-item__price">
              ${product.oldPrice ? `<span class="home-product-item__price-old">₫${product.oldPrice}</span>` : ''}
              <span class="home-product-item__price-current">₫${product.currentPrice}</span>
            </div>
            <div class="home-product-item__action">
              <span class="home-product-item__like" data-product-id="${product.id}" data-liked="${product.love}">
                <i class="home-product-item__like-icon-empty fa-regular fa-heart" style="display: ${product.love ? 'none' : 'block'};"></i>
                <i class="home-product-item__like-fill fa-solid fa-heart" style="display: ${product.love ? 'block' : 'none'};"></i>
              </span>
              <div class="home-product-item__rating">${renderStars(product.rating)}</div>
              <span class="home-product-item__sold">${product.sold} đã bán</span>
            </div>
            <div class="home-product-item__origin">
              <span class="home-product-item__brand">${product.brand}</span>
              <span class="home-product-item__origin-name">${product.origin}</span>
            </div>
            ${product.oldPrice ? `
            <div class="home-product-item__sale-off">
              <span class="home-product-item__sale-off-percent">${product.discountPercent}%</span>
              <span class="home-product-item__sale-off-label">GIẢM</span>
            </div>` : ''}
            ${product.like ? `
              <div class="home-product-item__favourite">
                <i class="fa-solid fa-check"></i>
                <span>Yêu thích</span>
              </div>` : ''}
          </a>
        </div>
      `;
  
      productList.innerHTML += productItem;
    });
  
    // Lấy tất cả các nút like sau khi đã render sản phẩm
    const likeButtons = document.querySelectorAll('.home-product-item__like');
    likeButtons.forEach(likeButton => {
      likeButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
        
        const productId = likeButton.getAttribute('data-product-id');
        const liked = likeButton.getAttribute('data-liked') === '1'; // Kiểm tra trạng thái hiện tại
        const newLikedState = liked ? '0' : '1'; // Chuyển đổi trạng thái
        
        // Cập nhật trạng thái trên giao diện
        likeButton.setAttribute('data-liked', newLikedState); 
        likeButton.querySelector('.home-product-item__like-icon-empty').style.display = newLikedState === '1' ? 'none' : 'block'; 
        likeButton.querySelector('.home-product-item__like-fill').style.display = newLikedState === '1' ? 'block' : 'none'; 
        
        // Gửi yêu cầu cập nhật trạng thái love tới backend
        fetch(`http://localhost:4567/products/${productId}/love`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ love: newLikedState }) // Gửi giá trị love mới lên server
        })
        .then(response => response.json())
        .then(data => {
          console.log('Cập nhật thành công:', data);
        })
        .catch(error => {
          console.error('Lỗi khi cập nhật trạng thái yêu thích:', error);
        });
      });
    });
  }
// Hàm render các ngôi sao dựa trên đánh giá
function renderStars(rating) {
  let stars = "";

  // Tính số ngôi sao đầy đủ
  const fullStars = Math.floor(rating);
  // Tính phần trăm ngôi sao cuối cùng (nếu có)
  const partialStar = rating - fullStars;

  // Hiển thị các ngôi sao đầy đủ
  for (let i = 1; i <= fullStars; i++) {
    stars += '<i class="home-product-item__star--gold fa-solid fa-star"></i>';
  }

  // Nếu có phần thập phân, hiển thị ngôi sao một phần
  if (partialStar > 0) {
    const percentage = partialStar * 100; // Phần trăm của ngôi sao
    stars += `<i class="fa-solid fa-star" style="background: linear-gradient(90deg, gold ${percentage}%, lightgray ${percentage}%); -webkit-background-clip: text; color: transparent;"></i>`;
  }

  // Hiển thị các ngôi sao còn lại (ngôi sao trống)
  for (let i = fullStars + 1; i < 5; i++) {
    stars += '<i class="fa-solid fa-star"></i>';
  }

  return stars;
}



// Sắp xếp tăng dần theo giá
document.getElementById('sort-price-asc').addEventListener('click', (e) => {
  e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ a

  if (products.length === 0) { // Kiểm tra xem products có dữ liệu chưa
    console.log("Chưa có dữ liệu sản phẩm.");
    return; // Nếu không có dữ liệu, dừng lại
  }

  const sortedProducts = products.sort((a, b) => a.currentPrice - b.currentPrice); // Sắp xếp tăng dần
  console.log(sortedProducts); // Kiểm tra dữ liệu đã được sắp xếp
  renderProducts(sortedProducts); // Hiển thị lại sản phẩm đã sắp xếp
});

// Sắp xếp giảm dần theo giá
document.getElementById('sort-price-desc').addEventListener('click', (e) => {
  e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ a

  if (products.length === 0) { // Kiểm tra xem products có dữ liệu chưa
    console.log("Chưa có dữ liệu sản phẩm.");
    return; // Nếu không có dữ liệu, dừng lại
  }

  const sortedProducts = products.sort((a, b) => b.currentPrice - a.currentPrice); // Sắp xếp tăng dần
  console.log(sortedProducts); // Kiểm tra dữ liệu đã được sắp xếp
  renderProducts(sortedProducts); // Hiển thị lại sản phẩm đã sắp xếp
});

// Gọi API lấy danh sách sản phẩm yêu thích
fetch('http://localhost:4567/products/love')
  .then(response => response.json())
  .then(data => {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Xóa nội dung cũ nếu có

    // Hiển thị số lượng sản phẩm yêu thích
    const lovedCount = data.length; // Lấy số lượng từ response
    const lovedCountElement = document.getElementById('lovedCount');
    lovedCountElement.innerHTML = `${lovedCount}`;

    // Kiểm tra xem có sản phẩm yêu thích hay không
    if (data.length === 0) {
      // Nếu không có sản phẩm, hiển thị thông báo
      const noCartMessage = `
        <div class="header__cart-list header__cart-list--no-cart">
            <img
                src="./assets/images/no_cart.png"
                alt=""
                class="header__cart-list--no-cart-img"
            />
            <span class="header__cart-list--no-cart-msg">Chưa có sản phẩm</span>
        </div>
      `;
      cartList.innerHTML = noCartMessage;
    } else {
      // Thêm tiêu đề và phần tử ul trước khi thêm sản phẩm
      const header = `<h4 class="header__cart-heading">Sản phẩm đã thêm</h4>`;
      let productItems = '<ul class="header__cart-list-item">';
      
      data.forEach(product => {
        // Tạo một item cho sản phẩm yêu thích
        const item = `
          <li class="header__cart-item">
            <img
              src="${product.imageUrl}"
              alt="${product.name}"
              class="header__cart-item-img"
            />
            <div class="header__cart-item-inf">
              <h5 class="header__cart-item-name">${product.name}</h5>
              <span class="header__cart-item-price">₫${product.currentPrice}</span>
            </div>
          </li>
        `;
        // Thêm item vào chuỗi productItems
        productItems += item;
      });

      productItems += '</ul>'; // Đóng thẻ ul

      // Thêm nút xem giỏ hàng sau danh sách sản phẩm
      const viewCartButton = `
        <a class="header__cart-btn-view-cart btn btn--primary">Xem giỏ hàng</a>
      `;

      // Gán tất cả nội dung vào cartList
      cartList.innerHTML = header + productItems + viewCartButton;
    }
  })
  .catch(error => {
    console.error('Lỗi khi lấy danh sách yêu thích:', error);
  });