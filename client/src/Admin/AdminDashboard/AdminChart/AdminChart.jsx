import React from "react";
import "./AdminChart.css";
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
import useTransactions from "../../../Hooks/useTransactions";
import useBooks from "../../../Hooks/useBooks";

const AdminChart = () => {
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
  // Example data
  const { transactions } = useTransactions();
  const { bookCollection } = useBooks();

  const salesData = monthNames.map((month, index) => ({
    month,
    sold: transactions.filter(
      (tx) =>
        new Date(tx.createdAt).getMonth() === index && tx.status === "success"
    ).length, // Count how many successful sales happened in that month
  }));

  const revenueData = monthNames.map((month, index) => ({
    month,
    revenue: transactions
      .filter(
        (tx) =>
          new Date(tx.createdAt).getMonth() === index && tx.status === "success"
      )
      .reduce((sum, tx) => sum + parseFloat(tx.amount), 0),
  }));

  // Build category data dynamically
  const categoryCountMap = {};

  bookCollection.forEach((book) => {
    const categoryName = book.category?.category || "Uncategorized";
    categoryCountMap[categoryName] = (categoryCountMap[categoryName] || 0) + 1;
  });

  const genreData = Object.entries(categoryCountMap).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b"];

  return (
    <div className="charts-container">
      <h2 className="dashboard-title">📊 Admin Overview</h2>

      {/* Sales Bar Chart */}
      <div className="chart-card">
        <h3>Books Sold</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sold" fill="#4e73df" />
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
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#e74a3b"
              strokeWidth={3}
            />
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
