/**
 * Official Donation Receipt PDF Generator for Manchi Panulu Sewa Foundation
 * Generates a high-resolution, Unicode-safe (English/Telugu/Hindi/₹) A4 PDF
 * using HTML5 Canvas rendering + standards-compliant PDF 1.4 /DCTDecode stream.
 */

let cachedLogoImg = null;
let logoLoadPromise = null;

/**
 * Preload the official foundation logo so receipt generation is instant & synchronous-ready.
 */
export function preloadFoundationLogo() {
  if (cachedLogoImg) return Promise.resolve(cachedLogoImg);
  if (logoLoadPromise) return logoLoadPromise;

  logoLoadPromise = new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const timer = setTimeout(() => resolve(null), 1500);

    img.onload = () => {
      clearTimeout(timer);
      cachedLogoImg = img;
      resolve(img);
    };
    img.onerror = () => {
      clearTimeout(timer);
      resolve(null);
    };
    img.src = '/logo.jpg';
  });

  return logoLoadPromise;
}

/**
 * Draw a rounded rectangle path.
 */
function drawRoundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * Wrap text into multiple lines within maxWidth and return the bottom Y coordinate.
 */
function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, align = 'left') {
  const str = String(text || '');
  const words = str.split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }

  ctx.textAlign = align;
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + i * lineHeight);
  }

  return lines.length;
}

/**
 * Convert an HTML5 Canvas into a standards-compliant A4 PDF 1.4 Blob.
 */
export function canvasToPdfBlob(canvas) {
  const dataUrl = canvas.toDataURL('image/jpeg', 0.94);
  const base64 = dataUrl.split(',')[1];
  const binaryString = atob(base64);
  const jpegBytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    jpegBytes[i] = binaryString.charCodeAt(i);
  }

  const encoder = new TextEncoder();
  const chunks = [];
  let offset = 0;

  const pushBytes = (bytes) => {
    chunks.push(bytes);
    offset += bytes.length;
  };

  const pushStr = (str) => {
    pushBytes(encoder.encode(str));
  };

  // PDF 1.4 header + binary hint comment
  pushBytes(
    new Uint8Array([
      0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a,
      0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a
    ])
  );

  const offsets = [0]; // Object 0 is always free

  // Object 1: Catalog
  offsets.push(offset);
  pushStr('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');

  // Object 2: Pages tree
  offsets.push(offset);
  pushStr('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');

  // Object 3: A4 Page (595.28 x 841.89 pt)
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  offsets.push(offset);
  pushStr(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /XObject << /Im0 4 0 R >> >> /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents 5 0 R >>\nendobj\n`
  );

  // Object 4: JPEG Image XObject (DCTDecode)
  offsets.push(offset);
  pushStr(
    `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`
  );
  pushBytes(jpegBytes);
  pushStr('\nendstream\nendobj\n');

  // Object 5: Page Content Stream
  const streamContent = `q ${pageWidth} 0 0 ${pageHeight} 0 0 cm /Im0 Do Q\n`;
  offsets.push(offset);
  pushStr(`5 0 obj\n<< /Length ${streamContent.length} >>\nstream\n${streamContent}endstream\nendobj\n`);

  // Cross-reference table
  const xrefOffset = offset;
  pushStr(`xref\n0 ${offsets.length}\n`);
  pushStr('0000000000 65535 f \n');
  for (let i = 1; i < offsets.length; i++) {
    pushStr(`${String(offsets[i]).padStart(10, '0')} 00000 n \n`);
  }

  // Trailer & EOF
  pushStr(`trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);

  const pdfBytes = new Uint8Array(offset);
  let cursor = 0;
  for (const chunk of chunks) {
    pdfBytes.set(chunk, cursor);
    cursor += chunk.length;
  }

  return new Blob([pdfBytes], { type: 'application/pdf' });
}

/**
 * Render an official A4 Donation Receipt onto canvas and return a PDF Blob + filename.
 *
 * @param {Object} receiptData
 * @param {Object} [localized] - optional localized strings (receiptTitle, downloadBtn, etc.)
 * @returns {Promise<{ blob: Blob, filename: string }>}
 */
export async function generateDonationReceiptPdf(receiptData, localized = {}) {
  // Ensure loaded web fonts & official logo are ready (with fast timeouts so click never stalls)
  try {
    await Promise.race([
      document.fonts?.ready || Promise.resolve(),
      new Promise((resolve) => setTimeout(resolve, 450))
    ]);
  } catch {
    // Proceed cleanly if fonts API unavailable
  }

  const logoImg = await preloadFoundationLogo();

  // High-resolution A4 canvas (150 DPI equivalent: 1240 x 1754)
  const W = 1240;
  const H = 1754;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const HEADING_FONT = "'Fraunces', 'Noto Sans Telugu', 'Noto Sans Devanagari', Georgia, serif";
  const BODY_FONT = "'Plus Jakarta Sans', 'Noto Sans Telugu', 'Noto Sans Devanagari', system-ui, -apple-system, sans-serif";
  const MONO_FONT = "ui-monospace, 'Cascadia Mono', 'Segoe UI Mono', Consolas, monospace";

  // 1. Background archival paper
  ctx.fillStyle = '#FDFCF8';
  ctx.fillRect(0, 0, W, H);

  // Outer Forest Green Border & Inner Warm Gold Frame
  ctx.strokeStyle = '#0C261A';
  ctx.lineWidth = 10;
  ctx.strokeRect(32, 32, W - 64, H - 64);

  ctx.strokeStyle = '#D4A43E';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(48, 48, W - 96, H - 96);

  // Subtle corner diamond accents
  const corners = [
    [48, 48],
    [W - 48, 48],
    [48, H - 48],
    [W - 48, H - 48]
  ];
  ctx.fillStyle = '#D4A43E';
  for (const [cx, cy] of corners) {
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Top Header Band
  const headerX = 82;
  const headerY = 82;
  const headerW = W - 164;
  const headerH = 225;

  drawRoundedRect(ctx, headerX, headerY, headerW, headerH, 20);
  ctx.fillStyle = '#EFF6EC';
  ctx.fill();
  ctx.strokeStyle = '#B8D4AE';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Circular Foundation Logo in Header
  const logoCx = headerX + 108;
  const logoCy = headerY + headerH / 2;
  const logoRadius = 78;

  ctx.save();
  ctx.beginPath();
  ctx.arc(logoCx, logoCy, logoRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  if (logoImg) {
    ctx.drawImage(logoImg, logoCx - logoRadius, logoCy - logoRadius, logoRadius * 2, logoRadius * 2);
  } else {
    ctx.fillStyle = '#0C261A';
    ctx.fillRect(logoCx - logoRadius, logoCy - logoRadius, logoRadius * 2, logoRadius * 2);
  }
  ctx.restore();

  // Gold circle ring around logo
  ctx.beginPath();
  ctx.arc(logoCx, logoCy, logoRadius + 3, 0, Math.PI * 2);
  ctx.strokeStyle = '#D4A43E';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Foundation Name & Registration Details
  const titleX = headerX + 218;
  ctx.fillStyle = '#0C261A';
  ctx.font = `700 36px ${HEADING_FONT}`;
  ctx.textAlign = 'left';
  ctx.fillText('MANCHI PANULU SEWA FOUNDATION', titleX, headerY + 72);

  ctx.fillStyle = '#1B4D34';
  ctx.font = `700 22px ${BODY_FONT}`;
  ctx.fillText('Registered Public Charitable Trust  •  Govt. Reg. No. 420/2026', titleX, headerY + 114);

  ctx.fillStyle = '#3B5446';
  ctx.font = `500 18px ${BODY_FONT}`;
  ctx.fillText('Serve Humanity  •  Protect Nature  •  Hyderabad & Visakhapatnam, India', titleX, headerY + 152);

  ctx.fillStyle = '#1B4D34';
  ctx.font = `600 17px ${BODY_FONT}`;
  ctx.fillText('Trust PAN: AAATM0000A   |   donations@manchipanulusewa.org   |   80G Eligible Sewa Trust', titleX, headerY + 186);

  // 3. Dark Forest Ribbon Banner
  const bannerY = headerY + headerH + 34;
  const bannerH = localized?.subtitle && localized.subtitle !== 'Official Sewa Contribution Acknowledgment' ? 92 : 76;

  drawRoundedRect(ctx, headerX, bannerY, headerW, bannerH, 14);
  ctx.fillStyle = '#0C261A';
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 26px ${BODY_FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('OFFICIAL DONATION RECEIPT & CONTRIBUTION ACKNOWLEDGMENT', W / 2, bannerY + (bannerH === 92 ? 42 : 47));

  if (bannerH === 92 && localized?.subtitle) {
    ctx.fillStyle = '#8FE068';
    ctx.font = `600 19px ${BODY_FONT}`;
    ctx.fillText(localized.subtitle, W / 2, bannerY + 73);
  }

  // 4. Watermark in Center
  if (logoImg) {
    ctx.save();
    ctx.globalAlpha = 0.055;
    const wmRadius = 235;
    const wmCx = W / 2;
    const wmCy = 980;
    ctx.beginPath();
    ctx.arc(wmCx, wmCy, wmRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(logoImg, wmCx - wmRadius, wmCy - wmRadius, wmRadius * 2, wmRadius * 2);
    ctx.restore();
  }

  // 5. Receipt Number & Date Strip
  const metaY = bannerY + bannerH + 30;
  const halfW = (headerW - 24) / 2;

  // Left card: Receipt No
  drawRoundedRect(ctx, headerX, metaY, halfW, 92, 12);
  ctx.fillStyle = '#F5FAF2';
  ctx.fill();
  ctx.strokeStyle = '#C7DFC0';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.fillStyle = '#4B6356';
  ctx.font = `600 17px ${BODY_FONT}`;
  ctx.fillText('RECEIPT NUMBER', headerX + 24, metaY + 34);
  ctx.fillStyle = '#0C261A';
  ctx.font = `700 26px ${MONO_FONT}`;
  ctx.fillText(receiptData.receiptNo, headerX + 24, metaY + 70);

  // Right card: Date
  const rightX = headerX + halfW + 24;
  drawRoundedRect(ctx, rightX, metaY, halfW, 92, 12);
  ctx.fillStyle = '#F5FAF2';
  ctx.fill();
  ctx.strokeStyle = '#C7DFC0';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.fillStyle = '#4B6356';
  ctx.font = `600 17px ${BODY_FONT}`;
  ctx.fillText('DATE OF ISSUE', rightX + 24, metaY + 34);
  ctx.fillStyle = '#0C261A';
  ctx.font = `700 24px ${BODY_FONT}`;
  ctx.fillText(receiptData.date, rightX + 24, metaY + 70);

  // 6. Donor & Contribution Details Table
  const tableX = headerX;
  const tableY = metaY + 116;
  const tableW = headerW;
  const labelW = 330;
  const valueX = tableX + labelW + 24;
  const valueMaxW = tableW - labelW - 52;

  const isDomestic = receiptData.type === 'domestic';
  const rows = [
    { label: 'Donor Name', value: receiptData.donorName || 'Kind Benefactor', multiline: true, bold: true },
    { label: 'Email Address', value: receiptData.donorEmail || 'N/A', multiline: true },
    {
      label: isDomestic ? 'Mobile Number' : 'Country of Residence',
      value: isDomestic ? receiptData.donorPhone || 'N/A' : receiptData.country || 'International'
    },
    {
      label: isDomestic ? 'Donor PAN (80G)' : 'Organization / Category',
      value: receiptData.donorPan && receiptData.donorPan !== 'N/A' ? receiptData.donorPan : 'Not Provided'
    },
    {
      label: 'Contribution Channel',
      value: isDomestic
        ? 'Domestic Indian Transfer (INR / UPI / NEFT / IMPS)'
        : `International Support Registration (${receiptData.currency})`
    },
    {
      label: 'Allocated Sewa Pillar',
      value: receiptData.cause || 'Where Most Needed (General Sewa)',
      multiline: true,
      bold: true
    }
  ];

  // Pre-calculate total height for table border
  let totalTableHeight = 0;
  ctx.font = `600 21px ${BODY_FONT}`;
  const rowHeights = rows.map((row) => {
    if (!row.multiline) return 66;
    const words = String(row.value || '').split(/\s+/);
    let line = '';
    let lineCount = 1;
    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      if (ctx.measureText(test).width > valueMaxW && line) {
        lineCount++;
        line = w;
      } else {
        line = test;
      }
    }
    return Math.max(66, 32 + lineCount * 28);
  });
  totalTableHeight = rowHeights.reduce((acc, h) => acc + h, 0);

  // Table card outer box
  drawRoundedRect(ctx, tableX, tableY, tableW, totalTableHeight, 16);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
  ctx.fill();
  ctx.strokeStyle = '#C7DFC0';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw rows
  let rowY = tableY;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rh = rowHeights[i];

    if (i % 2 === 1) {
      ctx.fillStyle = 'rgba(239, 246, 236, 0.55)';
      ctx.fillRect(tableX + 2, rowY, tableW - 4, rh - (i === rows.length - 1 ? 6 : 0));
    }

    if (i > 0) {
      ctx.strokeStyle = '#E1EDE0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tableX + 20, rowY);
      ctx.lineTo(tableX + tableW - 20, rowY);
      ctx.stroke();
    }

    // Label
    ctx.textAlign = 'left';
    ctx.fillStyle = '#4B6356';
    ctx.font = `600 20px ${BODY_FONT}`;
    ctx.fillText(row.label, tableX + 26, rowY + 40);

    // Value
    ctx.fillStyle = '#0C261A';
    ctx.font = `${row.bold ? '700' : '600'} 21px ${BODY_FONT}`;
    if (row.multiline) {
      drawWrappedText(ctx, row.value, valueX, rowY + 39, valueMaxW, 28, 'left');
    } else {
      drawWrappedText(ctx, row.value, valueX, rowY + 40, valueMaxW, 28, 'left');
    }

    rowY += rh;
  }

  // 7. Highlighted Amount Contributed Box
  const amountBoxY = tableY + totalTableHeight + 26;
  const amountBoxH = 120;

  drawRoundedRect(ctx, tableX, amountBoxY, tableW, amountBoxH, 16);
  ctx.fillStyle = '#E7F5DF';
  ctx.fill();
  ctx.strokeStyle = '#78C953';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.fillStyle = '#1B4D34';
  ctx.font = `700 18px ${BODY_FONT}`;
  ctx.fillText('TOTAL CONTRIBUTION RECEIVED', tableX + 30, amountBoxY + 45);

  ctx.fillStyle = '#3B5446';
  ctx.font = `600 18px ${BODY_FONT}`;
  ctx.fillText(
    isDomestic ? 'Status: Verified Sewa Acknowledgment (INR)' : `Status: Overseas Pledge Logged (${receiptData.currency})`,
    tableX + 30,
    amountBoxY + 80
  );

  // Formatted currency display on right
  const safeAmt = Number(receiptData.amount) || 0;
  const formattedAmt =
    receiptData.currency === 'INR'
      ? `₹${safeAmt.toLocaleString('en-IN')}`
      : `${receiptData.currency === 'USD' ? '$' : receiptData.currency === 'EUR' ? '€' : receiptData.currency === 'GBP' ? '£' : ''}${safeAmt.toLocaleString('en-US')} ${receiptData.currency}`;

  ctx.textAlign = 'right';
  ctx.fillStyle = '#0C261A';
  ctx.font = `800 46px ${BODY_FONT}`;
  ctx.fillText(formattedAmt, tableX + tableW - 32, amountBoxY + 74);

  // 8. Statutory 80G & Transparency Declaration
  const declY = amountBoxY + amountBoxH + 24;
  const declH = 148;

  drawRoundedRect(ctx, tableX, declY, tableW, declH, 14);
  ctx.fillStyle = '#FAF8F0';
  ctx.fill();
  ctx.strokeStyle = '#E2D4A6';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.fillStyle = '#7C5714';
  ctx.font = `700 18px ${BODY_FONT}`;
  ctx.fillText('STATUTORY COMPLIANCE & IMPACT DECLARATION', tableX + 26, declY + 34);

  ctx.fillStyle = '#4B554E';
  ctx.font = `500 17.5px ${BODY_FONT}`;
  const declarationText = isDomestic
    ? 'Thank you for your generous support to Manchi Panulu Sewa Foundation (Govt. Reg. No. 420/2026). Donations are eligible for 50% Tax Exemption under Section 80G of the Indian Income Tax Act (subject to PAN & statutory terms). 100% of funds directly sustain tree plantation, food sewa, waterbody revival, and community care.'
    : 'Thank you for expressing support for Manchi Panulu Sewa Foundation (Govt. Reg. No. 420/2026). In full compliance with the Foreign Contribution Regulation Act (FCRA), international remittances are routed strictly through authorized channels once cleared. Our trustee desk will coordinate directly with you via email.';

  drawWrappedText(ctx, declarationText, tableX + 26, declY + 64, tableW - 52, 25, 'left');

  // 9. Footer Official Circular Seal & Authorized Signatory (strictly positioned above bottom motto bar)
  const mottoY = H - 96;
  const sigY = Math.min(declY + declH + 28, mottoY - 178);

  // Left: Drawn Circular Seal
  const sealCx = tableX + 110;
  const sealCy = sigY + 76;

  ctx.save();
  ctx.strokeStyle = '#1B4D34';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(sealCx, sealCy, 76, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#78C953';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.arc(sealCx, sealCy, 66, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#0C261A';
  ctx.font = `800 12px ${BODY_FONT}`;
  ctx.fillText('MANCHI PANULU SEWA', sealCx, sealCy - 18);
  ctx.fillText('FOUNDATION', sealCx, sealCy - 2);
  ctx.fillStyle = '#1B4D34';
  ctx.font = `700 13px ${MONO_FONT}`;
  ctx.fillText('REG. 420/2026', sealCx, sealCy + 18);
  ctx.fillStyle = '#3B5446';
  ctx.font = `700 11px ${BODY_FONT}`;
  ctx.fillText('OFFICIAL SEAL', sealCx, sealCy + 36);
  ctx.restore();

  // Right: Authorized Signatory block
  const sigRightX = tableX + tableW - 24;
  ctx.textAlign = 'right';

  // Stylized signature accent
  ctx.fillStyle = '#1B4D34';
  ctx.font = `italic 600 32px ${HEADING_FONT}`;
  ctx.fillText('Manchi Panulu Sewa Trust', sigRightX, sigY + 70);

  // Signature line
  ctx.strokeStyle = '#0C261A';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(sigRightX - 340, sigY + 86);
  ctx.lineTo(sigRightX, sigY + 86);
  ctx.stroke();

  ctx.fillStyle = '#0C261A';
  ctx.font = `700 19px ${BODY_FONT}`;
  ctx.fillText('Authorized Signatory / Managing Trustee', sigRightX, sigY + 114);

  ctx.fillStyle = '#4B6356';
  ctx.font = `500 15.5px ${BODY_FONT}`;
  ctx.fillText('Digitally generated receipt — valid without physical signature', sigRightX, sigY + 142);

  // 10. Bottom Motto Bar
  drawRoundedRect(ctx, 82, mottoY, W - 164, 42, 21);
  ctx.fillStyle = '#0C261A';
  ctx.fill();

  ctx.fillStyle = '#E2B357';
  ctx.font = `italic 600 18px ${HEADING_FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('“Manchi Panulu... Manchi Samajam... Manchi Bhavishyat...”  •  Every Good Deed Today Shapes Tomorrow', W / 2, mottoY + 27);

  const blob = canvasToPdfBlob(canvas);
  const safeReceiptNo = (receiptData.receiptNo || 'RECEIPT').replace(/[^a-zA-Z0-9_-]/g, '');
  const filename = `MPSF-Receipt-${safeReceiptNo}.pdf`;

  return { blob, filename };
}

/**
 * Trigger a reliable browser download for a generated PDF Blob or Object URL.
 */
export function triggerUrlDownload(url, filename) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.rel = 'noopener noreferrer';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  }, 500);
}
