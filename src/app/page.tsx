"use client";
import { ReactECharts } from "@/components/ReactECharts";
import { graphic } from "echarts";
import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
  ECharts,
} from "echarts";
import { Button, styled } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import svg1 from "../../infoIcon.svg";
console.log(svg1.src);
const pieColors = [
  "#FF877C",
  "#25B4C8",
  "#D88ADA",
  "#9ECC7F",
  "#F9DE82",
  "#39519B",
];
const pieData = [
  // {
  //   value: 10,
  //   name: "Search Engine Search Engine Engine Search Engine Search Engine",
  // },
  {
    value: 20,
    name: "Engine Search Engine Search Engine",
  },
  // {
  //   value: 25,
  //   name: "Other Search Engine Search Engine Search Search Engine Search Engine Search Engine Search Engine  ",
  // },
  {
    value: 15,
    name: "Option 1 Option 1",
  },
  {
    value: 2,
    name: "Option 2 Option 2 Option 2 Option 2 Option 2Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2",
  },
  { value: 3, name: "Option 3 Option 3 Option 3 Option 3 " },
  // { value: 5, name: "Option 4" },
];
const images = [
  "https://plus.unsplash.com/premium_photo-1697695568731-5b351d7aca4b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682685797140-c17807f8f217?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682685797857-97de838c192e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682695796497-31a44224d6d6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // "https://images.unsplash.com/photo-1704107116952-978a5712566c?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // "https://plus.unsplash.com/premium_photo-1663946448065-967d72d58b4f?q=80&w=2875&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // "https://images.unsplash.com/photo-1705179573286-495f1b4fabaf?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
type PieLegend = [number, number, string, string][];
const customSeriesData: PieLegend = pieData.map(({ value, name }, idx) => [
  value,
  idx + 1,
  name,
  images[idx],
]);
console.log("customSeriesData", customSeriesData);

function breakWord(string: string, symbolsCount: number) {
  const splittedBySpacing = string.split(" ");
  const spacing = " ";
  return splittedBySpacing.reduce(
    (total, current, idx) => {
      let lastElem = total[total.length - 1];
      const nextLength = lastElem.length + ` ${current}`.length;
      if (nextLength <= symbolsCount) {
        total[total.length - 1] += `${idx ? spacing : ""}${current}`;
      } else {
        total.push(`${current}`);
      }
      return total;
    },
    [""]
  );
}
function truncate(text: string, symbolsCount: number) {
  if (text.length <= symbolsCount) return text;
  return text.slice(0, symbolsCount) + "...";
}
const TEXT_LINE_HEIGHT = 20;
const OPTION_IMAGE_SIDE = 72;
const OPTION_IMAGE_MARGIN_RIGHT = 8;
const OPTION_IMAGE_MARGIN_BOTTOM = 8;
const CIRCLE_ICON_MARGIN_RIGHT = 4;
const CIRCLE_ICON_S_MARGIN_LEFT = 4;
const CIRCLE_ICON_RADIUS = 6;
// break word for L charts
const L_LEGEND_MAX_SYMBOLS_COUNT = 50;
const L_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT = 30;
// truncate for M charts
const M_LEGEND_MAX_SYMBOLS_COUNT = 22;
const M_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT = 6;
const QUESTION_IMAGE_SIDE = 120;
const L_CHART_WIDTH = 952;
const M_CHART_WIDTH = 616;
const IMAGE_OPTION_BG_RADIUS = 8;
const M_GRID_TOP_PADDING = 8;
const M_GRID_BOTTOM_PADDING = 8;
const MAX_PERCENTS_TEXT_WIDTH = 36;
const RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE = "RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE";
const RectangleWithRadius = graphic.extendShape({
  buildPath: function (ctx, shape) {
    const { x, y, height } = shape;
    ctx.beginPath();
    ctx.moveTo(x + IMAGE_OPTION_BG_RADIUS, y);
    ctx.lineTo(x + height - IMAGE_OPTION_BG_RADIUS, y);
    ctx.quadraticCurveTo(x + height, y, x + height, y + IMAGE_OPTION_BG_RADIUS);
    ctx.lineTo(x + height, y + height - IMAGE_OPTION_BG_RADIUS);
    ctx.quadraticCurveTo(
      x + height,
      y + height,
      x + height - IMAGE_OPTION_BG_RADIUS,
      y + height
    );
    ctx.lineTo(x + IMAGE_OPTION_BG_RADIUS, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - IMAGE_OPTION_BG_RADIUS);
    ctx.lineTo(x, y + IMAGE_OPTION_BG_RADIUS);
    ctx.quadraticCurveTo(x, y, x + IMAGE_OPTION_BG_RADIUS, y);
    ctx.closePath();
  },
});
graphic.registerShape(RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE, RectangleWithRadius);
const getLegendIconColor = (colors: string[], index: number) => {
  const remainder = index % colors.length;
  return colors[remainder];
};
const legendTextStyles = {
  lineHeight: TEXT_LINE_HEIGHT,
  fontSize: 14,
  fontWeight: 500,
  fontFamily: "Manrope, sans-serif",
};
const getQuestionImage = (
  questionImageUrl: string,
  coordSysHeight: number,
  size: string
) => {
  const chartWidth = size === "medium" ? M_CHART_WIDTH : L_CHART_WIDTH;
  return [
    {
      type: RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
      shape: {
        width: QUESTION_IMAGE_SIDE,
        height: QUESTION_IMAGE_SIDE,
        x: chartWidth - QUESTION_IMAGE_SIDE,
        y: (coordSysHeight - QUESTION_IMAGE_SIDE) / 2,
      },
      style: {
        fill: "#1a1a25",
      },
    },
    {
      type: "image",
      style: {
        x: 0,
        image: questionImageUrl,
        y: 0,
        width: QUESTION_IMAGE_SIDE,
        height: QUESTION_IMAGE_SIDE,
      },
      position: [
        chartWidth - QUESTION_IMAGE_SIDE,
        (coordSysHeight - QUESTION_IMAGE_SIDE) / 2,
      ],
    },
  ];
};
const renderLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
  questionImageUrl: string,
  optionHeights: number[],
  optionsWithImagesLines: number[]
) => {
  const itemsLength = optionHeights.length;
  const xAxisStartPx = param.coordSys.x;
  const [_, ySizePx] = api.size([1, 1]) as number[];
  const iconColor = getLegendIconColor(pieColors, param.dataIndex);
  const questionImage = questionImageUrl
    ? getQuestionImage(
        questionImageUrl,
        (param.coordSys as any).height,
        "large",
        0
      )
    : [];
  const percents = api.value(0);
  const label = api.value(2);
  const imageOptionUrl = api.value(3);
  const labelChunks = breakWord(
    label as string,
    questionImageUrl
      ? L_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT
      : L_LEGEND_MAX_SYMBOLS_COUNT
  );
  const prevOptionHeightsSum = optionHeights.reduce((total, current, idx) => {
    if (idx < param.dataIndex) {
      total += current;
    }
    return total;
  }, 0);
  let yImageCenter =
    prevOptionHeightsSum +
    (optionHeights[param.dataIndex] - OPTION_IMAGE_MARGIN_BOTTOM) / 2;
  const coverY =
    prevOptionHeightsSum +
    (optionHeights[param.dataIndex] - OPTION_IMAGE_MARGIN_BOTTOM) / 2 -
    OPTION_IMAGE_SIDE / 2;
  const labelY =
    itemsLength === 1
      ? ySizePx / 2 - (labelChunks.length * TEXT_LINE_HEIGHT) / 2
      : yImageCenter -
        (optionsWithImagesLines[param.dataIndex] * TEXT_LINE_HEIGHT) / 2;
  const iconX =
    xAxisStartPx +
    OPTION_IMAGE_SIDE +
    OPTION_IMAGE_MARGIN_RIGHT +
    CIRCLE_ICON_RADIUS;
  const percentsX = iconX + CIRCLE_ICON_RADIUS + CIRCLE_ICON_MARGIN_RIGHT;
  const labelX = MAX_PERCENTS_TEXT_WIDTH + percentsX;
  return {
    type: "group",
    silent: true,
    children: [
      ...questionImage,
      {
        type: "text",
        style: {
          text: `${percents}%`,
          ...legendTextStyles,
          fill: "#fff",
        },
        position: [
          percentsX,
          itemsLength === 1
            ? ySizePx / 2 - TEXT_LINE_HEIGHT / 2
            : yImageCenter - TEXT_LINE_HEIGHT / 2,
        ],
      },
      {
        type: "text",
        style: {
          text: labelChunks.join("\n"),
          ...legendTextStyles,
          fill: "#c8cad0",
        },
        position: [labelX, labelY],
      },
      {
        type: RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
        shape: {
          width: OPTION_IMAGE_SIDE,
          height: OPTION_IMAGE_SIDE,
          x: xAxisStartPx,
          y: itemsLength === 1 ? ySizePx / 2 - OPTION_IMAGE_SIDE / 2 : coverY,
        },
        style: {
          fill: "#1a1a25",
        },
      },
      {
        type: "image",
        style: {
          x: 0,
          image: imageOptionUrl,
          y: 1,
          width: OPTION_IMAGE_SIDE,
          height: OPTION_IMAGE_SIDE,
        },
        position: [
          xAxisStartPx,
          itemsLength === 1 ? ySizePx / 2 - OPTION_IMAGE_SIDE / 2 : coverY,
        ],
      },
      {
        type: "circle",
        shape: {
          cx: 0,
          cy: 0,
          r: 6,
        },
        style: {
          fill: iconColor,
        },
        position: [iconX, itemsLength === 1 ? ySizePx / 2 : yImageCenter],
      },
    ],
  };
};
const hiddenAxises = {
  xAxis: {
    splitLine: {
      show: true,
    },
    axisTick: {
      show: true,
    },
    axisLine: {
      show: true,
    },
  },
  yAxis: {
    axisLabel: {
      show: true,
    },
    type: "value",
    splitLine: {
      show: true,
    },
    axisLine: {
      show: true,
    },
    axisTick: {
      show: true,
    },
  },
};
const renderMdLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
  questionImageUrl: string,
  itemsLength: number,
  hasOverflow: boolean
) => {
  const xAxisStartPx = param.coordSys.x;
  const [_, ySizePx] = api.size([1, 1]) as number[];
  const iconColor = getLegendIconColor(pieColors, param.dataIndex);
  const percents = api.value(0);
  const label = api.value(2);
  const imageOptionUrl = api.value(3);
  const overflowDots = hasOverflow
    ? [
        {
          type: "text",
          style: {
            text: "...",
            ...legendTextStyles,
            fill: "#c8cad0",
          },
          position: [
            1.5 * xAxisStartPx,
            M_GRID_TOP_PADDING - TEXT_LINE_HEIGHT / 2 + ySizePx * 4,
          ],
        },
      ]
    : [];
  const verticalPadding =
    (barContainerHeights.medium -
      itemsLength * OPTION_IMAGE_SIDE -
      (itemsLength - 1) * OPTION_IMAGE_MARGIN_BOTTOM) /
    2;
  const questionImage = questionImageUrl
    ? getQuestionImage(
        questionImageUrl,
        (param.coordSys as any).height,
        "medium"
      )
    : [];
  const coverY =
    verticalPadding +
    param.dataIndex * (OPTION_IMAGE_SIDE + OPTION_IMAGE_MARGIN_BOTTOM);
  const iconY =
    verticalPadding +
    param.dataIndex * (OPTION_IMAGE_SIDE + OPTION_IMAGE_MARGIN_BOTTOM) +
    OPTION_IMAGE_SIDE / 2;
  const labelY = iconY - TEXT_LINE_HEIGHT / 2;
  const truncatedText = truncate(
    label as string,
    questionImageUrl
      ? M_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT
      : M_LEGEND_MAX_SYMBOLS_COUNT
  );

  const iconX =
    xAxisStartPx +
    OPTION_IMAGE_SIDE +
    OPTION_IMAGE_MARGIN_RIGHT +
    CIRCLE_ICON_RADIUS;
  const percentsX = iconX + CIRCLE_ICON_RADIUS + CIRCLE_ICON_MARGIN_RIGHT;
  return {
    type: "group",
    silent: true,
    children: [
      ...questionImage,
      ...overflowDots,
      {
        type: "text",
        style: {
          text: `${percents}%`,
          ...legendTextStyles,
          fill: "#fff",
        },
        position: [percentsX, labelY],
      },
      {
        type: "text",
        style: {
          text: truncatedText,
          ...legendTextStyles,
          fill: "#c8cad0",
        },
        position: [MAX_PERCENTS_TEXT_WIDTH + percentsX, labelY],
      },
      {
        type: RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
        shape: {
          width: OPTION_IMAGE_SIDE,
          height: OPTION_IMAGE_SIDE,
          x: xAxisStartPx,
          y: coverY,
        },
        style: {
          fill: "#1a1a25",
        },
      },
      {
        type: "image",
        style: {
          x: 0,
          image: imageOptionUrl,
          y: 1,
          width: OPTION_IMAGE_SIDE,
          height: OPTION_IMAGE_SIDE,
        },
        position: [xAxisStartPx, coverY],
      },
      {
        type: "circle",
        shape: {
          cx: 0,
          cy: 0,
          r: 6,
        },
        style: {
          fill: iconColor,
        },
        position: [iconX, iconY],
      },
    ],
  };
};
const renderSmLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
  itemsLength: number,
  hasOverflow: boolean
) => {
  const xAxisStartPx = param.coordSys.x;
  const [_, ySizePx] = api.size([1, 1]) as number[];
  const iconColor = getLegendIconColor(pieColors, param.dataIndex);
  const percents = api.value(0);
  const label = api.value(2);
  const overflowDots = hasOverflow
    ? [
        {
          type: "text",
          style: {
            text: "...",
            ...legendTextStyles,
            fill: "#c8cad0",
          },
          position: [
            1.5 * xAxisStartPx,
            M_GRID_TOP_PADDING - TEXT_LINE_HEIGHT / 2 + ySizePx * 4,
          ],
        },
      ]
    : [];
  const truncatedText = truncate(label as string, 11);

  const iconX = xAxisStartPx + CIRCLE_ICON_RADIUS + CIRCLE_ICON_S_MARGIN_LEFT;
  const iconY =
    (barContainerHeights.small - itemsLength * TEXT_LINE_HEIGHT) / 2 +
    TEXT_LINE_HEIGHT / 2 +
    param.dataIndex * TEXT_LINE_HEIGHT;
  const percentsX = iconX + CIRCLE_ICON_RADIUS + CIRCLE_ICON_MARGIN_RIGHT;
  const labelX = MAX_PERCENTS_TEXT_WIDTH + percentsX;
  const labelY =
    (barContainerHeights.small - itemsLength * TEXT_LINE_HEIGHT) / 2 +
    param.dataIndex * TEXT_LINE_HEIGHT;
  return {
    type: "group",
    silent: true,
    children: [
      ...overflowDots,
      {
        type: "text",
        style: {
          text: `${percents}%`,
          ...legendTextStyles,
          fill: "#fff",
        },
        position: [percentsX, labelY],
      },
      {
        type: "text",
        style: {
          text: truncatedText,
          ...legendTextStyles,
          fill: "#c8cad0",
        },
        position: [labelX, labelY],
      },
      {
        type: "circle",
        shape: {
          cx: 0,
          cy: 0,
          r: 6,
        },
        style: {
          fill: iconColor,
        },
        position: [iconX, iconY],
      },
    ],
  };
};
const pieTooltip = {
  trigger: "item",
  backgroundColor: "#222430",
  formatter: (params: any) => {
    const name = breakWord(params.name, 30).join("<br/>");
    return `${params.value}% ${name}`;
  },
};
const pieSeries = {
  type: "pie",
  color: pieColors,
  label: {
    show: false,
  },
  emptyCircleStyle: {
    color: "#6C7080",
  },
  center: ["25%", "50%"],
  radius: [51, 91],
  name: "pie-series",
};
export const getSmOption = (pieData: any, pieLegendData: any) => {
  const hasOverflow = pieData.length > 5;
  const data = hasOverflow ? pieData.slice(0, 4) : pieData;
  const legendData = hasOverflow ? pieLegendData.slice(0, 4) : pieLegendData;
  return {
    tooltip: pieTooltip,
    backgroundColor: "#222430",
    ...hiddenAxises,
    grid: {
      right: 0,
      top: 0,
      bottom: 0,
      left: 132,
    },
    series: [
      {
        type: "custom",
        renderItem: (
          param: CustomSeriesRenderItemParams,
          api: CustomSeriesRenderItemAPI
        ) => renderSmLegendItem(param, api, data.length, hasOverflow),
        data: legendData,
      },
      {
        ...pieSeries,
        center: ["60px", "50%"],
        radius: [40, 56],
        data,
      },
    ],
  };
};
const getMdOption = (
  pieData: any,
  pieLegendData: any,
  questionImage: string
) => {
  const hasOverflow = pieData.length > 4;
  const data = hasOverflow ? pieData.slice(0, 4) : pieData;
  const legendData = hasOverflow ? pieLegendData.slice(0, 4) : pieLegendData;
  return {
    tooltip: pieTooltip,
    backgroundColor: "#222430",
    ...hiddenAxises,
    series: [
      {
        type: "custom",
        renderItem: (
          param: CustomSeriesRenderItemParams,
          api: CustomSeriesRenderItemAPI
        ) =>
          renderMdLegendItem(
            param,
            api,
            questionImage,
            data.length,
            hasOverflow
          ),
        data: legendData,
      },
      {
        data: pieData,
        ...pieSeries,
      },
    ],
    grid: {
      left: "50%",
      right: 1,
      top: 0,
      bottom: 0,
      // top: M_GRID_TOP_PADDING,
      // bottom: M_GRID_BOTTOM_PADDING,
    },
  };
};
const getLgOption = (
  pieData: any,
  pieLegendData: any,
  questionImage: string,
  optionHeights: number[],
  optionsWithImagesLines: number[]
) => ({
  tooltip: pieTooltip,
  backgroundColor: "#222430",
  ...hiddenAxises,
  series: [
    {
      type: "custom",
      renderItem: (
        param: CustomSeriesRenderItemParams,
        api: CustomSeriesRenderItemAPI
      ) =>
        renderLegendItem(
          param,
          api,
          questionImage,
          optionHeights,
          optionsWithImagesLines
        ),
      data: pieLegendData,
    },
    {
      data: pieData,
      ...pieSeries,
    },
  ],
  grid: {
    left: "50%",
    right: 1,
    top: 0,
    bottom: 0,
  },
});
const urlToBase64 = async (url: string) => {
  let result = await getBase64Image(url);
  return result;
};
const getBase64Image = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      }
    };
    img.onerror = (error) => reject(error);
  });
};

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}
const getSvgBlob = async (chartInstance: ECharts) => {
  const svgRows = (chartInstance.renderToSVGString() as string).split("\n");
  svgRows.splice(
    1,
    0,
    '<defs><style type="text/css">@import url(http://fonts.googleapis.com/css?family=Manrope);</style></defs>'
  );
  const blob = new Blob([svgRows.join("\n")], { type: "image/svg+xml" });
  const base64 = await blobToBase64(blob);
  return base64;
};
const MIN_L_CHART_HEIGHT = 188;

const barContainerHeights = {
  small: 120,
  medium: 336, // 328
  large: "auto",
};
const barContainerWidth = {
  small: 280,
  medium: 616,
  large: 952,
};
const PieChartContainer = styled("div")<{
  size: "large" | "medium";
  height: number;
}>(({ size, height }) => {
  const width = barContainerWidth[size];
  return {
    position: "relative",
    width,
    boxSizing: "border-box",
    height:
      size === "large"
        ? height > MIN_L_CHART_HEIGHT
          ? height
          : MIN_L_CHART_HEIGHT
        : barContainerHeights[size],
  };
});

const imageUrl =
  "https://images.unsplash.com/photo-1682695798522-6e208131916d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export default function Home() {
  const containerRef = useRef(null);
  const [pieLegendData, setPieLegendData] =
    useState<PieLegend>(customSeriesData);
  const [questionImage, setQuestionImage] = useState(imageUrl);
  const [isChartDownloading, setIsChartDownloading] = useState(false);
  const optionsWithImagesMaxLines: number = pieData.reduce(
    (total: number, current: any) => {
      const { value, name } = current;
      const linesCount = breakWord(
        `${value}% ${name}`,
        imageUrl
          ? L_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT
          : L_LEGEND_MAX_SYMBOLS_COUNT
      ).length;
      return Math.max(total, linesCount);
    },
    0
  );

  const optionsWithImagesLines = pieData.reduce(
    (total: number[], current: any) => {
      const { value, name } = current;
      const linesCount = breakWord(
        `${name}`,
        imageUrl
          ? L_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT
          : L_LEGEND_MAX_SYMBOLS_COUNT
      ).length;
      total.push(linesCount);
      return total;
    },
    []
  );
  const L_MAX_LINES = Math.floor(OPTION_IMAGE_SIDE / TEXT_LINE_HEIGHT);
  const optionHeights = optionsWithImagesLines.map((lines) => {
    if (lines > L_MAX_LINES) {
      return lines * TEXT_LINE_HEIGHT + OPTION_IMAGE_MARGIN_BOTTOM;
    }
    return OPTION_IMAGE_SIDE + OPTION_IMAGE_MARGIN_BOTTOM;
  });

  const lContainerHeight =
    optionHeights.reduce((total, height) => (total += height), 0) -
    OPTION_IMAGE_MARGIN_BOTTOM;

  const downloadChart = async (chartInstance: ECharts) => {
    const url = await getSvgBlob(chartInstance);
    const anchorElement = document.createElement("a");
    anchorElement.href = url;
    anchorElement.download = `chart.svg`;
    document.body.appendChild(anchorElement);
    anchorElement.click();
    setIsChartDownloading(false);
  };
  const saveAsImage = useCallback(async () => {
    // if (chartInstance) {
    // if (withImageOptions) {
    // upload base64 images
    const base64Promises: Promise<string>[] = [];
    for (const url of pieLegendData) {
      base64Promises.push(urlToBase64(url[3] as string));
    }
    if (imageUrl) {
      const questionImageBase64 = urlToBase64(imageUrl);
      base64Promises.push(questionImageBase64);
    }
    const getBase64Promises = async () =>
      await Promise.all(base64Promises).then((values) => values);

    const base64Urls = await getBase64Promises();
    if (base64Urls.length) {
      const imagesArr = pieLegendData.map((item) => item[3]);
      const base64Images = imagesArr.map((imageUrl, idx) => base64Urls[idx]);
      setPieLegendData((prev) => {
        return prev.map((prevItem, idx) => [
          ...prevItem.slice(0, 3),
          base64Images[idx],
        ]);
      });
      setQuestionImage(base64Urls[base64Urls.length - 1]);
      setIsChartDownloading(true);
      // }
      // return;
    }
    // save as svg without option images
    // downloadChart(chartInstance);
    // }
  }, [pieLegendData]);

  const onRenderEnded = useCallback(
    (chartInstance: ECharts) => {
      // option is actual when it has 2 series objects, custom legend & pie data
      const isActualOption =
        (chartInstance.getOption() as any).series.length === 2;
      // save as svg for chart with option images
      isChartDownloading &&
        isActualOption &&
        pieLegendData[0][3].startsWith("data:image") &&
        downloadChart(chartInstance);
    },
    [isChartDownloading, pieLegendData]
  );

  // const option = getSmOption(pieData, pieLegendData);
  // const option = getMdOption(pieData, pieLegendData, questionImage);
  const option = getLgOption(
    pieData,
    pieLegendData,
    questionImage,
    optionHeights,
    optionsWithImagesLines
  );

  const size = "large";

  return (
    <>
      <Button onClick={saveAsImage}>Export svg</Button>
      <PieChartContainer
        size={size}
        ref={containerRef}
        height={size === "large" ? lContainerHeight : barContainerHeights[size]}
      >
        <ReactECharts
          onRenderEnded={onRenderEnded}
          option={option}
          containerRef={containerRef}
        />
      </PieChartContainer>
    </>
  );
}
