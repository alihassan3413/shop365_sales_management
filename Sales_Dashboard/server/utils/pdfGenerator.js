// utils/pdfGenerator.js
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const generatePDF = async (data) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Add title
  doc.setFontSize(20);
  doc.text("Sales Report", pageWidth / 2, 20, { align: "center" });

  // Add generated date
  doc.setFontSize(12);
  doc.text(`Generated on: ${data.generatedDate}`, pageWidth / 2, 30, {
    align: "center",
  });

  // Add summary table
  const summaryData = [
    ["Total Sales", `${data.totalSales.toFixed(2)}PKR`],
    ["Bank Deposits", `${data.totalBank.toFixed(2)}PKR`],
    ["Card Swipe", `${data.totalCardSwipe.toFixed(2)}PKR`],
    ["Cash", `${data.totalCash.toFixed(2)}PKR`],
    ["Daily Expenses", `${data.totalDailyExpenses.toFixed(2)}PKR`],
    ["Other Expenses", `${data.totalOtherExpenses.toFixed(2)}PKR`],
    ["Bills Paid", `${data.totalBillsPaid.toFixed(2)}PKR`],
    ["Pending Payments", `${data.pendingBills.toFixed(2)}PKR`],
    ["Card Swipe Fee (1%)", `${data.cardSwipeFee.toFixed(2)}PKR`],
  ];

  doc.autoTable({
    startY: 40,
    head: [["Category", "Amount"]],
    body: summaryData,
    theme: "grid",
    headStyles: { fillColor: [30, 41, 59], textColor: 255 },
    styles: { fontSize: 10, cellPadding: 5 },
  });

  // Add profit calculations
  const profitStartY = doc.previousAutoTable.finalY + 20;
  doc.setFontSize(12);
  doc.text("Profit Calculation:", 14, profitStartY);

  const profitCalcData = [
    ["Gross Profit", `${data.profitAmount.toFixed(2)}PKR`],
    [
      "Total Expenses",
      `${(
        data.totalDailyExpenses +
        data.totalOtherExpenses +
        data.cardSwipeFee
      ).toFixed(2)}`,
    ],
    ["Net Profit", `${data.netProfit.toFixed(2)}PKR`],
  ];

  doc.autoTable({
    startY: profitStartY + 5,
    head: [["Item", "Amount"]],
    body: profitCalcData,
    theme: "grid",
    headStyles: { fillColor: [30, 41, 59], textColor: 255 },
    styles: { fontSize: 10, cellPadding: 5 },
  });

  // Save the PDF
  doc.save(`sales-report-${data.generatedDate.replace(/\//g, "-")}.pdf`);
};
