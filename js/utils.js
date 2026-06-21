// ============================================================
//  FIREWALL DEFENDER – utils.js
//  Nhiệm vụ: hàm tiện ích chung và hệ thống damage counter.
// ============================================================

function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

function isInsideRect(mx, my, rect) {
  return mx >= rect.x && mx <= rect.x + rect.w && my >= rect.y && my <= rect.y + rect.h;
}

const COUNTER_MULTIPLIERS = {
  firewall: {
    phishing: 0,
    ddos: 2,
  },
  antivirus: {
    malware: 2,
    ransomware: 1.5,
  },
};

function calculateDamage(towerConfig, enemyType, baseDamage) {
  const towerType = towerConfig.id;
  const towerTable = COUNTER_MULTIPLIERS[towerType] || {};

  if (towerTable[enemyType] !== undefined) {
    return baseDamage * towerTable[enemyType];
  }

  if (enemyType === 'malware') {
    return baseDamage * 0.5;
  }

  return baseDamage;
}

const TEST_UTILS = {
  assert(condition, message) {
    if (!condition) throw new Error(message || 'Assertion failed');
  },
  assertEqual(actual, expected, message) {
    if (actual !== expected) throw new Error(message || `Expected ${expected}, got ${actual}`);
  },
  assertNear(actual, expected, tolerance, message) {
    if (Math.abs(actual - expected) > tolerance) {
      throw new Error(message || `Expected ${expected} ± ${tolerance}, got ${actual}`);
    }
  },
};

