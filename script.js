// ---------- DATA ----------
const menuData = [
  {name:"ชาไทย",price:50,img:"https://lh3.googleusercontent.com/YrMIcvm84log6477TliwniVrmrHe1k7TzHNMiByVpRuMN4mUXtg17zJHG_MloWHbbWOepgq_hXTPRLTf2dv_KX1XFVEaD7NE9CDfFNqMJXHhhL1X-4hXyRGA0VhBOrGkPjSa73E"},
  {name:"โกโก้",price:50,img:"https://img.kapook.com/u/pirawan/Cooking1/cocoa%20orero%20frappe.jpg"},
  {name:"นมชมพู",price:45,img:"https://img.wongnai.com/p/1920x0/2022/12/23/6c84330003f14fe48b97fae87ca3280c.jpg"},
  {name: "โอริโอ้", price: 45, img:"https://img.wongnai.com/p/400x0/2020/08/20/3a52bb733332489b88e0832376a191aa.jpg"},
  {name: "ชาเขียว", price: 50, img:"https://menu-ded.com/wp-content/uploads/2021/12/%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B8%B9%E0%B8%8A%E0%B8%B2%E0%B9%80%E0%B8%82%E0%B8%B5%E0%B8%A2%E0%B8%A7%E0%B9%80%E0%B8%A2%E0%B9%87%E0%B8%99.webp"},
  {name: "คาปูชีโน่", price: 50, img:"https://recipe.sgethai.com/wp-content/uploads/2025/09/170925-homemade-cappuccino-recipe-02.webp"},
  {name: "มอคค่า", price: 50, img:"https://thaicoffeeshop.com/wp-content/uploads/2023/06/%E0%B8%AA%E0%B8%AD%E0%B8%99%E0%B8%8A%E0%B8%87-%E0%B9%81%E0%B8%88%E0%B8%81%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3%E0%B8%8A%E0%B8%87%E0%B8%A1%E0%B8%AD%E0%B8%84%E0%B8%84%E0%B9%88%E0%B8%B2.jpg"},
  {name: "เผือกนมสด", price: 45, img:"https://img.wongnai.com/p/1920x0/2021/12/29/357bba97c94a4d5ead9370ebf26bf89b.jpg"},
  {name: "แตงโม", price: 40, img:"https://www.lemon8-app.com/seo/image?item_id=7499149533587259920&index=0&sign=38004559607af4e144ca93bb1e9c06ab"},
  {name: "สตรอว์เบอร์รี่", price: 45, img:"https://s359.kapook.com/r/600/auto/pagebuilder/86801056-6e7d-4824-b75e-12496a5e83dd.jpg"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const pages = ["loginPage","menuPage","cartPage","checkoutPage"];

// ---------- PAGE ----------
function showPage(id){
  pages.forEach(p=>document.getElementById(p).classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if(id==="menuPage") renderMenu();
  if(id==="cartPage") renderCart();
}

// ---------- LOGIN ----------
function login(){
  showPage("menuPage");
}

// ---------- MENU ----------
function renderMenu(){
  const grid = document.getElementById("menuGrid");
  grid.innerHTML="";

  menuData.forEach((m,i)=>{
    grid.innerHTML+=`
      <div class="card menu-item">
        <img src="${m.img}">
        <b>${m.name}</b>
        <div>${m.price} บาท</div>

        <label>ขนาดแก้ว</label>
    <select id="size_${i}">
      <option value="S">S (ปกติ)</option>
      <option value="M">M (+10)</option>
      <option value="L">L (+20)</option>
    </select>

        <label>ความหวาน</label>
        <select id="sweet_${i}">
          <option value="น้อย">น้อย</option>
          <option value="ปกติ" selected>ปกติ</option>
          <option value="มาก">มาก</option>
        </select>

        <label>ร้อน / เย็น</label>
        <select id="temp_${i}">
          <option value="เย็น">เย็น</option>
          <option value="ร้อน">ร้อน</option>
        </select>

        <label>ท็อปปิ้ง (+10 บาท)</label>
        <select id="top_${i}">
          <option value="ไม่มี">ไม่มี</option>
          <option value="ไข่มุก">ไข่มุก</option>
          <option value="บุก">บุก</option>
          <option value="วิปครีม">วิปครีม</option>
        </select>

        <button class="btn-primary" onclick="addToCart(${i})">
          เพิ่มตะกร้า
        </button>
      </div>
    `;
  });
}


// ---------- CART ----------
function addToCart(i){
  const size = document.getElementById(`size_${i}`).value;
  const sweet = document.getElementById(`sweet_${i}`).value;
  const temp = document.getElementById(`temp_${i}`).value;
  const top = document.getElementById(`top_${i}`).value;

  let price = menuData[i].price;

  // เพิ่มราคาตามขนาดแก้ว
  if(size === "M") price += 10;
  if(size === "L") price += 20;

  // เพิ่มราคาท็อปปิ้ง
  if(top !== "ไม่มี") price += 10;

  cart.push({
    name: menuData[i].name,
    size,
    sweet,
    temp,
    top,
    price,
    qty: 1
  });

  saveCart();
  toast("🧋 เพิ่มลงตะกร้าแล้ว");
}



function renderCart(){
  const box=document.getElementById("cartList");
  const totalBox=document.getElementById("totalPrice");

  box.innerHTML="";
  let total=0;

  if(cart.length===0){
    box.innerHTML="<p>ยังไม่มีสินค้า</p>";
    totalBox.innerText=0;
    return;
  }

  cart.forEach((c,i)=>{
    total += c.price * c.qty;

    box.innerHTML+=`
      <div class="cart-item">
        <b>${c.name}</b>
        <div style="font-size:13px;color:#666">
  แก้ว ${c.size} • ${c.temp} • หวาน${c.sweet} • ท็อปปิ้ง: ${c.top}
</div>


        <div style="margin-top:6px">
          <button onclick="changeQty(${i},-1)">➖</button>
          ${c.qty}
          <button onclick="changeQty(${i},1)">➕</button>

          <span style="float:right">
            ${c.price * c.qty} บาท
          </span>
        </div>
        <hr>
      </div>
    `;
  });

  totalBox.innerText = total;
}


function changeQty(i,n){
  cart[i].qty += n;
  if(cart[i].qty <= 0){
    cart.splice(i,1);
  }
  saveCart();
  renderCart();
}


// ---------- STORAGE ----------
function saveCart(){
  localStorage.setItem("cart",JSON.stringify(cart));
  document.getElementById("cartCount").innerText=cart.length;
}

// ---------- QR ----------
function openQR(){
  document.getElementById("qrBackdrop").style.display="block";
  document.getElementById("qrModal").style.display="block";
  document.getElementById("qrImg").src=
    "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=JuicyJoy";
}
function closeQR(){
  document.getElementById("qrBackdrop").style.display="none";
  document.getElementById("qrModal").style.display="none";
}
function downloadQR(){
  const a=document.createElement("a");
  a.href=document.getElementById("qrImg").src;
  a.download="JuicyJoy_QR.png";
  a.click();
}

// ---------- ORDER ----------
function confirmOrder(){
  cart=[];
  localStorage.removeItem("cart");
  saveCart();
  renderCart();
  toast("✅ สั่งซื้อเรียบร้อย");
  showPage("menuPage");
}

// ---------- TOAST ----------
function toast(msg){
  const t=document.getElementById("toast");
  t.innerText=msg;
  t.style.display="block";
  setTimeout(()=>t.style.display="none",2000);
}

// INIT
document.getElementById("cartCount").innerText=cart.length;
