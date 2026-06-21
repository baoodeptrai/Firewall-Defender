// ============================================================
//  FIREWALL DEFENDER – wave.js
//  Nhiệm vụ: Quản lý bảng tốc độ spawn và popup wave
// ============================================================

const TOTAL_WAVES = 8;
const WAVE_ENEMY_COUNT = 8;

const WAVE_ENEMY_ORDER = {
  1: ['malware','phishing','malware','phishing','malware','phishing','malware','phishing'],
  2: ['malware','phishing','malware','ddos','phishing','malware','phishing','malware'],
  3: ['phishing','phishing','malware','phishing','malware','phishing','ddos','phishing'],
  4: ['malware','ddos','phishing','malware','ddos','phishing','malware','ddos'],
  5: ['ddos','ddos','malware','phishing','ddos','ransomware','ddos','phishing'],
  6: ['ransomware','malware','ddos','phishing','ransomware','malware','ddos','phishing'],
  7: ['ransomware','ddos','malware','phishing','ransomware','ddos','malware','ransomware'],
  8: ['ransomware','apt','ddos','ransomware','phishing','apt','malware','apt'],
};

const WAVE_POPUP_WAVES = [3, 5, 8];

function getWaveType(wave, index) {
  const order = WAVE_ENEMY_ORDER[wave] || WAVE_ENEMY_ORDER[1];
  return order[index % order.length];
}

function shouldShowWavePopup(wave) {
  return WAVE_POPUP_WAVES.includes(wave);
}
