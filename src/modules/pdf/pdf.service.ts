import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as path from 'path';

@Injectable()
export class PdfService {
  async generateResultPdf(result: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 40 });

      const buffers = [];
      const fontPath = path.resolve(__dirname, '..', 'fonts', 'DejaVuSans.ttf');

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      doc.registerFont('DejaVuSans', fontPath);

      // Заголовок документа
      doc
        .font('DejaVuSans')
        .fontSize(16)
        .fillColor('#2E4053')
        .text('Результаты тестирования', { align: 'center', underline: false })
        .moveDown(1);

      // Основная информация
      doc
        .fontSize(12)
        .fillColor('#2874A6')
        .text(`Пользователь: `, { continued: true })
        .fillColor('#000')
        .text(result.user);
      doc
        .fontSize(12)
        .fillColor('#2874A6')
        .text(`Викторина: `, { continued: true })
        .fillColor('#000')
        .text(result.quiz)
        .moveDown(1);

      // Добавляем горизонтальную линию
      // doc.moveTo(40, doc.y).lineTo(560, doc.y).stroke('#2E4053');
      // doc.moveDown(1);

      if (result.detailedResults && result.detailedResults.length > 0) {
        result.detailedResults.forEach((question, index) => {
          doc
            .fontSize(10)
            .fillColor('#2E4053')
            .text(`${index + 1}. ${question.questionText}`, {
              underline: false,
            })
            .moveDown(0.25);

          question.options.forEach((option) => {
            doc
              .fontSize(10)
              .fillColor(
                option.isCorrect ? 'green' : option.isSelected ? 'red' : '#000',
              )
              .text(
                `${option.isCorrect ? '✓' : option.isSelected ? '✗' : ''} ${option.text} ${option.isSelected ? '(выбран)' : ''}`,
                { indent: 20 },
              );
          });

          doc.moveDown(0.75); // Добавляем отступ вниз после вопроса
        });
      } else {
        doc
          .font('DejaVuSans')
          .fontSize(10)
          .text('Нет детальных результатов.', { align: 'center' });
      }

      // Добавляем горизонтальную линию
      doc.moveTo(40, doc.y).lineTo(560, doc.y).stroke('#2E4053');
      doc.moveDown(1);

      // Сводная информация
      const summaryData = [
        { label: 'Всего баллов', value: result.totalPoints },
        { label: 'Максимум баллов', value: result.maxPoints },
        { label: 'Процент', value: `${result.percentage}%` },
        { label: 'Результат', value: result.passed ? 'Сдал' : 'Не сдал' },
      ];

      summaryData.forEach((item) => {
        doc
          .fontSize(12)
          .fillColor('#2E4053')
          .text(`${item.label}: `, { continued: true })
          .fillColor('#000')
          .text(item.value.toString());
      });

      doc.end();
    });
  }
}
