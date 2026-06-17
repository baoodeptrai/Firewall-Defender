// ============================================================
//  CYBER DEFENSE – enemy.js
//  Nhiệm vụ: Class Enemy cơ bản — constructor, move(), draw()
// ============================================================


// -----------------------------------------------------------
// BẢNG MÀU theo từng loại quái
//  Dùng riêng ở đây để enemy.js không phụ thuộc game.js
// -----------------------------------------------------------
const ENEMY_COLORS = {
  malware:    '#FF2D55',   // đỏ hồng — virus nguy hiểm
  phishing:   '#FFD700',   // vàng — email lừa đảo
  ddos:       '#FF6B00',   // cam cháy — tấn công ào ạt
  ransomware: '#CC00FF',   // tím — mã hóa tống tiền
  apt:        '#00D4FF',   // cyan sáng — boss APT
};


// -----------------------------------------------------------
// CLASS ENEMY
// -----------------------------------------------------------
class Enemy {

  /**
   * @param {string} type   - loại quái: 'malware' | 'phishing' | 'ddos' | 'ransomware' | 'apt'
   * @param {number} hp     - máu ban đầu (ví dụ: 80 với malware)
   * @param {number} speed  - tốc độ di chuyển theo pixel/giây (ví dụ: 60)
   * @param {number} damage - damage gây lên server khi chạm đến đích
   */
  constructor(type, hp, speed, damage) {
    this.type   = type;
    this.hp     = hp;
    this.maxHp  = hp;      // lưu lại để vẽ thanh máu chính xác
    this.speed  = speed;
    this.damage = damage;

    // Vị trí xuất phát: bên trái canvas, giữa đường quái (y=250)
    this.x      = 0;
    this.y      = 250;

    // Bán kính hình tròn đại diện cho quái
    this.radius = 16;

    // Màu lấy từ bảng — mặc định trắng nếu type lạ
    this.color  = ENEMY_COLORS[type] ?? '#FFFFFF';

    // Trạng thái: còn sống không?
    this.alive  = true;
  }


  // ---------------------------------------------------------
  // move(deltaTime)
  //  Tăng x mỗi frame dựa trên tốc độ và thời gian đã trôi qua.
  //  deltaTime (giây) giúp tốc độ ổn định bất kể FPS thay đổi.
  //
  //  Cách dùng: enemy.move(deltaTime) trong gameLoop
  //  Nếu chưa có deltaTime, gọi enemy.move() — dùng giá trị mặc định 1/60
  // ---------------------------------------------------------
  move(deltaTime = 1 / 60) {
    this.x += this.speed * deltaTime;
  }


  // ---------------------------------------------------------
  // draw(ctx)
  //  Vẽ quái lên canvas:
  //   - Hình tròn màu theo loại (glow effect nhẹ)
  //   - Thanh HP bên trên
  //   - Tên loại quái nhỏ ở giữa
  // ---------------------------------------------------------
  draw(ctx) {
    if (!this.alive) return;

    const { x, y, radius, color, hp, maxHp, type } = this;

    // --- 1. Glow (ánh sáng phát ra xung quanh) ---
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur  = 14;

    // --- 2. Hình tròn chính ---
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // --- 3. Viền tròn trắng nhạt để nổi bật trên nền tối ---
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth   = 1.5;
    ctx.stroke();

    ctx.restore();  // tắt shadow để không ảnh hưởng element khác

    // --- 4. Nhãn loại quái (chữ nhỏ trong hình tròn) ---
    ctx.fillStyle  = '#FFFFFF';
    ctx.font       = "bold 7px 'Courier New'";
    ctx.textAlign  = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(type.toUpperCase().slice(0, 4), x, y);
    ctx.textBaseline = 'alphabetic';  // reset về default

    // --- 5. Thanh HP phía trên hình tròn ---
    this._drawHPBar(ctx);
  }


  // ---------------------------------------------------------
  // _drawHPBar(ctx)  [private helper]
  //  Vẽ thanh máu nhỏ bên trên quái — đổi màu theo % HP còn lại
  // ---------------------------------------------------------
  _drawHPBar(ctx) {
    const barW  = this.radius * 2.4;   // rộng bằng 2.4× bán kính
    const barH  = 4;
    const barX  = this.x - barW / 2;
    const barY  = this.y - this.radius - 8;
    const pct   = this.hp / this.maxHp;

    // Màu thanh HP: xanh > vàng > đỏ
    const barColor = pct > 0.6 ? '#00FF88'
                   : pct > 0.3 ? '#FFD700'
                   :              '#FF2D55';

    // Nền xám
    ctx.fillStyle = '#1A2840';
    ctx.fillRect(barX, barY, barW, barH);

    // Phần HP còn lại
    ctx.fillStyle = barColor;
    ctx.fillRect(barX, barY, barW * pct, barH);

    // Viền mỏng
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth   = 0.5;
    ctx.strokeRect(barX, barY, barW, barH);
  }


  // ---------------------------------------------------------
  // takeDamage(amount)
  //  Nhận sát thương từ tower. Trả về true nếu quái chết.
  // ---------------------------------------------------------
  takeDamage(amount) {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.hp    = 0;
      this.alive = false;
      return true;   // quái đã chết
    }
    return false;
  }
}


// -----------------------------------------------------------
// FACTORY: tạo Enemy theo đúng chỉ số trong GDD
//  Dùng: const e = createEnemy('malware');
// -----------------------------------------------------------
function createEnemy(type) {
  const STATS = {
    malware:    { hp: 80,  speed: 60,  damage: 15 },
    phishing:   { hp: 40,  speed: 120, damage: 10 },
    ddos:       { hp: 200, speed: 30,  damage: 35 },
    ransomware: { hp: 150, speed: 50,  damage: 25 },
    apt:        { hp: 500, speed: 25,  damage: 50 },
  };

  const s = STATS[type];
  if (!s) throw new Error(`[Enemy] Unknown type: "${type}"`);

  return new Enemy(type, s.hp, s.speed, s.damage);
}
