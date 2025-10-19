import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  Label,
} from "recharts";
import {
  useGetDashboardInfoQuery,
  useGetFilteredSubmissionDataQuery,
  useMonthlyRevenueQuery,
} from "../../redux/features/baseApi";
import { IoChevronDownOutline } from "react-icons/io5";
import { GoFile } from "react-icons/go";
import { AiOutlineException } from "react-icons/ai";
import ActivityTest from "../AdminDashboard/ActivityTest";
import { DollarSign, Users } from "lucide-react";

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
  // Handle array of year objects
  if (Array.isArray(backendData)) {
    const yearData = backendData.find((item) => item?.year === year);
    if (!yearData || !Array.isArray(yearData.data)) return [];
    return yearData.data.map((value, index) => {
      const numeric = Number(value) || 0;
      return {
        month: monthNames[index],
        value: numeric,
        formattedValue: numeric.toLocaleString(),
      };
    });
  }

  // Handle object with monthly_revenue
  if (
    backendData &&
    typeof backendData === "object" &&
    backendData.monthly_revenue
  ) {
    const fullMonthOrder = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return fullMonthOrder.map((fullName, index) => {
      const raw = backendData.monthly_revenue[fullName] ?? 0;
      const numeric = Number(raw) || 0;
      return {
        month: monthNames[index],
        value: numeric,
        formattedValue: numeric.toLocaleString(),
      };
    });
  }

  if (
    backendData &&
    typeof backendData === "object" &&
    backendData.monthly_submissions
  ) {
    const fullMonthOrder = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return fullMonthOrder.map((fullName, index) => {
      const raw = backendData.monthly_submissions[fullName] ?? 0;
      const numeric = Number(raw) || 0;
      return {
        month: monthNames[index],
        value: numeric,
        formattedValue: numeric.toLocaleString(),
      };
    });
  }

  return [];
};

export default function SuperAdminHome() {
  const [period, setPeriod] = useState("2025");
  const [years, setYears] = useState([String(period)]);
  const { data: dashboardData, isLoading: isDashboardLoading } =
    useGetDashboardInfoQuery();
  const yearParam = parseInt(period, 10);
  const { data: revenueInfo, isLoading: isRevenueLoading } =
    useMonthlyRevenueQuery(yearParam);
  const { data: submissionInfo, isLoading: isSubmissionLoading } =
    useGetFilteredSubmissionDataQuery(yearParam);

  useEffect(() => {
    const revYears = Array.isArray(revenueInfo?.available_years)
      ? revenueInfo.available_years.map(String)
      : [];
    const subYears = Array.isArray(submissionInfo?.available_years)
      ? submissionInfo.available_years.map(String)
      : [];
    const merged = Array.from(new Set([...revYears, ...subYears]));
    if (merged.length) {
      setYears(merged);
      if (!merged.includes(String(period))) {
        setPeriod(merged[0] || "2025");
      }
    }
  }, [revenueInfo, submissionInfo, period]);

  const revenueSource = revenueInfo?.all_revenue_data ?? revenueInfo ?? null;
  const submissionSource = submissionInfo ?? revenueInfo ?? null;

  const revenueData = processChartData(revenueSource, parseInt(period));
  const submissionsData = processChartData(submissionSource, parseInt(period));

  const revenuePeak =
    revenueData?.length > 0
      ? revenueData.reduce(
          (max, item) => (item.value > (max.value ?? -Infinity) ? item : max),
          revenueData[0]
        )
      : null;

  const submissionPeak =
    submissionsData?.length > 0
      ? submissionsData.reduce(
          (max, item) => (item.value > (max.value ?? -Infinity) ? item : max),
          submissionsData[0]
        )
      : null;

  if (isDashboardLoading || isRevenueLoading || isSubmissionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-bars loading-xl"></span>
          <p className="text-gray-600 font-medium">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Active Users"
          value={dashboardData?.total_users ?? "N/A"}
          icon={<UsersIcon className="h-5 w-5 text-indigo-600" />}
          bgColor="bg-indigo-50"
        />
        <StatCard
          title="Total Revenue"
          value={dashboardData?.total_revenue ?? "N/A"}
          icon={<DollarIcon className="h-5 w-5 text-emerald-600" />}
          bgColor="bg-emerald-50"
        />
        <StatCard
          title="Total Documents"
          value={dashboardData?.total_documents ?? "N/A"}
          icon={<GoFile className="h-5 w-5 text-amber-600" />}
          change={4.3}
          trend="down"
          period="yesterday"
          bgColor="bg-amber-50"
        />
        <StatCard
          title="Total Submissions"
          value={dashboardData?.total_submissions ?? "N/A"}
          icon={<AiOutlineException className="h-5 w-5 text-green-600" />}
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
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
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
                {revenuePeak?.month && (
                  <ReferenceDot
                    x={revenuePeak.month}
                    y={revenuePeak.value}
                    r={4}
                    fill="#3b82f6"
                    stroke="none"
                  >
                    <Label
                      value={revenuePeak.formattedValue}
                      position="top"
                      fill="#3b82f6"
                      fontSize={12}
                    />
                  </ReferenceDot>
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
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
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
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
                {submissionPeak?.month && (
                  <ReferenceDot
                    x={submissionPeak.month}
                    y={submissionPeak.value}
                    r={4}
                    fill="#22c55e"
                    stroke="none"
                  >
                    <Label
                      value={submissionPeak.formattedValue}
                      position="top"
                      fill="#22c55e"
                      fontSize={12}
                    />
                  </ReferenceDot>
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabs Section with ActivityTest */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Activity</h2>
          <ActivityTest />
        </div>
      </div>
    </div>
  );
}

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

function UsersIcon({ className }) {
  return <Users size={20} className="text-indigo-500" />;
}

function DollarIcon({ className }) {
  return <DollarSign size={20} className="text-emerald-600" />;
}
