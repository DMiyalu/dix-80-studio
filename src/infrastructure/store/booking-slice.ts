import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  BookingCategoryId,
  BookingStep,
  ContactInfo,
} from "@/src/core/booking/booking";

export interface BookingState {
  isOpen: boolean;
  category: BookingCategoryId | null;
  /**
   * When true, the flow includes the initial category-selection step
   * (modal opened from the generic "Réserver maintenant" trigger).
   * When false, a category was preselected (e.g. "Réserver le studio").
   */
  requiresCategoryStep: boolean;
  step: BookingStep;
  packageId: string | null;
  durationHours: number | null;
  date: string | null; // YYYY-MM-DD
  time: string | null; // HH:mm
  contact: ContactInfo;
  status: "idle" | "submitting" | "success" | "error";
  errorMessage: string | null;
}

const emptyContact: ContactInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phoneCountry: "CA",
  phone: "",
  message: "",
  terms: false,
};

const initialState: BookingState = {
  isOpen: false,
  category: null,
  requiresCategoryStep: false,
  step: "package",
  packageId: null,
  durationHours: null,
  date: null,
  time: null,
  contact: emptyContact,
  status: "idle",
  errorMessage: null,
};

const slice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    /** Open with a preselected category (skips the category step). */
    open(state, action: PayloadAction<{ category: BookingCategoryId }>) {
      Object.assign(state, initialState);
      state.isOpen = true;
      state.category = action.payload.category;
      state.requiresCategoryStep = false;
      state.step = "package";
    },
    /** Open the selector flow: user picks the category first. */
    openSelector(state) {
      Object.assign(state, initialState);
      state.isOpen = true;
      state.requiresCategoryStep = true;
      state.step = "category";
    },
    close(state) {
      state.isOpen = false;
    },
    reset() {
      return { ...initialState };
    },
    goTo(state, action: PayloadAction<BookingStep>) {
      state.step = action.payload;
    },
    selectCategory(state, action: PayloadAction<BookingCategoryId>) {
      // Switching categories invalidates downstream choices.
      state.category = action.payload;
      state.packageId = null;
      state.durationHours = null;
      state.date = null;
      state.time = null;
      state.step = "package";
    },
    next(state) {
      if (state.step === "category") state.step = "package";
      else if (state.step === "package") state.step = "datetime";
      else if (state.step === "datetime") state.step = "contact";
    },
    back(state) {
      if (state.step === "contact") state.step = "datetime";
      else if (state.step === "datetime") state.step = "package";
      else if (state.step === "package" && state.requiresCategoryStep)
        state.step = "category";
    },
    selectPackage(
      state,
      action: PayloadAction<{ id: string; defaultHours: number }>,
    ) {
      state.packageId = action.payload.id;
      state.durationHours = action.payload.defaultHours;
      // Reset downstream selection.
      state.date = null;
      state.time = null;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.durationHours = action.payload;
      // Selected time may no longer be valid → reset.
      state.time = null;
    },
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
      state.time = null;
    },
    setTime(state, action: PayloadAction<string>) {
      state.time = action.payload;
    },
    updateContact(state, action: PayloadAction<Partial<ContactInfo>>) {
      state.contact = { ...state.contact, ...action.payload };
    },
    setStatus(
      state,
      action: PayloadAction<{
        status: BookingState["status"];
        errorMessage?: string | null;
      }>,
    ) {
      state.status = action.payload.status;
      state.errorMessage = action.payload.errorMessage ?? null;
    },
  },
});

export const bookingActions = slice.actions;
export const bookingReducer = slice.reducer;
