"use client";
import { Provider } from "react-redux";

import { store } from "@/lib/store";
import { use } from "react";
import { EditBracketView } from "@/views/Bracket/EditBracket";

export default function Page({ params }) {
  // Unwrap the entire params object first
  const unwrappedParams = use(params);
  const stageId = unwrappedParams.id;

  return (
    <Provider store={store}>
      <EditBracketView stageId={stageId} />
    </Provider>
  );
}
