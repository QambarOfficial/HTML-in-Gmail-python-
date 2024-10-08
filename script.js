let generatedFiles = []; // Array to hold all generated HTML files

async function generateHTML() {
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
    
    reader.onload = async function(event) {
        const csvData = event.target.result;
        const rows = csvData.split('\n').map(row => row.split(','));
        
        // Skip the first row (header)
        const data = rows.slice(1);

        // Reset the array of generated files
        generatedFiles = [];

        // Generate the HTML for each row in CSV
        for (const row of data) {
            const name = row[0];  // Assuming the first column is the name
            if (name) {
                if (templateChoice == '1' || templateChoice == '3') {
                    let htmlContent = await generateInvoiceHTML(name);  // Await the promise
                    
                    // Create downloadable file for invoice
                    const blob = new Blob([htmlContent], { type: 'text/html' });
                    const invoiceLink = document.createElement('a');
                    invoiceLink.href = URL.createObjectURL(blob);
                    invoiceLink.download = `${name}_invoice.html`;
                    invoiceLink.innerText = `Download ${name}'s Invoice`;
                    generatedFilesDiv.appendChild(invoiceLink);
                    generatedFiles.push({ filename: `${name}_invoice.html`, content: htmlContent });
                }
                
                if (templateChoice == '2' || templateChoice == '3') {
                    let htmlContent = await generatePayrollHTML(name);  // Await the promise
                    
                    // Create downloadable file for payroll
                    const blob = new Blob([htmlContent], { type: 'text/html' });
                    const payrollLink = document.createElement('a');
                    payrollLink.href = URL.createObjectURL(blob);
                    payrollLink.download = `${name}_payroll.html`;
                    payrollLink.innerText = `Download ${name}'s Payroll`;
                    generatedFilesDiv.appendChild(payrollLink);
                    generatedFiles.push({ filename: `${name}_payroll.html`, content: htmlContent });
                }
            }
        }

        downloadZipButton.style.display = 'inline-block';
    };
    
    reader.readAsText(file);
}


// Fetch and generate invoice HTML using the external template
async function generateInvoiceHTML(name) {
    const response = await fetch('inputs/invoice_template.html');
    let template = await response.text();

    // Replace placeholders with actual data
    const today = new Date();
    const invoiceDate = today.toLocaleDateString(); // Current date (Invoice Date)
    const dueDate = new Date(today.setDate(today.getDate() + 15)).toLocaleDateString(); // Due date

    const month = new Date().toLocaleString('default', { month: 'long' });

    // Replace placeholders
    template = template
        .replace('{{name}}', name)
        .replace('{{invoiceDate}}', invoiceDate)
        .replace('{{dueDate}}', dueDate)
        .replace('{{month}}', month);

    return template;
}

// Fetch and generate payroll HTML using the external template
async function generatePayrollHTML(name) {
    const response = await fetch('inputs/payroll_template.html');
    let template = await response.text();

    // Replace placeholders with actual data
    const month = new Date().toLocaleString('default', { month: 'long' });

    // Replace placeholders
    template = template
        .replace('{{name}}', name)
        .replace('{{month}}', month);

    return template;
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
