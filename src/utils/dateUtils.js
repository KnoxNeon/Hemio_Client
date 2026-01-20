// Utility functions for date formatting

export const formatDate = (dateValue) => {
  if (!dateValue) return 'Date not available';
  
  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    return date.toLocaleDateString();
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date not available';
  }
};

export const formatDateTime = (dateValue) => {
  if (!dateValue) return 'Date not available';
  
  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    return date.toLocaleString();
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date not available';
  }
};

export const getRequestDate = (request) => {
  // Try different date field names that might exist in the request object
  const dateFields = ['request_date', 'donation_date', 'createdAt', 'created_at'];
  
  for (const field of dateFields) {
    if (request[field]) {
      return formatDate(request[field]);
    }
  }
  
  return 'Date not available';
};

export const getRequestTime = (request) => {
  return request.request_time || request.donation_time || 'Time not available';
};