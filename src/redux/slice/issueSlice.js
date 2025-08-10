

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategories: [],
};

const categoryMap = {
  // Mental Health
  'PTSD': 'Mental Health',
  'Depression': 'Mental Health',
  'Anxiety': 'Mental Health',
  'Insomnia': 'Mental Health',

  // Body Health
  'Neck Condition': 'Body Health',
  'Hip Condition': 'Body Health',
  'Shoulder Condition': 'Body Health',
  'Elbow Condition': 'Body Health',
  'Head Injury': 'Body Health',
  'Wrist Condition': 'Body Health',
  'Nerve Damage': 'Body Health',
  'Mid Back Condition': 'Body Health',
  'Knee Condition': 'Body Health',
  'Foot Condition': 'Body Health',
  'Low Back Condition': 'Body Health',
  'Leg Condition': 'Body Health',
  'Flat Feet': 'Body Health',
  'Arm Condition': 'Body Health',
  'High Blood Pressure': 'Body Health',
  'Plantar Fasciitis': 'Body Health',
  'Ankle Condition': 'Body Health',
  'Hammer Toes': 'Body Health',
  'Ingrown Toenails': 'Body Health',
  'Radiculopathy of Upper Extremities': 'Body Health',
  'Sciatica': 'Body Health',

  // Migraine & Headache
  'Prostrating Migraines': 'Migraine & Headache Claim Information',

  // Sinusitis, Rhinitis, Asthma
  'Rhinitis': 'Sinusitis, Rhinitis & Asthma Claim Information',
  'Sinusitis': 'Sinusitis, Rhinitis & Asthma Claim Information',

  // Gastrointestinal
  'GERD (Acid Reflux)': 'Gastrointestinal Issues (GERD/IBS) Claim Information',
  'IBS (Irritable Bowel Syndrome)': 'Gastrointestinal Issues (GERD/IBS) Claim Information',

  // Tinnitus and Hearing Loss
  'Tinnitus': 'Tinnitus and Hearing Loss Claim Information',

  // Cancer Related
  'Cancer': 'Other',

  // Diabetes Related
  'Diabetes': 'Other',

  // TBI Related
  'Traumatic Brain Injury': 'Other',
};

export const removeCategoryByNameThunk = (name) => async (dispatch, getState) => {
  // Dispatch remove category action
  dispatch(removeCategoryByName(name));

  const selectedCategories = getState().issueSlice.selectedCategories;


  const nextCategory = selectedCategories.length > 0 ? selectedCategories[0] : "";  // Set to empty if no categories left

  // Navigate to the next category
  dispatch(navigateToNextCategory(nextCategory));
};

export const navigateToNextCategory = (nextCategory) => ({
  type: 'issue/navigateToNextCategory',
  payload: nextCategory,
});

const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    addCategoryByIssue: (state, action) => {
      const issue = action.payload;
      const category = categoryMap[issue] || 'Other';

      if (!state.selectedCategories.includes(category)) {
        state.selectedCategories.push(category);
      }
    },

    removeCategoryIfNoIssuesLeft: (state, action) => {
      const { uncheckedIssue, stillCheckedIssues } = action.payload;

      const category = categoryMap[uncheckedIssue] || 'Other';

      const stillHasIssueInSameCategory = stillCheckedIssues.some((issue) => {
        return categoryMap[issue] === category;
      });

      if (!stillHasIssueInSameCategory) {
        state.selectedCategories = state.selectedCategories.filter(
          (c) => c !== category
        );
      }
    },

    resetCategories: (state) => {
      state.selectedCategories = [];
    },

    removeCategoryByName: (state, action) => {
      const categoryName = action.payload;
      state.selectedCategories = state.selectedCategories.filter(
        (c) => c !== categoryName
      );
    },
  },
});

export const { addCategoryByIssue, removeCategoryIfNoIssuesLeft, resetCategories, removeCategoryByName } = issueSlice.actions;
export default issueSlice.reducer;
