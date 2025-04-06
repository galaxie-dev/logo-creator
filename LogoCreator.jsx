import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Star, Smile, Rocket, Heart, Camera } from "lucide-react";

const randomGradients = [
  "linear-gradient(135deg, #FF6B6B, #FFD93D)",
  "linear-gradient(135deg, #6BCB77, #4D96FF)",
  "linear-gradient(135deg, #F46036, #8D6AFF)",
  "linear-gradient(135deg, #00B8D9, #9D4EDD)",
  "linear-gradient(135deg, #43AA8B, #F25F5C)"
];

const randomShapes = ["circle", "square", "triangle", "hexagon", "star"];
const randomFonts = ["sans-serif", "serif", "monospace", "cursive", "fantasy"];
const randomIcons = [Star, Smile, Rocket, Heart, Camera];

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export default function RandomLogoGenerator() {
  const [logo, setLogo] = useState(generateLogo());
  const [customText, setCustomText] = useState("Logo");
  const [savedTemplates, setSavedTemplates] = useState([]);
  const logoRef = useRef(null);
  

  function generateLogo() {
    return {
      text: customText,
      gradient: getRandomItem(randomGradients),
      shape: getRandomItem(randomShapes),
      font: getRandomItem(randomFonts),
      icon: getRandomItem(randomIcons)
    };
  }

  function regenerate() {
    setLogo({ ...generateLogo(), text: customText });
  }

  function handleDownload() {
    if (logoRef.current) {
      html2canvas(logoRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = `${customText || "logo"}.png`;
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  }

  function saveTemplate() {
    setSavedTemplates([...savedTemplates, logo]);
  }

  const LogoIcon = logo.icon;

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Input
        placeholder="Enter logo text"
        value={customText}
        onChange={(e) => setCustomText(e.target.value)}
        className="w-64"
      />
      <Card
        ref={logoRef}
        className="w-64 h-64 flex items-center justify-center"
        style={{ backgroundImage: logo.gradient }}
      >
        <CardContent className="text-center">
          <div
            className="text-2xl font-bold text-white"
            style={{ fontFamily: logo.font }}
          >
            {logo.shape === "circle" && <div className="w-16 h-16 rounded-full bg-white mx-auto mb-2" />}
            {logo.shape === "square" && <div className="w-16 h-16 bg-white mx-auto mb-2" />}
            {logo.shape === "triangle" && (
              <div className="w-0 h-0 mx-auto mb-2"
                style={{
                  borderLeft: "32px solid transparent",
                  borderRight: "32px solid transparent",
                  borderBottom: "64px solid white"
                }} />
            )}
            
            {logo.shape === "hexagon" && (
              <div className="w-0 h-0 mx-auto mb-2 relative"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "32px solid transparent",
                  borderRight: "32px solid transparent",
                  borderBottom: "18px solid white",
                }}>
                
                <div style={{
                  position: "absolute",
                  top: "18px",
                  left: "-32px",
                  width: 0,
                  height: 0,
                  borderLeft: "32px solid transparent",
                  borderRight: "32px solid transparent",
                  borderTop: "18px solid white"
                }} />
              </div>
            )}
            
            {logo.shape === "star" && (
              <div className="text-white text-3xl mb-2">★</div>
            )}
            <LogoIcon className="mx-auto mb-2 text-white" size={32} />
            {customText}
          </div>
        </CardContent>
      </Card>

      
      <div className="flex gap-2">
        <Button onClick={regenerate}>Generate New Logo</Button>
        <Button onClick={handleDownload}>Download Logo</Button>
        <Button onClick={saveTemplate}>Save Template</Button>
      </div>
      

      {savedTemplates.length > 0 && (
        <div className="w-full mt-4">
          <h3 className="text-lg font-semibold mb-2">Saved Templates</h3>
          <div className="grid grid-cols-2 gap-2">
            {savedTemplates.map((tpl, index) => {
              const IconComponent = tpl.icon;
              return (
                <div
                  key={index}
                  className="w-full h-32 flex items-center justify-center text-white rounded-xl"
                  style={{ backgroundImage: tpl.gradient, fontFamily: tpl.font }}
                >
                  <IconComponent className="mr-2" /> {tpl.text}
                  
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
