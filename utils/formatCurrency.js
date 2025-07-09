function formatCurrency(amount) {
  try {
    if (typeof amount !== 'number') {
      return 'IDR 0';
    }
    
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  } catch (error) {
    console.error('formatCurrency error:', error);
    return `IDR ${amount?.toLocaleString() || '0'}`;
  }
}