const GOOGLE_SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbxins-4CLJS25Dr-xhoI-iz4f4_I3_L500azspJj2neLZkqKV6ZvflpndX4xU0KJwxn-g/exec'; // 請將此處換成你的 Apps Script API 網址

function createCard(item) {
    // item: {name, area, number, img}
    return `
    <div class="card swiper-slide">
        <div class="image-content">
            <span class="overlay"></span>
            <div class="card-image">
                <img src="${item.img}" alt="image" class="card-img">
            </div>
        </div>
        <div class="card-content">
            <h2 class="name">${item.name}</h2>
            <p class="description"><span>${item.area}</span>　<span>${item.number}</span></p>
            <button class="button">View More</button>
        </div>
    </div>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    fetch(GOOGLE_SHEET_API_URL)
        .then(res => res.json())
        .then(data => {
            const wrapper = document.querySelector('.card-wrapper');
            if (!wrapper) return;
            wrapper.innerHTML = data.map(createCard).join('');
            // 初始化Swiper
            new Swiper('.slide-content', {
                slidesPerView: 4,
                spaceBetween: 25,
                loop: true,
                centerSlide: true,
                fade: true,
                grabCursor: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    0: { slidesPerView: 1 },
                    520: { slidesPerView: 2 },
                    950: { slidesPerView: 4 },
                },
            });
        });
});