import { useContext, useState } from "react";
import styled from "styled-components";
import { aprToApy } from "../../lib/money";
import { cleanName } from "../../lib/pool";
import { HarvestContext } from "../../state/harvest";
import Card from "../Base/Card";
import numeral from "numeral";
import { textColor } from "../../style/theme";
import Vertical from "../Base/Vertical";
import { H3, P } from "../Base/Text";
import { Pool } from "../../types/harvest";
import SortArrow from "../AssetList/SortArrow";

const ListSection = styled.section`
	margin: 8rem 0;
`;

const PoolTable = styled.table`
	width: 100%;
`;

const HeadItem = styled.th`
	color: ${textColor};
	text-align: left;
	font-weight: 400;
	font-size: 1.15rem;
	padding-bottom: 0.5rem;
`;

const ItemText = styled.td`
	padding: 0.5rem 0;
	height: 2rem;
	font-size: 1rem;
	color: ${textColor};
`;

const ItemImage = styled.img`
	height: 1.75rem;
	width: 1.75rem;
	margin-right: 0.75rem;
`;

const Flex = styled.div`
	display: flex;
	align-items: stretch;
`;

const ChevronHolder = styled.div`
	margin: 0 0.5rem;
`;

const Title = styled(H3)`
	font-size: 2rem;
	text-align: center;
	margin-bottom: 3rem;
`;

type SortFunction = (a: Pool, b: Pool) => number;

const biggestApy: SortFunction = (a, b) =>
	parseFloat(b.apr) - parseFloat(a.apr);
const smallestApy: SortFunction = (a, b) =>
	parseFloat(a.apr) - parseFloat(b.apr);
const biggestValue: SortFunction = (a, b) =>
	parseFloat(b.totalStaked) - parseFloat(a.totalStaked);
const smallestValue: SortFunction = (a, b) =>
	parseFloat(a.totalStaked) - parseFloat(b.totalStaked);

const sorters = [biggestValue, smallestValue, biggestApy, smallestApy];

const PoolList = () => {
	const [sorter, setSorter] = useState(2);
	const [index, setIndex] = useState(1);
	const { pools } = useContext(HarvestContext);
	const sortedPools = pools.sort(sorters[sorter]);

	return (
		<ListSection>
			<Title>Harvest Asset List</Title>
			<Card overflow>
				<PoolTable>
					<thead>
						<tr>
							<HeadItem>Asset</HeadItem>
							<HeadItem>
								<Flex>
									Total Value Locked
									<ChevronHolder>
										<Vertical>
											<SortArrow
												current={index}
												selected={sorter}
												index={0}
												setCurrent={setIndex}
												setSelected={setSorter}
											/>
										</Vertical>
									</ChevronHolder>
								</Flex>
							</HeadItem>
							<HeadItem>
								<Flex>
									APR (Year)
									<ChevronHolder>
										<Vertical>
											<SortArrow
												current={index}
												selected={sorter}
												index={1}
												setCurrent={setIndex}
												setSelected={setSorter}
											/>
										</Vertical>
									</ChevronHolder>
								</Flex>
							</HeadItem>
							<HeadItem>
								<Flex>
									APY (Year)
									<ChevronHolder>
										<Vertical>
											<SortArrow
												current={index}
												selected={sorter}
												index={1}
												setCurrent={setIndex}
												setSelected={setSorter}
											/>
										</Vertical>
									</ChevronHolder>
								</Flex>
							</HeadItem>
						</tr>
					</thead>
					<tbody>
						{sortedPools.map((pool) => {
							const active = parseFloat(pool.apr) > 0.0001;

							return (
								<tr key={pool.name}>
									<ItemText>
										<Flex>
											<ItemImage
												src={pool.logo.replace(
													".svg",
													".png"
												)}
											/>
											<div>
												<Vertical>
													<P>
														{cleanName(pool.name)}
													</P>
												</Vertical>
											</div>
										</Flex>
									</ItemText>
									<ItemText>
										{numeral(parseFloat(pool.totalStaked))
											.format("($0.00a")
											.toUpperCase()}
									</ItemText>
									<ItemText>
										{active
											? `${(
													parseFloat(pool.apr) * 100
											  ).toFixed(2)}%`
											: "Inactive"}
									</ItemText>
									<ItemText>
										{active
											? `${(
													aprToApy(
														parseFloat(pool.apr)
													) * 100
											  ).toFixed(2)}%`
											: "Inactive"}
									</ItemText>
								</tr>
							);
						})}
					</tbody>
				</PoolTable>
			</Card>
		</ListSection>
	);
};

export default PoolList;
