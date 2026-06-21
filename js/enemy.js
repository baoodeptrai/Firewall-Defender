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
   * @param {number} hp     - máu ban đầu
   * @param {number} speed  - tốc độ di chuyển theo pixel/giây
   * @param {number} damage - damage gây lên server khi chạm đến đích
   */
  constructor(type, hp, speed, damage) {
    this.type   = type;
    this.hp     = hp;
    this.maxHp  = hp;
    this.speed  = speed;
    this.damage = damage;

    this.x      = 0;
    this.y      = 250;
    this.radius = 18;
    this.color  = ENEMY_COLORS[type] ?? '#FFFFFF';
    this.alive  = true;
    this.flashDuration = 0;
  }

  move(deltaTime = 1 / 60) {
    this.x += this.speed * deltaTime;
  }

  draw(ctx) {
    if (!this.alive) return;

    ctx.save();
    ctx.shadowColor = this.color;
    ctx.shadowBlur  = 16;
    this.drawSprite(ctx);
    ctx.restore();
    this._drawHPBar(ctx);
  }

  drawSprite(ctx) {
    switch (this.type) {
      case 'malware': return this._drawMalware(ctx);
      case 'phishing': return this._drawPhishing(ctx);
      case 'ddos': return this._drawDDoS(ctx);
      case 'ransomware': return this._drawRansomware(ctx);
      case 'apt': return this._drawAPT(ctx);
      default: return this._drawDefault(ctx);
    }
  }

  _drawMalware(ctx) {
    const spikes = 8;
    const r = this.radius;
    ctx.fillStyle = this.flashDuration > 0 ? '#FFFFFF' : this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    for (let i = 0; i < spikes; i += 1) {
      const angle = (Math.PI * 2 / spikes) * i;
      const startX = this.x + Math.cos(angle) * r;
      const startY = this.y + Math.sin(angle) * r;
      const endX = this.x + Math.cos(angle) * (r + 12);
      const endY = this.y + Math.sin(angle) * (r + 12);
      ctx.strokeStyle = '#FF8A9B';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(this.x, this.y, r * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  _drawPhishing(ctx) {
    ctx.fillStyle = this.flashDuration > 0 ? '#FFFFFF' : this.color;
    const w = this.radius * 2.2;
    const h = this.radius * 1.3;
    const left = this.x - w / 2;
    const top = this.y - h / 2;

    ctx.fillRect(left, top, w, h);
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(left, top, w, h);

    ctx.beginPath();
    ctx.moveTo(left, top);
    ctx.lineTo(this.x, this.y + 4);
    ctx.lineTo(left + w, top);
    ctx.closePath();
    ctx.fillStyle = '#FFF0A7';
    ctx.fill();
    ctx.stroke();
  }

  _drawDDoS(ctx) {
    const w = this.radius * 2.4;
    const h = 14;
    const gap = 6;
    for (let i = 0; i < 3; i += 1) {
      const y = this.y - 12 + i * (h + gap);
      ctx.fillStyle = this.flashDuration > 0 ? '#FFFFFF' : '#5599FF';
      ctx.fillRect(this.x - w / 2, y, w, h);
      ctx.strokeStyle = '#D4E7FF';
      ctx.lineWidth = 1;
      ctx.strokeRect(this.x - w / 2, y, w, h);
    }
  }

  _drawRansomware(ctx) {
    const bodyW = this.radius * 1.6;
    const bodyH = this.radius * 1.4;
    const left = this.x - bodyW / 2;
    const top = this.y - bodyH / 2 + 6;

    ctx.fillStyle = this.flashDuration > 0 ? '#FFFFFF' : this.color;
    ctx.fillRect(left, top, bodyW, bodyH);
    ctx.strokeStyle = '#E0B3FF';
    ctx.lineWidth = 2;
    ctx.strokeRect(left, top, bodyW, bodyH);

    ctx.beginPath();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4;
    ctx.arc(this.x, top, bodyW * 0.45, Math.PI, 0, false);
    ctx.stroke();

    ctx.fillStyle = '#111111';
    ctx.fillRect(this.x - 4, top + 6, 8, bodyH * 0.5);
  }

  _drawAPT(ctx) {
    const size = this.radius * 1.4;
    const a = size / 2;
    const points = [];
    for (let i = 0; i < 6; i += 1) {
      const angle = Math.PI / 3 * i - Math.PI / 6;
      points.push({
        x: this.x + Math.cos(angle) * a,
        y: this.y + Math.sin(angle) * a,
      });
    }

    ctx.fillStyle = this.flashDuration > 0 ? '#FFFFFF' : '#111111';
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#FF2D55';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  _drawDefault(ctx) {
    ctx.fillStyle = this.flashDuration > 0 ? '#FFFFFF' : this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  _drawHPBar(ctx) {
    const barW  = this.radius * 2.4;
    const barH  = 4;
    const barX  = this.x - barW / 2;
    const barY  = this.y - this.radius - 10;
    const pct   = this.hp / this.maxHp;

    const barColor = pct > 0.6 ? '#00FF88'
                   : pct > 0.3 ? '#FFD700'
                   :              '#FF2D55';

    ctx.fillStyle = '#1A2840';
    ctx.fillRect(barX, barY, barW, barH);
    ctx.fillStyle = barColor;
    ctx.fillRect(barX, barY, barW * pct, barH);
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
    this.triggerFlash();  // flash trắng khi trúng đạn
    
    if (this.hp <= 0) {
      this.hp    = 0;
      this.alive = false;
      return true;   // quái đã chết
    }
    return false;
  }

  // ---------------------------------------------------------
  // triggerFlash()
  //  Kích hoạt hiệu ứng flash trắng. Chạy 150ms (0.15s)
  // ---------------------------------------------------------
  triggerFlash() {
    this.flashDuration = 0.15;
  }

  // ---------------------------------------------------------
  // updateFlash(deltaTime)
  //  Cập nhật flash effect mỗi frame (giảm flashDuration)
  // ---------------------------------------------------------
  updateFlash(deltaTime) {
    if (this.flashDuration > 0) {
      this.flashDuration -= deltaTime;
      if (this.flashDuration < 0) this.flashDuration = 0;
    }
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
