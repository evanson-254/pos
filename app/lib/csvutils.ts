export function exportToCSV(data:any[], fileName = "report.csv") {
  // 1. Safety check to make sure there is data to write
  if (!data || !data.length) {
    console.error("No data available to export.");
    return;
  }

  // 2. Extract column headers automatically from the first data row object keys
  const headers = Object.keys(data[0]);
  
  // 3. Map through the data rows and safely clean string formatting values
  const csvRows = data.map(row => 
    headers.map(headerField => {
      const value = row[headerField] ?? ''; // Use empty string if value is null/undefined
      
      // Convert nested objects or arrays to simple text strings, else leave as text
      const stringified = typeof value === 'object' ? JSON.stringify(value) : String(value);
      
      // CRUCIAL: Escape double quotes and enclose values in quotes to prevent comma splitting errors
      const escapedValue = stringified.replace(/"/g, '""');
      return `"${escapedValue}"`;
    }).join(',')
  );

  // 4. Combine headers array line with the array data rows line
  const csvContent = [headers.join(','), ...csvRows].join('\n');

  // 5. Create a browser data Blob and trigger a secure local file download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const handleDownload = (data:any[], file:string='product') => {
        // Generate an automated clear timestamped filename
        const today = new Date().toISOString().split('T')[0];
        const fileName = `${file}_${today}.csv`;

        exportToCSV(data?.map(({ selling_price, image, ...rest }: any) => rest) || [], fileName);
};