import { useSetRecoilState } from "recoil";

export function Increase() {
    const setCount = useSetRecoilState(counter);

    return (
        <button
            onClick={() => {
                setCount((prev) => prev + 1);
            }}
        >
            + Increase
        </button>
    );
}

