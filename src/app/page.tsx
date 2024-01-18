"use client";
import { ReactECharts } from "@/components/ReactECharts";
import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
  ECharts,
} from "echarts";
import { Button } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import styles from "./page.module.css";
const pieColors = [
  "#FF877C",
  "#25B4C8",
  "#D88ADA",
  "#9ECC7F",
  "#F9DE82",
  "#39519B",
];
type PieLegend = [number, number, string, string][];
const customSeriesData: PieLegend = [
  [
    50,
    4,
    "Short answer option  Short answer option  Short answer option Short answer option  Short answer option Short answer option Short answer option Short answer option",
    "https://plus.unsplash.com/premium_photo-1697695568731-5b351d7aca4b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  [
    30,
    4,
    "Short answer option",
    "https://images.unsplash.com/photo-1682685797140-c17807f8f217?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  [
    15,
    4,
    "Short",
    "https://images.unsplash.com/photo-1682685797857-97de838c192e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  [
    5,
    4,
    "Short skjdkjsad asd",
    "https://images.unsplash.com/photo-1704107116952-978a5712566c?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
];
const pieData = [
  {
    value: 10,
    name: "Search Engine Search Engine Search Engine Search Engine e Search Engine Search Engine Search Engine Engine Search Engine  Engine Search Engine",
  },
  {
    value: 20,
    name: "Search Engine",
  },
  { value: 25, name: "Other" },
  { value: 15, name: "Option 1" },
  { value: 2, name: "Option 2" },
  { value: 3, name: "Option 3" },
  { value: 5, name: "Option 4" },
  {
    value: 3,
    name: "Option 5 Search Engine Search Search Search Search Search",
  },
  { value: 2, name: "Option 6" },
  { value: 2, name: "Option 7" },
  { value: 2, name: "Option 8" },
  { value: 2, name: "Option 9" },
  { value: 1, name: "Option 10" },
];
function chunk(str: string, size: number) {
  return str.match(new RegExp(".{1," + size + "}", "g"));
}
const TEXT_LINE_HEIGHT = 20;
const OPTION_IMAGE_HEIGHT = 72;
const IMAGE_OPTION_MARGIN_RIGHT = 8;
const IMAGE_OPTION_MARGIN_BOTTOM = 8;
const CIRCLE_ICON_MARGIN_RIGHT = 4;
const CIRCLE_ICON_RADIUS = 6;
const GRID_BOTTOM = 20;
const L_LEGEND_MAX_SYMBOLS_COUNT = 52;
const renderLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI
) => {
  const xAxisStartPx = param.coordSys.x;
  const size = api.size([1, 1]);
  const percents = api.value(0) + "% ";
  return {
    type: "group",
    silent: true,
    children: [
      {
        type: "text",
        style: {
          text: chunk(
            (percents + api.value(2)) as string,
            L_LEGEND_MAX_SYMBOLS_COUNT
          )?.join("\n"),
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
          param.dataIndex * (OPTION_IMAGE_HEIGHT + IMAGE_OPTION_MARGIN_BOTTOM),
        ],
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
        position: [xAxisStartPx, size[1] * param.dataIndex], // [, 0]
      },
      {
        type: "circle",
        shape: {
          cx: 0,
          cy: 0,
          r: 6,
        },
        style: {
          fill: pieColors[param.dataIndex],
        },
        position: [
          xAxisStartPx +
            OPTION_IMAGE_HEIGHT +
            IMAGE_OPTION_MARGIN_RIGHT +
            CIRCLE_ICON_RADIUS,
          TEXT_LINE_HEIGHT / 2 +
            param.dataIndex *
              (OPTION_IMAGE_HEIGHT + IMAGE_OPTION_MARGIN_BOTTOM),
        ],
      },
    ],
  };
};
const getLgOption = (pieData: any, pieLegendData: any) => ({
  tooltip: {
    trigger: "item",
  },
  backgroundColor: "#222430",

  toolbox: {
    feature: {
      saveAsImage: {
        type: "svg",
        show: true,
      },
    },
  },
  xAxis: {
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    axisLabel: {
      show: false,
    },
    type: "value",
    splitLine: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  series: [
    {
      type: "custom",
      renderItem: renderLegendItem,
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
    right: 10,
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
  // console.log("svgRows", chartInstance, svgRows);
  svgRows.splice(
    1,
    0,
    '<defs><style type="text/css">@import url(http://fonts.googleapis.com/css?family=Manrope);</style></defs>'
  );
  const blob = new Blob([svgRows.join("\n")], { type: "image/svg+xml" });
  const base64 = await blobToBase64(blob);
  return base64;
};
export default function Home() {
  const containerRef = useRef(null);
  const [pieLegendData, setPieLegendData] =
    useState<PieLegend>(customSeriesData);
  const [isChartDownloading, setIsChartDownloading] = useState(false);
  const withImageOptions = true;
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
  const option = getLgOption(pieData, pieLegendData);
  return (
    <>
      <Button onClick={saveAsImage}>Export svg</Button>
      <div className={styles.largeCard} ref={containerRef}>
        <ReactECharts
          onRenderEnded={onRenderEnded}
          option={option}
          containerRef={containerRef}
        />
      </div>
    </>
  );
}
