# 🛡️ Firewall Defender

**Firewall Defender** là một tựa game chiến thuật thủ thành (Tower Defense) chủ đề an ninh mạng, được xây dựng trên nền tảng Web (HTML5 Canvas & JavaScript). Người chơi sẽ đóng vai trò quản trị viên hệ thống để xây dựng hàng phòng thủ, chống lại các cuộc tấn công mạng nguy hiểm nhằm bảo vệ máy chủ cốt lõi.

---

## 📖 Cốt truyện (Storyline)
* **Bối cảnh:** Năm 2025, một tổ chức tài chính lớn tại Việt Nam đang vận hành hệ thống máy chủ quan trọng chứa dữ liệu hàng triệu người dùng. Nhóm hacker quốc tế **"Black Packet"** phát động chiến dịch tấn công có chủ đích (**APT** — *Advanced Persistent Threat*).
* **Vai trò:** Bạn vào vai **System Administrator (Admin)** — quản trị viên hệ thống. Nhiệm vụ của bạn là triển khai các biện pháp kiểm soát bảo mật (Security Controls) để bảo vệ Server khỏi các làn sóng tấn công liên tục.
* **Mục tiêu:** * Sống sót qua tất cả các wave tấn công (tổng cộng 10 Waves).
  * Bảo vệ HP Server không về 0.
  * Tiêu diệt quái nhận Gold để mua và nâng cấp lính.
  * Đánh bại Boss APT ở wave cuối cùng.

---

## 🕹️ Cơ chế & Luật Game (Game Mechanics)

### 👾 1. Hệ thống Quái vật (Enemy Rules)
Quái sẽ xuất hiện ở phía bên trái canvas (`x=0, y=250`) và di chuyển thẳng sang phải về phía Server (`x=860`). Khoảng cách spawn giữa mỗi quái là **1.5 giây**. Khi chạm vào Server, Server sẽ bị trừ HP tương ứng với Damage của quái.

| Loại quái | Tên | HP | Speed (px/s) | Damage | Gold | Đặc điểm |
| :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Malware** | `Virus.exe` | 80 | 60 | 15 | 10 | Di chuyển trung bình, phá hoại từ từ |
| **Phishing** | `Fake_Email` | 40 | 120 | 10 | 8 | Di chuyển nhanh, HP thấp |
| **DDoS** | `Packet_Flood` | 200 | 30 | 35 | 20 | Di chuyển chậm, HP cao, damage lớn |
| **Ransomware** | `Locker.exe` | 150 | 50 | 25 | 18 | Xuất hiện từ Wave 5+, kháng một phần Antivirus |
| **APT Boss** | `BlackPacket` | 500 | 25 | 50 | 50 | Xuất hiện ở Wave 10, tổng hợp mọi loại tấn công |

### 🏹 2. Hệ thống Phòng thủ (Defense Rules)
Bản đồ có **4 slot cố định** để đặt lính (mỗi slot tối đa 1 lính). Lính tự động tấn công quái gần nhất trong tầm đánh (`Range`). Bạn có thể bán lính để thu lại 50% giá gốc bất kỳ lúc nào.

| Lính | Tên | Damage/s | Range (px) | Giá (Gold) | Khắc chế tốt nhất | Đặc điểm |
| :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Firewall** | `FW-01` | 20 | 150 | 100 | DDoS | Gây thêm +50% damage lên DDoS |
| **Antivirus** | `AV-Pro` | 25 | 120 | 80 | Malware, Ransomware | Gây thêm +50% damage lên Malware & Ransomware |
| **Awareness** | `User_Trainer`| 15 | 100 | 60 | Phishing | Làm chậm Phishing (-30% speed) + damage nhẹ |
| **Encryption**| `CryptShield` | 30 | 130 | 150 | Tất cả | Mở khóa từ Wave 3+, sát thương đều mọi loại quái |
| **IDS/IPS** | `Detector` | 35 | 200 | 200 | Tất cả | Mở khóa từ Wave 5+, tầm đánh lớn nhất, làm chậm mọi quái (-20%) |

### 📈 3. Hệ thống Nâng cấp (Upgrade System)
* **Cấp 1 (Base):** Sát thương × 1.0 | Tầm đánh × 1.0 (Giá gốc)
* **Cấp 2 (Enhanced):** Sát thương × 1.5 | Tầm đánh × 1.2 (Chi phí = 50% giá gốc)
* **Cấp 3 (Advanced):** Sát thương × 2.0 | Tầm đánh × 1.5 (Chi phí = 100% giá gốc)

### 🖥️ 4. Thông số Máy chủ (Server Status)
* **HP ban đầu & Tối đa:** 100 HP (Không tự hồi phục).
* **Gold khởi đầu:** 150 Gold.
* **Thưởng hoàn thành wave:** +50 Gold sau mỗi wave chơi xong.

---

## 🛠️ Hướng dẫn Cài đặt & Chạy Game
1. Clone dự án về máy cá nhân:
   ```bash
   git clone [https://github.com/](https://github.com/)<username>/firewall-defender.git



   firewall-defender/
│
├── index.html          # File chạy chính của game (chứa canvas và giao diện)
│
├── js/                 # Thư mục chứa mã nguồn JavaScript
│   ├── main.js         # Khởi tạo game loop, quản lý các wave và trạng thái game
│   ├── game.js         # Quản lý Canvas, vẽ và cập nhật màn chơi
│   ├── enemy.js        # Định nghĩa các lớp (Class) cho Quái (Virus, Phishing, DDoS...)
│   ├── tower.js        # Định nghĩa các lớp (Class) cho Lính (Firewall, Antivirus, Detector...)
│   └── utils.js        # Các hàm bổ trợ (tính khoảng cách, kiểm tra va chạm...)
│
├── assets/             # Thư mục chứa tài nguyên đa phương tiện
│   ├── images/         # Hình ảnh, sprite cho quái, lính, server, nền map
│   └── audio/          # Âm thanh nền, âm thanh khi bắn hoặc khi server mất máu
│
├── docs/               # Thư mục lưu trữ tài liệu dự án
│   └── GDD_FirewallDefender.md  # Bản sao tài liệu thiết kế game để cả nhóm theo dõi
│
└── README.md           # File mô tả tổng quan dự án (Nội dung chi tiết ở mục 2)