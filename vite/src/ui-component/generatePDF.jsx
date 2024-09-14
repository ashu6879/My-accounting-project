import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Make sure to import the autotable plugin
const logoBase64 = 'data:image/png;base64,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'; // Replace with your actual Base64 string

import 'jspdf-autotable'; // Ensure to import the autotable plugin

export const generatePDF = async (invoice) => {
    try {
        // Fetch invoice data from API
        const invoiceResponse = await fetch(`http://ec2-13-233-96-56.ap-south-1.compute.amazonaws.com:8181/getInvoiceItemByInvID/${invoice.invID}`);
        if (!invoiceResponse.ok) {
            throw new Error(`Failed to fetch invoice data: ${invoiceResponse.statusText}`);
        }
        const invoiceData = await invoiceResponse.json();
        console.log('Invoice Data:', invoiceData);

        let currencies = invoice.currency; // Default currency
        if (invoice.currencyID) {
            // Fetch currencies data from API if currencyID is present
            const currenciesResponse = await fetch(`http://ec2-13-233-96-56.ap-south-1.compute.amazonaws.com:8181/currencies/${invoice.currencyID}`);
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

