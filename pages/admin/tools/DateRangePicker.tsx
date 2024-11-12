import React, { useState } from 'react';
import { Box, Button, VStack } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface DateRangePickerProps {
  onChange: (range: DateRange) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleApply = () => {
    onChange({ start: startDate, end: endDate });
  };

  return (
    <VStack spacing={4} p={4} background="gray.800" borderRadius="md">
      <Box>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          className="date-picker"
        />
      </Box>
      <Box>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          className="date-picker"
        />
      </Box>
      <Button colorScheme="teal" onClick={handleApply}>
        Apply Date Range
      </Button>
    </VStack>
  );
};

export default DateRangePicker;
