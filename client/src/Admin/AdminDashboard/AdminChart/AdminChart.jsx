import React from "react";
import "./AdminChart.css"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AdminChart = () => {
  // Example data
  const salesData = [
    { month: "Jan", sold: 400, available: 240 },
    { month: "Feb", sold: 300, available: 200 },
    { month: "Mar", sold: 500, available: 300 },
    { month: "Apr", sold: 700, available: 350 },
    { month: "May", sold: 600, available: 400 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 2000 },
    { month: "Feb", revenue: 2500 },
    { month: "Mar", revenue: 3800 },
    { month: "Apr", revenue: 4200 },
    { month: "May", revenue: 5000 },
  ];

  const genreData = [
    { name: "Fiction", value: 400 },
    { name: "Business", value: 300 },
    { name: "Sci-Fi", value: 300 },
    { name: "Romance", value: 200 },
    { name: "History", value: 100 },
  ];

  const COLORS = ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b"];

  return (
    <div className="charts-container">
      <h2 className="dashboard-title">📊 Admin Dashboard Overview</h2>

      {/* Sales Bar Chart */}
      <div className="chart-card">
        <h3>Books Sold vs Available</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sold" fill="#4e73df" />
            <Bar dataKey="available" fill="#1cc88a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Line Chart */}
      <div className="chart-card">
        <h3>Revenue Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#e74a3b" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart for Genres */}
      <div className="chart-card">
        <h3>Popular Genres</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={genreData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {genreData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminChart;
