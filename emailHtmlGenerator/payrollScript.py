import csv
import datetime
import os

# Get the current month name
monthName = datetime.datetime.now().strftime("%B")

# Open and read the CSV file
with open('test.csv', mode='r') as file:
    reader = csv.DictReader(file)
    
    # Check if 'names' column exists
    if 'names' not in reader.fieldnames:
        print('The "names" column is not found in the CSV file.')
    else:
        # Create an HTML file for each name in the 'names' column
        for row in reader:
            userName = row['names']
            
            # Create HTML content with dynamic userName and monthName
            html_content = f"""<div style="background-color: #f4f4f4; padding: 20px;">
      <div style="background-color: #ffffff; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0073e6; padding-bottom: 10px; margin-bottom: 20px;">
          <h1 style="color: #0073e6; margin: 0;">Payroll Processed</h1>
          <img src="https://definedigitals.com/wp-content/uploads/2022/10/Latest-DD-Logo1-300x143.png" alt="Company Logo" style="height: 40px; width: auto; margin-left: auto; display: block;">
        </div>
    
        <div style="margin-bottom: 20px;">
          <p style="color: #333; line-height: 1.6;">Dear {userName},</p>
          <p style="color: #333; line-height: 1.6;">This is to inform you that the payroll for the month of {monthName} has been processed. The payslip for this month is attached to this email for your reference.</p>
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
    </div>"""
            
            # Define the file path for the HTML file
            file_path = os.path.join(f"{userName}.html")
            
            # Write the HTML content to the file
            with open(file_path, 'w') as html_file:
                html_file.write(html_content)
            
            print(f"Created {file_path}")
