export const getAddress = async ({ latitude, longitude }) => {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
    );

    if (!res.ok) throw Error("Failed getting address");

    const data = await res.json();
    return data;
  } catch (err) {
    throw Error("Failed getting address");
  }
};

export const getLocation = async (address) => {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?address=${address}`
    );

    if (!res.ok) throw Error("Failed getting location");

    const data = await res.json();
    return data;
  } catch (err) {
    throw Error("Failed getting location");
  }
};
