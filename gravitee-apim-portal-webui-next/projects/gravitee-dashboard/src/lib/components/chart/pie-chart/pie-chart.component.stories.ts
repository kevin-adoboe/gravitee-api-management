/*
 * Copyright (C) 2025 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { PieChartComponent, PieType } from './pie-chart.component';

export default {
  title: 'Gravitee Dashboard/Components/Chart/Pie Chart',
  component: PieChartComponent,
  decorators: [
    moduleMetadata({
      imports: [PieChartComponent],
    }),
    applicationConfig({
      providers: [
        // Register Chart.js controllers for pie charts
        provideCharts(withDefaultRegisterables()),
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A pie chart component built with Chart.js that displays data in a circular chart format.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['pie', 'doughnut', 'polarArea'],
      description: 'Type of pie chart to display',
    },
    data: {
      description: 'Chart data containing labels and datasets',
    },
    option: {
      description: 'Chart configuration options',
    },
  },
  render: args => ({
    template: `
        <div style="height: 100vh; width: 100vw; position: absolute; top: 0; left: 0;">
          <gd-pie-chart [type]="type" [data]="data" [option]="option" />
        </div>
    `,
    props: {
      type: args.type,
      data: args.data,
      option: args.option,
    },
  }),
} as Meta<PieChartComponent<PieType>>;

export const Default: StoryObj<PieChartComponent<PieType>> = {
  args: {
    type: 'pie' as PieType,
    data: {
      labels: ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'],
      datasets: [
        {
          data: [350, 450, 100],
        },
      ],
    },
    option: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Sales Distribution',
        },
      },
    },
  },
};

export const WithCustomColors: StoryObj<PieChartComponent<PieType>> = {
  args: {
    type: 'pie' as PieType,
    data: {
      labels: ['API Calls', 'WebSocket Connections', 'Database Queries', 'Cache Hits'],
      datasets: [
        {
          data: [1200, 800, 600, 400],
          backgroundColor: ['#FF9100', '#E61A1A', '#4EB151', '#1EC9D2'],
          hoverBackgroundColor: ['#FFBE4D', '#ED685E', '#83C98A', '#3FDBE4'],
          borderWidth: 2,
          borderColor: '#ffffff',
        },
      ],
    },
    option: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        title: {
          display: true,
          text: 'System Metrics Overview',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
    },
  },
};

export const WithPercentageDisplayHover: StoryObj<PieChartComponent<PieType>> = {
  args: {
    type: 'pie' as PieType,
    data: {
      labels: ['Success', 'Warning', 'Error'],
      datasets: [
        {
          data: [34, 10, 5, 20],
        },
      ],
    },
    option: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Request Status Distribution',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
              const value = (typeof context.parsed === 'number' ? context.parsed : context.raw) as number;
              const percentage = ((value / total) * 100).toFixed(1);
              return `${context.label}: ${value} (${percentage}%)`;
            },
          },
        },
      },
    },
  },
};

export const LargeDataset: StoryObj<PieChartComponent<PieType>> = {
  args: {
    type: 'pie' as PieType,
    data: {
      labels: ['North America', 'Europe', 'Asia Pacific', 'South America', 'Africa', 'Middle East', 'Oceania'],
      datasets: [
        {
          data: [35, 28, 20, 8, 5, 3, 1],
        },
      ],
    },
    option: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 12,
            padding: 15,
          },
        },
        title: {
          display: true,
          text: 'Global User Distribution',
        },
      },
    },
  },
};
