// ============================================================
//  FIREWALL DEFENDER – wave.js
//  Nhiệm vụ: Quản lý cấu hình wave, spawn delay và pause giữa các wave
// ============================================================

const WAVE_CONFIG = [
  {
    wave: 1,
    enemies: ['malware', 'phishing', 'malware', 'phishing', 'malware', 'phishing', 'malware', 'phishing'],
    spawnDelay: 1.4,
    pauseAfter: 3.0,
  },
  {
    wave: 2,
    enemies: ['malware', 'phishing', 'malware', 'ddos', 'phishing', 'malware', 'phishing', 'malware'],
    spawnDelay: 1.3,
    pauseAfter: 3.0,
  },
  {
    wave: 3,
    enemies: ['phishing', 'phishing', 'malware', 'phishing', 'malware', 'phishing', 'ddos', 'phishing'],
    spawnDelay: 1.2,
    pauseAfter: 3.0,
  },
  {
    wave: 4,
    enemies: ['malware', 'ddos', 'phishing', 'malware', 'ddos', 'phishing', 'malware', 'ddos'],
    spawnDelay: 1.1,
    pauseAfter: 3.0,
  },
  {
    wave: 5,
    enemies: ['ddos', 'ddos', 'malware', 'phishing', 'ddos', 'ransomware', 'ddos', 'phishing'],
    spawnDelay: 1.0,
    pauseAfter: 3.0,
  },
  {
    wave: 6,
    enemies: ['ransomware', 'malware', 'ddos', 'phishing', 'ransomware', 'malware', 'ddos', 'phishing'],
    spawnDelay: 0.9,
    pauseAfter: 3.0,
  },
  {
    wave: 7,
    enemies: ['ransomware', 'ddos', 'malware', 'phishing', 'ransomware', 'ddos', 'malware', 'ransomware'],
    spawnDelay: 0.8,
    pauseAfter: 3.0,
  },
  {
    wave: 8,
    enemies: ['ransomware', 'apt', 'ddos', 'ransomware', 'phishing', 'apt', 'malware', 'apt'],
    spawnDelay: 0.7,
    pauseAfter: 3.0,
  },
];

const TOTAL_WAVES = WAVE_CONFIG.length;
const WAVE_POPUP_WAVES = [1, 2, 3, 4, 5, 6, 7, 8];

function getWaveConfig(wave) {
  return WAVE_CONFIG[wave - 1] || WAVE_CONFIG[0];
}

function getWaveEnemyCount(wave) {
  return getWaveConfig(wave).enemies.length;
}

function getWaveEnemyType(wave, index) {
  const config = getWaveConfig(wave);
  return config.enemies[index % config.enemies.length];
}

function getWaveSpawnDelay(wave) {
  return getWaveConfig(wave).spawnDelay;
}

function getWavePauseDuration(wave) {
  const config = getWaveConfig(wave);
  return config.pauseAfter ?? 3.0;
}

function shouldShowWavePopup(wave) {
  return WAVE_POPUP_WAVES.includes(wave);
}
