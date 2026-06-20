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
   * @param {string} targetType - loại quái được bắn (null = bắn tất cả)
   */
  constructor(x, y, targetType = null) {
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

    // --- Loại quái mục tiêu ---
    this.targetType = targetType;    // chỉ bắn enemy có type này
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

      // Chỉ bắn đúng loại quái được giao
      if (this.targetType && enemy.type !== this.targetType) continue;

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
    }
  }


  // ---------------------------------------------------------
  // draw(ctx)
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

    ctx.fillStyle = '#0D2137';
    ctx.fillRect(sx, sy, size, size);

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
    ctx.textBaseline = 'alphabetic';
  }
}
