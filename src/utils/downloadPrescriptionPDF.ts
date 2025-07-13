import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import dayjs from 'dayjs';

export const downloadPrescriptionPDF = (prescription: any) => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    // === Header ===
    doc.setFillColor(245, 250, 255);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(30, 55, 100);
    doc.text('Prescription Report', pageWidth / 2, y, { align: 'center' });
    y += 10;

    // === Doctor Info ===
    doc.setFontSize(14);
    doc.setTextColor(40, 60, 90);
    doc.text('Doctor Information', margin, y);
    y += 2;
    doc.line(margin, y + 1, pageWidth - margin, y + 1);
    autoTable(doc, {
        startY: y + 4,
        head: [['Label', 'Details']],
        body: [
            ['Name', prescription.doctor.name],
            ['Designation', prescription.doctor.designaton],
            ['Qualification', prescription.doctor.qualification],
            ['Experience', `${prescription.doctor.experience} years`],
            ['Hospital', prescription.doctor.currentWorkingPlace],
            ['Registration No.', prescription.doctor.registrationNumber],
            ['Email', prescription.doctor.email],
            ['Contact', prescription.doctor.contactNumber],
            ['Address', prescription.doctor.address],
        ],
        margin: { left: margin, right: margin },
        theme: 'grid',
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    // === Patient Info ===
    doc.setFontSize(14);
    doc.setTextColor(40, 60, 90);
    doc.text('Patient Information', margin, y);
    doc.line(margin, y + 1, pageWidth - margin, y + 1);
    autoTable(doc, {
        startY: y + 4,
        head: [['Label', 'Details']],
        body: [
            ['Name', prescription.patient.name],
            ['Email', prescription.patient.email],
            ['Contact', prescription.patient.contactNumber],
            ['Address', prescription.patient.address],
        ],
        margin: { left: margin, right: margin },
        theme: 'grid',
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    // === Appointment Info ===
    doc.setFontSize(14);
    doc.text('Appointment Information', margin, y);
    doc.line(margin, y + 1, pageWidth - margin, y + 1);
    autoTable(doc, {
        startY: y + 4,
        head: [['Label', 'Details']],
        body: [
            ['Appointment Date', prescription.appointment.schedule?.startDateTime
                ? dayjs(prescription.appointment.schedule.startDateTime).format('MMM D, YYYY h:mm A')
                : 'N/A'],
            ['Status', prescription.appointment.status],
            ['Payment Status', prescription.appointment.paymentStatus],
            ['Follow-up Date', prescription.followUpDate
                ? dayjs(prescription.followUpDate).format('MMM D, YYYY h:mm A')
                : 'N/A'],
        ],
        margin: { left: margin, right: margin },
        theme: 'grid',
    });
    y = (doc as any).lastAutoTable.finalY + 10;

    // === Parse Instructions ===
    const instructionsText = prescription.instructions || '';
    const [medicationBlock, ...instructionsBlock] = instructionsText.split('Instructions:');
    const meds = parseMedicationBlock(medicationBlock);
    const instructions = instructionsBlock.join(' ').trim();

    // === Medication Table ===
    if (meds.name) {
        doc.setFontSize(14);
        doc.text('Medications', margin, y);
        doc.line(margin, y + 1, pageWidth - margin, y + 1);
        autoTable(doc, {
            startY: y + 4,
            head: [['Medicine Name', 'Dosage', 'Frequency', 'Duration']],
            body: [[meds.name, meds.dosage, meds.frequency, meds.duration]],
            margin: { left: margin, right: margin },
            theme: 'grid',
        });
        y = (doc as any).lastAutoTable.finalY + 10;
    }

    // === Instruction Box ===
    doc.setFontSize(14);
    doc.text('Instructions', margin, y);
    doc.line(margin, y + 1, pageWidth - margin, y + 1);

    const instructionLines = doc.splitTextToSize(instructions, contentWidth);
    const instructionHeight = instructionLines.length * 6 + 12;

    // Add new page if space is insufficient
    if (y + instructionHeight + 30 > 280) {
        doc.addPage();
        y = margin;
    }

    doc.setFillColor(230, 245, 245);
    doc.roundedRect(margin - 2, y + 4, contentWidth + 4, instructionHeight, 3, 3, 'F');

    doc.setFontSize(11);
    doc.setTextColor(40, 50, 60);
    doc.text(instructionLines, margin, y + 12, {
        maxWidth: contentWidth,
        lineHeightFactor: 1.5,
    });
    y += instructionHeight + 15;

    // === Footer ===
    doc.setDrawColor(200);
    doc.setLineWidth(0.4);
    doc.line(margin, 285 - 4, pageWidth - margin, 285 - 4);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(130);
    doc.text(`Generated on ${dayjs().format('MMM D, YYYY [at] hh:mm A')}`, margin, 285);

    const fileName = `Prescription-${prescription.doctor.name.replace(/\s+/g, '-')}.pdf`;
    doc.save(fileName);
};

// === Helper: Parse medication block ===
function parseMedicationBlock(text: string) {
    const name = text.match(/Medication:\s*(.+)/)?.[1]?.trim() || '';
    const dosage = text.match(/Dosage:\s*(.+)/)?.[1]?.trim() || '';
    const frequency = dosage.match(/\((.*?)\)/)?.[1] || '';
    const duration = text.match(/Duration:\s*(.+)/)?.[1]?.trim() || '';
    return { name, dosage, frequency, duration };
}
