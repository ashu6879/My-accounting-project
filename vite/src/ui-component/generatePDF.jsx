import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Make sure to import the autotable plugin
const logoBase64 = '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'; // Replace with your actual Base64 string

import 'jspdf-autotable'; // Ensure to import the autotable plugin

export const generatePDF = async (invoice) => {
    try {
        // Fetch invoice data from API
        const invoiceResponse = await fetch(`https://my-accounting-u7vs.onrender.com/getInvoiceItemByInvID/${invoice.invID}`);
        if (!invoiceResponse.ok) {
            throw new Error(`Failed to fetch invoice data: ${invoiceResponse.statusText}`);
        }
        const invoiceData = await invoiceResponse.json();
        console.log('Invoice Data:', invoiceData);

        let currencies = invoice.currency; // Default currency
        if (invoice.currencyID) {
            // Fetch currencies data from API if currencyID is present
            const currenciesResponse = await fetch(`https://my-accounting-u7vs.onrender.com/currencies/${invoice.currencyID}`);
            if (!currenciesResponse.ok) {
                throw new Error(`Failed to fetch currencies data: ${currenciesResponse.statusText}`);
            }
            currencies = await currenciesResponse.json();
            console.log(currencies.currency);
        }

        // Create a new PDF document
        const doc = new jsPDF();

        // Add logo at the top
        const logoWidth = 30;
        const logoHeight = 20;
        const logoX = 10;
        const logoY = 10;
        doc.addImage(logoBase64, 'PNG', logoX, logoY, logoWidth, logoHeight);

        // Header section
        doc.setFillColor(200, 200, 200); // Light gray background for the header
        doc.rect(0, 40, doc.internal.pageSize.width, 40, 'F'); // Draw background rectangle

        // Company details
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('Invoice', 10, 55);

        // Add invoice number and date in one line
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(`Invoice Number: #${invoice.invNum}`, 10, 70);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 190, 70, { align: 'right' });

        // Client details
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Client Details', 10, 90);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Client Name: ${invoice.clientName || 'N/A'}`, 10, 105);
        doc.text(`Address: ${invoice.clientAddress || 'N/A'}`, 10, 115, { maxWidth: 190 });
        doc.text(`Phone: ${invoice.clientPhone || 'N/A'}`, 10, 125);
        doc.text(`Email: ${invoice.clientEmail || 'N/A'}`, 10, 135);

        // Project details
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Project Details', 10, 155);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Title: ${invoice.projectTitle || 'N/A'}`, 10, 170);
        doc.text(`Serviced By: ${invoice.ServicedBy || 'N/A'}`, 10, 180);
        doc.text(`Sale Done By: ${invoice.SaledoneBy || 'N/A'}`, 10, 190);

        // Invoice Items header
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Invoice Items', 10, 210);

        // Add table with invoice items
        doc.autoTable({
            startY: 220,
            head: [['Description', 'Quantity', 'Rate', 'Total']],
            body: invoiceData.map(item => [
                item.itemDesc || 'N/A',
                typeof item.itemQty === 'number' ? item.itemQty.toString() : '0',
                typeof item.itemRate === 'number' ? item.itemRate.toFixed(2) : '0.00',
                (typeof item.itemQty === 'number' && typeof item.itemRate === 'number')
                    ? (item.itemQty * item.itemRate).toFixed(2)
                    : '0.00',
            ]),
            theme: 'grid',
            headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255], fontSize: 12, fontStyle: 'bold' },
            bodyStyles: { fontSize: 10, textColor: [50, 50, 50] },
            styles: { cellPadding: 6, font: 'helvetica', overflow: 'linebreak' },
            columnStyles: {
                0: { cellWidth: 'auto', fontStyle: 'normal' },
                1: { cellWidth: 40 },
                2: { cellWidth: 50 },
                3: { cellWidth: 50 }
            },
            margin: { top: 10 },
            tableLineColor: [0, 0, 0],
            tableLineWidth: 0.75,
            headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255], fontStyle: 'bold' },
            bodyStyles: { textColor: [50, 50, 50] }
        });

        // Add total price and currency type
        const totalAmount = invoiceData.reduce((sum, item) =>
            sum + (item.itemQty * item.itemRate), 0
        ).toFixed(2);
        const yOffset = doc.lastAutoTable.finalY + 15;

        const currency = invoice.currency || currencies.currency;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(`Total Amount: ${totalAmount} ${currency}`, 10, yOffset);
        doc.text(`Client GST Number: ${invoice.clientGst || 'N/A'}`, 10, yOffset + 20);

        // Add remarks
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Remarks: ${invoice.remarks || 'N/A'}`, 10, yOffset + 35);

        // Add additional information
        doc.text(`Approved By: ${invoice.ApprovedBy || 'N/A'}`, 10, yOffset + 50);
        doc.text(`Progress By: ${invoice.ProgressBy || 'N/A'}`, 10, yOffset + 65);

        // Add footer
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text('Thank you for your business!', 190, doc.internal.pageSize.height - 10, { align: 'right' });

        // Save the PDF
        doc.save(`${invoice.invNum}.pdf`);


    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};

