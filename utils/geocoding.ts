// utils/geocoding.ts
export const fetchCityName = async (lat: number, lng: number): Promise<string> => {
  try {
    // OpenStreetMapの逆ジオコーディングAPI（無料・キー不要）
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
      { headers: { 'Accept-Language': 'ja' } }
    );
    const data = await response.json();
    
    // 「所沢市」などの市区町村名を抽出
    const address = data.address;
    return address.city || address.town || address.village || address.suburb || "不明な地点";
  } catch (error) {
    console.error("地名取得エラー:", error);
    return "不明な地点";
  }
};