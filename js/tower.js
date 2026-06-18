// ============================================================
//  FIREWALL DEFENDER – tower.js
//  Nhiệm vụ: Class Tower — detect enemy trong range,
//            bắn projectile về phía enemy gần nhất,
//            cooldown timer riêng mỗi tower.
// ============================================================


// -----------------------------------------------------------
// CLASS TOWER
// -----------------------------------------------------------
class Tower {

  /**
   * @param {number} x  - tọa độ X tâm tower (pixel)
   * @param {number} y  - tọa độ Y tâm tower (pixel)
   */
  constructor(x, y) {
    this.x         = x;
    this.y         = y;

    // --- Thống số bắn ---
    this.range     = 250;            // bán kính phạm vi detect enemy (px)
    this.fireRate  = TOWER_FIRE_RATE; // giây giữa 2 phát bắn (lấy từ game.js)

    // --- Cooldown timer ---
    // Khởi đầu = 0 → bắn ngay khi frame đầu tiên có enemy trong range
    this.shootTimer = 0;

    // --- Trạng thái ---
    this.isActive  = false;          // true khi tower được đặt vào slot
  }


  // ---------------------------------------------------------
  // getTargetEnemy(enemies)
  //  Quét toàn bộ danh sách enemies, chỉ xét những enemy còn
  //  sống (alive) VÀ nằm trong bán kính this.range.
  //  Trả về enemy gần nhất, hoặc null nếu không có ai.
  // ---------------------------------------------------------
  getTargetEnemy(enemies) {
    let closest     = null;
    let closestDist = this.range; // chỉ chấp nhận enemy ≤ range

    for (const enemy of enemies) {
      if (!enemy.alive) continue;

      const dx   = enemy.x - this.x;
      const dy   = enemy.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= closestDist) {
        closestDist = dist;
        closest     = enemy;
      }
    }

    return closest; // null nếu không có enemy nào trong range
  }


  // ---------------------------------------------------------
  // update(deltaTime, enemies)
  //  Gọi mỗi frame từ updateTowers() trong game.js.
  //
  //  Logic:
  //   1. Bỏ qua nếu tower chưa được đặt (isActive = false).
  //   2. Giảm shootTimer theo thời gian đã trôi qua.
  //   3. Khi shootTimer hết hạn (≤ 0):
  //      a. Tìm enemy gần nhất trong range.
  //      b. Nếu tìm được → tạo projectile bay về phía enemy.
  //      c. Reset shootTimer = fireRate (cooldown mới bắt đầu).
  //      d. Nếu không có enemy → KHÔNG reset timer, tiếp tục
  //         đếm xuống để bắn ngay khi có enemy vào range.
  // ---------------------------------------------------------
  update(deltaTime, enemies) {
    if (!this.isActive) return;

    // Giảm cooldown theo thời gian thực
    this.shootTimer -= deltaTime;

    if (this.shootTimer <= 0) {
      const target = this.getTargetEnemy(enemies);

      if (target) {
        // Tạo đạn từ tâm tower bay về phía target
        spawnProjectile(this.x, this.y, target);

        // Reset cooldown — tower nghỉ fireRate giây trước khi bắn tiếp
        this.shootTimer = this.fireRate;
      }
      // Nếu không có target: shootTimer để ≤ 0,
      // frame tiếp theo sẽ kiểm tra lại ngay mà không delay thêm
    }
  }


  // ---------------------------------------------------------
  // draw(ctx)
  //  Vẽ tower lên canvas:
  //   - Vòng tròn phạm vi mờ (range circle)
  //   - Hình chữ nhật thân tower với glow
  //   - Ký hiệu "T" ở giữa
  // ---------------------------------------------------------
  draw(ctx) {
    if (!this.isActive) return;

    const { x, y, range } = this;

    // --- 1. Range circle (vòng phạm vi detect) ---
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, range, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.12)';
    ctx.lineWidth   = 1;
    ctx.stroke();
    // Fill rất mờ để không che đường và enemy
    ctx.fillStyle   = 'rgba(0, 212, 255, 0.03)';
    ctx.fill();
    ctx.restore();

    // --- 2. Thân tower (hình vuông với glow) ---
    const size = 24;
    const sx   = x - size / 2;
    const sy   = y - size / 2;

    ctx.save();
    ctx.shadowColor = '#00D4FF';
    ctx.shadowBlur  = 12;

    // Nền tower
    ctx.fillStyle = '#0D2137';
    ctx.fillRect(sx, sy, size, size);

    // Viền cyan sáng
    ctx.strokeStyle = '#00D4FF';
    ctx.lineWidth   = 2;
    ctx.strokeRect(sx, sy, size, size);

    ctx.restore();

    // --- 3. Ký hiệu "T" ở giữa ---
    ctx.fillStyle    = '#00FF88';
    ctx.font         = "bold 13px 'Courier New'";
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('T', x, y);
    ctx.textBaseline = 'alphabetic'; // reset về default
  }
}
