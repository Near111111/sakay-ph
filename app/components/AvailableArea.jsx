export default function AvailableArea() {
  return (
    <div className="w-full overflow-hidden">
      <div
        style={{
          width: "100%",
          paddingBottom: "40%",
          position: "relative",
          backgroundImage: "url(/map_area.png)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Absolute positioned text */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "0",
            right: "0",
            textAlign: "center",
          }}
        >
          <h4
            style={{
              fontSize: "1.5rem",
              color: "#8b5cf6",
            }}
          >
            SAKAY anytime, anywhere
          </h4>
        </div>
      </div>
    </div>
  );
}
