import {useState} from "react";

function StarRating({ value, onChange, readonly = false }) {
    const [hover, setHover] = useState(0);

    return (
        <div style={{ display: "flex", gap: "2px" }}>
            {[1, 2, 3, 4, 5].map(star => (
                <span
                    key={star}
                    onClick={() => !readonly && onChange && onChange(star)}
                    onMouseEnter={() => !readonly && setHover(star)}
                    onMouseLeave={() => !readonly && setHover(0)}
                    style={{
                        fontSize: "18px",
                        cursor: readonly ? "default" : "pointer",
                        color: star <= (hover || value) ? "#f5a623" : "#e8ddd2",
                        transition: "color 0.15s",
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

export default StarRating;