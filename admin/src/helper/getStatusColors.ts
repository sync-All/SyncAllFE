const getStatusColors = (
  status: string
): { text: string; bg: string; dot: string } => {
  switch (status.toLowerCase()) {
    case 'approved':
    case 'active':
    case 'resolved':
      return {
        text: 'text-[#037847]',
        bg: 'bg-[#ECFDF3]',
        dot: 'bg-[#037847]',
      };
    case 'pending':
    case 'under review':
      return {
        text: 'text-[#F3A218]',
        bg: 'bg-[#FEF6E7]',
        dot: 'bg-[#F3A218]',
      };
    case 'failed':
      return {
        text: 'text-[#B42318]',
        bg: 'bg-[#FEF3F2]',
        dot: 'bg-[#B42318]',
      };
    case 'rejected':
      return {
        text: 'text-[#D92D20]',
        bg: 'bg-[#FEE4E2]',
        dot: 'bg-[#D92D20]',
      };
    default:
      return {
        text: 'text-[#344054]',
        bg: 'bg-[#F2F4F7]',
        dot: 'bg-[#344054]',
      };
  }
};

export default getStatusColors;
