const API_URL = "https://react-fast-pizza-api.jonas.io/api";

export const getMenu = async () => {
  const res = await fetch(`${API_URL}/menu`);
  if (!res.ok) throw Error("Failed getting menu");
  const { data } = await res.json();
  return data;
};

export const getOrder = async (id) => {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);
  const { data } = await res.json();
  return data;
};

export const createOrder = async (newOrder) => {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
};

export const updateOrder = async (id, updateObj) => {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
  } catch {
    throw Error("Failed updating your order");
  }
};
