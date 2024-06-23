export function writeStringArray(lines: string[],  type: 'csv' | 'json', filename = 'pixie') {
    const lineContent = lines.join('\n');
    const blob = new Blob([lineContent], { type: getMimeType(type) });
    const fileUrl = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = filename + '.' + type;
    link.click();
  
    // Optional: Revoke the object URL after download to avoid memory leaks
    URL.revokeObjectURL(fileUrl);
  }

  function getMimeType(type: 'csv' | 'json') {
    switch(type) {
      case 'csv':  
        return 'text/csv;charset=utf-8'
      case 'json':
        return 'application/json;charset=utf-8'
    }
  }