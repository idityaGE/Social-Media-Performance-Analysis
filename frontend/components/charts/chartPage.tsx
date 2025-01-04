"use client"

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/card';
import { SocialEngagementDataType } from '@/utils/load-data';
import processData from "@/lib/processData";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const SocialMetricsComparison = ({ engagementData }: { engagementData: SocialEngagementDataType[] }) => {
  const processedData = processData(engagementData);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Engagement Metrics by Post Type</CardTitle>
            <CardDescription>Compare likes, comments, shares, and saves across different post types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Post Type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Likes" fill="#8884d8" />
                  <Bar dataKey="Comments" fill="#82ca9d" />
                  <Bar dataKey="Shares" fill="#ffc658" />
                  <Bar dataKey="Saves" fill="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Rate Comparison</CardTitle>
            <CardDescription>Distribution of engagement rates across post types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={processedData}
                    dataKey="Engagement Rate"
                    nameKey="Post Type"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={(entry) => `${entry.name}: ${entry.value.toFixed(2)}%`}
                  >
                    {processedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${Number(value).toFixed(2)}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Watch Time Analysis</CardTitle>
            <CardDescription>Average watch time for video content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processedData.filter(d => 'Watch Time' in d)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Post Type" />
                  <YAxis unit="s" />
                  <Tooltip />
                  <Bar dataKey="Watch Time" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className='col-span-1 md:col-span-2'>
          <CardHeader>
            <CardTitle>Average Hashtags Used</CardTitle>
            <CardDescription>Number of hashtags used per post type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processedData}>
                  <CartesianGrid strokeDasharray="3 12" />
                  <XAxis dataKey="Post Type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Hashtags" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialMetricsComparison;

