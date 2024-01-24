"use client";
import { ReactECharts } from "@/components/ReactECharts";
import { graphic } from "echarts";
import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
  ECharts,
} from "echarts";
import { Button, styled } from "@mui/material";
import { useCallback, useRef, useState } from "react";

const pieColors = [
  "#FF877C",
  "#25B4C8",
  "#D88ADA",
  "#9ECC7F",
  "#F9DE82",
  "#39519B",
];
const pieData = [
  {
    value: 10,
    name: "Search Engine",
  },
  {
    value: 20,
    name: "Search Engine",
  },
  {
    value: 25,
    name: "Other Search Engine Search Search Engine Search Engine Search Engine Search Engine Search Search Engine Search Engine Search Engine Search Engine  ",
  },
  { value: 15, name: "Option 1 Option 1 Option 1 Option 1" },
  { value: 2, name: "Option 2" },
  // { value: 3, name: "Option 3" },
  // { value: 5, name: "Option 4" },
];
const images = [
  "https://plus.unsplash.com/premium_photo-1697695568731-5b351d7aca4b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682685797140-c17807f8f217?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682685797857-97de838c192e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682695796497-31a44224d6d6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1704107116952-978a5712566c?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

function breakWord(string: string, symbolsCount: number) {
  const splittedBySpacing = string.split(" "); // [word, word, word ...]
  return splittedBySpacing.reduce(
    (total, current) => {
      let lastElem = total[total.length - 1];
      const nextLength = lastElem.length + ` ${current}`.length;
      if (nextLength <= symbolsCount) {
        total[total.length - 1] += ` ${current}`;
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
const OPTION_IMAGE_HEIGHT = 72;
const IMAGE_OPTION_MARGIN_RIGHT = 8;
const IMAGE_OPTION_MARGIN_BOTTOM = 8;
const CIRCLE_ICON_MARGIN_RIGHT = 4;
const CIRCLE_ICON_RADIUS = 6;
const L_LEGEND_MAX_SYMBOLS_COUNT = 52;
const L_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT = 35;
const M_LEGEND_MAX_SYMBOLS_COUNT = 27;
const M_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT = 10;
const QUESTION_IMAGE_WIDTH = 120;
const L_CHART_WIDTH = 952;
const M_CHART_WIDTH = 616;
const IMAGE_OPTION_BG_RADIUS = 8;
const M_GRID_TOP_PADDING = 8;
const M_GRID_BOTTOM_PADDING = 8;
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
const renderLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
  imageUrl: string,
  itemsLength: number
) => {
  const xAxisStartPx = param.coordSys.x;
  const [_, ySizePx] = api.size([1, 1]) as number[];
  const percents = api.value(0) + "% ";
  const remainder = param.dataIndex % pieColors.length;
  const iconColor = pieColors[remainder];
  const questionImage = imageUrl
    ? [
        {
          type: RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
          shape: {
            width: QUESTION_IMAGE_WIDTH,
            height: QUESTION_IMAGE_WIDTH,
            x: L_CHART_WIDTH - QUESTION_IMAGE_WIDTH,
            y: ((param.coordSys as any).height - QUESTION_IMAGE_WIDTH) / 2,
          },
          style: {
            fill: "#1a1a25",
          },
        },
        {
          type: "image",
          style: {
            x: 0,
            image: imageUrl,
            y: 0,
            width: QUESTION_IMAGE_WIDTH,
            height: QUESTION_IMAGE_WIDTH,
          },
          position: [
            L_CHART_WIDTH - QUESTION_IMAGE_WIDTH,
            ((param.coordSys as any).height - QUESTION_IMAGE_WIDTH) / 2,
          ],
        },
      ]
    : [];
  const overflowedText = breakWord(
    (percents + api.value(2)) as string,
    imageUrl
      ? L_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT
      : L_LEGEND_MAX_SYMBOLS_COUNT
  );
  return {
    type: "group",
    silent: true,
    children: [
      ...questionImage,
      {
        type: "text",
        style: {
          text: overflowedText.join("\n"),
          lineHeight: TEXT_LINE_HEIGHT,
          fontSize: 14,
          fill: "#c8cad0",
          fontWeight: 500,
          fontFamily: "Manrope, sans-serif",
        },
        position: [
          xAxisStartPx +
            OPTION_IMAGE_HEIGHT +
            IMAGE_OPTION_MARGIN_RIGHT +
            CIRCLE_ICON_RADIUS * 2 +
            CIRCLE_ICON_MARGIN_RIGHT,
          itemsLength === 1
            ? ySizePx / 2 - (overflowedText.length * 20) / 2
            : param.dataIndex * ySizePx,
        ],
      },
      {
        type: RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
        shape: {
          width: 72,
          height: 72,
          x: xAxisStartPx,
          y:
            itemsLength === 1
              ? ySizePx / 2 - OPTION_IMAGE_HEIGHT / 2
              : ySizePx * param.dataIndex,
        },
        style: {
          fill: "#1a1a25",
        },
      },
      {
        type: "image",
        style: {
          x: 0,
          image: api.value(3),
          y: 1,
          width: 72,
          height: 72,
        },
        position: [
          xAxisStartPx,
          itemsLength === 1
            ? ySizePx / 2 - OPTION_IMAGE_HEIGHT / 2
            : ySizePx * param.dataIndex,
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
        position: [
          xAxisStartPx +
            OPTION_IMAGE_HEIGHT +
            IMAGE_OPTION_MARGIN_RIGHT +
            CIRCLE_ICON_RADIUS,
          itemsLength === 1
            ? ySizePx / 2
            : TEXT_LINE_HEIGHT / 2 + param.dataIndex * ySizePx,
        ],
      },
    ],
  };
};
const renderMdLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
  imageUrl: string,
  itemsLength: number,
  hasOverflow: boolean
) => {
  const xAxisStartPx = param.coordSys.x;
  const [_, ySizePx] = api.size([1, 1]) as number[];
  const label = api.value(0) + "% " + api.value(2);
  const remainder = param.dataIndex % pieColors.length;
  const iconColor = pieColors[remainder];
  const overflowDots = hasOverflow
    ? [
        {
          type: "text",
          style: {
            text: "...",
            lineHeight: TEXT_LINE_HEIGHT,
            fontSize: 14,
            fill: "#c8cad0",
            fontWeight: 500,
            fontFamily: "Manrope, sans-serif",
          },
          position: [
            xAxisStartPx,
            -TEXT_LINE_HEIGHT / 2 + M_GRID_TOP_PADDING + ySizePx * 4,
          ],
        },
      ]
    : [];
  const questionImage = imageUrl
    ? [
        {
          type: RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
          shape: {
            width: QUESTION_IMAGE_WIDTH,
            height: QUESTION_IMAGE_WIDTH,
            x: M_CHART_WIDTH - QUESTION_IMAGE_WIDTH,
            y:
              ((param.coordSys as any).height - QUESTION_IMAGE_WIDTH) / 2 +
              M_GRID_TOP_PADDING,
          },
          style: {
            fill: "#1a1a25",
          },
        },
        {
          type: "image",
          style: {
            x: 0,
            image: imageUrl,
            y: 0,
            width: QUESTION_IMAGE_WIDTH,
            height: QUESTION_IMAGE_WIDTH,
          },
          position: [
            M_CHART_WIDTH - QUESTION_IMAGE_WIDTH,
            ((param.coordSys as any).height - QUESTION_IMAGE_WIDTH) / 2 +
              M_GRID_TOP_PADDING,
          ],
        },
      ]
    : [];
  const textYPositions = [
    null,
    -TEXT_LINE_HEIGHT / 2 + M_GRID_TOP_PADDING + ySizePx / 2,
    -TEXT_LINE_HEIGHT / 2 +
      M_GRID_TOP_PADDING +
      (ySizePx / 2) * (param.dataIndex + 1) +
      ySizePx / 4,
    -TEXT_LINE_HEIGHT / 2 +
      M_GRID_TOP_PADDING +
      (param.dataIndex + 1) * (ySizePx * 0.75),
    -TEXT_LINE_HEIGHT / 2 +
      M_GRID_TOP_PADDING +
      ySizePx / 2 +
      ySizePx * param.dataIndex,
  ];
  const iconYPositions = [
    null,
    M_GRID_TOP_PADDING + ySizePx / 2,
    (param.dataIndex + 1) * (ySizePx / 2) + ySizePx / 4 + M_GRID_TOP_PADDING,
    M_GRID_TOP_PADDING + (param.dataIndex + 1) * (ySizePx * 0.75),
    M_GRID_TOP_PADDING + ySizePx / 2 + ySizePx * param.dataIndex,
  ];
  const coverYPositions = [
    null,
    M_GRID_TOP_PADDING + ySizePx / 2 - OPTION_IMAGE_HEIGHT / 2,
    (param.dataIndex + 1) * (ySizePx / 2) +
      M_GRID_TOP_PADDING +
      IMAGE_OPTION_MARGIN_BOTTOM / 2,
    M_GRID_TOP_PADDING +
      ySizePx * 1.5 -
      OPTION_IMAGE_HEIGHT / 2 -
      (param.dataIndex
        ? param.dataIndex === 1
          ? 0
          : OPTION_IMAGE_HEIGHT + IMAGE_OPTION_MARGIN_BOTTOM / 2
        : -OPTION_IMAGE_HEIGHT - IMAGE_OPTION_MARGIN_BOTTOM / 2),
    M_GRID_TOP_PADDING +
      (OPTION_IMAGE_HEIGHT + IMAGE_OPTION_MARGIN_BOTTOM) * param.dataIndex,
  ];
  const textWithOverflow = truncate(
    label,
    imageUrl
      ? M_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT
      : M_LEGEND_MAX_SYMBOLS_COUNT
  );
  return {
    type: "group",
    silent: true,
    children: [
      ...questionImage,
      ...overflowDots,
      {
        type: "text",
        style: {
          text: textWithOverflow,
          lineHeight: TEXT_LINE_HEIGHT,
          fontSize: 14,
          fill: "#c8cad0",
          fontWeight: 500,
          fontFamily: "Manrope, sans-serif",
        },
        position: [
          xAxisStartPx +
            OPTION_IMAGE_HEIGHT +
            IMAGE_OPTION_MARGIN_RIGHT +
            CIRCLE_ICON_RADIUS * 2 +
            CIRCLE_ICON_MARGIN_RIGHT,
          textYPositions[itemsLength],
        ],
      },
      {
        type: RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
        shape: {
          width: 72,
          height: 72,
          x: xAxisStartPx,
          y: coverYPositions[itemsLength],
        },
        style: {
          fill: "#1a1a25",
        },
      },
      {
        type: "image",
        style: {
          x: 0,
          image: api.value(3),
          y: 1,
          width: 72,
          height: 72,
        },
        position: [xAxisStartPx, coverYPositions[itemsLength]],
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
        position: [
          xAxisStartPx +
            OPTION_IMAGE_HEIGHT +
            IMAGE_OPTION_MARGIN_RIGHT +
            CIRCLE_ICON_RADIUS,
          iconYPositions[itemsLength],
        ],
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
    tooltip: {
      trigger: "item",
    },
    backgroundColor: "#222430",
    xAxis: {
      splitLine: {
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
      },
    ],
    grid: {
      left: "50%",
      right: 1,
      top: M_GRID_TOP_PADDING,
      bottom: M_GRID_BOTTOM_PADDING,
    },
  };
};
const getLgOption = (
  pieData: any,
  pieLegendData: any,
  questionImage: string,
  optionWithImageHeight: number
) => ({
  tooltip: {
    trigger: "item",
  },
  backgroundColor: "#222430",
  xAxis: {
    splitLine: {
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
  series: [
    {
      type: "custom",
      renderItem: (
        param: CustomSeriesRenderItemParams,
        api: CustomSeriesRenderItemAPI
      ) => renderLegendItem(param, api, questionImage, pieData.length),
      data: pieLegendData,
    },
    {
      data: pieData,
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
  small: 124,
  medium: 328,
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
    // border: "1px solid slateblue",
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
  const withImageOptions = true;
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
    if (withImageOptions) {
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
      }
      return;
    }
    // save as svg without option images
    // downloadChart(chartInstance);
    // }
  }, [pieLegendData, withImageOptions]);

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
  const maxLinesHeight =
    optionsWithImagesMaxLines * TEXT_LINE_HEIGHT + IMAGE_OPTION_MARGIN_BOTTOM;
  const defaultImageOptionHeight =
    OPTION_IMAGE_HEIGHT + IMAGE_OPTION_MARGIN_BOTTOM;
  const optionWithImageHeight =
    maxLinesHeight < defaultImageOptionHeight
      ? defaultImageOptionHeight
      : maxLinesHeight;
  console.log("optionWithImageHeight", optionWithImageHeight);
  const option = getLgOption(
    pieData,
    pieLegendData,
    questionImage,
    optionWithImageHeight
  );

  // const option = getMdOption(pieData, pieLegendData, questionImage);
  const size = "large";

  return (
    <>
      <Button onClick={saveAsImage}>Export svg</Button>
      <PieChartContainer
        size={size}
        ref={containerRef}
        height={
          size === "large"
            ? withImageOptions
              ? pieData.length * optionWithImageHeight
              : pieData.length * 60
            : barContainerHeights[size]
        }
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
