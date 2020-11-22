import { useMemo, useCallback, useContext } from "react";
import { AreaClosed, Line, Bar } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { scaleLinear } from "@visx/scale";
import {
	withTooltip,
	Tooltip,
	TooltipWithBounds,
	defaultStyles,
} from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { localPoint } from "@visx/event";
import { LinearGradient } from "@visx/gradient";
import styled, { ThemeContext } from "styled-components";
import { Theme } from "../../style/style";
import { shadowMd } from "../../style/shadow";
import { brandColor } from "../../style/theme";
import { CalculatorContext } from "../../state/calculator";
import { currencies } from "../../lib/money";
import { radius } from "../../style/variables";

interface ProfitData {
	week: number;
	profit: number;
}

type TooltipData = ProfitData;

const ChartSvg = styled.svg`
	border-radius: ${radius};
	border: 1px solid ${brandColor};
`;

export type AreaProps = {
	width: number;
	height: number;
	margin?: { top: number; right: number; bottom: number; left: number };
};

const Chart = ({ profit }: { profit: ProfitData[] }) =>
	withTooltip<AreaProps, TooltipData>(
		({
			width,
			height,
			margin = { top: 0, right: 0, bottom: 0, left: 0 },
			showTooltip,
			hideTooltip,
			tooltipData,
			tooltipTop = 0,
			tooltipLeft = 0,
		}: AreaProps & WithTooltipProvidedProps<TooltipData>) => {
			const theme = useContext<Theme>(ThemeContext);
			const { currency } = useContext(CalculatorContext);

			const innerWidth = width - margin.left - margin.right;
			const innerHeight = height - margin.top - margin.bottom;

			const tooltipStyles = {
				...defaultStyles,
				background: theme.secondaryBgColor,
				border: "1px solid white",
				color: "white",
			};

			const min = Math.min(...profit.map((p) => p.profit));
			const max = Math.max(...profit.map((p) => p.profit));

			const dateScale = useMemo(
				() =>
					scaleLinear({
						range: [margin.left, innerWidth + margin.left],
						domain: [1, profit.length],
					}),
				[innerWidth, margin.left]
			);

			const stockValueScale = useMemo(
				() =>
					scaleLinear({
						range: [innerHeight + margin.top, margin.top],
						domain: [min, max],
					}),
				[margin.top, innerHeight]
			);

			const handleTooltip = useCallback(
				(
					event:
						| React.TouchEvent<SVGRectElement>
						| React.MouseEvent<SVGRectElement>
				) => {
					const { x } = localPoint(event) || { x: 0 };
					const index = Math.floor((x / innerWidth) * profit.length);
					const p1 = profit[index];
					showTooltip({
						tooltipData: p1,
						tooltipLeft: x,
						tooltipTop: stockValueScale(p1.profit),
					});
				},
				[showTooltip, stockValueScale, dateScale]
			);

			return (
				<div>
					<ChartSvg width={width} height={height}>
						<rect
							x={0}
							y={0}
							width={width}
							height={height}
							fill="url(#area-background-gradient)"
							rx={14}
						/>
						<LinearGradient
							id="area-gradient"
							from={theme.brandColor}
							to={theme.brandColor}
							toOpacity={0.1}
						/>
						<AreaClosed<ProfitData>
							data={profit}
							x={(d) =>
								((d.week - 1) / (profit.length - 1)) *
								innerWidth
							}
							y={(d) =>
								innerHeight -
								((d.profit - min) / (max - min)) * innerHeight
							}
							yScale={stockValueScale}
							strokeWidth={1}
							stroke="url(#area-gradient)"
							fill="url(#area-gradient)"
							curve={curveMonotoneX}
						/>
						<Bar
							x={margin.left}
							y={margin.top}
							width={innerWidth}
							height={innerHeight}
							fill="transparent"
							rx={14}
							onTouchStart={handleTooltip}
							onTouchMove={handleTooltip}
							onMouseMove={handleTooltip}
							onMouseLeave={() => hideTooltip()}
						/>
						{tooltipData && (
							<g>
								<Line
									from={{ x: tooltipLeft, y: margin.top }}
									to={{
										x: tooltipLeft,
										y: innerHeight + margin.top,
									}}
									stroke={theme.textColor}
									strokeWidth={2}
									pointerEvents="none"
									strokeDasharray="5,2"
								/>
								<circle
									style={{
										transition: "none",
									}}
									cx={tooltipLeft}
									cy={tooltipTop + 1}
									r={4}
									fill={theme.secondaryBgColor}
									fillOpacity={0.1}
									stroke={theme.secondaryBgColor}
									strokeOpacity={0.1}
									strokeWidth={2}
									pointerEvents="none"
								/>
								<circle
									style={{
										transition: "none",
									}}
									cx={tooltipLeft}
									cy={tooltipTop}
									r={4}
									fill={theme.mainBgColor}
									stroke={theme.textColor}
									strokeWidth={2}
									pointerEvents="none"
								/>
							</g>
						)}
					</ChartSvg>
					{tooltipData && (
						<div>
							<TooltipWithBounds
								key={Math.random()}
								top={tooltipTop - 45}
								left={tooltipLeft}
								style={{
									...tooltipStyles,
									transition: "none",
									background: theme.mainBgColor,
									color: theme.textColor,
									boxShadow: shadowMd({ theme }),
									border: `1px solid ${theme.textColor}`,
								}}
							>
								{`${currencies.get(
									currency
								)}${tooltipData.profit.toFixed(2)}`}
							</TooltipWithBounds>
							<Tooltip
								top={innerHeight + margin.top - 14}
								left={tooltipLeft}
								style={{
									...defaultStyles,
									minWidth: 82,
									textAlign: "center",
									transform: "translateX(-60%)",
									transition: "none",
									background: theme.mainBgColor,
									color: theme.textColor,
									boxShadow: shadowMd({ theme }),
									border: `1px solid ${theme.textColor}`,
								}}
							>
								Week {tooltipData.week}
							</Tooltip>
						</div>
					)}
				</div>
			);
		}
	);

export default Chart;
