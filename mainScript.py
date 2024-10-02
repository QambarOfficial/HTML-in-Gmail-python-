import os
import csv
from datetime import datetime
import sys

# Paths
input_folder = "inputs"
output_folder = "outputs"

# Check if running in a packaged executable (PyInstaller)
if getattr(sys, 'frozen', False):
    input_folder = os.path.join(sys._MEIPASS, input_folder)  # Adjust path for executable

input_file = os.path.join(input_folder, "test.csv")  # Assuming the input file is named 'test.csv'

# Ensure output folder exists
os.makedirs(output_folder, exist_ok=True)  # Create 'outputs' folder if it doesn't exist

# HTML Templates
invoice_template = """
<div style="background-color: #f4f4f4; padding: 20px;">
    <div style="background-color: #ffffff; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0073e6; padding-bottom: 10px; margin-bottom: 20px;">
        <h1 style="color: #0073e6; margin: 0;">Invoice Generated</h1>
        <img src="https://definedigitals.com/wp-content/uploads/2022/10/Latest-DD-Logo1-300x143.png" alt="Company Logo" style="height: 50px; margin-left: auto;">
      </div>

      <div style="margin-bottom: 20px;">
        <p style="color: #333; line-height: 1.6;">Dear {name},</p>
        <p style="color: #333; line-height: 1.6;">We are pleased to inform you that your invoice for the month of {month} has been generated and is attached to this email.</p>
      </div>

      <div style="margin-bottom: 20px;">
        <p style="color: #333; line-height: 1.6;">Please review the attached invoice at your convenience. If you have any questions or require further information, don't hesitate to reach out to us.</p>
      </div>

      <div style="margin-bottom: 20px;">
        <p style="color: #333; line-height: 1.6;"><strong>Invoice Date:</strong> {invoice_date}</p>
        <p style="color: #333; line-height: 1.6;"><strong>Due Date:</strong> {due_date}</p>
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
"""

payroll_template = """
<div style="background-color: #f4f4f4; padding: 20px;">
    <div style="background-color: #ffffff; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0073e6; padding-bottom: 10px; margin-bottom: 20px;">
        <h1 style="color: #0073e6; margin: 0;">Payroll Processed</h1>
        <img src="https://definedigitals.com/wp-content/uploads/2022/10/Latest-DD-Logo1-300x143.png" alt="Company Logo" style="height: 40px; width: auto; margin-left: auto;">
      </div>

      <div style="margin-bottom: 20px;">
        <p style="color: #333; line-height: 1.6;">Dear {name},</p>
        <p style="color: #333; line-height: 1.6;">This is to inform you that the payroll for the month of {month} has been processed. The payslip for this month is attached to this email for your reference.</p>
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
"""

# Function to generate HTML for invoice
def generate_invoice_html(name):
    today = datetime.today().strftime('%Y-%m-%d')
    due_date = (datetime.today().replace(day=26)).strftime('%Y-%m-%d')  # Example due date
    month = datetime.today().strftime('%B')

    # Create invoice HTML
    invoice_html = invoice_template.format(name=name, month=month, invoice_date=today, due_date=due_date)
    invoice_file = os.path.join(output_folder, f"{name}_invoice.html")
    
    # Write invoice HTML to file
    with open(invoice_file, 'w') as file:
        file.write(invoice_html)

    # Print the file path after creating the invoice file
    print(f"Created: {os.path.abspath(invoice_file)}")  # Print absolute path of the file

# Function to generate HTML for payroll
def generate_payroll_html(name):
    month = datetime.today().strftime('%B')

    # Create payroll HTML
    payroll_html = payroll_template.format(name=name, month=month)
    payroll_file = os.path.join(output_folder, f"{name}_payroll.html")
    
    # Write payroll HTML to file
    with open(payroll_file, 'w') as file:
        file.write(payroll_html)

    # Print the file path after creating the payroll file
    print(f"Created: {os.path.abspath(payroll_file)}")  # Print absolute path of the file

# Read CSV file and process based on user's choice
def process_csv(choice):
    if not os.path.exists(input_file):
        print(f"Input file not found at {input_file}")
        return

    with open(input_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            name = row.get("name")
            if name:
                if choice == '1':
                    generate_invoice_html(name)
                elif choice == '2':
                    generate_payroll_html(name)
                elif choice == '3':
                    generate_invoice_html(name)
                    generate_payroll_html(name)

if __name__ == "__main__":
    # Prompt user for choice
    print("Please select the type of template you want to generate:")
    print("1. Invoice template")
    print("2. Payroll template")
    print("3. Both templates")
    user_choice = input("Enter your choice (1/2/3): ")

    # Validate input
    if user_choice not in ['1', '2', '3']:
        print("Invalid choice. Please run the script again and select a valid option.")
    else:
        process_csv(user_choice)
        print("HTML files have been generated in the 'outputs' folder.")
