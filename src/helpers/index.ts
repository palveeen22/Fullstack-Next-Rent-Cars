export default function formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate: string = new Date(dateString).toLocaleDateString('en-US', options);
  return formattedDate;
}