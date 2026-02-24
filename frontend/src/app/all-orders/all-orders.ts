import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../order.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-orders.html',
  styleUrl: './all-orders.css',
})
export class AllOrders implements OnInit {
  orders: any[] = [];
  loading = true;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching all orders', err);
        this.loading = false;
      }
    });
  }

  getTotalItems(order: any): number {
    if (!order || !order.orderLines) return 0;
    return order.orderLines.reduce((total: number, item: any) => total + item.quantity, 0);
  }

  generatePDF(order: any): void {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.text('Facture', 105, 20, { align: 'center' });

    // Order Info
    doc.setFontSize(12);
    doc.text(`Commande #${order.id}`, 20, 40);
    doc.text(`Date: ${new Date(order.orderDate).toLocaleDateString('fr-FR')}`, 20, 50);
    doc.text(`Client: ${order.user.username}`, 140, 40);

    // Items Table
    const tableColumn = ["Produit", "Quantité"];
    const tableRows: any[] = [];

    order.orderLines.forEach((item: any) => {
      const rowData = [
        item.product.name,
        item.quantity.toString()
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 65,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 }
    });

    // Total
    const finalY = (doc as any).lastAutoTable.finalY || 65;
    doc.setFontSize(14);
    doc.setFont('', 'bold');
    doc.text(`Total: ${order.totalAmount} €`, 140, finalY + 20);

    // Save
    doc.save(`facture_commande_${order.id}.pdf`);
  }
}
