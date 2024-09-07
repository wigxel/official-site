import { motion } from "framer-motion";

// Example array of 6 items (image and text for each)
const items = [
  { image: "https://via.placeholder.com/600x300", text: "Item 1" },
  { image: "https://via.placeholder.com/600x300", text: "Item 2" },
  { image: "https://via.placeholder.com/600x300", text: "Item 3" },
  { image: "https://via.placeholder.com/600x300", text: "Item 4" },
  { image: "https://via.placeholder.com/600x300", text: "Item 5" },
  { image: "https://via.placeholder.com/600x300", text: "Item 6" },
];

const MarqueeWithImageAndText = () => {
  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
        position: "relative",
      }}
    >
      <motion.div
        style={{ display: "inline-flex", position: "relative" }}
        animate={{ x: ["100%", "-100%"] }} // Move from right to left
        transition={{
          duration: 30, // Adjust the speed based on how many items there are
          repeat: Number.POSITIVE_INFINITY, // Loop the animation
          ease: "linear", // Smooth continuous movement
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              display: "inline-block",
              marginRight: "2rem",
            }}
          >
            {/* Image */}
            <img
              src={item.image}
              alt={`Marquee Item ${index + 1}`}
              style={{ width: "600px", height: "300px" }}
            />
            {/* Text slightly offset in the corner */}
            <span
              style={{
                position: "absolute",
                top: "10px", // Adjust the offset
                left: "10px", // Adjust the offset
                color: "white",
                background: "rgba(0, 0, 0, 0.5)", // Add background to make the text readable
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeWithImageAndText;
