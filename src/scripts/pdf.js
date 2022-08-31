import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

// Returns the width of text with given font size and font
function get_text_width(text, bold = false, size = 16, font = "Helvetica") {
    const canvas = get_text_width.canvas || (get_text_width.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = `${["Normal", "Bold"][bold]} ${size}px ${font}`;
    const metrics = context.measureText(text);
    return metrics.width;
}

// Saves a PDF as a file on the computer
// https://stackoverflow.com/questions/35038884/download-file-from-bytes-in-javascript
function save_pdf(dataUri, name = "Apheleia Items Report") {
    function base64_to_array_buffer(base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }

    function save_byte_array(reportName, byte) {
        var blob = new Blob([byte], { type: "application/pdf" });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = reportName;
        link.download = fileName;
        link.click();
    };
    var sampleArr = base64_to_array_buffer(dataUri);
    save_byte_array(name, sampleArr);
}

// creates a rectangle and text as a part of a table
function create_cell(page, x, y, w, h, text, fontSize, font) {
    if (text === undefined) text = "N/A";

    page.drawRectangle({
        x: x,
        y: y,
        width: w,
        height: h,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
        color: rgb(1, 1, 1),
        opacity: 0,
        borderOpacity: 1,
    })

    page.drawText(text, {
        x: x + (h - fontSize) / 2, // small amount of left padding
        y: y + (h - fontSize) / 2, // centre text in box
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
        lineHeight: fontSize,
        opacity: 1,
    })
}

// fills a page with a table
// page, int, int, array[c], array[r][c], array[2], array[2]
function create_table(page, rows, cols, titles, data, fontSizes, fonts) {

    let margin = 10;
    let header = 90;
    const { width, height } = page.getSize();

    let tWidth = width - margin * 2;
    let tHeight = height - margin * 2 - header;
    let tX = margin; // x coord of bottom right corner
    let tY = margin; // y coord of bottom right corner

    let rowHeight = tHeight / rows;

    let actualRows = Math.min(rows, data.length + 1); // number of rows actually filled

    // find lengths of the titles
    let minColWidths = titles.map((x) => get_text_width(x, true) + (rowHeight - fontSizes[1]));
    for (let r = 0; r < data.length; r++) {
        for (let c = 0; c < cols; c++) {
            // find highest length of a item in this column (including padding)
            minColWidths[c] = Math.max(minColWidths[c], get_text_width(data[r][c]) + (rowHeight - fontSizes[0]))
        }
    }
    let totalMinWidth = minColWidths.reduce((x, y) => x + y, 0); // sum min widths;
    let colWidths = minColWidths.map((x) => x * tWidth / totalMinWidth);
    let x = tX;
    // column titles
    for (let c = 0; c < cols; c++) {
        create_cell(page, x, tY + (rows - 1) * rowHeight, colWidths[c], rowHeight, titles[c], fontSizes[1], fonts[1]);
        x += colWidths[c];
    }

    // item cells
    for (let r = 1; r < actualRows; r++) { // first row is title row, also accounts for data that is shorter than number of rows
        x = tX;
        for (let c = 0; c < cols; c++) {
            create_cell(page, x, tY + rowHeight * (rows - r - 1), colWidths[c], rowHeight, data[r - 1][c], fontSizes[0], fonts[0]);
            x += colWidths[c];
        }
    }
}

function create_page(doc, scheme, fontSizes, fonts) {
    let page = doc.addPage();
    let titles = scheme.fieldNames;
    let data = scheme.items;
    // title and date
    page.drawText("Item Report: " + scheme.name, { x: 12, y: page.getHeight() - 63, size: 17, font: fonts[0], color: rgb(0, 0, 0), opacity: 1 });
    page.drawText("apheleia.", { x: 12, y: page.getHeight() - 40, size: 26, font: fonts[0], color: rgb(0, 0, 0), opacity: 1 });

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    page.drawText(today, { x: 12, y: page.getHeight() - 83, size: 17, font: fonts[0], color: rgb(0, 0, 0), opacity: 1 })
    create_table(page, 25, titles.length, titles, data, fontSizes, fonts);
}

async function create_pdf(schemes) {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create()

    const fontSizes = [11, 14];

    let fonts = [await pdfDoc.embedFont(StandardFonts.Helvetica), await pdfDoc.embedFont(StandardFonts.HelveticaBold)];

    for (let i = 0; i < schemes.length; i++) {
        create_page(pdfDoc, schemes[i], fontSizes, fonts);
    }

    // Serialize the PDFDocument to bytes (a Uint8Array)
    //const pdfBytes = await pdfDoc.save({})
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: false });

    // Trigger the browser to download the PDF document
    //download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
    save_pdf(pdfDataUri);
    console.log("PDF made");
}

export { create_pdf }