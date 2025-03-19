"use client";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { TournamentList } from "@/views/Tournament/TournamentList";
import GlobalLayout from "../global-layout";
export default function Page() {
  // Unwrap the entire params object first

  return (
    <Provider store={store}>
      <GlobalLayout>
        <TournamentList />
      </GlobalLayout>
    </Provider>
  );
}
