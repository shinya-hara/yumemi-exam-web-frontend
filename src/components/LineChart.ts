import { defineComponent, h, PropType } from 'vue';

import { Line } from 'vue-chartjs';
import { TChartData } from 'vue-chartjs/dist/types';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Plugin,
  DefaultDataPoint,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
);

export default defineComponent({
  name: 'LineChart',
  components: {
    Line,
  },
  props: {
    chartData: {
      type: Object as PropType<
        TChartData<'line', DefaultDataPoint<'line'>, string>
      >,
      required: true,
    },
    chartId: {
      type: String,
      default: 'line-chart',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => ({}),
    },
    plugins: {
      type: Array as PropType<Plugin<'line'>[]>,
      default: () => [],
    },
  },
  setup(props) {
    const chartOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: {
          title: {
            display: true,
            text: '年度',
            align: 'end',
          },
        },
        yAxes: {
          title: {
            display: true,
            text: '総人口',
            align: 'end',
          },
        },
      },
    };

    return () =>
      h(Line, {
        chartData: props.chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      });
  },
});
