// ============================================================
//  FIREWALL DEFENDER – popup.js
//  Nhiệm vụ: Quản lý popup giáo dục và quiz bên trong
// ============================================================

const POPUP_CONTENT = {
  1: {
    title: 'Malware',
    lines: [
      'Malware là phần mềm độc hại được thiết kế để phá hoại hoặc xâm nhập hệ thống.',
      'Có nhiều loại: virus, worm, trojan, spyware...',
      'Antivirus là biện pháp phòng thủ cơ bản và hiệu quả nhất.',
    ],
    law: 'Theo Luật An ninh mạng 2018, phát tán mã độc là hành vi bị nghiêm cấm.',
    recommendations: 'Cài Antivirus, cập nhật phần mềm thường xuyên, không mở file lạ.',
    connection: 'Antivirus tower trong game tiêu diệt Malware hiệu quả nhất.',
  },
  2: {
    title: 'Phishing',
    lines: [
      'Phishing dùng email giả mạo để lừa người dùng cung cấp thông tin nhạy cảm.',
      'Đây là hình thức tấn công phổ biến nhất hiện nay.',
      'Awareness và đào tạo người dùng là vũ khí quan trọng nhất.',
    ],
    law: 'Theo Luật An ninh mạng 2018 Điều 8, nghiêm cấm hành vi chiếm đoạt thông tin bằng thủ đoạn lừa đảo.',
    recommendations: 'Xác minh nguồn gốc email, không click link lạ, bật xác thực 2 yếu tố.',
    connection: 'Awareness tower phát hiện và làm chậm Phishing enemy trong game.',
  },
  3: {
    title: 'DDoS',
    lines: [
      'DDoS dùng hàng nghìn máy tính tấn công cùng lúc để làm nghẽn server.',
      'Mục tiêu là làm dịch vụ không thể truy cập được.',
      'Firewall chuyên dụng là tuyến phòng thủ đầu tiên.',
    ],
    law: 'Luật An toàn thông tin mạng 2015 yêu cầu có biện pháp phòng chống DDoS cho hạ tầng quan trọng.',
    recommendations: 'Triển khai Firewall, giám sát lưu lượng bất thường, dùng CDN.',
    connection: 'Firewall tower tăng sát thương với DDoS và bảo vệ server hiệu quả.',
  },
  4: {
    title: 'Kết hợp tấn công',
    lines: [
      'Hacker thường kết hợp nhiều loại tấn công cùng lúc để tăng hiệu quả.',
      'DDoS để phân tán sự chú ý, Phishing để xâm nhập bên trong.',
      'Defense-in-depth — bảo vệ theo nhiều lớp — là chiến lược đúng đắn.',
    ],
    law: 'ISO 27001 yêu cầu đánh giá rủi ro toàn diện và triển khai kiểm soát đa lớp.',
    recommendations: 'Không phụ thuộc vào 1 biện pháp duy nhất, kết hợp nhiều tower khác nhau.',
    connection: 'Dùng cả Firewall + Antivirus + Awareness để phòng thủ toàn diện.',
  },
  5: {
    title: 'Ransomware',
    lines: [
      'Ransomware mã hóa toàn bộ dữ liệu và đòi tiền chuộc.',
      'Một khi bị mã hóa, khôi phục dữ liệu rất khó nếu không có backup.',
      'Encryption tower giúp bảo vệ dữ liệu trước khi bị tấn công.',
    ],
    law: 'Nghị định 53/2022/NĐ-CP yêu cầu bảo vệ dữ liệu cá nhân và hệ thống thông tin quan trọng.',
    recommendations: 'Backup thường xuyên, cập nhật hệ thống, hạn chế quyền truy cập.',
    connection: 'Encryption tower trong game kháng Ransomware tốt nhất.',
  },
  6: {
    title: 'NIST Framework',
    lines: [
      'NIST CSF gồm 5 chức năng: Identify, Protect, Detect, Respond, Recover.',
      'Đây là khung tiêu chuẩn để xây dựng chương trình an ninh mạng toàn diện.',
      'Game này mô phỏng cả 5 chức năng qua hệ thống tower và wave.',
    ],
    law: 'NIST CSF được áp dụng rộng rãi tại Mỹ và nhiều nước, tương thích với ISO 27001.',
    recommendations: 'Áp dụng đủ 5 chức năng NIST, không chỉ tập trung vào Protect.',
    connection: 'Mỗi loại tower đại diện cho 1 chức năng NIST khác nhau.',
  },
  7: {
    title: 'ISO 27001',
    lines: [
      'ISO 27001 là tiêu chuẩn quốc tế về quản lý an toàn thông tin (ISMS).',
      'Yêu cầu đánh giá rủi ro, triển khai kiểm soát và cải tiến liên tục.',
      'Vòng PDCA: Plan → Do → Check → Act.',
    ],
    law: 'ISO 27001 được công nhận toàn cầu. Việt Nam đã ban hành TCVN ISO/IEC 27001:2023 tương đương, áp dụng cho mọi tổ chức.',
    recommendations: 'Triển khai ISMS theo ISO 27001, đánh giá rủi ro định kỳ.',
    connection: 'Hệ thống tower trong game ánh xạ với Annex A của ISO 27001.',
  },
  8: {
    title: 'APT — Advanced Persistent Threat',
    lines: [
      'APT là tấn công có chủ đích, dài hạn, do hacker chuyên nghiệp thực hiện.',
      'Thường kết hợp nhiều kỹ thuật: social engineering, zero-day, lateral movement.',
      'Cần phòng thủ đa lớp và giám sát liên tục để phát hiện APT.',
    ],
    law: 'Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân yêu cầu phòng chống xâm phạm dài hạn.',
    recommendations: 'Dùng IDS/IPS, giám sát log, phân tích hành vi bất thường.',
    connection: 'Wave cuối game mô phỏng APT — cần tất cả tower để sống sót.',
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
    const boxH = 500;
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
