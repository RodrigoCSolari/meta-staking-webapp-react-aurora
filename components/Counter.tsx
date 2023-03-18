import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { getMpETHPrice } from "../lib/util";

function getSegmentElements(segmentElement: Element) {
  const segmentDisplay = segmentElement.querySelector(".display")!;
  const segmentDisplayTop = segmentDisplay.querySelector(".display__top")!;
  const segmentDisplayBottom =
    segmentDisplay.querySelector(".display__bottom")!;

  const segmentOverlay = segmentDisplay.querySelector(".overlay")!;
  const segmentOverlayTop = segmentOverlay.querySelector(".overlay__top")!;
  const segmentOverlayBottom =
    segmentOverlay.querySelector(".overlay__bottom")!;

  return {
    segmentDisplayTop,
    segmentDisplayBottom,
    segmentOverlay,
    segmentOverlayTop,
    segmentOverlayBottom,
  };
}

function updateSegmentValues(
  displayElement: any,
  overlayElement: any,
  value: any
) {
  displayElement.textContent = value;
  overlayElement.textContent = value;
}

function updateSegment(segmentElement: Element, timeValue: any) {
  const segmentElements = getSegmentElements(segmentElement);

  if (segmentElements.segmentDisplayTop.textContent === timeValue) {
    return;
  }

  segmentElements.segmentOverlay.classList.add("flip");

  updateSegmentValues(
    segmentElements.segmentDisplayTop,
    segmentElements.segmentOverlayBottom,
    timeValue
  );

  function finishAnimation() {
    segmentElements.segmentOverlay.classList.remove("flip");
    updateSegmentValues(
      segmentElements.segmentDisplayBottom,
      segmentElements.segmentOverlayTop,
      timeValue
    );

    document.removeEventListener("animationend", finishAnimation);
  }

  segmentElements.segmentOverlay.addEventListener(
    "animationend",
    finishAnimation
  );
}

function updateNumbers(nums: any) {
  const segmentElement = document.querySelectorAll("#nums_box .number-segment");
  if (nums[0] !== ".") {
    updateSegment(segmentElement[0], nums[0]);
  }
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== ".") {
      updateSegment(segmentElement[i + 1], nums[i]);
    }
  }
}

function getNextNumbers(count: bigint, increment: bigint) {
  let nums: string[] = [];
  const newValue = increment.toString();
  for (let i = 0; i < 12; i++) {
    if (newValue.charAt(i) !== count.toString().charAt(i)) {
      nums[i] = newValue.charAt(i);
    } else {
      nums[i] = ".";
    }
  }
  return nums;
}

function update(count: bigint, increment: bigint) {
  const nums = getNextNumbers(count, increment);
  updateNumbers(nums);
}

type Props = {
  totalSupply: BigNumber;
  totalAssets: BigNumber;
  estimatedRewardsPerSecond: BigNumber;
  nodesBalanceUnlockTime: BigNumber;
};

export const Counter = ({
  totalSupply,
  totalAssets,
  estimatedRewardsPerSecond,
  nodesBalanceUnlockTime,
}: Props) => {
  const [initialCount] = useState(
    Array.from(
      Array.from(
        getMpETHPrice(
          totalSupply,
          totalAssets,
          estimatedRewardsPerSecond,
          nodesBalanceUnlockTime
        )
          .toString()
          .substring(0, 12)
      ).reduce((a, b, i) => {
        if (i === 0) {
          return a + b + ".";
        } else {
          return a + b;
        }
      }, "")
    )
  );

  const [count, setCount] = useState(
    BigInt(
      getMpETHPrice(
        totalSupply,
        totalAssets,
        estimatedRewardsPerSecond,
        nodesBalanceUnlockTime
      ).toString()
    )
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const inc = BigInt(
        getMpETHPrice(
          totalSupply,
          totalAssets,
          estimatedRewardsPerSecond,
          nodesBalanceUnlockTime
        ).toString()
      );
      update(count, inc);
      setCount(inc);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="number-section" id="nums_box">
      {initialCount.map((char, index) => (
        <div className="number-segment" key={`${char}_${index}`}>
          <div className="display">
            <div className="display__top">{char}</div>
            <div className="display__bottom">{char}</div>
            <div className="overlay">
              <div className="overlay__top">{char}</div>
              <div className="overlay__bottom">{char}</div>
            </div>
          </div>
        </div>
      ))}
      &nbsp;
      {["E", "T", "H"].map((char, index) => (
        <div className="" key={`${char}_${index}`}>
          <div className="display">
            <div className="display__top">{char}</div>
            <div className="display__bottom">{char}</div>
            <div className="overlay">
              <div className="overlay__top">{char}</div>
              <div className="overlay__bottom">{char}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
