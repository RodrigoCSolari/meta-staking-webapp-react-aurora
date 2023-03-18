import { BigNumber } from "ethers";
import { useEffect, useState } from "react";

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
  mpETHPrice: BigNumber;
  estimatedRewardsPerSecond: BigNumber;
  nodesBalanceUnlockTime: BigNumber;
};

export const Counter = ({
  mpETHPrice,
  estimatedRewardsPerSecond,
  nodesBalanceUnlockTime,
}: Props) => {
  const [increment, setIncrement] = useState(
    BigInt(estimatedRewardsPerSecond.toString()) || BigInt(1392100000)
  );

  const [initialCount] = useState(
    Array.from(
      Array.from(
        mpETHPrice
          .add(
            BigNumber.from(increment).mul(
              Math.floor(Date.now() / 1000) -
                (nodesBalanceUnlockTime.toNumber() - 14400)
            )
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
      mpETHPrice
        .add(
          BigNumber.from(increment).mul(
            Math.floor(Date.now() / 1000) -
              (nodesBalanceUnlockTime.toNumber() - 14400)
          )
        )
        .toString()
    )
  );
  const [prevCount, setPrevCount] = useState(
    BigInt(
      mpETHPrice
        .add(
          BigNumber.from(increment).mul(
            Math.floor(Date.now() / 1000) -
              (nodesBalanceUnlockTime.toNumber() - 14400)
          )
        )
        .toString()
    )
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const inc = BigInt(
        mpETHPrice
          .add(
            BigNumber.from(increment).mul(
              Math.floor(Date.now() / 1000) -
                (nodesBalanceUnlockTime.toNumber() - 14400)
            )
          )
          .toString()
      );
      setCount(inc);
      console.log(Date.now());
    }, 500);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    setIncrement(
      BigInt(estimatedRewardsPerSecond.toString()) || BigInt(1392100000)
    );
  }, [estimatedRewardsPerSecond]);

  const ann = (index: number, char: string) => {
    if (count !== prevCount) {
      setPrevCount(count);
    }
  };

  return (
    <div className="number-section" id="nums_box">
      {Array.from(
        Array.from(count.toString().substring(0, 12)).reduce((a, b, i) => {
          if (i === 0) {
            return a + b + ".";
          } else {
            return a + b;
          }
        }, "")
      ).map((char, index) => (
        <div className="number-segment" key={`${char}_${index}`}>
          <div className="display">
            <div className="display__top">{char}</div>
            <div className="display__bottom " id={`display__bottom_${index}`}>
              {index < 2 ? char : prevCount.toString().charAt(index - 1)}
            </div>
            <div className="overlay flip">
              <div
                className="overlay__top "
                id={`display__top_${index}`}
                onAnimationEnd={() => ann(index, char)}
              >
                {index < 2 ? char : prevCount.toString().charAt(index - 1)}
              </div>
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
