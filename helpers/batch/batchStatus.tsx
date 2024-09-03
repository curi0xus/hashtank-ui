function getHumanReadableBatchStatus(batchStatus: number) {
  switch (batchStatus) {
    case 1:
      return 'OPEN';
    case 2:
      return 'DONE';
    case 3:
      return 'REVEALED';
    case 4:
      return 'STARTED';
    default:
      return 'UNDEFINED';
  }
}

export { getHumanReadableBatchStatus };
