import { useEffect, useState } from 'react';
import { Box, Text, Stat, StatLabel, StatNumber, HStack, VStack, Button } from '@chakra-ui/react';
import DateRangePicker from '@/pages/admin/tools/DateRangePicker';
import { fetchMetrics } from '@/pages/admin/api/fetchAdminMetrics';
import { subDays } from 'date-fns';

interface Metrics {
    totalUsers: number;
    claimedShellTokens: number;
    saucedFish: number;
    sauceStates: { [key: string]: number };
}

interface DateRange {
    start: Date;
    end: Date;
}

const AdminMetrics: React.FC = () => {
    const [metrics, setMetrics] = useState<Metrics>({
        totalUsers: 0,
        claimedShellTokens: 0,
        saucedFish: 0,
        sauceStates: {},
    });

    const [dateRange, setDateRange] = useState<DateRange>({
        start: subDays(new Date(), 7),
        end: new Date(),
    });

    useEffect(() => {
        async function loadMetrics() {
            const response = await fetchMetrics(dateRange.start, dateRange.end);
            setMetrics(response || { totalUsers: 0, claimedShellTokens: 0, saucedFish: 0, sauceStates: {} });
        }
        loadMetrics();
    }, [dateRange]);

    const handleDateRangeChange = (range: DateRange) => setDateRange(range);

    return (
        <Box p={8} background="gray.900" color="white">
            <Text fontSize="2xl" mb={4}>Admin Metrics</Text>
            <DateRangePicker onChange={handleDateRangeChange} />

            <HStack align="start" spacing={4} mt={6}>
                <Text fontSize="lg" mt={6}>Sauce Status</Text>
                {Object.entries(metrics.sauceStates).map(([state, count]) => (
                    <StatCard key={state} label={state} value={count} />
                ))}
            </HStack>

            <HStack spacing={8} mt={6}>
                <StatCard label="Total Users" value={metrics.totalUsers} />
                <StatCard label="SHELL Tokens Claimed" value={metrics.claimedShellTokens} />
                <StatCard label="Sauced Fish" value={metrics.saucedFish} />
            </HStack>

          

            <HStack spacing={4} mt={6}>
                <Button colorScheme="teal" size="sm" onClick={() => setDateRange({ start: subDays(new Date(), 1), end: new Date() })}>
                    Today
                </Button>
                <Button colorScheme="teal" size="sm" onClick={() => setDateRange({ start: subDays(new Date(), 7), end: new Date() })}>
                    This Week
                </Button>
                <Button colorScheme="teal" size="sm" onClick={() => setDateRange({ start: subDays(new Date(), 30), end: new Date() })}>
                    This Month
                </Button>
                <Button colorScheme="teal" size="sm" onClick={() => setDateRange({ start: new Date(0), end: new Date() })}>
                    All Time
                </Button>
            </HStack>
        </Box>
    );
};

interface StatCardProps {
    label: string;
    value: number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
    <Stat bg="gray.800" p={4} borderRadius="md" minW="150px">
        <StatLabel>{label}</StatLabel>
        <StatNumber>{value}</StatNumber>
    </Stat>
);

export default AdminMetrics;
