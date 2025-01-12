const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const stickman1 = {
    x: 100,
    y: 500,
    width: 50,
    height: 100,
    color: 'blue',
    dx: 5,
    isMovingLeft: false,
    isMovingRight: false
};

const stickman2 = {
    x: 600,
    y: 500,
    width: 50,
    height: 100,
    color: 'red',
    dx: 5,
    isMovingLeft: false,
    isMovingRight: false
};

// Vẽ stickman
function drawStickman(stickman) {
    ctx.fillStyle = stickman.color;
    ctx.fillRect(stickman.x, stickman.y, stickman.width, stickman.height);
}

// Cập nhật vị trí stickman
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // xóa màn hình

    // Cập nhật stickman 1
    if (stickman1.isMovingLeft) stickman1.x -= stickman1.dx;
    if (stickman1.isMovingRight) stickman1.x += stickman1.dx;

    // Cập nhật stickman 2
    if (stickman2.isMovingLeft) stickman2.x -= stickman2.dx;
    if (stickman2.isMovingRight) stickman2.x += stickman2.dx;

    drawStickman(stickman1);
    drawStickman(stickman2);

    requestAnimationFrame(update); // gọi lại hàm update để vẽ liên tục
}

// Xử lý sự kiện bàn phím
document.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        stickman1.isMovingLeft = true;
    }
    if (event.key === 'd') {
        stickman1.isMovingRight = true;
    }
    if (event.key === 'ArrowLeft') {
        stickman2.isMovingLeft = true;
    }
    if (event.key === 'ArrowRight') {
        stickman2.isMovingRight = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'a') {
        stickman1.isMovingLeft = false;
    }
    if (event.key === 'd') {
        stickman1.isMovingRight = false;
    }
    if (event.key === 'ArrowLeft') {
        stickman2.isMovingLeft = false;
    }
    if (event.key === 'ArrowRight') {
        stickman2.isMovingRight = false;
    }
});

// Bắt đầu trò chơi
update();
