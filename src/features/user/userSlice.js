import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async (_, { rejectWithValue }) => {
    try {
      const positionObj = await getPosition();
      const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      };

      const addressObj = await getAddress(position);

      const {
        locality = "Semt",
        city = "Şehir",
        postcode = "Posta Kodu",
        countryName = "Ülke",
      } = addressObj || {};

      const address = `${locality}, ${city} ${postcode}, ${countryName}`.trim();

      return { position, address };
    } catch (error) {
      return rejectWithValue(
        "Konum alınamadı. Lütfen izin verin veya tekrar deneyin."
      );
    }
  }
);

const initialState = {
  userName: "",
  status: "idle", // idle | loading | error
  position: null,
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "idle";
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload || "Bilinmeyen hata";
      });
  },
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
