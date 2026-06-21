// ============================================================
//  FIREWALL DEFENDER – ui.js
//  Nhiệm vụ: hàm vẽ hỗ trợ cho giao diện và đối tượng cửa sổ
// ============================================================

function drawDialogBox(ctx, x, y, w, h, borderColor) {
  ctx.fillStyle = '#0D2137';
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);
}

function drawButton(ctx, rect, label, bgColor = COLORS.CYAN) {
  ctx.fillStyle = bgColor;
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1;
  ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
  ctx.fillStyle = '#0A1628';
  ctx.font = "bold 13px 'Courier New'";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, rect.x + rect.w / 2, rect.y + rect.h / 2);
  ctx.textBaseline = 'alphabetic';
}

function drawIconText(ctx, x, y, icon, text, color) {
  ctx.fillStyle = color;
  ctx.font = "bold 12px 'Courier New'";
  ctx.textAlign = 'left';
  ctx.fillText(`${icon} ${text}`, x, y);
}
