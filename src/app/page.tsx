"use client";

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function Home() {
  const [data, setData] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const [useLogo, setUseLogo] = useState(false);
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setData("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const defaultLogo = {
    src: "/images/logo.svg",
    height: 50,
    width: 50,
    excavate: true,
  };

  const downloadQR = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = url;
    link.click();
  };

  return (
    <main className="min-h-screen p-4 flex items-center justify-center relative bg-[linear-gradient(to_bottom,#0077BD,#0077BD)] overflow-hidden">
      <div className="absolute inset-0 h-full w-full">
        <div className="absolute h-full w-full bg-[radial-gradient(#c2c4c4_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="bg-white rounded-lg p-8 w-full max-w-5xl flex gap-8 relative">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8">Gerar QRCode</h1>

          <div className="space-y-4 mx-auto">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Digite seu texto aqui"
                className="w-full p-3 border border-gray-300 rounded-[20px]"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
              {data && (
                <button
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="border border-gray-300 rounded-[20px] overflow-hidden w-full">
              <button
                onClick={() => setIsCustomizationOpen(!isCustomizationOpen)}
                className="w-full p-3 text-left text-gray-700 flex justify-between items-center hover:bg-gray-50"
              >
                <span>Opções de Customização</span>
                <span
                  className="transform transition-transform duration-200 text-black"
                  style={{
                    transform: isCustomizationOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                >
                  ▼
                </span>
              </button>

              {isCustomizationOpen && (
                <div className="p-3 space-y-4 border-t">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Cor do QRCode
                    </label>
                    <input
                      type="color"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={useLogo}
                        onChange={(e) => setUseLogo(e.target.checked)}
                        className="size-5 rounded border-gray-300 shadow-sm"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Adicionar Logo
                      </span>
                    </label>

                    {useLogo && (
                      <div className="mt-2">
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="block w-full text-sm text-gray-500
                                   file:mr-4 file:py-2 file:px-4
                                   file:rounded-full file:border-0
                                   file:text-sm file:font-semibold
                                   file:bg-violet-50 file:text-violet-700
                                   hover:file:bg-violet-100"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                          Escolha uma imagem personalizada ou use o logo padrão
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#0077BD] rounded-[20px] p-6">
          <div className="mt-2 bg-white p-4 rounded-[20px] flex items-center justify-center h-[400px] w-full">
            <div className="flex items-center justify-center w-full h-full">
              {data ? (
                <QRCodeCanvas
                  value={data}
                  size={300}
                  level="H"
                  fgColor={qrColor}
                  imageSettings={
                    useLogo
                      ? {
                          ...(customLogo
                            ? {
                                src: customLogo,
                                height: 90,
                                width: 90,
                                excavate: true,
                              }
                            : defaultLogo),
                        }
                      : undefined
                  }
                />
              ) : (
                <div className="text-gray-400">QR Code será exibido aqui</div>
              )}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={downloadQR}
              className="flex-1 bg-yellow-400 text-white py-2 rounded-[20px] hover:bg-yellow-500 transition"
            >
              .PNG
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
