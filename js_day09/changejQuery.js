const banner = $(".banner");
const image_divs = $(".banner .image");
const first_div = $("#first-temp");
const last_div = $("#last-temp");
const prev = $(".prev");
const next = $(".next");
const dots = $(".dot");
let count = 1;
let check = true;
let clickCheck = false;
let temp;

image_divs.each((i, image_div) => $(image_div).css("background-image", `url(00${i + 1}.png)`));
first_div.css("background-image", "url(006.png)");
last_div.css("background-image", "url(001.png)");

let slide = setInterval(autoSlide, 2000);

changeButtonStyle();

function changeButtonStyle() {
    if (temp) {
        temp.css("background", "none");
    }
    temp = dots.eq(count - 1);
    dots.eq(count - 1).css("background", "#313131");
    clickCheck = true; //선택 버튼이 변경되는 순간 mouseout 이벤트 막기
}

dots.hover(function () {
    clickCheck = $(this).css("background-color") === "rgb(49, 49, 49)";
    $(this).css("background", "#313131");
}, function () {
    if (clickCheck) {
        return;
    }
    $(this).css("background", "none");
});

dots.click(function () {
    clickCheck = true;
    clearInterval(slide);
    count = $(this).attr("class").split(" ")[1];
    banner.css("transform", `translate(${-1500 * count}px)`);
    banner.css("transition", "transform 0.7s");
    changeButtonStyle();
    slide = setInterval(autoSlide, 2000);
});

prev.click(function () {
    if (!check) {
        return;
    }
    check = false;
    clearInterval(slide);
    banner.css("transform", `translate(${-1500 * --count}px)`);
    banner.css("transition", "transform 0.7s");

    if (count === 0) {
        setTimeout(() => {
            banner.css("transition", "transform 0s");
            banner.css("transform", "-9000px");
        }, 700);
        count = 6;
    }
    changeButtonStyle();
    slide = setInterval(autoSlide, 2000);
    setTimeout(() => {check = true;}, 700);
});

next.click(function () {
    if (!check) {
        return;
    }
    check = false;
    clearInterval(slide);
    banner.css("transform", `translate(${-1500 * ++count}px)`);
    banner.css("transition", "transform 0.7s");

    if (count === 7) {
        setTimeout(() => {
            banner.css("transition", "transform 0s");
            banner.css("transform", "-1500px");
        }, 700);
        count = 1;
    }
    changeButtonStyle();
    slide = setInterval(autoSlide, 2000);
    setTimeout(() => {check = true;}, 700);
});

function autoSlide() {
    check = false;
    banner.css("transform", `translate(${-1500 * ++count}px)`);
    banner.css("transition", "transform 0.7s");

    if(count == 7) {
        setTimeout(() => {
            banner.style.transition = "transform 0s";
            banner.style.transform = `translate(-1500px)`;
        }, 700);
        count = 1;
    }
    changeButtonStyle();
    clickCheck = false; // mouseover에서 슬라이드 배너 이동 시 mouseout 이벤트 재활성화
    setTimeout(() => {
        check = true;
    }, 700);
}