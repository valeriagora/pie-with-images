"use client";
import React, { useRef, useEffect, RefObject, useState } from "react";
import { init, getInstanceByDom } from "echarts";
import type { CSSProperties } from "react";
import type { EChartsOption, ECharts, SetOptionOpts } from "echarts";
import * as echarts from "echarts/core";
import { SVGRenderer, CanvasRenderer } from "echarts/renderers";

echarts.use([SVGRenderer, CanvasRenderer]);
export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  withImage?: boolean;
  //
  containerRef: RefObject<HTMLDivElement | null>;
  onChartInit?: (chartInstance: ECharts) => void;
  onRenderEnded?: (chartInstance: ECharts) => void;
}

export function ReactECharts({
  option,
  style,
  settings = {
    notMerge: true,
  },
  loading = false,
  containerRef,
  onChartInit,
  onRenderEnded,
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement | null>(null);
  //   const [chartInstance, setChartInstance] = useState<ECharts | undefined>();

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, null, { renderer: "svg" });
      //   setChartInstance(chart);
      onChartInit instanceof Function && onChartInit(chart);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    // function resizeChart() {
    //   chart?.resize();
    // }

    const ref = containerRef?.current;
    const observer = new ResizeObserver(([{ target }]) => {
      chart?.resize();
    });
    if (ref) {
      observer.observe(ref);
    }
    const onFinished = () => {
      onRenderEnded instanceof Function && onRenderEnded(chart);
    };
    chart?.on("finished", onFinished);

    return () => {
      chart?.dispose();
      chart?.off("finished", onFinished);
      ref && observer.unobserve(ref);
    };
  }, [containerRef, onRenderEnded]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.clear();
      chart?.setOption(option, settings);
      //   chart?.dispatchAction({
      //     type: "renderFinished",
      //     // start: 20,
      //     // end: 30
      //   });
      //   onRenderEnded instanceof Function && onRenderEnded();
    }
  }, [option, settings, onRenderEnded]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading]);

  return (
    <>
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "100%",
          //   border: "1px solid crimson",
          ...style,
        }}
      />
    </>
  );
}
