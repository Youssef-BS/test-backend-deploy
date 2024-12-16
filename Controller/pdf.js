const fs = require('fs');
const PDFDocument = require('pdfkit');

const generatePDFReceipt = (data, filePath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  // Add content to PDF
  doc.fontSize(25).text('Receipt', { align: 'center' });
  doc.fontSize(12).text(`Total: ${data.total}€`);

  data.products.forEach(product => {
    doc.text(`Product: ${product.Product.title}, Quantity: ${product.quantity}, Price: ${product.Product.price * product.quantity}€`);
  });

  doc.end();
};

module.exports = { generatePDFReceipt };
