import csv
import datetime
import os
import sys
from os import path

# Get current date and time
current_date = datetime.datetime.now().strftime("%Y-%m-%d")
due_date = (datetime.datetime.now() + datetime.timedelta(days=15)).strftime("%Y-%m-%d")

# Determine the base path for the CSV file
if getattr(sys, 'frozen', False):
    # Running as a bundled application
    base_path = path.dirname(sys.executable)  # Path where the executable is located
else:
    # Running in development mode
    base_path = path.abspath(path.dirname(__file__))

# Define the path to the CSV file in the 'inputs' folder
csv_file_path = path.join(base_path, 'inputs', 'test.csv')

# Open and read the CSV file
try:
    # Ensure that the path to the file is correct
    if not os.path.isfile(csv_file_path):
        raise FileNotFoundError(f"The file {csv_file_path} does not exist.")
    
    with open(csv_file_path, mode='r') as file:
        reader = csv.DictReader(file)

        # Check if the 'names' column exists
        if 'names' not in reader.fieldnames:
            print('The "names" column is not found in the CSV file.')
        else:
            # Iterate through each row in the CSV
            for row in reader:
                userName = row['names']
                
                # Create HTML content with dynamic userName, current date, and due date
                html_content = f"""<div style="background-color: #f4f4f4; padding: 20px;">
        <div style="background-color: #ffffff; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0073e6; padding-bottom: 10px; margin-bottom: 20px;">
            <h1 style="color: #0073e6; margin: 0;">Invoice Generated</h1>
            <img src="https://definedigitals.com/wp-content/uploads/2022/10/Latest-DD-Logo1-300x143.png" alt="Company Logo" style="height: 50px; margin-left: auto;">
          </div>

          <div style="margin-bottom: 20px;">
            <p style="color: #333; line-height: 1.6;">Dear {userName},</p>
            <p style="color: #333; line-height: 1.6;">We are pleased to inform you that your invoice for the month of {datetime.datetime.now().strftime("%B")} has been generated and is attached to this email.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="color: #333; line-height: 1.6;">Please review the attached invoice at your convenience. If you have any questions or require further information, don't hesitate to reach out to us.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="color: #333; line-height: 1.6;"><strong>Invoice Date:</strong> {current_date}</p>
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
      </div>"""
                
                # Define the file path for the HTML file
                file_path = os.path.join(f"{userName}_invoice.html")
                
                # Write the HTML content to a file
                with open(file_path, 'w') as html_file:
                    html_file.write(html_content)
                
                print(f"Created {file_path}")
except FileNotFoundError as e:
    print(f"Error: {e}. The file test.csv could not be found.")
