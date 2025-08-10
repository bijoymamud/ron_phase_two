import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import {
  useGetDashboardInfoQuery,
  useMonthlyRevenueQuery,
} from "../../redux/features/baseApi";
import { IoChevronDownOutline } from "react-icons/io5";
import {
  CheckSquareIcon,
  ClockIcon,
  DollarSignIcon,
  UsersIcon,
} from "lucide-react";
import ActivityTest from "../AdminDashboard/ActivityTest";

// Month names for X-axis
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const processChartData = (backendData, year) => {
  const yearData = backendData.find((item) => item.year === year);
  if (!yearData) return [];

  return yearData.data.map((value, index) => ({
    month: monthNames[index],
    value: value,
    formattedValue: value.toLocaleString(),
  }));
};

export default function SuperAdminHome() {
  const [period, setPeriod] = useState("2025");
  const { data: dashboardData } = useGetDashboardInfoQuery();
  const { data: revenueInfo } = useMonthlyRevenueQuery();

  // Assuming revenueInfo contains the backend data you provided
  const revenueData = revenueInfo?.all_revenue_data
    ? processChartData(revenueInfo.all_revenue_data, parseInt(period))
    : [];
  const submissionsData = revenueInfo?.all_submission_data
    ? processChartData(revenueInfo.all_submission_data, parseInt(period))
    : [];

  const revenuePeak = revenueData.reduce(
    (max, item) => (item.value > max.value ? item : max),
    revenueData[0] || {}
  );
  const submissionPeak = submissionsData.reduce(
    (max, item) => (item.value > max.value ? item : max),
    submissionsData[0] || {}
  );

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={dashboardData?.total_user}
          icon={<UsersIcon className="h-5 w-5 text-indigo-600" />}
          bgColor="bg-indigo-50"
        />
        <StatCard
          title="Total Revenue"
          value={dashboardData?.total_revenue}
          icon={<DollarSignIcon className="h-5 w-5 text-emerald-600" />}
          bgColor="bg-emerald-50"
        />
        <StatCard
          title="Total Payment"
          value={dashboardData?.complete_rate}
          icon={<CheckSquareIcon className="h-5 w-5 text-amber-600" />}
          change={4.3}
          trend="down"
          period="yesterday"
          bgColor="bg-amber-50"
        />
        <StatCard
          title="Documents Submition"
          value={dashboardData?.submission_count}
          icon={<ClockIcon className="h-5 w-5 text-green-600" />}
          bgColor="bg-green-50"
        />
      </div>
      {/* Revenue Chart */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Total Revenue</h2>
            <div className="relative">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="2025">2025</option>
                {/* Add more years if backend supports multiple years */}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <IoChevronDownOutline />
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                {revenuePeak.month && (
                  <ReferenceDot
                    x={revenuePeak.month}
                    y={revenuePeak.value}
                    r={4}
                    fill="#3b82f6"
                    stroke="none"
                  >
                    <label position="top" fill="#3b82f6" fontSize={12}>
                      {revenuePeak.formattedValue}
                    </label>
                  </ReferenceDot>
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <h1></h1>
        </div>
      </div>
      {/* Submissions Chart */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Total Submissions</h2>
            <div className="relative">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="2025">2025</option>
                {/* Add more years if backend supports multiple years */}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <IoChevronDownOutline />
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={submissionsData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="colorSubmissions"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#22c55e"
                  fillOpacity={1}
                  fill="url(#colorSubmissions)"
                />
                {submissionPeak.month && (
                  <ReferenceDot
                    x={submissionPeak.month}
                    y={submissionPeak.value}
                    r={4}
                    fill="#22c55e"
                    stroke="none"
                  >
                    <label position="top" fill="#22c55e" fontSize={12}>
                      {submissionPeak.formattedValue}
                    </label>
                  </ReferenceDot>
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* tabs */}
      <ActivityTest />
    </div>
  );
}

// Modified CustomTooltip to show month
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="font-medium">{`Month: ${payload[0].payload.month}`}</p>
        <p className="text-gray-700">{`Value: ${payload[0].payload.formattedValue}`}</p>
      </div>
    );
  }
  return null;
}

// StatCard and Icons remain unchanged
function StatCard({ title, value, icon, change, trend, period, bgColor }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
      </div>
    </div>
  );
}
