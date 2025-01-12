// Khởi tạo cảnh và camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Khởi tạo renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Tạo mặt đất và các vật thể trong thế giới
const geometry = new THREE.BoxGeometry(1, 1, 1); // Kích thước của hộp
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Màu của vật thể
const cube = new THREE.Mesh(geometry, material); // Vật thể cube
scene.add(cube);

const groundGeometry = new THREE.PlaneGeometry(500, 500, 32, 32);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = - Math.PI / 2; // Xoay mặt đất cho phẳng
scene.add(ground);

// Đặt camera
camera.position.z = 5;

// Các biến điều khiển
let isJumping = false;
let velocityY = 0;
const gravity = -0.1; // Lực hấp dẫn

// Tạo các phím điều khiển
const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false
};

document.addEventListener('keydown', (event) => {
    if (event.key === 'w') keys.w = true;
    if (event.key === 'a') keys.a = true;
    if (event.key === 's') keys.s = true;
    if (event.key === 'd') keys.d = true;
    if (event.key === ' ') keys.space = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'w') keys.w = false;
    if (event.key === 'a') keys.a = false;
    if (event.key === 's') keys.s = false;
    if (event.key === 'd') keys.d = false;
    if (event.key === ' ') keys.space = false;
});

// Các biến cho điểm số
let score = 0;
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');

// Hàm cập nhật điểm số
function updateScore() {
    score += 1; // Tăng điểm mỗi khi nhảy qua vật cản (hoặc thêm logic của bạn)
    scoreElement.innerText = `Score: ${score}`;
}

// Hàm để hiển thị Game Over
function gameOver() {
    gameOverElement.style.display = 'block';
}

// Hàm cập nhật logic game
function update() {
    // Xử lý chuyển động
    if (keys.w) cube.position.z -= 0.1; // Di chuyển về phía trước
    if (keys.s) cube.position.z += 0.1; // Di chuyển lùi lại
    if (keys.a) cube.position.x -= 0.1; // Di chuyển sang trái
    if (keys.d) cube.position.x += 0.1; // Di chuyển sang phải

    // Xử lý nhảy
    if (keys.space && !isJumping) {
        isJumping = true;
        velocityY = 0.5; // Tốc độ nhảy
    }

    // Tính toán trọng lực
    if (isJumping) {
        cube.position.y += velocityY;
        velocityY += gravity; // Tăng tốc độ rơi

        if (cube.position.y <= 0) {
            cube.position.y = 0;
            isJumping = false;
        }
    }

    // Cập nhật điểm số
    updateScore();

    // Kiểm tra Game Over (nếu cần)
    if (cube.position.y <= 0) {
        gameOver();
    }

    // Render cảnh
    renderer.render(scene, camera);

    // Lặp lại cập nhật
    requestAnimationFrame(update);
}

// Bắt đầu game
update();
