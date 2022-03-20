import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { EventInterface, StoreTypes } from "src/constants";
import { supabase } from "src/utils";

export const useEvents = (past = false) => {
  const [events, setEvents] = useState<EventInterface[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const eventTrigger = useSelector(
    (state: StoreTypes) => state.event.triggerEvents
  );

  useEffect(() => {
    setLoading(true);

    const ac = new AbortController();

    const getEvents = async () => {
      const { data, error } = past
        ? await supabase
            .from("events")
            .select("*, people_attending(*), user: users!user_id(*)")
            .lt("event_date", new Date().toISOString())
            .order("created_at", { ascending: false })
            .abortSignal(ac.signal)
        : await supabase
            .from("events")
            .select("*, people_attending(*), user: users!user_id(*)")
            .gte("event_date", new Date().toISOString())
            .order("created_at", { ascending: false })
            .abortSignal(ac.signal);

      if (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
        setLoading(false);
        return;
      }

      setEvents(data);
      setLoading(false);
    };

    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventTrigger]);

  return { events, loading };
};
