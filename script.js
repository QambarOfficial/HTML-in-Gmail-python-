let generatedFiles = []; // Array to hold all generated HTML files

function generateHTML() {
    const fileInput = document.getElementById('csv-file');
    const templateChoice = document.getElementById('template-choice').value;
    const generatedFilesDiv = document.getElementById('generated-files');
    const downloadZipButton = document.getElementById('download-zip');
    
    if (!fileInput.files[0]) {
        alert('Please upload a CSV file');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const csvData = event.target.result;
        const rows = csvData.split('\n').map(row => row.split(','));
        
        // Skip the first row (header)
        const data = rows.slice(1);

        // Reset the array of generated files
        generatedFiles = [];

        // Generate the HTML for each row in CSV
        data.forEach(row => {
            const name = row[0];  // Assuming the first column is the name
            if (name) {
                if (templateChoice == '1' || templateChoice == '3') {
                    let htmlContent = generateInvoiceHTML(name);
                    // Create downloadable file for invoice
                    const blob = new Blob([htmlContent], { type: 'text/html' });
                    const invoiceLink = document.createElement('a');
                    invoiceLink.href = URL.createObjectURL(blob);
                    invoiceLink.download = `${name}_invoice.html`;
                    invoiceLink.innerText = `Download ${name}'s Invoice`;
                    
                    // Add the invoice file to the generated files array
                    generatedFiles.push({
                        name: `${name}_invoice.html`,
                        content: htmlContent
                    });
                }

                if (templateChoice == '2' || templateChoice == '3') {
                    let htmlContent = generatePayrollHTML(name);
                    // Create downloadable file for payroll
                    const blob = new Blob([htmlContent], { type: 'text/html' });
                    const payrollLink = document.createElement('a');
                    payrollLink.href = URL.createObjectURL(blob);
                    payrollLink.download = `${name}_payroll.html`;
                    payrollLink.innerText = `Download ${name}'s Payroll`;
                    
                    // Add the payroll file to the generated files array
                    generatedFiles.push({
                        name: `${name}_payroll.html`,
                        content: htmlContent
                    });
                }
            }
        });

        // Display the generated files
        generatedFilesDiv.innerHTML = '';
        generatedFiles.forEach(file => {
            const div = document.createElement('div');
            div.innerHTML = `<a href="#" download="${file.name}">Download ${file.name}</a>`;
            generatedFilesDiv.appendChild(div);
        });

        // Show the "Download All as ZIP" button if files are generated
        if (generatedFiles.length > 0) {
            downloadZipButton.style.display = 'inline-block';
        }
    };

    reader.readAsText(file);
}

function generateInvoiceHTML(name) {
    const today = new Date();
    const invoiceDate = today.toLocaleDateString(); // Current date (Invoice Date)

    // Calculate due date (15 days after the invoice date)
    const dueDate = new Date(today.setDate(today.getDate() + 15)).toLocaleDateString();

    const month = new Date().toLocaleString('default', { month: 'long' });

    return `
        <div style="background-color: #f4f4f4; padding: 20px;">
            <div style="background-color: #ffffff; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0073e6; padding-bottom: 10px; margin-bottom: 20px;">
                    <h1 style="color: #0073e6; margin: 0;">Invoice Generated</h1>
                </div>

                <div style="margin-bottom: 20px;">
                    <p style="color: #333; line-height: 1.6;">Dear ${name},</p>
                    <p style="color: #333; line-height: 1.6;">We are pleased to inform you that your invoice for the month of ${month} has been generated and is attached to this email.</p>
                </div>

                <div style="margin-bottom: 20px;">
                    <p style="color: #333; line-height: 1.6;">Invoice Date: ${invoiceDate}</p>
                    <p style="color: #333; line-height: 1.6;">Due Date: ${dueDate}</p>
                </div>

                <div style="text-align: center; color: #888; font-size: 12px; margin-top: 20px;">
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </div>
    `;
}


function generatePayrollHTML(name) {
    const month = new Date().toLocaleString('default', { month: 'long' });

    return `
        <div style="background-color: #f4f4f4; padding: 20px;">
            <div style="background-color: #ffffff; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0073e6; padding-bottom: 10px; margin-bottom: 20px;">
                    <h1 style="color: #0073e6; margin: 0;">Payroll Processed</h1>
                </div>

                <div style="margin-bottom: 20px;">
                    <p style="color: #333; line-height: 1.6;">Dear ${name},</p>
                    <p style="color: #333; line-height: 1.6;">This is to inform you that the payroll for the month of ${month} has been processed. The payslip for this month is attached to this email for your reference.</p>
                </div>

                <div style="text-align: center; color: #888; font-size: 12px; margin-top: 20px;">
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </div>
    `;
}

// Function to download all files as a ZIP
function downloadZip() {
    const zip = new JSZip();

    // Add each generated file to the ZIP archive
    generatedFiles.forEach(file => {
        zip.file(file.name, file.content);
    });

    // Generate the ZIP file and trigger download
    zip.generateAsync({ type: 'blob' }).then(function(content) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'generated_files.zip';
        link.click();
    });
}
