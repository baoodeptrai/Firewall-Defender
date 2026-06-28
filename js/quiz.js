// ============================================================
//  FIREWALL DEFENDER – quiz.js
//  Nhiệm vụ: lưu trữ data câu hỏi và vẽ quiz trong popup
// ============================================================

const QUIZ_DATA = {
  1: {
    question: 'Antivirus tower trong game chuyên diệt loại tấn công nào?',
    choices: [
      'DDoS',
      'Phishing',
      'Malware',
      'Ransomware',
    ],
    correctIndex: 2,
    reward: 15,
  },
  2: {
    question: 'Phishing khác DDoS ở điểm nào?',
    choices: [
      'Phishing tấn công bằng lượng lớn traffic',
      'Phishing lừa người dùng thay vì tấn công kỹ thuật',
      'Phishing phá hủy phần cứng server',
      'Phishing chỉ tấn công vào ban đêm',
    ],
    correctIndex: 1,
    reward: 15,
  },
  3: {
    question: 'Vì sao Phishing vẫn có thể lọt qua Firewall?',
    choices: [
      'Vì Phishing khai thác lỗi kỹ thuật Firewall',
      'Vì Phishing lừa người dùng mở liên kết độc hại',
      'Vì Firewall không thể xử lý gói tin Phishing',
      'Vì Phishing quá nhanh nên Firewall không kịp phản ứng',
    ],
    correctIndex: 1,
    reward: 20,
  },
  4: {
    question: 'Defense-in-depth nghĩa là gì?',
    choices: [
      'Dùng 1 tower mạnh nhất để phòng thủ',
      'Tấn công trước để ngăn hacker',
      'Bảo vệ hệ thống bằng nhiều lớp phòng thủ khác nhau',
      'Chỉ bảo vệ server ở tầng vật lý',
    ],
    correctIndex: 2,
    reward: 20,
  },
  5: {
    question: 'Loại tấn công nào bị Firewall ngăn chặn hiệu quả nhất?',
    choices: [
      'Malware',
      'Phishing',
      'DDoS',
      'Ransomware',
    ],
    correctIndex: 2,
    reward: 25,
  },
  6: {
    question: 'NIST CSF gồm mấy chức năng cốt lõi?',
    choices: [
      '3 chức năng',
      '4 chức năng',
      '5 chức năng',
      '6 chức năng',
    ],
    correctIndex: 2,
    reward: 25,
  },
  7: {
    question: 'Vòng PDCA trong ISO 27001 là gì?',
    choices: [
      'Protect → Detect → Control → Act',
      'Plan → Do → Check → Act',
      'Prevent → Deploy → Configure → Audit',
      'Patch → Defend → Control → Analyze',
    ],
    correctIndex: 1,
    reward: 25,
  },
  8: {
    question: 'APT (Advanced Persistent Threat) nguy hiểm vì điều gì?',
    choices: [
      'Tấn công rất nhanh và ồ ạt',
      'Chỉ nhắm vào phần cứng server',
      'Duy trì xâm nhập bí mật trong thời gian dài',
      'Tự động lây lan qua email',
    ],
    correctIndex: 2,
    reward: 30,
  },
};

class Quiz {
  constructor(wave) {
    const data = QUIZ_DATA[wave] || QUIZ_DATA[3];
    this.question = data.question;
    this.choices = data.choices;
    this.correctIndex = data.correctIndex;
    this.reward = data.reward;
    this.selectedIndex = -1;
    this.answerChecked = false;
    this.choiceRects = [];
  }

  get isAnswered() {
    return this.answerChecked;
  }

  get wasCorrect() {
    return this.answerChecked && this.selectedIndex === this.correctIndex;
  }

  draw(ctx, x, y, width) {
    const lineHeight = 18;
    ctx.fillStyle = COLORS.TEXT;
    ctx.font = "bold 14px 'Courier New'";
    ctx.textAlign = 'left';
    ctx.fillText('Quiz:', x, y);

    ctx.font = "12px 'Courier New'";
    ctx.fillText(this.question, x, y + lineHeight * 1.5);

    this.choiceRects = [];
    const choiceStartY = y + lineHeight * 3.2;

    this.choices.forEach((choice, index) => {
      const rect = {
        x: x,
        y: choiceStartY + index * 34,
        w: width,
        h: 28,
      };

      const isSelected = this.selectedIndex === index;
      const isCorrect = this.answerChecked && index === this.correctIndex;
      const isWrong = this.answerChecked && isSelected && !isCorrect;

      ctx.fillStyle = isCorrect ? '#00FF88'
                    : isWrong ? '#FF2D55'
                    : isSelected ? 'rgba(0, 212, 255, 0.16)'
                    : '#142A44';
      ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
      ctx.strokeStyle = isSelected ? COLORS.CYAN : '#22425A';
      ctx.lineWidth = 1;
      ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);

      ctx.fillStyle = '#E8F4FF';
      ctx.font = "12px 'Courier New'";
      ctx.fillText(choice, rect.x + 10, rect.y + 18);
      this.choiceRects.push(rect);
    });

    if (this.answerChecked) {
      ctx.fillStyle = this.wasCorrect ? '#00FF88' : '#FF2D55';
      ctx.font = "bold 12px 'Courier New'";
      ctx.fillText(
        this.wasCorrect
          ? `Đúng! +${this.reward} GOLD` 
          : 'Sai rồi. Không có thưởng.',
        x,
        choiceStartY + this.choices.length * 34 + 24
      );
    }
  }

  handleClick(mx, my) {
    if (this.answerChecked) return null;
    for (let i = 0; i < this.choiceRects.length; i += 1) {
      const rect = this.choiceRects[i];
      if (isInsideRect(mx, my, rect)) {
        this.selectedIndex = i;
        this.answerChecked = true;
        return i === this.correctIndex ? this.reward : 0;
      }
    }
    return null;
  }
}
