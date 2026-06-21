// ============================================================
//  FIREWALL DEFENDER – projectile.js
//  Nhiệm vụ: Class Projectile bắn tới mục tiêu và vẽ hiệu ứng
// ============================================================

class Projectile {
  constructor(x, y, targetEnemy, damage, speed = PROJECTILE_SPEED) {
    this.x = x;
    this.y = y;
    this.target = targetEnemy;
    this.damage = damage;
    this.speed = speed;
    this.radius = 6;
    this.alive = true;
    this._updateVelocity();
  }

  _updateVelocity() {
    if (!this.target || !this.target.alive) return;
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const dist = Math.max(distance(this.x, this.y, this.target.x, this.target.y), 1);
    this.vx = (dx / dist) * this.speed;
    this.vy = (dy / dist) * this.speed;
  }

  move(deltaTime) {
    if (!this.alive) return;
    if (this.target && this.target.alive) {
      this._updateVelocity();
    }

    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;

    if (this.x < -20 || this.x > W + 20 || this.y < -20 || this.y > H + 20) {
      this.alive = false;
    }
  }

  draw(ctx) {
    if (!this.alive) return;

    ctx.save();
    ctx.shadowColor = COLORS.CYAN;
    ctx.shadowBlur = 12;
    ctx.fillStyle = COLORS.CYAN;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }
}
