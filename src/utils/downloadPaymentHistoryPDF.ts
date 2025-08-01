import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import dayjs from 'dayjs';

export const downloadPaymentHistoryPDF = (prescription: any) => {
    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = margin;

    doc.setFillColor(245, 250, 255);
    doc.rect(0, 0, 210, 297, 'F');

    // Header
    doc.setFontSize(18);
    doc.setTextColor(30, 64, 175);
    doc.setFont('helvetica', 'bold');
    doc.text('Payment History Receipt', pageWidth / 2, y, { align: 'center' });
    y += 10;

    // Doctor
    doc.setFontSize(14);
    doc.setTextColor(40, 60, 90);
    doc.text('Doctor Details', margin, y);
    y += 2;
    doc.line(margin, y + 1, pageWidth - margin, y + 1);
    autoTable(doc, {
        startY: y + 4,
        head: [['Field', 'Value']],
        body: [
            ['Name', prescription?.doctor?.name || 'N/A'],
            ['Email', prescription?.doctor?.email || 'N/A'],
            ['Contact', prescription?.doctor?.contactNumber || 'N/A'],
        ],
        margin: { left: margin, right: margin },
        theme: 'grid',
    });

    y = (doc as any).lastAutoTable.finalY + 10;

    // Appointment Info
    doc.text('Appointment Details', margin, y);
    doc.line(margin, y + 1, pageWidth - margin, y + 1);
    autoTable(doc, {
        startY: y + 4,
        head: [['Field', 'Value']],
        body: [
            ['Appointment Date', dayjs(prescription?.appointment?.schedule?.startDateTime).format('MMM D, YYYY h:mm A')],
            ['Status', prescription?.appointment?.status || 'N/A'],
        ],
        margin: { left: margin, right: margin },
        theme: 'grid',
    });

    y = (doc as any).lastAutoTable.finalY + 10;

    // Payment Info
    doc.text('Payment Details', margin, y);
    doc.line(margin, y + 1, pageWidth - margin, y + 1);
    autoTable(doc, {
        startY: y + 4,
        head: [['Field', 'Value']],
        body: [
            ['Transaction ID', prescription?.appointment?.payment?.transactionId || 'N/A'],
            ['Amount', `$${prescription?.appointment?.payment?.amount || '0'}`],
            ['Status', prescription?.appointment?.payment?.status || 'N/A'],
        ],
        margin: { left: margin, right: margin },
        theme: 'grid',
    });

    y = (doc as any).lastAutoTable.finalY + 15;

    // Footer
    doc.setDrawColor(180);
    doc.line(margin, 285 - 4, pageWidth - margin, 285 - 4);
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.setFont('helvetica', 'italic');
    doc.text(`Generated on ${dayjs().format('MMM D, YYYY [at] hh:mm A')}`, margin, 285);

    const fileName = `Payment-Receipt-${prescription?.doctor?.name?.replace(/\s+/g, '-') || 'Doctor'}.pdf`;
    doc.save(fileName);
};