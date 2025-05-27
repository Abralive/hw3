const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots');
const carousel = document.getElementById('carousel');
let current = 0;

// 生成縮圖
slides.forEach((slide, index) => {
    const img = document.createElement('img');
    img.src = slide.querySelector('img').src;
    img.alt = slide.querySelector('img').alt;
    img.addEventListener('click', () => showSlide(index));
    dotsContainer.appendChild(img);
});

const dots = dotsContainer.querySelectorAll('img');

function showSlide(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = index;

    slides[current].classList.add('active');
    dots[current].classList.add('active');

    // 改變背景顏色
    const bg = slides[current].getAttribute('data-bg');
    carousel.style.backgroundColor = bg;
}
function queryPrice() {
    const product = document.getElementById('product').value;
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;

    if (!product || !year || !month) {
        alert('請輸入完整查詢條件');
        return;
    }

    fetch(`http://localhost:3000/api/price?product=${encodeURIComponent(product)}&year=${year}&month=${month}`)
        .then(res => {
            if (!res.ok) throw new Error("查無資料");
            return res.json();
        })
        .then(data => {
            document.getElementById('result').innerHTML =
                `📅 ${data.year} 年 ${data.month} 月<br>💰 價格：<span style="color: red">${data.price}</span> 元`;
        })
        .catch(err => {
            document.getElementById('result').innerHTML = '❌ 查無資料';
        });
}



document.getElementById('prev').addEventListener('click', () => {
    showSlide((current - 1 + slides.length) % slides.length);
});

document.getElementById('next').addEventListener('click', () => {
    showSlide((current + 1) % slides.length);
});

// 初始化
showSlide(0);
