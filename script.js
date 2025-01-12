const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Các đối tượng stickman và kẻ thù
const stickman1 = {
    x: 100,
    y: 500,
    width: 50,
    height: 100,
    color: 'blue',
    dx: 5,
    health: 100,
    isMovingLeft: false,
    isMovingRight: false,
    isAttacking: false,
    attackRange: 60
};

const enemy = {
    x: 600,
    y: 500,
    width: 50,
    height: 100,
    color: 'red',
    dx: 3,
    health: 100,
    isAttacking: false,
    attackRange: 60
};

// Vẽ stickman và kẻ thù
function drawCharacter(character) {
    ctx.fillStyle = character.color;
    ctx.fillRect(character.x, character.y, character.width, character.height);
}

// Kiểm tra va chạm
function checkCollision(character1, character2) {
    return (
        character1.x < character2.x + character2.width &&
        character1.x + character1.width > character2.x &&
        character1.y < character2.y + character2.height &&
        character1.y + character1.height > character2.y
    );
}

// Cập nhật vị trí và trạng thái
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Di chuyển Stickman 1
    if (stickman1.isMovingLeft) stickman1.x -= stickman1.dx;
    if (stickman1.isMovingRight) stickman1.x += stickman1.dx;

    // Di chuyển kẻ thù
    if (enemy.x < stickman1.x) {
        enemy.x += enemy.dx;
    } else if (enemy.x > stickman1.x) {
        enemy.x -= enemy.dx;
    }

    // Tấn công Stickman 1
    if (stickman1.isAttacking) {
        if (checkCollision(stickman1, enemy)) {
            enemy.health -= 10;
        }
    }

    // Tấn công kẻ thù
    if (enemy.isAttacking) {
        if (checkCollision(enemy, stickman1)) {
            stickman1.health -= 10;
        }
    }

    // Vẽ Stickman 1 và kẻ thù
    drawCharacter(stickman1);
    drawCharacter(enemy);

    // Hiển thị sức khỏe
    ctx.fillStyle = 'black';
    ctx.fillText(`Health: ${stickman1.health}`, 10, 20);
    ctx.fillText(`Enemy Health: ${enemy.health}`, 600, 20);

    requestAnimationFrame(update); // Gọi lại hàm update để vẽ liên tục
}

// Xử lý sự kiện bàn phím
document.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        stickman1.isMovingLeft = true;
    }
    if (event.key === 'd') {
        stickman1.isMovingRight = true;
    }
    if (event.key === 'w') { // Tấn công stickman
        stickman1.isAttacking = true;
    }
    if (event.key === 'ArrowLeft') {
        enemy.isAttacking = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'a') {
        stickman1.isMovingLeft = false;
    }
    if (event.key === 'd') {
        stickman1.isMovingRight = false;
    }
    if (event.key === 'w') {
        stickman1.isAttacking = false;
    }
    if (event.key === 'ArrowLeft') {
        enemy.isAttacking = false;
    }
});

// Bắt đầu trò chơi
update();
