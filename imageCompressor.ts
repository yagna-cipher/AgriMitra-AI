/**
 * Image compression utility to ensure images are < 1MB before sending to Gemini API.
 */
export async function compressImage(
  imageSource: string | File | Blob,
  maxDimension = 1200,
  maxSizeBytes = 950 * 1024, // < 1MB
  initialQuality = 0.85
): Promise<{ base64: string; mimeType: string; sizeBytes: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    const processLoadedImage = () => {
      let width = img.width;
      let height = img.height;

      // Scale down if dimensions exceed maxDimension
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context not supported"));
        return;
      }

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      let quality = initialQuality;
      let dataUrl = canvas.toDataURL("image/jpeg", quality);

      // Binary size estimation: (base64 length * 3/4)
      let currentSize = Math.round((dataUrl.length * 3) / 4);

      // Reduce quality iteratively if still >= maxSizeBytes
      while (currentSize > maxSizeBytes && quality > 0.3) {
        quality -= 0.15;
        dataUrl = canvas.toDataURL("image/jpeg", quality);
        currentSize = Math.round((dataUrl.length * 3) / 4);
      }

      resolve({
        base64: dataUrl,
        mimeType: "image/jpeg",
        sizeBytes: currentSize
      });
    };

    img.onload = processLoadedImage;
    img.onerror = (e) => reject(new Error("Failed to load image for compression: " + e));

    if (typeof imageSource === "string") {
      img.src = imageSource;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          img.src = e.target.result;
        } else {
          reject(new Error("Failed reading file"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageSource);
    }
  });
}

export async function compressImageFile(
  file: File | Blob | string,
  initialQuality = 0.85,
  maxDimension = 1200
): Promise<string> {
  const res = await compressImage(file, maxDimension, 950 * 1024, initialQuality);
  return res.base64;
}
