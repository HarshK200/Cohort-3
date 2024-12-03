import { forwardRef, useRef } from "react";

export default function App() {
  return (
    <div>
      <Opt />
    </div>
  );
}

function Opt() {
  const inputRefs = Array.from({ length: 6 }, (_, i) => useRef());
  const OptBoxes = Array.from({ length: 6 }, (_, i) => (
    <OtpInputBox
      ref={inputRefs[i]}
      key={i}
      onDone={(e) => {
        const value = e.target.value;
        if (value && inputRefs[i + 1]) {
          const next = inputRefs[i + 1].current;
          next.focus();
        }
      }}
      unDone={(e) => {
        if (e.key === "Backspace") {
          if (e.target.value) {
            e.target.value = null;
            return;
          }

          if (inputRefs[i - 1]) {
            e.target.value = null;
            const prev = inputRefs[i - 1].current;
            prev.focus();
          }
        }
      }}
    />
  ));

  return <div className="flex gap-2 justify-center py-5">{OptBoxes}</div>;
}

const OtpInputBox = forwardRef(({ onDone, unDone }, ref) => {
  return (
    <input
      ref={ref}
      className="w-7 h-8 rounded-md text-center outline outline-2 outline-gray-400"
      maxLength={1}
      onChange={onDone}
      onKeyDown={unDone}
    />
  );
});
