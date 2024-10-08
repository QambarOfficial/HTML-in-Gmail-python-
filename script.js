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
                    
                    // Debugging: Log the generated invoice HTML
                    console.log("Generated Invoice HTML for " + name + ":", htmlContent);

                    // Create downloadable file for invoice
                    const blob = new Blob([htmlContent], { type: 'text/html' });
                    const invoiceLink = document.createElement('a');
                    invoiceLink.href = URL.createObjectURL(blob);
                    invoiceLink.download = `${name}_invoice.html`;
                    invoiceLink.innerText = `Download ${name}'s Invoice`;
                    
                    generatedFilesDiv.appendChild(invoiceLink); // Add link to the DOM

                    // Add the invoice file to the generated files array
                    generatedFiles.push({
                        name: `${name}_invoice.html`,
                        content: htmlContent
                    });
                }

                if (templateChoice == '2' || templateChoice == '3') {
                    let htmlContent = generatePayrollHTML(name);

                    // Debugging: Log the generated payroll HTML
                    console.log("Generated Payroll HTML for " + name + ":", htmlContent);

                    // Create downloadable file for payroll
                    const blob = new Blob([htmlContent], { type: 'text/html' });
                    const payrollLink = document.createElement('a');
                    payrollLink.href = URL.createObjectURL(blob);
                    payrollLink.download = `${name}_payroll.html`;
                    payrollLink.innerText = `Download ${name}'s Payroll`;
                    
                    generatedFilesDiv.appendChild(payrollLink); // Add link to the DOM

                    // Add the payroll file to the generated files array
                    generatedFiles.push({
                        name: `${name}_payroll.html`,
                        content: htmlContent
                    });
                }
            }
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

    // Return only the content of the invoice div (removed the outer HTML structure)
    return `
        <div style="background-color: #f4f4f4; padding: 20px;">
    <div style="background-color: #ffffff; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0073e6; padding-bottom: 10px; margin-bottom: 20px;">
        <h1 style="color: #0073e6; margin: 0;">Invoice Generated</h1>
        <img src="https://definedigitals.com/wp-content/uploads/2022/10/Latest-DD-Logo1-300x143.png" alt="Company Logo" style="height: 50px; margin-left: auto;">
      </div>

      <div style="margin-bottom: 20px;">
        <p style="color: #333; line-height: 1.6;">Dear ${name},</p>
        <p style="color: #333; line-height: 1.6;">We are pleased to inform you that your invoice for the month of ${month} has been generated and is attached to this email.</p>
      </div>

      <div style="margin-bottom: 20px;">
        <p style="color: #333; line-height: 1.6;">Please review the attached invoice at your convenience. If you have any questions or require further information, don't hesitate to reach out to us.</p>
      </div>

      <div style="margin-bottom: 20px;">
        <p style="color: #333; line-height: 1.6;"><strong>Invoice Date:</strong> ${invoiceDate}</p>
        <p style="color: #333; line-height: 1.6;"><strong>Due Date:</strong> ${dueDate}</p>
      </div>

      <div style="text-align: center; background-color: #f4f4f4; padding: 20px; border-radius: 5px; color: #555;">
        <p style="margin: 0; line-height: 1.6;">Thank you for your prompt attention to this matter.</p>
        <p style="margin: 0; line-height: 1.6;">If you have any queries, please feel free to <a href="mailto:hr@definedigitals.com" style="color: #0073e6; text-decoration: none;">contact us</a>.</p>
      </div>

      <div style="text-align: center; color: #888; font-size: 12px; margin-top: 20px;">
        <p>&copy; 2024 DefineDigitals Pvt Ltd. All rights reserved.</p>
      </div>
    </div>
</div>
    `;
}

function generatePayrollHTML(name) {
    const month = new Date().toLocaleString('default', { month: 'long' });

    // Return only the content of the payroll div (removed the outer HTML structure)
    return `
        <div style="background-color: #f4f4f4; padding: 20px;">
    <div style="background-color: #ffffff; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0073e6; padding-bottom: 10px; margin-bottom: 20px;">
        <h1 style="color: #0073e6; margin: 0;">Payroll Processed</h1>
        <img src="https://definedigitals.com/wp-content/uploads/2022/10/Latest-DD-Logo1-300x143.png" alt="Company Logo" style="height: 40px; width: auto; margin-left: auto;">
      </div>

      <div style="margin-bottom: 20px;">
        <p style="color: #333; line-height: 1.6;">Dear ${name},</p>
        <p style="color: #333; line-height: 1.6;">This is to inform you that the payroll for the month of ${month} has been processed. The payslip for this month is attached to this email for your reference.</p>
      </div>

      <div style="margin-bottom: 20px;">
        <p style="color: #333; line-height: 1.6;">Please review the attached payslip at your convenience. Should you have any questions or require further assistance, please contact the HR department.</p>
      </div>

      <div style="text-align: center; background-color: #f4f4f4; padding: 20px; border-radius: 5px; color: #555;">
        <p style="margin: 0; line-height: 1.6;">Thank you for your attention to this matter.</p>
        <p style="margin: 0; line-height: 1.6;">For any queries related to payroll, please <a href="mailto:hr@definedigitals.com" style="color: #0073e6; text-decoration: none;">contact us</a>.</p>
      </div>

      <div style="text-align: center; color: #888; font-size: 12px; margin-top: 20px;">
        <p>&copy; 2024 DefineDigitals Pvt Ltd. All rights reserved.</p>
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

    // Generate and download the ZIP file
    zip.generateAsync({ type: 'blob' }).then(content => {
        saveAs(content, 'generated_files.zip');
    });
}
