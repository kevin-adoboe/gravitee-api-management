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
import { GridsterConfig, GridType, CompactType, DisplayGrid } from 'angular-gridster2';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { GridComponent } from './grid.component';
import { Widget } from '../widget/widget';

interface GridStoryArgs {
  storyId?: string;
  items: Widget[];
  maxCols: number;
  minCols: number;
  minRows: number;
  itemAspectRatio: number;
  compactType: string;
  displayGrid: string;
  pushItems: boolean;
  draggableEnabled: boolean;
  resizableEnabled: boolean;
  outerMargin: boolean;
  fixedColWidth: number;
  fixedRowHeight: number;
}

// Common widget items to avoid duplication
const commonItems: Widget[] = [
  {
    id: 'widget-1',
    label: 'API Calls',
    type: 'pie',
    layout: { cols: 2, rows: 1, x: 0, y: 0 },
  },
  {
    id: 'widget-2',
    label: 'Database Queries',
    type: 'doughnut',
    layout: { cols: 1, rows: 1, x: 2, y: 0 },
  },
  {
    id: 'widget-3',
    label: 'Cache Hits',
    type: 'kpi',
    layout: { cols: 1, rows: 1, x: 3, y: 0 },
  },
  {
    id: 'widget-4',
    label: 'Error Rate',
    type: 'pie',
    layout: { cols: 1, rows: 3, x: 0, y: 1 },
  },
  {
    id: 'widget-5',
    label: 'Response Time',
    type: 'doughnut',
    layout: { cols: 3, rows: 3, x: 1, y: 1 },
  },
  {
    id: 'widget-6',
    label: 'User Activity',
    type: 'polarArea',
    layout: { cols: 2, rows: 2, x: 4, y: 1 },
  },
];

export default {
  title: 'Gravitee Dashboard/Components/Grid',
  component: GridComponent,
  decorators: [
    moduleMetadata({
      imports: [GridComponent],
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
        component:
          'A grid component built with Angular Gridster2 that displays widgets in a draggable and resizable layout. The grid options can be configured to customize the grid behavior. More info: https://tiberiuzuld.github.io/angular-gridster2/api',
      },
    },
  },
  argTypes: {
    storyId: {
      table: { disable: true },
    },
    items: {
      description: 'Array of widgets to display in the grid',
    },
    maxCols: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Maximum number of columns',
      defaultValue: 6,
      if: { arg: 'storyId', eq: 'gridOptions' },
    },
    minCols: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Minimum number of columns',
      defaultValue: 6,
      if: { arg: 'storyId', eq: 'gridOptions' },
    },
    minRows: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Minimum number of rows',
      defaultValue: 8,
      if: { arg: 'storyId', eq: 'gridOptions' },
    },
    itemAspectRatio: {
      control: { type: 'number', min: 0.1, max: 5, step: 0.1 },
      description: 'Aspect ratio of grid items',
      defaultValue: 4 / 3,
      if: { arg: 'storyId', eq: 'gridOptions' },
    },
    compactType: {
      control: { type: 'select' },
      options: ['none', 'compactUp', 'compactLeft', 'compactUp&Left', 'compactUp&Right', 'compactLeft&Up', 'compactRight&Up'],
      description: 'How to compact the grid',
      defaultValue: 'none',
      if: { arg: 'storyId', eq: 'gridOptions' },
    },
    displayGrid: {
      control: { type: 'select' },
      options: ['none', 'always', 'onDrag&Resize'],
      description: 'When to display the grid lines',
      defaultValue: 'none',
      if: { arg: 'storyId', eq: 'gridOptions' },
    },
    draggableEnabled: {
      control: { type: 'boolean' },
      description: 'Whether items can be dragged',
      defaultValue: true,
      if: { arg: 'storyId', eq: 'gridOptions' },
    },
    pushItems: {
      control: { type: 'boolean' },
      description: 'Whether to push items when dragging',
      defaultValue: true,
      if: { arg: 'storyId', eq: 'gridOptions' },
    },
    resizableEnabled: {
      control: { type: 'boolean' },
      description: 'Whether items can be resized',
      defaultValue: true,
      if: { arg: 'storyId', eq: 'gridOptions' },
    },
    outerMargin: {
      control: { type: 'boolean' },
      description: 'Whether to add outer margin',
      defaultValue: true,
      if: { arg: 'storyId', eq: 'gridOptions' },
    },
    fixedColWidth: {
      control: { type: 'number', min: 10, max: 200 },
      description: 'Fixed column width in pixels',
      defaultValue: 50,
      if: { arg: 'storyId', eq: 'gridOptions' },
    },
    fixedRowHeight: {
      control: { type: 'number', min: 50, max: 500 },
      description: 'Fixed row height in pixels',
      defaultValue: 150,
      if: { arg: 'storyId', eq: 'gridOptions' },
    },
  },
  render: (args: Record<string, unknown>) => ({
    template: `
          <gd-grid [items]="items" />
    `,
    props: {
      items: (args as unknown as GridStoryArgs).items,
    },
  }),
} as Meta<GridComponent>;

export const Default: StoryObj<GridComponent> = {
  args: {
    items: commonItems,
  },
};

export const GridOptions: StoryObj<GridComponent> = {
  args: {
    storyId: 'gridOptions',
    items: commonItems,
    maxCols: 8,
    minCols: 4,
    minRows: 6,
    itemAspectRatio: 1.5,
    compactType: 'compactUp',
    displayGrid: 'always',
    draggableEnabled: true,
    pushItems: false,
    resizableEnabled: true,
    outerMargin: true,
    fixedColWidth: 80,
    fixedRowHeight: 120,
  } as GridStoryArgs,
  render: (args: Record<string, unknown>) => {
    const typedArgs = args as unknown as GridStoryArgs;
    const options: GridsterConfig = {
      gridType: GridType.VerticalFixed,
      maxCols: typedArgs.maxCols,
      minCols: typedArgs.minCols,
      minRows: typedArgs.minRows,
      itemAspectRatio: typedArgs.itemAspectRatio,
      compactType: typedArgs.compactType as CompactType,
      displayGrid: typedArgs.displayGrid as DisplayGrid,
      pushItems: typedArgs.pushItems,
      draggable: {
        enabled: typedArgs.draggableEnabled,
      },
      resizable: {
        enabled: typedArgs.resizableEnabled,
      },
      outerMargin: typedArgs.outerMargin,
      setGridSize: false, // Désactiver le redimensionnement automatique
      fixedColWidth: typedArgs.fixedColWidth,
      fixedRowHeight: typedArgs.fixedRowHeight,
    };

    return {
      template: `
          <div style="height: 100vh; ">
            <gd-grid [items]="items" [options]="options" />
          </div>
      `,
      props: {
        items: typedArgs.items,
        options: options,
      },
    };
  },
};
