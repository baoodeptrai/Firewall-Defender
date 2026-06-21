// ============================================================
//  FIREWALL DEFENDER – popup.js
//  Nhiệm vụ: Quản lý popup giáo dục và quiz bên trong
// ============================================================

const POPUP_CONTENT = {
  3: {
    title: 'Phishing',
    lines: [
      'Phishing dùng email giả mạo hoặc trang web lừa đảo để đánh cắp thông tin.',
      'Tấn công này dựa vào con người hơn là lỗ hổng kỹ thuật.',
      'Firewall có thể không ngăn được Phishing nếu người dùng bị lừa mở liên kết độc hại.',
    ],
    law: 'Theo Nghị định 85/2021/NĐ-CP, tổ chức phải bảo đảm an toàn thông tin cá nhân và dữ liệu.',
    recommendations: 'Tăng cường đào tạo Awareness, dùng lọc email và cảnh báo người dùng.',
    connection: 'Awareness tower giúp phát hiện Phishing và giảm rủi ro thông qua nhận diện xã hội kỹ thuật.',
  },
  5: {
    title: 'DDoS',
    lines: [
      'DDoS dùng nhiều nguồn tấn công cùng lúc để làm nghẽn mạng hoặc dịch vụ.',
      'Giảm thiểu DDoS cần công cụ giám sát và phản ứng nhanh.',
      'Firewall có tác dụng mạnh nếu thiết lập ưu tiên lọc lưu lượng đúng cách.',
    ],
    law: 'Theo Luật An toàn thông tin mạng 2015, hạ tầng mạng cần biện pháp phòng chống tấn công từ chối dịch vụ.',
    recommendations: 'Triển khai Firewall chuyên dụng, giám sát lưu lượng và phân bổ tài nguyên.',
    connection: 'Firewall tower trong game tăng sát thương với DDoS và hạn chế tổn thất.',
  },
  8: {
    title: 'Ransomware + APT',
    lines: [
      'Ransomware mã hóa dữ liệu để tống tiền nạn nhân.',
      'APT là tấn công dài hạn, xâm nhập và duy trì truy cập trong hệ thống.',
      'Kết hợp phòng thủ đa lớp giúp giảm thiểu cả hai mối đe dọa này.',
    ],
    law: 'Nghị định 53/2022/NĐ-CP yêu cầu bảo vệ hệ thống thông tin quan trọng và dữ liệu riêng tư.',
    recommendations: 'Dùng Antivirus, Encryption và IDS/IPS để phát hiện và ngăn chặn mã độc.',
    connection: 'Antivirus, Encryption và IDS/IPS là những tower chiến lược để đối đầu Ransomware và APT.',
  },
};

class Popup {
  constructor(wave) {
    this.wave = wave;
    const data = POPUP_CONTENT[wave] || POPUP_CONTENT[3];
    this.title = data.title;
    this.lines = data.lines;
    this.law = data.law;
    this.recommendations = data.recommendations;
    this.connection = data.connection;
    this.quiz = new Quiz(wave);
    this.continueButton = { x: 0, y: 0, w: 0, h: 0 };
    this.rewardGiven = false;
  }

  draw(ctx) {
    const boxW = 650;
    const boxH = 430;
    const bx = W / 2 - boxW / 2;
    const by = H / 2 - boxH / 2;

    ctx.save();
    ctx.globalAlpha = 0.98;
    drawDialogBox(ctx, bx, by, boxW, boxH, COLORS.CYAN);
    ctx.restore();

    ctx.fillStyle = COLORS.CYAN;
    ctx.font = "bold 22px 'Courier New'";
    ctx.textAlign = 'left';
    ctx.fillText(this.title, bx + 22, by + 36);

    ctx.fillStyle = COLORS.TEXT;
    ctx.font = "12px 'Courier New'";
    const textX = bx + 22;
    let textY = by + 62;
    this.lines.forEach(line => {
      ctx.fillText(line, textX, textY);
      textY += 18;
    });

    ctx.fillStyle = COLORS.TEXT_MUTED;
    ctx.font = "11px 'Courier New'";
    ctx.fillText('Pháp luật liên quan:', textX, textY + 18);
    ctx.fillText(this.law, textX, textY + 36);

    ctx.fillStyle = COLORS.TEXT;
    ctx.fillText('Khuyến nghị phòng thủ:', textX, textY + 60);
    ctx.fillText(this.recommendations, textX, textY + 78);
    ctx.fillText('Kết nối với tower trong game:', textX, textY + 96);
    ctx.fillText(this.connection, textX, textY + 114);

    this.quiz.draw(ctx, textX, textY + 140, boxW - 44);

    if (this.quiz.isAnswered) {
      this.continueButton = {
        x: bx + boxW / 2 - 70,
        y: by + boxH - 58,
        w: 140,
        h: 34,
      };
      drawButton(ctx, this.continueButton, '[ TIẾP TỤC ]');
    }
  }

  handleClick(mx, my) {
    const reward = this.quiz.handleClick(mx, my);
    if (reward !== null) {
      if (reward > 0) {
        game.gold += reward;
        createGoldPopup(reward, W / 2, H / 2 - 80);
      }
      return true;
    }

    if (this.quiz.isAnswered && isInsideRect(mx, my, this.continueButton)) {
      return 'continue';
    }

    return false;
  }
}

const PopupManager = {
  activePopup: null,

  openWave(wave) {
    this.activePopup = new Popup(wave);
  },

  draw(ctx) {
    if (!this.activePopup) return;
    this.activePopup.draw(ctx);
  },

  handleClick(mx, my) {
    if (!this.activePopup) return false;
    const result = this.activePopup.handleClick(mx, my);
    if (result === 'continue') {
      this.activePopup = null;
      return 'continue';
    }
    return result;
  },
};
