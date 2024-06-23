document.getElementById('calculate-btn').addEventListener('click', calculateSides);

function calculateSides() {
    const a = parseFloat(document.getElementById('side-a').value);
    const b = parseFloat(document.getElementById('side-b').value);
    const c = parseFloat(document.getElementById('side-c').value);
    let result = '';

    if (!isNaN(a) && !isNaN(b) && isNaN(c)) {
        result = `Hypotenuse (c) = ${Math.sqrt(a * a + b * b).toFixed(2)}`;
    } else if (!isNaN(a) && isNaN(b) && !isNaN(c)) {
        result = `Base (b) = ${Math.sqrt(c * c - a * a).toFixed(2)}`;
    } else if (isNaN(a) && !isNaN(b) && !isNaN(c)) {
        result = `Perpendicular (a) = ${Math.sqrt(c * c - b * b).toFixed(2)}`;
    } else {
        result = 'Please enter exactly two sides to calculate the third.';
    }

    document.getElementById('result').innerText = result;
    drawTriangle(a, b, c);
}

function drawTriangle(a, b, c) {
    const canvas = document.getElementById('triangle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isNaN(a) && !isNaN(b)) {
        c = Math.sqrt(a * a + b * b);
    } else if (!isNaN(a) && !isNaN(c)) {
        b = Math.sqrt(c * c - a * a);
    } else if (!isNaN(b) && !isNaN(c)) {
        a = Math.sqrt(c * c - b * b);
    } else {
        return;
    }

    const scaleFactor = Math.min(canvas.width / (b + c), canvas.height / (a + c));

    a *= scaleFactor;
    b *= scaleFactor;
    c *= scaleFactor;

    const x0 = canvas.width / 2 - b / 2;
    const y0 = canvas.height / 2 + a / 2;
    const x1 = x0 + b;
    const y1 = y0;
    const x2 = x0;
    const y2 = y0 - a;

    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();

    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#4CAF50';
    ctx.font = '14px Arial';
    ctx.fillText(`a = ${a / scaleFactor}`, (x0 + x2) / 2, (y0 + y2) / 2 - 10);
    ctx.fillText(`b = ${b / scaleFactor}`, (x0 + x1) / 2, y0 + 20);
    ctx.fillText(`c = ${c / scaleFactor}`, x1 + 10, (y1 + y2) / 2);
}
