import React, { useState } from "react";
import state from "../../Utils/Store";
import { useSnapshot } from "valtio";

// Theme colors
const themeColors = {
  primary: "#9B59B6", // Rich purple for main branding
  secondary: "#BA68C8", // Lighter lavender for contrast and softness
  accent: "#8E44AD", // Deep purple for highlights and calls to action
  background: "#F3E5F5", // Very light lavender for a clean, soft backdrop
  surface: "#E1BEE7", // Gentle purple surface color
  cardBg: "#FFFFFF", // White for card clarity
  textPrimary: "#2E1A47", // Dark violet for strong readability
  textSecondary: "#6A5C7A", // Muted purple-gray for secondary text
  border: "rgba(0, 0, 0, 0.12)", // Neutral border remains unchanged
  hover: "#7E57C2", // Slightly darker purple for hover effects
  danger: "#D32F2F", // Keeping red for clear warnings
  success: "#388E3C", // Keeping green for clarity on success
  gradient: "linear-gradient(135deg, #9B59B6 0%, #BA68C8 100%)", // Smooth purple gradient
};
const MyPost = () => {
  const snap = useSnapshot(state);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="my_post"
      onClick={() => {
        state.createPostModalOpened = true;
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: themeColors.gradient,
        padding: "16px 20px",
        borderRadius: "12px",
        boxShadow: isHovered 
          ? "0 8px 24px rgba(255, 32, 78, 0.2)"
          : "0 4px 12px rgba(0, 0, 0, 0.08)",
        marginBottom: "20px",
        color: "white",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
        border: `1px solid ${isHovered ? "rgba(255, 255, 255, 0.2)" : "transparent"}`,
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Decorative circles */}
      <div 
        style={{ 
          position: "absolute", 
          right: -20, 
          top: -20, 
          width: 100, 
          height: 100, 
          borderRadius: "50%", 
          background: "rgba(255,255,255,0.15)",
          zIndex: 1,
          transition: "transform 0.5s ease-in-out",
          transform: isHovered ? "scale(1.2)" : "scale(1)"
        }} 
      />
      
      <div 
        style={{ 
          position: "absolute", 
          left: 10, 
          bottom: -30, 
          width: 60, 
          height: 60, 
          borderRadius: "50%", 
          background: "rgba(255,255,255,0.15)",
          zIndex: 1,
          transition: "transform 0.5s ease-in-out",
          transform: isHovered ? "scale(1.2) translateX(10px)" : "scale(1)"
        }} 
      />

      <div
        className="post_top"
        style={{ 
          display: "flex", 
          alignItems: "center", 
          position: "relative", 
          zIndex: 2 
        }}
      >
        <img
          alt={snap.currentUser?.username || "Profile"}
          src={snap.currentUser?.image}
          style={{
            width: "45px",
            height: "45px",
            marginRight: "15px",
            borderRadius: "50%",
            border: "2px solid rgba(255, 255, 255, 0.7)",
            transition: "transform 0.3s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            boxShadow: isHovered ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none"
          }}
        />
        <input
          type="text"
          placeholder="Share your skill or experience"
          style={{
            flexGrow: 1,
            border: "none",
            padding: "12px 16px",
            borderRadius: "8px",
            color: themeColors.textPrimary,
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            fontSize: "14px",
            transition: "all 0.3s ease",
            boxShadow: isHovered ? "0 4px 12px rgba(0, 0, 0, 0.08)" : "0 2px 6px rgba(0, 0, 0, 0.04)",
            outline: "none"
          }}
          readOnly // Making input read-only since the whole component is clickable
          onClick={(e) => e.stopPropagation()} // Preventing input click from propagating
        />
      </div>
    </div>
  );
};

export default MyPost;