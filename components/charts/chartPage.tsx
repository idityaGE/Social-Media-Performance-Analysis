"use client";

import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';
import { SocialEngagementDataType } from '@/utils/load-data';
import processData from "@/lib/processData";

const SocialMetricsComparison = ({ engagementData }: { engagementData: SocialEngagementDataType[] }) => {
  const processedData = processData(engagementData);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Engagement Metrics by Post Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
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
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={processedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Post Type" />
                <YAxis unit="%" />
                <Tooltip />
                <Bar dataKey="Engagement Rate" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Watch Time Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
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

        <Card>
          <CardHeader>
            <CardTitle>Average Hashtags Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processedData}>
                  <CartesianGrid strokeDasharray="3 3" />
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
